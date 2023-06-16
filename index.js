const express = require('express')
const app = express()
const dotenv = require("dotenv")
dotenv.config({ path: './config.env' })
const port = process.env.PORT
const mongoDB = require("./db")
    // const path = require('path')

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://gofoodapp.netlify.app");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

mongoDB();

// app.use(express.static(path.join(__dirname, './client/build')))

// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname, "./client/build/index.html"));
// })

// app.use(express.json());

app.use('/api', require("./Routes/CreatUser"));

app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})