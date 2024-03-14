import userController from "../controller/user-controller";
import UserController from "../controller/user-controller";
import { authSignInConstraints, userUpdateConstraints, locationConstraints, validateFormData, verifyAuthToken, validateToken } from "../middlewares/auth-validate";

export default function userRoutes(app) {
  app.post('/auth-login', authSignInConstraints, validateFormData, UserController.authSignIn);
  app.put('/register', verifyAuthToken, validateToken, userUpdateConstraints, validateFormData, userController.verifyPassions, UserController.updateUser, userController.createUserPassions);
  app.put('/edit-info', verifyAuthToken, validateToken, userUpdateConstraints, validateFormData, userController.verifyPassions, UserController.updateUser, userController.updateUserPassions);
  app.patch('/update-location', verifyAuthToken, validateToken, locationConstraints, validateFormData, UserController.updateLocation);
}