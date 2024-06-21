import { Application } from "express";
import categoryRoute from "~/features/category/route/category.route";
import authRoute from "~/features/user/route/auth.route";
import userRoute from "~/features/user/route/user.route";

const appRoutes = (app: Application) => {
  app.use('/api/v1/users', userRoute);
  app.use('/api/v1/auth', authRoute);
  app.use('/api/v1/categories', categoryRoute);
}

export default appRoutes;