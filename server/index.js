require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const sql = `
    select
      "productId",
      "name",
      "price",
      "image",
      "shortDescription"
      from "products"
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const productId = parseFloat(req.params.productId, 10);
  if (!Number.isInteger(productId) || productId <= 0) {
    return res.status(400).json({
      error: 'productId must be a positive integer'
    });
  }
  const sql = `
    select *
      from "products"
      where "productId" = $1
  `;
  const params = [productId];
  db.query(sql, params)
    .then(result => {
      const product = result.rows[0];
      if (!product) {
        res.status(404).json({
          error: `Cannot find product with productId ${productId}`
        });
      } else {
        res.json(product);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});

app.get('/api/cart', (req, res, next) => {
  if (!('cartId' in req.session) || req.session.cartId === '') {
    return res.json([]);
  }
  const sql = `
    select "c"."cartItemId",
      "c"."price",
      "p"."productId",
      "p"."image",
      "p"."name",
      "p"."shortDescription"
      from "cartItems" as "c"
      join "products" as "p" using ("productId")
      where "c"."cartId" = $1
  `;
  const params = [req.session.cartId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/cart', (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({
      error: 'content is a required field'
    });
  } else if (!Number.isInteger(parseFloat(req.body.productId)) || parseFloat(req.body.productId) <= 0) {
    res.status(400).json({
      error: 'productId must be a positive integer'
    });
  } else if (!('productId' in req.body) || req.body.productId === '') {
    res.status(400).json({
      error: 'productId=integer required'
    });
  }
  const sql = `
    select "price"
      from "products"
      where "productId" = $1
  `;
  const params = [req.body.productId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        res.status(400).json({
          error: `Cannot find price associated with with productId ${req.body.productId}`
        });
      }
      if ('cartId' in req.session) {
        const cartIdPrice = {
          cartId: req.session.cartId,
          price: result.rows[0].price
        };
        return cartIdPrice;
      }
      const sql = `
        insert into "carts" ("cartId", "createdAt")
          values (default, default)
          returning "cartId"
      `;
      return db.query(sql)
        .then(data => {
          const cartIdPrice = {
            cartId: data.rows[0].cartId,
            price: result.rows[0].price
          };
          return cartIdPrice;
        });
    })
    .then(data => {
      req.session.cartId = data.cartId;
      const sql = `
        insert into "cartItems" ("cartId", "productId", "price")
          values ($1, $2, $3)
          returning "cartItemId"
      `;
      const params = [data.cartId, req.body.productId, data.price];
      return db.query(sql, params);
    })
    .then(result => {
      const sql = `
        select "c"."cartItemId",
          "c"."price",
          "p"."productId",
          "p"."image",
          "p"."name",
          "p"."shortDescription"
          from "cartItems" as "c"
          join "products" as "p" using ("productId")
          where "c"."cartItemId" = $1
        `;
      const params = [result.rows[0].cartItemId];
      db.query(sql, params)
        .then(result => {
          res.status(201).json(result.rows[0]);
        });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});

app.post('/api/orders', (req, res, next) => {
  if (!('cartId' in req.session)) {
    res.status(400).json({
      error: 'no stored cartId in session'
    });
  } else if (!('name' in req.body) || !('creditCard' in req.body) || !('shippingAddress' in req.body)) {
    res.status(400).json({
      error: 'name, creditCard, and shippingAddress are required in the request body'
    });
  }
  const sql = `
    insert into "orders" ("cartId", "name", "creditCard", "shippingAddress")
      values ($1, $2, $3, $4)
      returning "orderId", "createdAt", "name", "creditCard", "shippingAddress";
  `;
  const params = [req.session.cartId, req.body.name, req.body.creditCard, req.body.shippingAddress];
  db.query(sql, params)
    .then(result => {
      delete req.session.cartId;
      res.status(201).json(result.rows[0]);
    });
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
