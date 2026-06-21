import { useEffect } from "react";
import axios from 'axios';
import { getSubjects } from "../api/subjects";

const BASE_URL = import.meta.env.VITE_API_URL;

const Dashboard =() =>{

  useEffect(() => {
    const subjectGet = async () => {
      try{
      const response = await getSubjects();
      return response.data;
      } catch(err){
        console.log(err);
      }
    }
    subjectGet();
  }, [])



  return(
    <>
      <p>Dashboard page</p>
      <input placeholder="conversation title" />
      <select>
        <option>

        </option>
      </select>
    </>
  );
}

export default Dashboard;