// run this to empty current database and "seed" database with some users
// Purpose: auto. generate example content to see how are application looks like and performs
var mongoose = require("mongoose");
var Destination = require("./MongoDB_models/destination.js"),
    Comment     = require("./MongoDB_models/comment"),
    User        = require("./MongoDB_models/user.js")

var data = [
  {
    "name" : "Emerald's Bay",
    "state" : "Nevada", "country" : "United States of America",
    "image" : "/photos/emerald_bay.jpg",
    "description" : "Sparkling ocean water",
    "author":
        {
          "id" : ("5d32b4b2fd13e359f9d0c593"),
          "username": "zach"
        },
    "__v" : 0
  },
  {
    "name" : "Disneyland",
    "state" : "California", "country" : "United States of America",
    "image" : "/photos/disneyland.jpg",
    "description" : "Happiest place on Earth. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiu smod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute iruredolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    "author" : {
      "id" : ("5d32b454fd13e359f9d0c58f"),
      "username" : "neel"
    },
    "__v" : 0
  },
  {
    "name" : "Santa Monica", "state" : "California",
    "country" : "United States of America",
    "image" : "/photos/santa_monica.jpg",
    "description" : "Hottest beach in LA. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    "author" : {
          "id" : ("5d32b48bfd13e359f9d0c591"),
          "username" : "anh"
        },
    "__v" : 0
  },
  {
    "name" : "Cloud's Rest",
    "state" : "Ohio",
    "country" :"United States of America",
    "image" : "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
    "description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duisaute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    "author" :
      { "id" : ("5d32b4b2fd13e359f9d0c593"),
        "username" : "zach"
      },
    "__v" : 0
  },
  {
    "name": "Desert Mesa",
    "state": "Nevada",
    "country": "United States",
    "image": "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
    "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    "author" : {
      "id" : ("5d32b454fd13e359f9d0c58f"),
      "username" : "neel"
    },
    "__v" : 0
  },
  {
    "name": "Canyon Floor",
    "state": "Arizona",
    "country": "United States",
    "image": "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
    "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    "author" : {
          "id" : ("5d32b48bfd13e359f9d0c591"),
          "username" : "anh"
        },
    "__v" : 0
  }
]

function seedDB(){
  // Delete all comments
  Comment.deleteMany({}, (error) => {})
  // Empty current YelpTravel_destinations database
  Destination.deleteMany({}, (error) => {
    if (error)
      console.log("Error when clearing file in seeds.js: " + error)
    else {
      console.log("Database is cleared succesfully")
      // Populate  YelpTravel_destinations database from data list above
      for (var destination of data){
        Destination.create(destination, (error, retDest) => {
            if (error) console.log(error)
            else{
              console.log("Added a Destination.")
              // Create a comment for each post
              Comment.create({
                content: "This place is great, but I wish there was Internet.",
                author: {
                    id : ("5d32b4b2fd13e359f9d0c593"),
                    username: "zach",
                }
              }, (error, retComment)=>{
                if (error) console.log("Error creating new comment in seeds.js: " + error)
                else {
                  retDest.comments.push(retComment)
                  retDest.save()
                  console.log("Create 1 new comment in " + retDest.name)
                }
              })
            }
          })
        }
    }
  })
}

module.exports = seedDB;  // return this function to whatever variable calls require("seeds.js")
