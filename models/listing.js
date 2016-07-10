var uuid = require('uuid');
//Constructor function
//How do I build this object?
function Listing(location, houseOrApt, numberOfRooms, numberOfBathrooms, numberOfRoommates, typeOfLease, arePetsAllowed, id){
  this.id = id || uuid.v4();
  this.location = location;
  this.houseOrApt = houseOrApt;
  this.numberOfRooms = numberOfRooms;
  this.numberOfBathrooms = numberOfBathrooms;
  this.numberOfRoommates = numberOfRoommates;
  this.typeOfLease = typeOfLease;
  this.arePetsAllowed = arePetsAllowed;
};

module.exports = Listing;
