import pool from "../db.js";

export const getConvo = (req, res) => {
  
  const client =await pool.connect();
  try {
    const result = await clent.query(text, value);
    res.status(200).json({message: "Conversation is get!!"});
  } catch(err){
    console.log(err);
    res.status(400).json({message: "There seems to be an error!!"});
  }finally{
    client.release();
  }


  return (
    <>
      <div></div>
    </>
  );
};

export const postConvo = (req, res) => {};

export const deleteConvo = (req, res) => {};
