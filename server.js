const express = require('express');
const { dirname } = require('path');
const path = require('path');

const app = express();

app.use((req, res, next) => {
  res.show = (file) => {
    res.sendFile(path.join(__dirname, `/views/${file}`));
  };
  next();
});

app.use('/user/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '/views/forbidden.html'));
});

app.use(express.static(path.join(__dirname, '/public')));

app.get(['/', '/home'], (req, res) => {
  res.show('home.html');
});

app.get('/about', (req, res) => {
  res.show('about.html');
});

// app.get('public/404.jpg', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public/404.jpg'));
// });

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '/views/404.html'));
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});