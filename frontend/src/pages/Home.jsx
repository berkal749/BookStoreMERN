import React from "react";
import { useState } from "react";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle, BsTable } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { useEffect } from "react";
import axios from "axios";
export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  });
  return (
    <div className="p-4">
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
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">no</th>
              <th className="border border-slate-600 rounded-md">title</th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                title
              </th>
              Author
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Publish Year
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Operation
              </th>
            </tr>
          </thead>

          <tbody>
            {books.map((book, index) => (
              <tr key={book._id} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {book.title}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {book.author}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {book.publishYear}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                    <div>
                        <Link></Link>
                    </div>
                
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
