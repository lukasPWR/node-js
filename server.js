const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('/models', express.static(path.join(__dirname, 'models')));

app.post('/saveFaceData', (req, res) => {
  const data = req.body;
  const filePath = path.join(__dirname, 'faceData.json');
  fs.appendFile(filePath, JSON.stringify(data) + '\n', (err) => {
    if (err) {
      console.error('Błąd zapisu do pliku faceData.json:', err);
      res.status(500).send('Błąd zapisu do pliku');
    } else {
      console.log('Dane wykrycia twarzy zapisane do faceData.json');
      res.status(200).send('Dane wykrycia twarzy zapisane pomyślnie');
    }
  });
});

app.post('/saveFormData', (req, res) => {
  const data = req.body;
  const filePath = path.join(__dirname, 'formData.json');
  fs.appendFile(filePath, JSON.stringify(data) + '\n', (err) => {
    if (err) {
      console.error('Błąd zapisu do pliku formData.json:', err);
      res.status(500).send('Błąd zapisu do pliku');
    } else {
      console.log('Dane formularza zapisane do formData.json');
      res.status(200).send('Dane formularza zapisane pomyślnie');
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
