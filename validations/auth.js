const { body } = require('express-validator');

const registerValidation = [
    body('email', 'реверный емайл').isEmail(),
    body('password', "неверный пароль").isLength({ min: 8 }),
    body('name', "неверное имя").isLength({min:3}),
]

module.exports = { registerValidation };