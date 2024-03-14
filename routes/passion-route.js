import passionController from "../controller/passion-controller";

export default function passionRoutes(app) {
  app.post('/create-passion', passionController.createPassion);
}