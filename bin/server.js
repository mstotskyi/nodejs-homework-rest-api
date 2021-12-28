import app from '../app.js';
import db from '../libs/db';
import { ServerMessages } from '../libs/messages';

const PORT = process.env.PORT || 3000;

db.then(() => {
  app.listen(PORT, () => {
    console.log(`${ServerMessages.SERVER_RUNNING} ${PORT}`);
  });
}).catch(err => {
  console.log(`${ServerMessages.SERVER_NOT_RUNNING} ${err.message}`);
});
