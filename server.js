const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser'); // Dodaj body-parser do parsowania JSON

const app = express();
const server = http.createServer(app);

// Middleware do parsowania JSON
app.use(bodyParser.json());

// Serwowanie pliku index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serwowanie statycznych plików (np. modeli)
app.use('/models', express.static(path.join(__dirname, 'models')));

// Endpoint do odbierania liczby wykrytych twarzy
app.post('/faceNumber', (req, res) => {
  const { faceNumber } = req.body;
  console.log(`Odebrano liczbę twarzy: ${faceNumber}`);
  
  // Odpowiedź do klienta
  res.status(200).send('Liczba twarzy odebrana pomyślnie');
});

// Start serwera
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
