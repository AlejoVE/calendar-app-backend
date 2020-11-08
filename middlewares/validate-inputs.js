const {validationResult} = require('express-validator');

const validateInputs = (req, res, next) => {
    const errors = validationResult(req)

    console.log('Estoy en validae inputs')
    
    
    if(!errors.isEmpty()){
        return  res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }
    
    next();
};

module.exports = {
    validateInputs
};
