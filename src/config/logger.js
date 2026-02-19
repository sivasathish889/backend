const fs = require("fs");
const path = require("path");

const Logger = (req, res, next) => {
    try {
        const date = new Date()
        const time = date.toLocaleDateString() + " -- " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
        const log = `${time} --  ${req.method} -- ${req.originalUrl}  ${res.statusCode} `
        console.log(log)

        const logsDir = path.join(process.cwd(), "src", "logs")
        const logFilePath = path.join(logsDir, "log.txt")

        if (!fs.existsSync(logsDir)) {
            fs.mkdirSync(logsDir, { recursive: true })
        }

        fs.appendFile(logFilePath, log + "\n", err => {
            if (err) console.error("Logger Error:", err.message)
        })
    } catch (error) {
        console.error("Logger Middleware Error:", error)
    }
    next()
}

module.exports = Logger;