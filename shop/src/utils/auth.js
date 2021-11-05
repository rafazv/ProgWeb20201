const verifyAuth = (req, res, next) => {
    if (req.session.userId) next();
    else res.status(401).json({ messsage: 'Sem autorização' });
}

const isEmpregado = (req, res, next) => {
    if (req.session.tipoUsuario === 'empregado') next();
    else res.status(401).json({ messsage: 'Sem autorização' });
}

module.exports = { verifyAuth, isEmpregado }