# tmsf
the microservice framework


## info
this framework can be used to quickly setup and build microservice or self-contained systems


## installation

```bash
$ npm i -S tmsf
```


## example of a service

content of config.js:
```js
const router = require("./handler/router.js");
const models = require("./models");

module.exports = {
    settings: {
        nodeEnv: process.env.NODE_ENV || "development",
        router: router,
        endpoint: {
            host: process.env.NODE_HOST || "localhost",
            port: process.env.NODE_PORT || 3000
        }
    },

    dependencies: {
        mongodb: {
            host: process.env.MONGODB_HOST || "0.0.0.0",
            port: process.env.MONGODB_PORT || 27017,
            name: process.env.MONGODB_NAME || "name",
            models: models
        },
        logger: {
            // path inside container (only used in production)
            // in development mode all logs are written to the console
            folder: "/var/log/app",
            errorLogFile: "error.log",
            accessLogFile: "access.log",
            logRequests: true
        }
    }
}
```


content of index.js:
```js
const TMSF = require("tmsf");
const config = require("./config.js");

const mongodb = new TMSF.MongoDB(config.dependencies.mongodb);
const logger = new TMSF.Logger(config.dependencies.logger);
const dependencies = { mongodb, logger };

const service = new TMSF.Service(config.settings, dependencies);
const server = service.start();
```


content of a simple route handler:
```js
module.exports = (req, res, dependencies) => {

    const { mongodb, logger } = dependencies;
    const { User } = mongodb.getModels();

    const newUser = new User({
        email: "test@test.com",
        password: "password"
    });

    newUser.save( (err) => {
        if (err) logger.error("some db error");
        return res.json({error: false});
    });

}
```
