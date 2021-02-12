import express, { Express } from 'express';
import http from 'http';
import debug from 'debug';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client'
import * as reactViews from 'express-react-views';

const PORT = 3333;
const log = debug('application');
const app = <Express>express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('views', __dirname + '/views');
app.set('view engine', 'tsx');
app.engine('tsx', reactViews.createEngine());

app.get('/', (req, res) => {
  res.render('pages/home', {
    name: 'Araya'
  })
})

const server = <http.Server>app.listen(PORT, () => log('> Server on', PORT));
