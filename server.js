const express = require("express")
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const { mySqlPool } = require("./config/db");
const cors = require('cors')

dotenv.config();
app.use(cors())

app.use(express.json())
app.use(morgan("dev"))

const port = process.env.port || 8000;

app.use("/api/v1/students", require("./routes/studentRoutes"))

app.use("/api/get-user/", require('./routes/userRoutes'))

mySqlPool.query("SELECT 1").then(()=>{
    console.log("MYSQL is Connected ...!!")
    app.listen(port, ()=>{
        console.log(`Express project is running on port: ${port}`)
    })

}).catch((error) => {
    console.log(error)
})
