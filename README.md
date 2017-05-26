# tmsf
the microservice framework


## info
this framework can be used to quickly setup and build microservice or self-contained systems


## installation

```bash
$ npm i -S tmsf
```


## example of a service

content of index.js:
```js
const TMSF = require("tmsf");
const config = require("./config.js");

const mongodb = new TMSF.MongoDB(config.dependencies.mongodb);
const dependencies = { mongodb };
const service = new TMSF.Service(config.settings, dependencies);
const server = service.start();
```

content of a simple route handler:
```js
module.exports = (req, res, dependencies) => {

    const { User } = dependencies.mongodb.getModels();

    const newUser = new User({
        email: "test@test.com",
        password: "password"
    });

    newUser.save( (err) => {
        if (err) console.log("error");
        return res.json({error: false});
    });

}
```
