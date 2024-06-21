import { Application } from "express";
import authRoute from "~/features/user/route/auth.route";
import userRoute from "~/features/user/route/user.route";

const appRoutes = (app: Application) => {
  app.use('/api/v1/users', userRoute);
  app.use('/api/v1/auth', authRoute);
}

export default appRoutes;