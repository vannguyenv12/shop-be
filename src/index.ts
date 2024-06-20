import express, { Application } from "express";
import Server from "./server";

class ShopApplication {
  public run(): void {
    const app: Application = express();
    const server: Server = new Server(app);

    server.startServer();
  }
}

const shopApplication: ShopApplication = new ShopApplication();

shopApplication.run();