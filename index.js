var fs = require('fs');
var sax = require('sax');
var Q = require('q');


exports.parseLog4jXML = function(fname, callback) {
  var saxStream = sax.createStream(true, { xmlns: false });
  var logEvent, message, location;
  var events = [];
  var deferred = Q.defer();

  saxStream.on("error", deferred.reject);
  saxStream.on("end", function() {
    deferred.resolve(events);
  });

  saxStream.on("opentag", function(tag) {
    switch(tag.name) {
    case 'log4j:event':
      logEvent = tag.attributes;
      message = false;
      location = false;
      break;
    case 'log4j:message':
      message = true;
      logEvent.message = "";
      break;
    case 'log4j:locationInfo':
      location = true;
      logEvent.location = tag.attributes;
      break;
    }
  });

  saxStream.on("cdata", function(cdata) {
    if (message) {
      logEvent.message += cdata;
    }
  });

  saxStream.on("closetag", function() {
    if (message) {
      message = false;
      return;
    }
    if (location) {
      location = false;
      return;
    }
    if (logEvent) {
      if (callback(logEvent)) {
        events.push(logEvent);
      }
      logEvent = null;
    }
  });

  fs.createReadStream(fname)
    .on('error', deferred.reject)
    .pipe(saxStream);
  return deferred.promise;
};

