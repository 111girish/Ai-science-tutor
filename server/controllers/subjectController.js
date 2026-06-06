import pool from "../db.js";

export const getSubjects = async (req, res) => {

  const text = 'SELECT * FROM subjects';

  const client = await pool.connect();
  try{
    const result = await client.query(text);
    const data = result.rows;
    res.status(200).json({data});
  } catch(err){
    console.log(err);
    res.status(400).json({message: "The subject couldn't be fetched!!"})
  } finally{ 
    client.release();
  }
  
}