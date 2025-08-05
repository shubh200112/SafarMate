const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
   title : {
    type : String,
    required : true,
   },
   description : {
    type : String
   },
   image: {
    filename: String,
    url: {
      type: String,
      default: "https://unsplash.com/photos/surfer-walks-on-beach-at-sunset-w_t5Ws-RvWs"
    }
  },
   price : {
    type : Number
   },
   location : {
    type : String
   },
   country : {
    type : String
   },
})

const Listing = mongoose.model("Listing" , listingSchema);
module.exports = Listing;
