const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/JavaScriptNotes')
.then(() => console.log('Connected Sucessfully'))
.catch((err) => console.error('Connect Failed:' + err))

PORT=3001