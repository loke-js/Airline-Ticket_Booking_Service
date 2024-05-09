const {StatusCodes} = require('http-status-codes');

class ValidationError extends Error {
    constructor(error){
        let explanation = [];
        
        error.errors.forEach((err) => {
            explanation.push(err.message);
        });
        
        this.name = 'ValidationError';
        this.message = 'NOT able to validate the data sent in the request';
        this.explanation = explanation;
        this.statusCode = statusCodes.BAD_REQUEST;
        super();
    }
}

module.exports = ValidationError;
