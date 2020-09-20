let express = require('express');
path = require('path');
mongoose = require('mongoose');
cors = require('cors');
bodyParser = require('body-parser');
const http = require("http");
const userRoute = require('./routes/userRoute');
const movieRoute = require('./routes/moviesRoute')
const fileUploadRoute = require('./routes/fileUpload')
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useFindAndModify: false
}).then(() => {
    console.log('Database connected sucessfully ')
},
    error => {
        console.log('Could not connected to database : ' + error)
    }
)

const app = express();
app.use(bodyParser.json());
app.use("/images", express.static(path.join("images")));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());
app.use('/api/user', userRoute);
app.use('/api/movie', movieRoute);
app.use('/api/file', fileUploadRoute);


// PORT

const normalizePort = val => {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
};
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});
const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;

};
const port = normalizePort(process.env.PORT || "5000");

app.set('port', process.env.PORT || port);
app.set('host', process.env.HOST || '0.0.0.0');
var server = null;
server = http.createServer(app);
server.on("listening", onListening);
server.listen(port, () => console.info(`Server has started on ${port}`));





// error handler
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});

module.exports = app;