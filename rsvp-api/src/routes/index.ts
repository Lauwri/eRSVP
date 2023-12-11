import { Router } from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import config, {
  AnnouncementChannelId,
  AnnouncementTopicId,
  BaseBotUrl,
  BotHTTPToken,
  FormsToken,
  Passphrase,
} from '../config';
import {
  addForm,
  formsArrived,
  getForms,
  countComing,
  getComingListSeparated,
  getTelegrams,
  tgArrived,
  Source,
} from 'rsvp-db';
import fi from '../../static/fi.json';

const router = Router();

router.get('/ping', (req, res, next) => {
  return res.status(200).send('ok');
});

router.post('/login', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === config.AdminName && password === config.AdminPassword) {
    // Generate a JWT token
    const token = jwt.sign({ username }, config.AdminSecret);
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Authentication failed' });
  }
});

router.use('/api', (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, config.AdminSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
  });
});

router.get('/api/getComing', async (req, res, next) => {
  const coming = await getComingListSeparated();
  const flat = [
    ...coming.tg.map((tg) => ({
      id: tg.id,
      arrived: tg.arrived,
      name: tg.name,
      source: Source.TG,
    })),
    ...coming.forms.map((f) => ({
      id: f.id,
      arrived: f.arrived,
      name: f.name,
      source: Source.FORMS,
    })),
    ...coming.custom.map((c) => ({
      id: c.id,
      arrived: c.arrived,
      name: c.name,
      source: Source.CUSTOM,
    })),
  ];

  res.json(flat);
});

router.post('/api/markArrived', async (req, res, next) => {
  const id = req.body.id;
  const arrived = req.body.arrived;
  const source = req.body.source;

  if (source === Source.TG) {
    await tgArrived(id, arrived);
  }
  if (source === Source.FORMS) {
    await formsArrived(id, arrived);
  }

  res.json({ id, source, arrived });
});

router.get('/api/formsEmails', async (req, res) => {
  const emails = await getForms();
  res.json(emails.map((e) => e.email));
});

router.post('/api/sendMessage', async (req, res, next) => {
  const message: string[] = req.body.message;
  const passphrase = req.body.passphrase;

  if (passphrase !== Passphrase) {
    return res.status(401).send();
  }

  const tgUsers = await getTelegrams();
  for (const user of tgUsers) {
    await axios.get(
      `${BaseBotUrl}${BotHTTPToken}/sendMessage?chat_id=${
        user.chatId
      }&parse_mode=Markdown&text=${encodeURIComponent(message.join('\n'))}`
    );
  }

  res.status(200).send();
});

router.post('/forms', async (req, res) => {
  const headers = req.headers['authorization'];
  if (typeof headers !== 'undefined') {
    const token = headers.split(' ')[1];

    if (token !== FormsToken) {
      return res.status(403).send();
    }
  }

  const email = req.body['Email Address'];
  const name = req.body.Nimi;
  await addForm({ email, name, coming: true });
  if (AnnouncementChannelId) {
    const text = `${
      fi.announce_added_forms
    }: ${name}\nyhteensä: ${await countComing()}`;
    const replyTo = AnnouncementTopicId
      ? `&top_msg_id=${AnnouncementTopicId}`
      : '';

    axios.get(
      `${BaseBotUrl}${BotHTTPToken}/sendMessage?chat_id=${AnnouncementChannelId}&parse_mode=Markdown&text=${text}${replyTo}`
    );
  }
  res.send('OK');
});

export default router;
