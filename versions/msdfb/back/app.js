 const express = require('express');

 const app = express();

 app.use((req, res) => {
   res.json({ message: 'requete reçue'});
 });

 module.exports = app;
