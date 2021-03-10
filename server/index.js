/* eslint-disable no-console */
const { default: axios } = require('axios');
const express = require('express');
const path = require('path');
const config = require('./config');

const PORT = 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'client/dist')));

app.use(express());
app.use(express.json());

app.get('/products/', (req, res) => {
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/products/', {
    headers: {
      Authorization: config.TOKEN,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      res.status(200);
      res.send(response.data);
    })
    .catch((error) => {
      res.status(404);
      res.send(error);
    });
});

app.get('/products/:productId', (req, res) => {
  console.log('Testing Form(remove me later index.js line 34)', req.params.productId);
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/products/${req.params.productId}`, {
    headers: {
      Authorization: config.TOKEN,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      res.status(200);
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.get('/products/:productId/styles', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/products/${req.params.productId}/styles`, {
    headers: {
      Authorization: config.TOKEN,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => res.status(200).send(response.data))
    .catch((error) => res.send(error));
});

app.post('/add-to-cart', (req, res) => {
  const params = req.body.sku_id;
  console.log(params);
  axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/cart', { sku_id: params }, {
    headers: {
      Authorization: config.TOKEN,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      console.log(response.data);
      res.status(201);
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get('/reviews', (req, res) => {
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/reviews', {
    headers: {
      Authorization: config.TOKEN,
      'Content-Type': 'application/json',
    },
    params: {
      product_id: req.query.productId,
      page: req.query.page,
      count: req.query.count,
      sort: req.query.sort,
    },
  })
    .then((response) => {
      res.status(200);
      res.send(response.data);
    })
    .catch((error) => {
      res.status(404);
      console.log(error);
    });
});

app.get('/reviews/meta', (req, res) => {
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/reviews/meta', {
    params: {
      product_id: req.query.productId,
    },
    headers: {
      Authorization: config.TOKEN,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      res.status(200);
      res.send(response.data);
    })
    .catch((error) => {
      res.status(404);
      console.log(error);
    });
});

app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});
