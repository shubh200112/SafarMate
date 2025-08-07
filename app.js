const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate');


const MONGO_URL = "mongodb://127.0.0.1:27017/safarmate";

main()
      .then((res)=> {
        console.log("Connected to DB");
    })
      .catch((err) => {
        console.log(err)
    });
async function main() {
    mongoose.connect(MONGO_URL);
}

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));
app.use(express.urlencoded({extended : true})); //used to fetch contents directly from db and store it in var
app.use(methodOverride("_method"))
app.engine('ejs' , ejsMate);
app.use(express.static(path.join(__dirname , "/public")));


app.get("/", (req , res) => {
    res.send("I am rooooot");
})

//Index Route
app.get("/listings" , async (req,res ) => {
    let allListings = await Listing.find({});
    res.render("listings/index.ejs" , {allListings})
})

// New route
app.get("/listings/new" , async (req , res) => {
    res.render("listings/new.ejs")
})

app.post("/listings" , async (req,res) => {
    let newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});

//edit
app.get("/listings/:id/edit" , async (req , res) => {
    let {id} = req.params; // done using express.urlencoded
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs" , {listing});
});

//show route
app.get("/listings/:id" , async (req , res) => {
    let {id} = req.params; // done using express.urlencoded
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs" , {listing})
});

//update route
app.put("/listings/:id" , async (req , res) => {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id , {...req.body.listing});
    res.redirect(`/listings/${id}`);
})

//delete route
app.delete("/listings/:id" , async (req , res) =>{
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings")
})



// app.get("/testListing" , async (req ,res) => {
//     let sampleListing = new Listing({
//         title : "Mera Ghar",
//         description : " By the Beach",
//         price : 50000,
//         location : "Mumbai",
//         country : "India"
//     });

//     await sampleListing.save();
//     console.log("Sample was saved");
//     res.send("successful testing !!")
// });

app.listen(8080 , () => {
    console.log("Server is listening to port 8080 !!")
})