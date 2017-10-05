var express = require('express'),
    spdy = require('spdy'),
    fs = require('fs'),
    compression = require('compression'),
    path = require('path'),
    jade = require('jade'),
    coffee = require('./routes/coffee'),
    pizza = require('./routes/pizza');
var port = 8080;
var app = new express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(compression());
app.use(express.static(path.join(__dirname, 'public'), {maxage: '100d'}));
app.use('/coffee', coffee);
app.use('/pizza', pizza);

app.get('/',function(req,res){
  res.render('layout', { title: 'Node.js / Google Maps Example', subtitle: 'with the help of the Express, Path, and Jade modules' });
});

// app.listen(process.env.PORT || 8080)
var options = {
  key: fs.readFileSync(__dirname + '/server.key'),
  cert:  fs.readFileSync(__dirname + '/server.crt')
};

spdy
.createServer(options, app)
.listen(process.env.PORT || port, (error) => {
  if (error) {
    console.error(error)
    return process.exit(1)
  } else {
    console.log('Listening on port: ' + port + '.')
  }
});
