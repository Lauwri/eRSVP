import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { format } from 'date-fns';
import cors from 'cors';

import { Port } from './config';
import router from './routes';

console.log(
  `[${format(
    new Date(),
    'yyyy-MM-dd HH:mm:ss:SS'
  )}] RSVP API starting..`
);

const app = express();
const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(router);

app.listen(Port, () => {
  console.log(
    `[${format(
      new Date(),
      'yyyy-MM-dd HH:mm:ss:SS'
    )}] RSVP API listening on port ${Port}`
  );
});
