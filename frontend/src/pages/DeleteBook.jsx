import React,{useState} from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from "axios";
import{useNavigate,useParams} from 'react-router-dom';


export default function DeleteBook() {
  const [loading,setLoading]= useState(false);
  const navigate=useNavigate();
  const {id}= useParams();
  const handleDeleteBook= ()=>{
  setLoading(true);
  axios.delete(`http://localhost:5555/books/${id.trim()}`)
  .then(()=>{

    setLoading(false);
    navigate("/")
  })
.catch((error)=>{

  setLoading(false);
  alert("adreb tla 3la terminal");
  console.log(error);
})


  }

  
  return (
    <div className='p-4'>
   <BackButton></BackButton>
   <h1 className="text-3xl my-4">delete Book</h1>
   {loading?<Spinner />:''}
   <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-{600px} mx-auto"></div>
    <h3 className='text-2xl'> Are You Sure want to prossced</h3>

    <button className='p-4 bg-red-600 text-white m-8 w-full'
    
    onClick={handleDeleteBook}>YESS</button>

    </div>
  ) 
}
