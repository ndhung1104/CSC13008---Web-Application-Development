const express = require('express');
const path = require('path');
const app = express();
const PORT = 4000;

// Serve folder public như static files (css, img, js)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
// Set view engine là ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Dữ liệu team
const team = require('./team.json');

app.get('/', (req, res) => {
  res.redirect('/team');
});

// Route render page team
app.get('/team', (req, res) => {
  res.render('team', { team });
});

app.get('/team/:slug', (req, res) => {
    const id = req.params.slug;
    const member = team.find(m => m.id === id);
    if (member) {
        res.render('profile', { member });
    }
    else {
        res.status(404).send('Member not found');
    }
});

app.get('/account/signup', (req, res) => {
  res.render('signup');
});

app.post('/account/signup', (req, res) => {
  console.log(req.body);
  res.redirect('/account/signup');
});

// 404 page

app.get('*', (req, res) => {
  res.status(404).render('404', { id: null });
});


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
