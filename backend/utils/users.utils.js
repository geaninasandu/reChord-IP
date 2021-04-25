const validator = require('email-validator');

const passwordValidator = (password) => {
    const regex = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|' +
        '((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})');
    return (regex.test(password));
};

const emailValidator = (email) => {
    return validator.validate(email);
};

const fullNameValidator = (fullName) => {
    const regex = new RegExp('^[a-zA-Z -]{3,30}$');
    return regex.test(fullName);
};

const credentialsValidator = ({ email, fullName, password }) => {
    if (!emailValidator(email)) {
        throw new Error('Invalid email!');
    }

    if (!passwordValidator(password)) {
        throw new Error('The password must be at least 6 characters long and contain a combination of letters, ' +
            'numbers and special characters!');
    }

    if (!fullNameValidator(fullName)) {
        throw new Error('The name should only contain letters, spaces and dashes.');
    }
};

module.exports = { emailValidator, credentialsValidator };
