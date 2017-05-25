const jwt = require("jsonwebtoken");
let savedSecret;

class AuthProvider {

    constructor(secret) {
        savedSecret = secret;
    }

    requireToken(req, res, next) {
        const token = req.body.token || req.query.token;

        if (token) {

            jwt.verify(token, savedSecret, (err, decoded) => {
                if (err) {

                    res.statusCode = 500;
                    const message = err.message;
                    return res.json({error: true, message});

                } else {

                    req.user = decoded;
                    next();

                }
            });

        } else {

            res.statusCode = 401;
            return res.json({error: true, message: "access token required"});

        }
    }

}

module.exports = AuthProvider;
