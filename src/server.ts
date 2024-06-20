import express, { Application } from "express";
import appRoutes from "./globals/routes/appRoutes";

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
  }
  
  private setupRoutes(): void {
    appRoutes(this.app);
  }
  private setupGlobalError(): void {}

  private startServer() {
    const port = parseInt(process.env.PORT!) || 5050;

    this.app.listen(port, () => {
      console.log(`App listen to port ${port}`)
    })
  }
}

export default Server;