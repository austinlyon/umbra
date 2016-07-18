"use strict"; // eslint-disable-line
const express = require('express');
const app = express();
const server = require('http').Server(app); // eslint-disable-line
const port = process.env.PORT || 3000;
const path = require('path');
const imperio = require('./../../imperioDev/index.js')(server);

/* ----------------------------------
 * -----   Global Middleware   ------
 * ---------------------------------- */

app.use(express.static(path.join(`${__dirname}/../../imperioDev`)));
app.use(express.static(path.join(`${__dirname}/../client`)));

/* ----------------------------------
 * --------      Routes      --------
 * ---------------------------------- */

 // App will serve up different pages for client & desktop
app.get('/', imperio.init(),
  (req, res) => {
    if (req.imperio.isDesktop) {
      res.sendFile(path.join(`${__dirname}/../client/desktop.html`));
    } else {
      if (req.imperio.connected) {
        res.sendFile(path.join(`${__dirname}/../client/mobileConn.html`));
      } else {
        res.sendFile(path.join(`${__dirname}/../client/mobile.html`));
      }
    }
  }
);
// Nonce in URL
app.get('/:nonce', imperio.init(),
  (req, res) => {
    if (req.imperio.isDesktop) {
      res.sendFile(path.join(`${__dirname}/../client/desktop.html`));
    } else {
      if (req.imperio.connected) {
        res.sendFile(path.join(`${__dirname}/../client/mobileConn.html`));
      } else {
        res.sendFile(path.join(`${__dirname}/../client/mobile.html`));
      }
    }
  }
);
// 404 error on invalid endpoint
app.get('*', (req, res) => {
  res.status(404)
     .sendFile(path.join(`${__dirname}/../client/404.html`));
});

/* ----------------------------------
 * --------      Server      --------
 * ---------------------------------- */

server.listen(port, () => {
  console.log(`Listening on port ${port}`); // eslint-disable-line
});
