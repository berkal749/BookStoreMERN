import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import { useNavigate  , useParams} from "react-router-dom";
export default function EditBooks() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {id} = useParams();
    useEffect(() => {
        setLoading(true);
        console.log("Book ID:", id);
       axios.get(`http://localhost:5555/books/${id.trim()}`)
            .then((res) => {        
                setAuthor(res.data.author);
                setPublishYear(res.data.publishYear); 
                setTitle(res.data.title);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                alert("Don't choose a book that doesn't exist");
                console.log(error);
            });
    }, []);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    console.log("Editing book with ID:", id);
    axios
      .put(`http://localhost:5555/books/${id.trim()}`, data)
      .then((res) => {
        console.log("GET success:", res.data);
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
  setLoading(false);
  console.error("PUT Error:", error);
  if (error.response) {
    console.error("Response data:", error.response.data);
    console.error("Response status:", error.response.status);
  } else if (error.request) {
    console.error("No response:", error.request);
  } else {
    console.error("Error message:", error.message);
  }
  alert("Error — check console for details");
});

  };
  return (
    <div className="p-4">
      <BackButton></BackButton>
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? <Spinner /> : "ok"}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
        <label className="text-xl mr-4 text-gray-500 ">title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-2 border-gray-500 px-4 py-2 w-full"
        />
        </div>



         <div className="my-4">

        
        <label className="text-xl mr-4 text-gray-500 ">author</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border-2 border-gray-500 px-4 py-2 w-full"
        />
        </div>




         <div className="my-4">

        
        <label className="text-xl mr-4 text-gray-500 ">publish year</label>
        <input
          type="text"
          value={publishYear}
          onChange={(e) => setPublishYear(e.target.value)}
          className="border-2 border-gray-500 px-4 py-2 w-full"
        />
        </div>

        <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook} >
          Save
        </button>
      </div>
    </div>
  );
}
