const Controller = require("../MainController")
const Error = require("http-errors")


module.exports = new class Main extends Controller{
    async index(req, res, next){
        try {
            return res.status(200).send("Hi")

        } catch (error) {
            next(Error.BadRequest(error.message))
        }
    }
}