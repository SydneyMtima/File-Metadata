require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const fileUpload = require('express-fileupload');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload());

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

//AN ENDPOINT FOR FILE SUDMISION
app.post('/api/fileanalyse', (req, res) => {
  if (!req.files) {
    return res.status(400).send('No files were uploaded.');
  }
  const file = req.files.upfile;
  const fileDetails = {
    name: file.name,
    type: file.mimetype,
    size: file.size,
  };
  res.json(fileDetails);
}); 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
