const functions = require('firebase-functions');
const express = require('express');
const { Client } = require('pg');
const { getRegions } = require('./src/region/get');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

async function createConnection() {
  const client = new Client({
    user: process.env.PG_USER || functions.config().pg.user,
    host: process.env.PG_HOST || functions.config().pg.host,
    database: process.env.PG_DATABASE || functions.config().pg.database,
    password: process.env.PG_PASSWORD || functions.config().pg.password,
    port: process.env.PG_PORT || functions.config().pg.port,
  });

  try {
    await client.connect();
    console.log('Connected to the PostgreSQL database successfully.');
    return client;
  } catch (err) {
    console.error(`Error connecting to PostgreSQL database: ${err}`);
    return null;
  }
}
app.get('/regions', async (req, res) => {
  const client = await createConnection();
  if (!client) {
    res.status(500).send('Failed to connect to the database.');
    return;
  }

  const regions = await getRegions(client);
  await client.end();

  res.json(regions);
});

app.get('/group', async (req, res) => {
  const client = await createConnection();
  if (!client) {
    res.status(500).send('Failed to connect to the database.');
    return;
  }

  const regions = await getAllGroupsByRegion(client);
  await client.end();

  res.json(regions);
});

exports.api = functions.https.onRequest(app);
