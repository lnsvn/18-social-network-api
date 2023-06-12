const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log('\r\n   _____            _       __   _   __     __                      __      ___    ____  ____\r\n  \/ ___\/____  _____(_)___ _\/ \/  \/ | \/ \/__  \/ \/__      ______  _____\/ \/__   \/   |  \/ __ \\\/  _\/\r\n  \\__ \\\/ __ \\\/ ___\/ \/ __ `\/ \/  \/  |\/ \/ _ \\\/ __\/ | \/| \/ \/ __ \\\/ ___\/ \/\/_\/  \/ \/| | \/ \/_\/ \/\/ \/  \r\n ___\/ \/ \/_\/ \/ \/__\/ \/ \/_\/ \/ \/  \/ \/|  \/  __\/ \/_ | |\/ |\/ \/ \/_\/ \/ \/  \/ ,<    \/ ___ |\/ ____\/\/ \/   \r\n\/____\/\\____\/\\___\/_\/\\__,_\/_\/  \/_\/ |_\/\\___\/\\__\/ |__\/|__\/\\____\/_\/  \/_\/|_|  \/_\/  |_\/_\/   \/___\/   \r\n                                                                                             \r\n');
    console.log(`API server running on port ${PORT}!`);
  });
});