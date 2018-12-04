var express = require('express');
var router = express.Router();
var User=require('../model/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/hellow',function(req,res, next){
  res.render('hellow');
});
router.get('/login',function(req,res,next){
  res.render('login');
});
router.post('/login',function (req,res,next){
  console.log(req.body.useremail,req.body.userpwd);
  User.findOne({email:req.body.useremail},function(err,rtn){
    if(err)throw err;
    if(rtn !=null && User.compare(req.body.userpwd,rtn.password)){
      req.session.user={name:rtn.name,email:rtn.email,password:rtn.password};
      res.redirect('/users/userdetails/'+rtn._id);
    }else {
      res.redirect('/login');
    }
  });
});
router.get('/singup',function(req,res,next){
  res.render('singup');
});
router.get('/singup2',function(req,res,next){
  res.render('singup2');
});
router.get('/userdetails1',function(req,res,next){
  var user={}
user.name=req.query.name;
user.email=req.query.email;
user.password=req.query.password;
console.log(user);
  res.render('userdetails1',{user1:user});
});
router.post('/singup',function(req,res,next){
  var user= new User();
user.name=req.body.username;
user.email=req.body.useremail;
user.password=req.body.userpwd;
user.save(function (err,rtn) {
  if(err)throw err;
  res.render('user/userdetails',{user1:rtn});
})

});
router.post('/emaildu',function (req,res) {
  console.log(req.body);
  User.findOne({email:req.body.email},function (err,rtn) {
    if(err)throw err;
    console.log(rtn);
    if(rtn!=null){
      res.json({status:false})

    }else{
      res.json({status:true})
    }

  });



});


module.exports = router;
