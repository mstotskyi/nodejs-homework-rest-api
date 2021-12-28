import mongoose from 'mongoose';
import { DBMessages } from '../libs/messages';

const { connect, connection } = mongoose;

const uri = process.env.URI_DB;

const db = connect(uri);

connection.on('connected', () => {
  console.log(`${DBMessages.CONNECTED}`);
});

connection.on('err', err => {
  console.log(`${DBMessages.ERR} ${err.message}`);
});

connection.on('disconnected', () => {
  console.log(`${DBMessages.DISCONNECTED}`);
});

process.on('SIGINT', async () => {
  connection.close();
  console.log(`${DBMessages.SIGINT_MSG}`);
  process.exit(1);
});

export default db;
