import pool from '../db.js';
import askGemini from '../utils/gemini.js';

export const getMessage = async (req, res) => {
  const userId = req.user.userId;
  const {convoId} = req.params;

  const text = "SELECT * FROM messages WHERE conversation_id = $1";
  const value = [convoId];

  const client = await pool.connect();
  try{
    const result = await client.query(text, value);
    const data = result.rows;
    res.status(200).json({message: "The data is returned!!!", data: data});

  } catch (err){
    console.log(err);
    res.status(400).json({message: "There seems to be an error"});
  } finally{
    client.release();
  }

}

export const postMessage = async (req, res) => {
  const userId = req.user.userId;
  const {convoId} = req.params;

  const {userMessage} = req.body;

  const text1 = "SELECT subject_id FROM conversations where conversation_id = $1";
  const value1 = [convoId];
  const client = await pool.connect();
  try {
    const response1 = await client.query(text1, value1);
    const subjectId = response1.rows[0].subject_id;
    const text2 = "SELECT subject FROM subjects WHERE subject_id = $1";
    const response2 = await client.query(text2, [subjectId]);
    const subject = response2.rows[0].subject;
    const text3 = "SELECT content FROM messages WHERE conversation_id = $1 ORDER BY created_at ASC";
    const value3 = [convoId];
    const response3 = await client.query(text3, value3);
    const history = response3.rows;
    const AIresponse = await askGemini(subject, history, userMessage);
    const text4 = "INSERT INTO messages(content, sender, conversation_id) VALUES ($1,$2,$3);";
    const value4 = [userMessage, 'user', convoId];
    const response4 = await client.query(text4, value4);
    const text5 = "INSERT INTO messages(content, sender, conversation_id) VALUES($1, $2, $3);";
    const value5 = [AIresponse, 'ai', convoId];
    const response5 = await client.query(text5, value5);
    res.status(200).json({message:"Ai has sent it's response", data: AIresponse});
  }catch(err){
    console.log(err);
    res.status(400).json({message: "There seems to be an error!!!"})
  } finally{
    client.release();
  }
}