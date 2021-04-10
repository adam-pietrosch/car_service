require('dotenv').config()
const express = require('express')
const app = express()
const url = require('url')
const mongo = require('mongoose')
const session = require('express-session')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const flash = require('express-flash')
const MongoStore = require('connect-mongo')(session)


// database connection
mongo.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongo.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to the database...'));


// set default properties
app.set('view engine', 'ejs')
app.use(express.static('public')) 
require('./passport')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    }),
    cookie: {
        maxAge: 180 * 60 * 1000
    }
}))
app.use(flash())
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())



// routes
const authRouter = require('./routes/authRouter')
app.use('/auth', authRouter)

const adminRouter = require('./routes/adminRouter')
app.use('/admin', adminRouter)



// handle 404 status
app.use((req, res, next) => { 
    res.status(404)
    res.render('404')
})


// run server
const port = process.env.PORT || 4000
app.listen(port, () => console.log(`server is running on ${port}`))