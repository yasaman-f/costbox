const Application = require("./app/server")
const dotenv = require("dotenv")
const path = require("path")

dotenv.config()

const port = process.env.PORT
const mongoDB = process.env.MONGODB_URL


new Application(port, mongoDB)
