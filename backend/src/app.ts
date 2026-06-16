import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import { router } from '@/routes';
import { swaggerSpec } from '@/config/swagger';

const app: import("express").Express = express();

app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: false, // required for swagger-ui assets
  })
);
app.use(morgan('dev'));
app.use(compression() as express.RequestHandler);
app.use(express.json());

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1', router);

export default app;
