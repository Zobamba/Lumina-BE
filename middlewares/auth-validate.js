import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

export const createAccountConstraints = [
  body('email')
    .exists()
    .withMessage('email is required')
    .isLength({ min: 1 })
    .withMessage('email is required')
    .isEmail()
    .withMessage('email field must contain a valid email address')
    .trim(),

  body('firstName')
    .exists()
    .withMessage('firstName field is required')
    .isLength({ min: 1 })
    .withMessage('firstName field is required')
    .isString()
    .withMessage('the name must be a string')
    .trim(),

  body('birthday')
    .exists()
    .withMessage('the birthday field is required')
    .custom((value) => new Date(value).toDateString() !== 'Invalid Date')
    .withMessage('the date supplied is not a valid date')
    .trim(),

  body('gender')
    .exists()
    .withMessage('gender field is required')
    .isLength({ min: 1 })
    .withMessage('gender field is required')
    .isIn(['male', 'female'])
    .withMessage('gender must be either "male" or "female"')
    .isString()
    .withMessage('the gender must be a string')
    .trim(),

  body('pic1')
    .exists()
    .withMessage('pic1 field is required')
    .isLength({ min: 1 })
    .withMessage('pic1 field is required')
    .isString()
    .withMessage('the pic1 must be a string')
    .trim(),

  body('pic2')
    .exists()
    .withMessage('pic2 field is required')
    .isLength({ min: 1 })
    .withMessage('pic2 field is required')
    .isString()
    .withMessage('the pic2 must be a string')
    .trim(),

  body('pic3')
    .optional()
    .isLength({ min: 1 })
    .withMessage('pic3 field is required')
    .isString()
    .withMessage('the pic3 must be a string')
    .trim(),

  body('pic4')
    .optional()
    .isLength({ min: 1 })
    .withMessage('pic4 field is required')
    .isString()
    .withMessage('the pic4 must be a string')
    .trim(),

  body('pic5')
    .optional()
    .isLength({ min: 1 })
    .withMessage('pic5 field is required')
    .isString()
    .withMessage('the pic5 must be a string')
    .trim(),

  body('pic6')
    .optional()
    .isLength({ min: 1 })
    .withMessage('pic6 field is required')
    .isString()
    .withMessage('the pic6 must be a string')
    .trim(),

    body('password')
    .exists()
    .withMessage('password is required')
    .bail()
    .isLength({ min: 1 })
    .withMessage('password is required')
    .bail()
    .isLength({ min: 8 })
    .withMessage('password must contain at least 8 characters'),

  body('passwordConfirmation')
    .exists()
    .withMessage('password confirmation is required')
    .bail()
    .isLength({ min: 1 })
    .withMessage('password confirmation is required')
    .bail()
    .custom((value, { req }) => value === req.body.password)
    .withMessage('password confirmation must match password'),

  body('passions')
    .exists()
    .withMessage('the passion_ids field is required')
    .isArray({ min: 4, max: 4 })
    .withMessage('the passions field must be an array with exactly four ids')
];

export const signInConstraints = [
  body('email')
    .exists()
    .withMessage('email is required')
    .isLength({ min: 1 })
    .withMessage('email is required')
    .isEmail()
    .withMessage('email field must contain a valid email address')
    .trim(),

  body('password')
    .exists()
    .withMessage('password is required')
    .isLength({ min: 1 })
    .withMessage('password is required'),
];

export const authSignInConstraints = [
  body('email')
    .exists()
    .withMessage('email is required')
    .isLength({ min: 1 })
    .withMessage('email is required')
    .isEmail()
    .withMessage('email field must contain a valid email address')
    .trim(),

  body('firstName')
    .exists()
    .withMessage('firstName field is required')
    .isLength({ min: 1 })
    .withMessage('firstName field is required')
    .isString()
    .withMessage('the name must be a string')
    .trim(),
];

export const locationConstraints = [
  body('latitude')
    .optional()
    .exists().withMessage('Latitude is required')
    .isFloat({ min: -90, max: 90 }).withMessage('Latitude must be a valid number between -90 and 90'),

  body('longitude')
    .optional()
    .exists().withMessage('Longitude is required')
    .isFloat({ min: -180, max: 180 }).withMessage('Longitude must be a valid number between -180 and 180'),
]

export const validateFormData = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export function verifyAuthToken(req, res, next) {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    const token = bearerHeader.split(' ')[1];
    req.token = token;
    next();
  } else {
    res.status(401).send({
      message: 'You are not authorized to consume this resource. Please sign in',
    });
  }
}

export function validateToken(req, res, next) {
  jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
    if (err) {
      res.status(401).send({
        message: 'You are not authorized to consume this resource. Please sign in',
      });
    } else {
      req.user = authData.data;
      next();
    }
  });
}