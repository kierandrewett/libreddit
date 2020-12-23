const app = require('express')()
const child_process = require("child_process"); 
var requestProxy = require("express-request-proxy");

child_process.spawn("./libreddit", { stdio: "inherit", cwd: process.cwd() }).on("exit", (c) => {
    process.exit(c);
})

app.use((req, res, next) => {
    var p = requestProxy({
        url: `http://localhost:8080${req.path}`,
    })

    p(req, res, next);
})

const port = process.env.PORT || 3000;

app.listen(port)

module.exports = app