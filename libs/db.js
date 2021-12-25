import mongoose from 'mongoose';

const { connect, connection } = mongoose;

const uri = process.env.URI_DB;

const db = connect(uri);

connection.on('connected', () => {
  console.log('Database connection successful');
});

connection.on('err', err => {
  console.log(`Database connection error: ${err.message}`);
});

connection.on('disconnected', () => {
  console.log('Database disconnected');
});

process.on('SIGINT', async () => {
  connection.close();
  console.log('Connection DB closed');
  process.exit(1);
});

export default db;
