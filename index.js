const express = require('express');
const bodyParser = require('body-parser');
const authorsModel = require('./models/author');
const booksModel = require('./models/books');


const app = express();  
app.use(bodyParser.json());
const PORT = 3000;
app.get('/', (_req, res) => res.status(200).send('Hello World 👨‍🚀🚀'));

app.get('/authors', async (_req, res) => {
    try {
    const authors = await authorsModel.getAll();
    res.status(200).json(authors);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

app.get('/authors/:id', async (req, res) => {
    try {
    const { id } = req.params;
    const authors = await authorsModel.getByID(id);
    if(!authors) res.status(404).json({ error: "none results with this params" });
    res.status(200).json(authors);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

app.post('/authors', async (req, res) => {
    try {
      console.log(req.body);
      const { firstName, middleName, lastName, birthday, nationality } = req.body;
      let middle = middleName;
      if (!middleName) {
        middle = null;
      }
      const operation =  await authorsModel.insertNewAuthor({
          firstName,
          middleName: middle,
          lastName,
          birthday,
          nationality,
      });
      res.status(201).json(operation);
    } catch (err) {
      res.status(400).json(err.message);
    }
})

app.get('/books', async (_req, res) => {
    try {
    const books = await booksModel.getAll();
    res.status(200).json(books);
    } catch (err) {
        res.status(400).json(err.message);
    }
})

app.listen(PORT, () => console.log('running on 3000'));