import { env } from '@app/config/environment';

import { execSync } from 'child_process';
import compression from 'compression';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { scheduleJob } from 'node-schedule';
import path from 'path';

import { initApolloGraphqlServer } from './graphql';
import { maintenanceRouter } from './routes/maintenance.routes';

import passport from 'passport';
import './passport';

const app = express();

const startApp = async () => {
  app.use(cors());
  app.use(express.json());
  app.use(compression());
  app.use(passport.initialize());

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  // set path for static assets
  app.use(express.static(path.join(__dirname, 'public')));

  app.get('/', (req, res) => {
    const variables = {
      githubRepositoryUrl: 'https://github.com/cerino-ligutom/Faker-GraphQL-Server',
      zeferinixSiteUrl: 'https://www.zeferinix.com',
      graphqlEndpoint: `http://faker-graphql.zeferinix.com/graphql`
    }
    res.render('index', variables);
  });

  app.use('/api/maintenance', maintenanceRouter);

  initApolloGraphqlServer(app);

  // Reset DB every midnight
  scheduleJob('0 0 * * *', fireDate => {
    // tslint:disable-next-line:no-console
    console.info(`Execute scheduled DB reset @ ${fireDate.toString()}`);
    execSync('npm run seed');
  });

  // Basic error middleware
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    // Log error message in our server's console
    console.error(err.message); //tslint:disable-line

    // All HTTP requests must have a response, so let's send back an error with its status code and message
    res.status(500).send({
      errors: {
        message: env.isProduction ? 'Something went wrong.' : err.message,
        data: env.isProduction ? {} : err
      }
    });
  });

  app.get('*', (req, res) => {
    res.redirect('/');
  });

  app.listen(env.PORT, () => {
    // tslint:disable-next-line:no-console
    console.info(`Server is now up @ ${env.HOST}:${env.PORT}`);
  });
};
startApp();
