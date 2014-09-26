var ssi = require('../');
var fs = require('fs');
var path = require('path');
var root = path.dirname(__filename);

var source = fs.readFileSync(root + '/static/index.html').toString();

console.log(ssi.parse(source));
