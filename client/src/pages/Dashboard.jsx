import { useEffect, useState } from "react";
// import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { getSubjects } from "../api/subjects";
import { getConversations, postConversations } from "../api/conversations";

// const BASE_URL = import.meta.env.VITE_API_URL;
const Dashboard = () => {
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [selectedSubjectId, setSelectedSubjectId] = useState("");

  const subjectGet = async () => {
    try {
      const response = await getSubjects();
      setSubjects(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const convoGet = async () => {
    try {
      const response = await getConversations();
      setConversations(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    subjectGet();
    convoGet();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSubmit = async () => {
    await postConversations(newTitle, selectedSubjectId);
    await convoGet();
  };

  return (
    <>
      <p>Dashboard page</p>
      <input
        placeholder="new title"
        name="new Title"
        onChange={(e) => {
          setNewTitle(e.target.value);
        }}
      />
      <select
        onChange={(e) => {
          setSelectedSubjectId(e.target.value);
        }}
      >
        {subjects.map((subject) => (
          <option key={subject.subject_id} value={subject.subject_id}>
            {subject.subject}
          </option>
        ))}
      </select>
      <div>
        {conversations.map((conversation) => (
          <div
            key={conversation.conversation_id}
            onClick={() => navigate(`/chat/${conversation.conversation_id}`)}
          >
            <p>{conversation.title}</p>
          </div>
        ))}
      </div>
      
      <button onClick={handleSubmit}>Submit</button>
      <p>{newTitle}</p>
      <button onClick={logout}>Logout</button>
    </>
  );
};

export default Dashboard;
