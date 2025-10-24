import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();


// Route foe save a new book

router.post("/change", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishYear",
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
    console.log(error.message);
    res.status(500).send({ message: error.message });
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

// router.get("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     // ✅ check if ID is a valid ObjectId
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: "Invalid book ID format" });
//     }

//     const book = await Book.findById(id);
//     if (!book) {
//       return res.status(404).json({ message: "Book not found" });
//     }

//     return res.status(200).json(book);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send({ message: error.message });
//   }
// });
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("📘 Incoming ID:", id);

    // Validate the ID format first
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("❌ Invalid ObjectId");
      return res.status(400).json({ message: "Invalid book ID format" });
    }

    // Try to find the book
    const book = await Book.findById(id);
    console.log("📗 Book found:", book);

    if (!book) {
      console.log("❌ Book not found");
      return res.status(404).json({ message: "Book not found" });
    }

    // Success
    return res.status(200).json(book);

  } catch (error) {
    console.log("🔥 Error in GET /books/:id -->", error);
    return res.status(500).json({ message: error.message });
  }
});



// route update book

router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "send all required fields :title , author , publishYear",
      });
    }

    const { id } = req.params;

  
    const reault = await Book.findByIdAndUpdate(id, req.body, { new: true });

    console.log(reault);
    if (!reault) {
      return res.status(404).json({ meassge: "Book not found" });
    }

    return res.status(200).json(reault);
  } catch (error) {
    console.log(error.message);
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
