const express = require('express');
const { dirname } = require('path');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();

app.engine('.hbs', hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' }));
app.set('view engine', '.hbs');

// app.use((req, res, next) => {
//   res.show = (file) => {
//     res.sendFile(path.join(__dirname, `/views/${file}`));
//   };
//   next();
// });

app.use('/user/', (req, res, next) => {
  res.render('forbidden', { layout: false });
});

app.use(express.static(path.join(__dirname, '/public')));

app.use(express.urlencoded({ extended: false }));

app.get(['/', '/home'], (req, res) => {
  res.render('home');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { name: req.params.name });
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res) => {
  res.render('history');
});

app.post('/contact/send-message', (req, res) => {
  const { author, sender, title, message, file } = req.body;

  console.log(req.body);

  if (author && sender && title && message && file) {
    res.render('contact', { isSent: true, fileName: req.body.file });
  }
  else {
    res.render('contact', { isError: true });
  }
});

app.use((req, res) => {
  res.status(404).render('404', { layout: false });
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});