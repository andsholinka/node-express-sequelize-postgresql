const express = require("express");
const logger = require('morgan');
const cors = require("cors");
const config = require('dotenv').config();
const app = express();

app.use(cors());
app.use(logger('dev'));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
    extended: true
}));

//default error
app.use((err, req, res, next) => {
    res.send(err.message)
})

const db = require("./app/models");
db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({
//     force: true
// }).then(() => {
//     console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to respecker application."
    });
});

require("./app/routes/turorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});