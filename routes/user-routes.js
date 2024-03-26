import userController from "../controller/user-controller";
import UserController from "../controller/user-controller";
import { createAccountConstraints, signInConstraints, authSignInConstraints, locationConstraints, validateFormData, verifyAuthToken, validateToken } from "../middlewares/auth-validate";

export default function userRoutes(app) {
  app.post('/create-account',createAccountConstraints, validateFormData, userController.verifyPassions, UserController.createUser, userController.createUserPassions);
  app.post('/sign-in', signInConstraints, validateFormData, UserController.signIn);
  app.post('/auth-login', authSignInConstraints, validateFormData, UserController.authSignIn);
  // app.put('/edit-info', verifyAuthToken, validateToken, userUpdateConstraints, validateFormData, userController.verifyPassions, UserController.updateUser, userController.updateUserPassions);
  app.patch('/update-location', verifyAuthToken, validateToken, locationConstraints, validateFormData, UserController.updateLocation);
}