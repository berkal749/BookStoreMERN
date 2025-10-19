import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";

import  booksRoute from './routes/booksRoute.js'

import cors from "cors"

const app = express();

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to MERN Stack tut");
});
app.use('/books',booksRoute);


// middleware for parsing request body
app.use(express.json());
// midlware to handle cors error
// app.use(cors({

//   origin:"http://localhost:5555",
//   methods:['GET','POST','PUT','DELETE'],
//   allowedHeaders:['Content-Type'],
// }));


app.listen(PORT, () => {
  console.log(`APP is working to port ${PORT}`);
});
mongoose
  .connect(mongoDBURL)
  .then((result) => {
    console.log("app connected to database");
  })
  .catch((err) => {
    console.log(error);
  });
