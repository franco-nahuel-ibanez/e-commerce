
module.exports = function(req, res, next){
    const admin = req.header('admin');
    if(!admin) return res.status(401).json({error: -1, descripcion: `ruta '${req.path}' método '${req.method}' no autorizada`})
    next();
}