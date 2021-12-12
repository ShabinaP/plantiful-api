
const Agenda = require('agenda');
const Plant = require('./plant')

var mongoConnectionString = "mongodb://127.0.0.1:27017/AgendaMedium'";
 
var agenda = new Agenda({db: {address: mongoConnectionString}});
 
const _id =`61a67737d90627d64e7eeb15`
 
agenda.define('delete old users', function(job, done) {
  const user = Plant.find({_id:_id}, done);
  console.log(user);
});
 
agenda.on('ready', function() {
    
  agenda.every('3 minutes', 'delete old users');
 
  // Alternatively, you could also do:
  agenda.every('*/1 * * * *', 'delete old users');
 
  agenda.start();
});