import pool from "../db.js";
import {useState} from "react";
import { useParams } from "react-router-dom";

const params = useParams();
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

export const postConvo = (req, res) => {

  const client = pool.connect();
  try {
    const result = client.query(text, value);
    res.status(200).json({message:"There conversation is added"})
  } catch(err) {
    console.log(err);
    res.status(400).json({message:"There seems to be an error"})
  } finally{
    client.release();
  }
};

export const deleteConvo = (req, res) => {
  const {convoId} = req.params();

  const client = pool.connect();
  try {
    const result = client.query(text, value);
    res.status(200).json({message: "The conversation has been deleted"})
  } catch (err) {
    console.log(err);
    res.status(400).json({message: "There seens to be an error"});

  } finally {
    client.release();
  }


};
