import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to MERN Stack tut");
});
// middleware for parsing request body
app.use(express.json());

// Route foe save a new book

app.post("/books", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        meassge: "send all require fields: title,author,publishYear",
      });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error.meassge);
    response.status(500).send({ meassge: error.meassge });
  }
});

app.listen(PORT, () => {
  console.log(`APP is working to port ${PORT}`);
});

// route for get all books

app.get("/books", async (req, res) => {
  try {
    const books = await Book.find({});

    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.meassge);
    res.status(500).send({ meassge: error.meassge });
  }
});

// route for get one book from db by id

app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    let id2 = id;

    const book = await Book.findOne({ id2 });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// route update book

app.put("/books/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        meassge: "send all required fields :title , author , publisYear",
      });
    }

   const { id } = req.params;

   let id2 = id;


    const reault = await Book.findIdAndUpdate(id2, req.body);
    if (!reault) {
      return res.status(404).json({ meassge: "Book not found" });
    }

    return res.status(200).json(reault);
  } catch (error) {
    console.log(error.meassge);
  }
});

mongoose
  .connect(mongoDBURL)
  .then((result) => {
    console.log("app connected to database");
  })
  .catch((err) => {
    console.log(error);
  });
