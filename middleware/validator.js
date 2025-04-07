const validator = require('../helpers/validate');

const validateUser = async (req, res, next) => {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  };

  const rules = {
    firstName: 'required|string|min:2',
    lastName: 'required|string|min:2',
    email: 'required|email',
    password: 'required|string|min:6',
  };

  const messages = {
    required: 'The :attribute field is required.',
    'email.email': 'The email format is invalid.',
    'password.min': 'Password must be at least 6 characters.',
  };

  await validator(user, rules, messages, (err, status) => {
    if (!status) {
      return res.status(422).json({
        success: false,
        message: 'Validation failed',
        errors: err,
      });
    }
    next();
  });
};

module.exports = validateUser;
