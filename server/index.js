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

app.get('/reviews/:id', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/reviews?product_id=${req.params.id}`, {
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

app.get('/reviews/meta/:id', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/reviews/meta?product_id=${req.params.id}`, {
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
      console.log(error);
    });
});

//POST QUESTION
app.post('/qa/questions/:id', (req, res) => {
  axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/qa/questions?product_id=${req.params.id}`, {
    headers: {
      Authorization: config.TOKEN,
      'Content-Type': 'application/json',
    },
    body: {
      body: req.body.body,
      name: req.body.name,
      email: req.body.email,
      product_id: req.params.id,
    }
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

//POST ANSWER
app.post('/qa/questions/:question_id/answers', (req, res) => {
  axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/qa/questions?product_id=${req.params.question_id}/answers`, {
    headers: {
      Authorization: config.TOKEN,
      'Content-Type': 'application/json',
    },
    body: {
      body: req.body.body,
      name: req.body.name,
      email: req.body.email,
      photos: req.body.photos,
    }
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

//MARK QUESTION AS HELPFUL
app.put('/qa/questions/:question_id/helpful', (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/qa/questions?product_id=${req.params.question_id}/helpful`, {
    headers: {
      Authorization: config.TOKEN,
      'Content-Type': 'application/json',
    }
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

//REPORT A QUESTION
app.put('/qa/questions/:question_id/report', (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/qa/questions?product_id=${req.params.question_id}/report`, {
    headers: {
      Authorization: config.TOKEN,
      'Content-Type': 'application/json',
    }
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

//MARK AN ANSWER AS HELPFUL
app.put('/qa/questions/:answer_id/helpful', (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/qa/questions?product_id=${req.params.answer_id}/helpful`, {
    headers: {
      Authorization: config.TOKEN,
      'Content-Type': 'application/json',
    }
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

//REPORT AN ANSWER
app.put('/qa/questions/:answer_id/report', (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/qa/questions?answer_id=${req.params.answer_id}/report`, {
    headers: {
      Authorization: config.TOKEN,
      'Content-Type': 'application/json',
    }
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
