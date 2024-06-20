import { Application } from "express";

class Server {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public startServer() {
    const port = parseInt(process.env.PORT!) || 5050;

    this.app.listen(port, () => {
      console.log(`App listen to port ${port}`)
    })
  }
}

export default Server;