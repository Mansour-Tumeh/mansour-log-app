const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: { type: String, required: true, minLength: 4 },
  email: { type: String, required: true, minLength: 4, unique: true },
  password: { type: String, required: true, minLength: 4 },
  role : {
    type: String,
    enum :  {
      values :  ['user','admin','supervisor'],
      message : '{VALUE} are not accepted' 
    }, 
    default : "user"
  }
});

exports.UserModel = model("User", userSchema);