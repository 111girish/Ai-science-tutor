import { useEffect, useState } from "react";
// import axios from 'axios';
import { getSubjects } from "../api/subjects";
import { getConversations } from "../api/conversations";

// const BASE_URL = import.meta.env.VITE_API_URL;

const Dashboard =() =>{

  const [subjects, setSubjects] = useState({});
  const [conversations, setConversations] = useState({});

  useEffect(() => {
    const subjectGet = async () => {
      try{
      const response = await getSubjects();
      setSubjects(response.data);
      } catch(err){
        console.log(err);
      }
    }
    const convoGet = async () => {
      try{
        const response = await getConversations();
        setConversations(response.data);
      } catch(err) {
        console.log(err);
      }
    }
    subjectGet();
    convoGet();
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