//using routing technique to make cleaner code
const connect = require("express");
//const api = require("./API.js");
const bodyParser = require('body-parser');

const app = connect();

/*app.use("/api",api);
app.use(bodyParser.json());
app.use(connect.json());*/
const api = require("./mongoBuzz");
app.use("/api", api);
app.listen(1001);