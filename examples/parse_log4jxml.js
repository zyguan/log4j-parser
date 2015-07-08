var path = require('path');
var hlparser = require('../index');

hlparser.parseLog4jXML(path.join(__dirname, 'log4j.xml'), function(event) {
  console.log(event);
  return true;
}).then(function(events) {
  console.log("Total events: ", events.length);
}, console.error);
