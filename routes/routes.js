import userRoutes from './user-routes'
import passionRoutes from './passion-route';

export default function routes(app) {
  userRoutes(app);
  passionRoutes(app);
}