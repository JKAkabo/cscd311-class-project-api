const jwt = require('jsonwebtoken');

protectRoute = () => {
    return (req, res, next) => {
    const token = req.headers['access-token'];

    if (!token) {
        res.status(500).json({error: 'Access Token is required'});
    }
    jwt.verify(token, '12345', (err, decodedToken) => {
        if (err) return {error: 'Access Token is invalid'}

        req.decodedToken = decodedToken;
        next();
    })
}
}


module.exports = {
    protectRoute,
}