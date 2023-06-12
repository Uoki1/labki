const {body} = require('express-validator');

const CheckUser = [
    body('email', 'Неправильно вказаний email').isEmail(),
    body('password', 'Довжтина пароля повинна становити мінімум 8 симолів').isLength({min: 8}) 
]

module.exports =  {CheckUser};