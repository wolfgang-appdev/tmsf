const fs = require("fs");
const path = require("path");
const env = process.env.NODE_ENV;
const isEnvDevelopment = env === "development";
const isEnvProduction = env === "production";

class Logger {

    constructor(config) {
        this.config = config;
        this.errorLogPath = path.resolve(config.folder, config.errorLogFile);
        this.accessLogPath = path.resolve(config.folder, config.accessLogFile);
        this.errorWriteStream = null;
        this.accessWriteStream = null;
        this.accessLogMiddleware = this.accessLogMiddleware.bind(this);
    }

    error(line) {
        this.log("ERROR", line);
    }

    warn(line) {
        this.log("WARNING", line);
    }

    info(line) {
        this.log("INFO", line);
    }

    log(level, line) {
        let logLine = `[${new Date()}] [${level}] ${line}\n`;

        if (isEnvDevelopment) {

            console.log(logLine);

        } else if (isEnvProduction) {

            if (!this.errorWriteStream) {
                this.errorWriteStream = fs.createWriteStream(this.errorLogPath, {flags: "a"});
            }

            this.errorWriteStream.write(logLine, "utf8");

        }
    }

    accessLogMiddleware(req, res, next) {
        const { logRequests } = this.config;
        const { ip, method, originalUrl } = req;
        let logLine = `[${new Date()}] [${method}] ${ip} ${originalUrl}\n`;

        if (logRequests) {
            if (isEnvDevelopment) {

                console.log(logLine);

            } else if (isEnvProduction) {

                if (!this.accessWriteStream) {
                    this.accessWriteStream = fs.createWriteStream(this.accessLogPath, {flags: "a"});
                }

                this.accessWriteStream.write(logLine, "utf8");

            }
        }

        next();
    }

}

module.exports = Logger;
