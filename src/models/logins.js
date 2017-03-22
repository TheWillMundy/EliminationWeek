const mongoose = require('mongoose'),
      mongooseApiQuery = require('mongoose-api-query'),
      createdModified = require('mongoose-createdmodified').createdModifiedPlugin;

const LoginSchema = new mongoose.Schema({
  serviceType: {
    type: String,
    required: true
  },
  key: {
    type: String,
    required: true
  },
}, { minimize: false });

LoginSchema.plugin(mongooseApiQuery);
LoginSchema.plugin(createdModified, { index: true });

const Login = mongoose.model('Login', LoginSchema);
export default Login;
