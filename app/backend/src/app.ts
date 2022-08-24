import * as express from 'express';
import userRoutes from './routes/user.routes';
import teamRoutes from './routes/team.routes';
import matchRoutes from './routes/match.routes';
import leaderboardRoutes from './routes/leaderboard.routes';
import errorMiddleware from './middleware/error.middleware';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    // rotas
    this.app.use(userRoutes);
    this.app.use(teamRoutes);
    this.app.use(matchRoutes);
    this.app.use(leaderboardRoutes);
    this.app.use(errorMiddleware);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
