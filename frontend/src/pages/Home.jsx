import React from "react";
import { useState } from "react";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle, BsTable } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { useEffect } from "react";
import axios from "axios";
import BooksTable from "../../components/home/BooksTable";
import BooksCard from "../../components/home/BooksCard";
export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("c");
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((res) => {
        console.log(res.data.data);
        setBooks(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4">
      <div className="flex  justify-center items-center gap-x-4">
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("table")}
        >
          table
        </button>

        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("card")}
        >
          card
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text=3xl my-8">BooksList</h1>
        <Link
          to="/books/create"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          <MdOutlineAddBox className="inline-block mr-2" />
          Create Book
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books}></BooksCard>
      )}
    </div>
  );
}
