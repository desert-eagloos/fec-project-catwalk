/* eslint-disable no-console */
const { default: axios } = require('axios');
const express = require('express');
const path = require('path');

const PORT = 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'client/dist')));

app.use(express());
app.use(express.json());

app.get('/peanutbutter', (req, res) => {
  res.send('jelly');
});

app.get('/products/', (req, res) => {
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/products/', {
    headers: {
      Authorization: '5ef71ab43814c50f8ae97ea86e72e30c5e31118d',
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
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/products/${req.params.productId}`, {
    headers: {
      Authorization: '5ef71ab43814c50f8ae97ea86e72e30c5e31118d',
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

app.get('/reviews/:id', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/reviews?product_id=${req.params.id}`, {
    headers: {
      Authorization: '5ef71ab43814c50f8ae97ea86e72e30c5e31118d',
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

app.get('/reviews/meta/:id', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/reviews/meta?product_id=${req.params.id}`, {
    headers: {
      Authorization: '5ef71ab43814c50f8ae97ea86e72e30c5e31118d',
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
