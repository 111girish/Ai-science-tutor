import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSubjects } from "../api/subjects";
import { getConversations, postConversations, deleteConversations } from "../api/conversations";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);

  const fetchConversations = async () => {
    try {
      const response = await getConversations();
      setConversations(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await getSubjects();
        setSubjects(response.data);
        if (response.data.length > 0) {
          setSelectedSubject(response.data[0].subject_id);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchSubjects();
    fetchConversations();
  }, []);

  const handleSubmit = async () => {
    if (!newTitle.trim()) return setError("Please enter a title.");
    setCreating(true);
    setError("");
    try {
      await postConversations(newTitle, selectedSubject);
      setNewTitle("");
      await fetchConversations();
    } catch (err) {
      setError("Failed to create conversation.");
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (e, convoId, convoTitle) => {
    e.stopPropagation();
    const confirmed = window.confirm(`Delete "${convoTitle}"? This cannot be undone.`);
    if (!confirmed) return;
    try {
      await deleteConversations(convoId);
      await fetchConversations();
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Group conversations by subject_id
  const conversationsBySubject = subjects.reduce((acc, subject) => {
    const subjectConvos = conversations.filter(
      (c) => c.subject_id === subject.subject_id
    );
    if (subjectConvos.length > 0) {
      acc[subject.subject_id] = {
        name: subject.subject,
        convos: subjectConvos,
      };
    }
    return acc;
  }, {});

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-logo">⚛ SciTutor</div>
        <button className="logout-btn" onClick={logout}>Sign out</button>
      </header>

      <main className="dashboard-main">
        <section className="new-convo-section">
          <h2 className="section-title">New conversation</h2>
          {error && <p className="dashboard-error">{error}</p>}
          <div className="new-convo-form">
            <input
              className="dashboard-input"
              placeholder="What do you want to explore?"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
            <select
              className="dashboard-select"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              {subjects.map((subject) => (
                <option key={subject.subject_id} value={subject.subject_id}>
                  {subject.subject}
                </option>
              ))}
            </select>
            <button className="create-btn" onClick={handleSubmit} disabled={creating}>
              {creating ? "Creating..." : "Create"}
            </button>
          </div>
        </section>

        <section className="convos-section">
          <h2 className="section-title">Your conversations</h2>
          {Object.keys(conversationsBySubject).length === 0 ? (
            <div className="empty-state">
              <p>No conversations yet.</p>
              <p>Start one above to begin learning.</p>
            </div>
          ) : (
            <div className="subject-groups">
              {Object.values(conversationsBySubject).map((group) => (
                <div key={group.name} className="subject-group">
                  <h3 className="subject-group-title">{group.name}</h3>
                  <div className="convo-list">
                    {group.convos.map((convo) => (
                      <div
                        key={convo.conversation_id}
                        className="convo-card"
                        onClick={() => navigate(`/chat/${convo.conversation_id}`)}
                      >
                        <div className="convo-info">
                          <p className="convo-title">{convo.title}</p>
                        </div>
                        <button
                          className="delete-btn"
                          onClick={(e) => handleDelete(e, convo.conversation_id, convo.title)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;