import { mkdir } from 'fs/promises';
import app from '../app.js';
import db from '../libs/db';
import { ServerMessages } from '../libs/messages';

const PORT = process.env.PORT || 3000;

db.then(() => {
  app.listen(PORT, async () => {
    await mkdir(process.env.UPLOAD_DIR, { recursive: true });
    console.log(`${ServerMessages.SERVER_RUNNING} ${PORT}`);
  });
}).catch(err => {
  console.log(`${ServerMessages.SERVER_NOT_RUNNING} ${err.message}`);
});
