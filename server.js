const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);


app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.use('/models', express.static(path.join(__dirname, 'models')));

app.post('/faceNumber', (req, res) => {
  const { uniqueFaceCount,pageUrl,timestamp } = req.body;
  console.log(`Odebrano liczbę twarzy: ${uniqueFaceCount}`);
  console.log(`Odebrano strone: ${pageUrl}`);
  console.log(`Odebrano timestamp: ${timestamp}`);
  
  
  res.status(200).send('Liczba twarzy odebrana pomyślnie');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
