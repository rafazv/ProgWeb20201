const verifyAuth = (req, res, next) => {
    if (req.session.userId) next();
    else res.status(401).json({ messsage: 'Sem autorização' });
}

module.exports = { verifyAuth }