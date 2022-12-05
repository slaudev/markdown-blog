const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Article = require('./models/article')
const articleRouter = require('./routes/articles');


mongoose.connect('mongodb://localhost/blog');

// the view engine will convert the ejs code to HTML
app.set('view engine', 'ejs');


app.use(express.urlencoded({ extended: false}));

// render will access our VIEWS folder
app.get('/', async (req, res) => {
    const articles = await Article.find().sort({
        createdAt: 'desc'});
    res.render("articles/index", { articles : articles});
})

app.use('/articles', articleRouter);

app.listen(5000);