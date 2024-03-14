import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

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

export const userUpdateConstraints = [
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

  body('aboutMe')
    .optional()
    .isLength({ min: 1 })
    .withMessage('aboutMe field is required')
    .isString()
    .withMessage('the aboutMe must be a string')
    .trim(),

  body('jobTitle')
    .optional()
    .isLength({ min: 1 })
    .withMessage('jobTitle field is required')
    .isString()
    .withMessage('the jobTitle must be a string')
    .trim(),

  body('company')
    .optional()
    .isLength({ min: 1 })
    .withMessage('company field is required')
    .isString()
    .withMessage('the company must be a string')
    .trim(),

  body('school')
    .optional()
    .isLength({ min: 1 })
    .withMessage('school field is required')
    .isString()
    .withMessage('the school must be a string')
    .trim(),

  body('livingIn')
    .optional()
    .isLength({ min: 1 })
    .withMessage('livingIn field is required')
    .isString()
    .withMessage('the livingIn must be a string')
    .trim(),

  body('passions')
    .exists()
    .withMessage('the passion_ids field is required')
    .custom((value) => {
      if (!Array.isArray(value) || value.length < 4 || value.length > 4) {
        throw new Error('at least four passions are needed');
      }
      return true;
    })
    .withMessage('the passions field must be an array with four elements')
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