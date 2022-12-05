const express = require('express');
const Article = require('./../models/article')
const router = express.Router();


router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() })
})

router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id);
    res.render('articles/edit',{ article: article})
})

router.get('/delete/:id', async (req, res) => {
    await Article.findByIdAndRemove(req.params.id)
    res.redirect('/')
  })
  

router.get('/:id', async (req, res) => {
    const article = await Article.findById(req.params.id);
    if (article == null) res.redirect('/');
    res.render('articles/show', { article: article });
})

router.post('/update', async (req, res) => {
    let article = req.body;
    //article.title = req.body.title;
    //article.description = req.body.description;
    //article.markdown = req.body.markdown;
    await Article.findByIdAndUpdate(req.body.id, article)
    res.redirect('/')
  })

router.post('/create', async (req, res) => {
  let article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown
    })

    try {
          article = await article.save();
        res.redirect(`/articles/${article.id}`);

    } catch (e) {
        console.log(e);
        res.render('articles/new', {article: article})
    }
})
    
router.post('/search', async (req, res) => {
  const articles = await Article.find({title: req.body.searchTitle}).sort({
      createdAt: 'desc'});
      console.log(articles);
  if (articles[0] == undefined){ res.send('not found');
  res.redirect("articles/index", { articles : articles});}
})


// wherever we require this file, we can access router for use
module.exports = router;