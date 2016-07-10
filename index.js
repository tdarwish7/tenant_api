var express = require('express');
var server = express();
var bodyParser = require('body-parser');
var lowdb = require('lowdb');
var uuid = require('uuid');

//import my model
var Listing = require('./models/listing.js');
var port = process.env.PORT || 8080;
var db = lowdb('db.json');

// Database Initialization
  db.defaults({listings: []})
    .value(); //runs the previous set of commands

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

server.get('/listings', function (request, response){
  var listings = db.get('listings')
              .value();
  response.send(listings);
});

server.get('/listings/:id', function (request, response){
  var listing = db.get('listings')
                .find({id: request.params.id})
                .value()
  response.send(listing);
});

server.post('/listings', function (request, response){
  var listing = new Listing(request.body.location, request.body.houseOrApt, request.body.numberOfRooms, request.body.numberOfBathrooms, request.body.numberofRoommates, request.body.typeOfLease);
  var result = db.get('listings')
              .push(listing)
              .last()
              .value();
  response.send(result);
});

server.put('/listings/:id', function (request, response){
  var listing = new Listing(request.body.location, request.body.houseOrApt, request.body.numberOfRooms, request.body.numberOfBathrooms, request.body.numberofRoommates, request.body.typeOfLease, request.params.id);
  listing.updateComplete(request.body.typeOfLease);
  var updatedListing = db.get('listing')
                    .find({id: request.params.id})
                    .assign(listing)
                    .value();
  response.send(updatedListing);

});

server.delete('/listings/:id', function (request, response){
  var listing = db.get('listings')
                .remove({id: request.params.id})
                .value();
    response.send(listing);
});

server.listen(port);
