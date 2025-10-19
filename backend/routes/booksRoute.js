import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();


// Route foe save a new book

router.post("/", async (req, res) => {
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

// route for get all books

router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});

    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.meassge);
    res.status(500).send({ meassge: error.meassge });
  }
});

// route for get one book from db by id

router.get("/books/:id", async (req, res) => {
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

router.put("/books/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        meassge: "send all required fields :title , author , publisYear",
      });
    }

    const { id } = req.params;

    let id2 = id;

    console.log(id);
    const reault = await Book.findByIdAndUpdate(id, req.body, { new: true });

    console.log(reault);
    if (!reault) {
      return res.status(404).json({ meassge: "Book not found" });
    }

    return res.status(200).json(reault);
  } catch (error) {
    console.log(error.meassge);
  }
});

router.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status.routerly(404).json({ message: "book not found" });
    }
    return res.status(200).send({ meassge: "book deleted succesfly" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.meassge });
  }
});
export default router;
