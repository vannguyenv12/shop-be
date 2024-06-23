import express, { Application, NextFunction, Request, Response } from "express";
import appRoutes from "./globals/routes/appRoutes";
import { CustomError, IError, NotFoundException } from "./globals/middlewares/error.middleware";
import { HTTP_STATUS } from "./globals/constants/http";

class Server {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public start(): void {
    this.setupMiddleware();
    this.setupRoutes();
    this.setupGlobalError();
    this.startServer();
  }

  private setupMiddleware(): void {
    this.app.use(express.json()); // req.body
    this.app.use('/images', express.static('images'))
  }

  private setupRoutes(): void {
    appRoutes(this.app);
  }
  private setupGlobalError(): void {
    // Not Found
    this.app.all('*', (req, res, next) => {
      return next(new NotFoundException(`The url ${req.originalUrl} not found`))
    })

    // Global
    this.app.use((error: IError, req: Request, res: Response, next: NextFunction) => {
      console.log('check error: ', error);
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json(error.getErrorResponse());
      }

      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error })
    })
  }

  private startServer() {
    const port = parseInt(process.env.PORT!) || 5050;

    this.app.listen(port, () => {
      console.log(`App listen to port ${port}`)
    })
  }
}

export default Server;