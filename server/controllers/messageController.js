import pool from '../db.js';

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

  const text1 = "SELECT * FROM conversations "
}