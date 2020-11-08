const express = require('express');
const routes = require('./routes');
const { ValidationError, NotFoundError } = require('./lib/errors');
const app = express();
const mongoose = require('mongoose')

var uri = "mongodb://localhost:27017/codingmaster";
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
app.db = mongoose.connection;
app.db.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

require('./models/index.js')(app)

app.use(express.json({ limit: '100kb' }));


let initApp = (req, res, next)=>{
  req.app = app;
  next()
}

app.use(initApp)
app.use('/', routes);
app.use('/', (err, req, res, next) => {
  // default to 500 internal server error unless we've defined a specific error
  let code = 500;
  if (err instanceof ValidationError) {
    code = 400;
  }
  if (err instanceof NotFoundError) {
    code = 404;
  }
  res.status(code).json({
    message: err.message,
  });
});

let port = 8000;
app.listen(port, ()=>{
	console.log("[ Server listening on port   ]", port)
})

module.exports = app;
