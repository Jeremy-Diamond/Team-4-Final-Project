const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
//console.log('test')
//console.log(app.use(bodyParser.json()));
app.use((req, res,next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers',
  'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.use('/',require('./routes'));

//catch all errors, copied from node js site
process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } 
  else {
    app.listen(port, () => {console.log(`Server listening on port ${port}`)});
  }
});
