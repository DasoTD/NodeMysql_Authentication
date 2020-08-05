const { register, login, getUser ,getUserByUserId, updateUser, deleteUser } = require('./user.controller');
const router = require('express').Router();
const { checkToken } = require('../auth/token_validation');

router.post('/register', register);
router.post('/login', login);
router.get('/users', getUser);
router.get('/user/:id',checkToken, getUserByUserId);
router.patch('/', checkToken, updateUser);
router.delete('/',checkToken, deleteUser)
router.get('/', (req, res) => {
    res.send("server is working ")
});

 module.exports = router;