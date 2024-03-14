import jwt from 'jsonwebtoken';

export function signJsonWebToken(usr) {
  const token = jwt.sign({
    data: usr,
  }, process.env.JWT_SECRET, { expiresIn: '6h' });
  return token;
}

export function getErrorMessage(error) {
  console.log(error);
  const message = error.errors[0];
  return {
    [message.path]: error.original.message,
  };
}