const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jbp81.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`


const app = express()
app.use(bodyParser.json())

app.use(cors())

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })



app.use(urlencodedParser)


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });




app.get('/', (req, res) => {
    res.send("Hello Working db")
})

client.connect(err => {
    console.log("connected to db")
    const movieCollection = client.db(process.env.DB_NAME).collection("cinemas");
    const bookingCollection = client.db(process.env.DB_NAME).collection("bookings");
    // Event add post request
    app.post('/addBooking', (req, res) => {
        console.log(req.query)
        const { selectedDay, selectedTime, movieId, bookedBy, seat, color } = req.query;
        const booking = {
            selectedDay, selectedTime,

            "movieId": movieId,
            "bookedBy": bookedBy,
            "seat": seat,
            "color": color
        };
        console.log(booking)
        bookingCollection.insertOne(booking)
            .then(result => {
                if (result.insertedCount > 0) {
                    res.sendStatus(200)
                } else {
                    result.sendStatus(404)
                }
            })

    })

    // get movies from database
    app.get('/getAllMovies', (req, res) => {
        movieCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

    // get booking from database
    app.get('/getBooking', (req, res) => {
        const { selectedDay, selectedTime, movieId, bookedBy } = req.query;
        bookingCollection.find(
            {
                selectedDay: selectedDay,
                selectedTime: selectedTime,
                movieId: movieId,
                // bookedBy: bookedBy
            }
        )
            .toArray((err, documents) => {
                res.send(documents);
            })
    })


});


app.listen(port)