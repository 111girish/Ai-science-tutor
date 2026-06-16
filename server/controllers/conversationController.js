import pool from "../db.js";

export const getConvo = async (req, res) => {  
  const userId = req.user.userId;

  const text = 'SELECT * FROM conversations WHERE user_id = $1';
  const value = [userId];


  const client =await pool.connect();
  try {
    const result = await client.query(text, value);
    res.status(200).json({message: "Conversation is get!!",  data: result.rows});
  } catch(err){
    console.log(err);
    res.status(400).json({message: "There seems to be an error!!"});
  }finally{
    client.release();
  }
};

export const postConvo = async (req, res) => {
  const userId = req.user.userId;

  const {subjectId, title} = req.body;

  const text = "INSERT INTO conversations(title, subject_id, user_id) VALUES($1, $2, $3) RETURNING * ;";
  const values = [title, subjectId, userId];

  const client = await pool.connect();
  try {
    const result =await client.query(text, values);
    const data = result.rows[0];
    res.status(200).json({message:"There conversation is added", data});
  } catch(err) {
    console.log(err);
    res.status(400).json({message:"There seems to be an error"})
  } finally{
    client.release();
  }
};

export const deleteConvo = async (req, res) => {
  const {convoId} = req.params;
  const userId = req.user.userId;

  const text = "DELETE FROM conversations WHERE conversation_id = $1 AND user_id = $2";
  const values = [convoId, userId];

  const client =await pool.connect();
  try {
    const result = await client.query(text, values);
    res.status(200).json({message: "The conversation has been deleted"})
  } catch (err) {
    console.log(err);
    res.status(400).json({message: "There seens to be an error"});

  } finally {
    client.release();
  }
};
