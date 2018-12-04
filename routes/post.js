var express=require('express');
var router=express.Router();
var Post=require('../model/post');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/postadd',function(req,res,next){
  res.render('postadd')
});
router.get('/postdetail/:id',function(req,res,next){
  Post.findById(req.params.id,function (err,rtn) {
    if(err) throw err;
    console.log(rtn);
    res.render('user/postdetail',{post:rtn,title:'Express'})

  });
});
router.post('/postadd', function(req, res, next) {
  var post = new Post();
  post.title = req.body.title;
  post.Author = req.body.author;
  post.Content = req.body.content;
  console.log(post);
  post.save(function (err,rtn) {
    if(err) throw err;
    res.redirect('/post/postdetail/'+rtn.id);

  });

  });

module.exports = router;
