import express from 'express';
import bodyParser from 'body-parser';

import config from './config';

import mongoose from 'mongoose';

mongoose.connect(config['db']['uri']);

const db = mongoose.connection;

const app = express();

import routes from './routes/routes';

app.set('trust proxy', 1);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const allowCrossDomain = (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	// res.header('Access-Control-Allow-Origin', 'http://player.eliminationweek.com');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, x-access-api-key');
	next();
}

app.use(allowCrossDomain);

app.use('/', routes());
app.use((req, res, next) => {
  res.status(404).send('This page you are looking for does not exists');
});

app.listen(config.port);
console.log(`Running server on ${config.base_url}`);
