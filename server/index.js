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

// GET A LIST OF REVIEWS FOR A CERTAIN PRODUCT
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

// GET THE METADATA FOR A CERTAIN PRODUCT
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

// POST A REVIEW FOR A CERTAIN PRODUCT
app.post('/reviews', (req, res) => {
  console.log(req.body);
  const data = {
    product_id: req.body.product_id,
    rating: req.body.rating,
    summary: req.body.summary,
    body: req.body.body,
    recommend: Boolean(req.body.recommend),
    name: req.body.name,
    email: req.body.email,
    photos: req.body.photos,
    characteristics: req.body.characteristics,
  };

  const headers = {
    headers: {
      Authorization: config.TOKEN,
      'Content-Type': 'application/json',
    },
  };

  axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/reviews', data, headers)
    .then((response) => {
      console.log(response.data);
      res.status(201);
      res.send(response.data);
    })
    .catch((error) => {
      res.status(401);
      res.send(error);
    });
});

// MARK A REVIEW AS HELPFUL
app.put('/reviews/:id/helpful', (req, res) => {
  const headers = {
    headers: {
      Authorization: config.TOKEN,
      'Content-Type': 'application/json',
    },
  };

  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/reviews/${req.params.id}/helpful`, {}, headers)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((error) => {
      res.status(401);
      res.send(error);
    });
});

// REPORT A REVIEW
app.put('/reviews/:id/report', (req, res) => {
  const headers = {
    headers: {
      Authorization: config.TOKEN,
      'Content-Type': 'application/json',
    },
  };

  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/reviews/${req.params.id}/report`, {}, headers)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((error) => {
      res.status(401);
      res.send(error);
    });
});

//GET QUESTIONS
app.get('/qa/questions/:id', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/qa/questions?product_id=${req.params.id}`, {
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
      console.log('ERROR GETTING QUESTIONS', error);
    });
});

//POST QUESTION
app.post('/qa/questions/:id', (req, res) => {
  const obj = {
    body: req.body.data.body,
    name: req.body.data.name,
    email: req.body.data.email,
    product_id: parseInt(req.body.data.id)
  }
  axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/qa/questions?product_id=${req.params.id}`, obj,
    {
      headers: {
        Authorization: config.TOKEN,
        'Content-Type': 'application/json',
      }
    })
    .then((response) => {
      res.status(201);
      console.log('Question Posted');
      res.send(response.data);
    })
    .catch((error) => {
      res.status(404);
      console.log('ERROR POSTING A QUESTION', error);
    });
});

//POST ANSWER
app.post('/qa/questions/:question_id/answers', (req, res) => {
  const obj = {
    body: req.body.data.body,
    name: req.body.data.name,
    email: req.body.data.email,
    photos: [req.body.data.photos],
  }
  console.log("obj", obj);
  axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/qa/questions/${req.params.question_id}/answers`, obj,
    {
      headers: {
        Authorization: config.TOKEN,
        'Content-Type': 'application/json',
      }
    }

  )
    .then((response) => {
      res.status(201);
      res.send(response.data);
      console.log('Answer Posted');
    })
    .catch((error) => {
      res.status(404);
      console.log('ERROR POSTING AN ANSWER', error);
    });
});

//MARK QUESTION AS HELPFUL
app.put('/qa/questions/:question_id/helpful', (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/qa/questions/${req.params.question_id}/helpful`, {}, {
    headers: {
      Authorization: config.TOKEN
    }
  })
    .then((response) => {
      res.status(200);
      res.send(response.data);
    })
    .catch((error) => {
      res.status(404);
      console.log('ERROR MARKING A QUESTION AS HELPFUL', error);
    });
});

//REPORT A QUESTION
app.put('/qa/questions/:question_id/report', (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/qa/questions/${req.params.question_id}/report`, {}, {
    headers: {
      Authorization: config.TOKEN
    }
  })
    .then((response) => {
      res.status(200);
      res.send(response.data);
    })
    .catch((error) => {
      res.status(404);
      console.log('ERROR REPORTING A QUESTION', error);
    });
});

//MARK AN ANSWER AS HELPFUL
app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/qa/answers/${req.params.answer_id}/helpful`, {}, {
    headers: {
      Authorization: config.TOKEN
    }
  })
    .then((response) => {
      res.status(200);
      res.send(response.data);
    })
    .catch((error) => {
      res.status(404);
      console.log('ERROR MARKING ANSWER AS HELPFUL', error);
    });
});

//REPORT AN ANSWER
app.put('/qa/questions/:answer_id/report', (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/qa/answers/${req.params.answer_id}/report`, {}, {
    headers: {
      Authorization: config.TOKEN
    }
  })
    .then((response) => {
      res.status(200);
      res.send(response.data);
    })
    .catch((error) => {
      res.status(404);
      console.log('ERROR REPORTING ANSWER', error);
    });
});


app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});
