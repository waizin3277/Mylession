var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var UserSchema=new Schema({
  title:{
    type:String,
    required:true,
  },
  Author:{
    type:String,
    required:true,
  },
  Content:{
    type:String,
    required:true,
  },
});
module.exports = mongoose.model("Post",UserSchema);
