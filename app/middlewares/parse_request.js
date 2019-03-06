module.exports = async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET,POST,HEAD,OPTIONS,PUT,DELETE,PATCH");
    await req.on('data', data => { req.body = { ...req.params , ...JSON.parse(data.toString('utf8'))}; });
    next();
}