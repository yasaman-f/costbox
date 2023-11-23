const path = require("path")
const morgan = require("morgan")
const express = require("express")
const error = require("http-errors")
const cooki = require("cookie-parser")
const swaggerJSDoc = require("swagger-jsdoc")
const swaggerUi = require('swagger-ui-express')
const { AllRoutes } = require("./routes/routes")
const { default: mongoose } = require("mongoose")
require("dotenv").config()

const Url = process.env.URL


module.exports = class Aplication{
    #app = express()
    #DB_URI
    #PORT
    constructor(PORT, DB_URI){
        this.#PORT = PORT
        this.#DB_URI = DB_URI
        this.configApplication()
        this.initRedis()
        this.connectToMongoDB()
        this.createRoutes()
        this.createServer()
        this.errorHandller()
    }
    configApplication(){
        this.#app.use(morgan("dev"))
        this.#app.use(express.json())
        this.#app.use(express.urlencoded({ extended: true }))
        this.#app.use(cooki())
        this.#app.use(express.static(path.join(__dirname, "..", "public")))
        this.#app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc({
            swaggerDefinition: {
                openapi: "3.0.0" ,
                info: {
                    title: "costbox",
                    version: "2.0.0",
                    description: "By using this program, you can have more control over your money",
                    contact: {
                        name: "Yasaman",
                        email: "yasi.fani.85@gmail.com",
                        url: "https://t.me/yasaman_Fn"
                    }
                },
                servers: [
                    {
                        url: Url + this.#PORT,
                        
                    }
                ],
            components : {
                securitySchemes : {
                  BearerAuth : {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    
                  }
                }
              },
              security : [{BearerAuth : [] }]
            },
            apis: ["./app/routes/**/*.js"]
        }),
        { explorer: true }
        ));
    }
    connectToMongoDB(){
        mongoose.connect(this.#DB_URI).then(() => {
            console.log("The connection to mongoDB was successful😎");
        }).catch((err) => { console.log('connection to mongoDB failed 😓 '+ err.message);})

        mongoose.connection.on("connected", () => {
            console.log("mongoose connected to the database ..✨");
        })
        mongoose.connection.on("disconnected", () => {
            console.log("mongoose has been disconnected😶");
        })
        process.on("SIGINT", async() => {
            await mongoose.connection.close()
            process.exit(0)
        })
    }
    initRedis(){
        require("./utils/RedisConfig")
    }
    createRoutes(){
        this.#app.use(AllRoutes)
    }
    createServer(){
        const http = require("http")
        http.createServer(this.#app).listen(this.#PORT, () => {
            console.log(Url + this.#PORT)
        })
    }
    errorHandller(){
        this.#app.use((req, res, next) => {
            next(error.NotFound("url not found"))
        })
        this.#app.use((err, req, res, next) => {
            const serverError = error.InternalServerError()
            const statusCode = err.status || serverError.status
            const message = err.message || serverError.message
            return res.status(statusCode).json({
                statusCode,
                message
            })
        })
    }
}