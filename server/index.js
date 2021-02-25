const express = require('express');
const path = require('path');

const PORT = 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'client/dist')));

app.use(express());

app.get('/peanutbutter', (req, res) => {
  res.send('jelly');
});

app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});
