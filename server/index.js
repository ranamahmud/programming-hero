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
    // const usersBookingCollection = client.db(process.env.DB_NAME).collection("userBookings");
    // Event add post request
    app.post('/addActivity', (req, res) => {
        const activity = req.body
        activityCollection.insertOne(activity)
            .then(result => {
                if (result.insertedCount > 0) {
                    res.sendStatus(200)
                } else {
                    result.sendStatus(404)
                }
            })

    })

    // Send all event data

    app.get('/getUserBooking/:email', (req, res) => {
        usersBookingCollection.find({ email: req.params.email })
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

    app.get('/getAllMovies', (req, res) => {
        movieCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

    app.get('/getAllBooking', (req, res) => {
        bookingCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

    app.get('/getBooking', (req, res) => {
        console.log({ req })
        const { selectedDay, selectedTime, movieId, bookedBy } = req.query;
        console.log({ selectedTime })
        bookingCollection.find(
            {
                selectedDay: selectedDay,
                selectedTime: selectedTime,
                movieId: movieId,
                bookedBy: bookedBy
            }
        )
            .toArray((err, documents) => {
                // console.log({ document })
                res.send(documents);
            })
    })




    // app.delete("/booking", (req, res) => {
    //     console.log("id:", req.params.id)

    //     activityCollection.deleteOne({ _id: ObjectId(req.params.id) })
    //         .then((result) => {
    //             console.log(result);
    //             res.send(result.deletedCount > 0)
    //         })
    // })



});


app.listen(port)