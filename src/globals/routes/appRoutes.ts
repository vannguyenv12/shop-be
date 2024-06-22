import { Application } from "express";
import categoryRoute from "~/features/category/route/category.route";
import productImagesRoute from "~/features/product-images/route/product-images.route";
import productRoute from "~/features/product/route/product.route";
import authRoute from "~/features/user/route/auth.route";
import userRoute from "~/features/user/route/user.route";

const appRoutes = (app: Application) => {
  app.use('/api/v1/users', userRoute);
  app.use('/api/v1/auth', authRoute);
  app.use('/api/v1/categories', categoryRoute);
  app.use('/api/v1/products', productRoute);
  app.use('/api/v1/product-images', productImagesRoute);

}

export default appRoutes;