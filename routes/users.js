var express = require('express');
var router = express.Router();
var User=require('../model/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/list',function (req,res,next) {
  User.find({},function functionName(err,rtn) {
    if(err)throw err;
    res.render('user/userlist',{user:rtn});
});
});
router.get('/data/:id', function(req, res, next) {
  res.send('writing data is ' + req.params.id);
});
router.get('/userdetails/:id',function(req,res,next){
  console.log('call',req.params.id);
  User.findById(req.params.id,function(err,rtn){
    if (err)throw err;
    console.log(req.session.user);
    res.render('user/userdetails',{user1:rtn,title:'Express'})
  });
});
router.get('/userupdate/:id',function(req,res,next){
  console.log('call',req.params.id);
    console.log('call',req.params.id);
  User.findById(req.params.id,function (err,rtn) {
    if(err)throw err;
    console.log(rtn);
    res.render('user/userupdate',{user1:rtn,title:'Express'})

});
  });
router.get('/delete/:id',function (req,res,next) {
  User.findByIdAndRemove(req.params.id,function (err,rtn) {
    if(err) throw err;
    console.log(rtn);
    res.redirect('/users/list');
});
});
router.post('/update',function (req,res,next) {
  var update={
    name:req.body.username,
    email:req.body.useremail,
    password:req.body.userpwd
  }
  User.findByIdAndUpdate(req.body.id,{$set:update},function (err,rtn) {
    if(err)throw err;
  res.redirect('/users/userdetails/'+rtn._id);

 });
});
router.get('/userdetails1', function(req, res, next) {
  var user = {}
  user.name = req.query.name;
  user.email = req.query.email;
  user.password = req.query.password;
  console.log(user);
  res.render('user/userdetails1', {
    user1: user
  });
  var Schema=mongoose.schema;
  var UserSchema=new Schema({
    name:{
      type:string,
      required:true,
    },
    email:{
      type:string,
      required:true,
    },
    password:{
      type:string,
      required:true,
    },
  });
});

module.exports = router;
