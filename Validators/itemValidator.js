const Joi = require('joi');

module.exports = (checks, data) => {

    let check = { };
    let checkList = {
        heading: Joi.string().required(),
        discription : Joi.string().min(8).required(),
        
        
        
        
        
    }

    checks.split(' ').forEach(key => {
        let trimmedKey = key.trim();

        if(trimmedKey && checkList[trimmedKey]) {
            check[`${trimmedKey}`] = checkList[`${trimmedKey}`];
        }
    });

    const schema = Joi.object(check);

    const { error } = schema.validate(data);

    if (error) {
        return false;
}
    return true;
}
