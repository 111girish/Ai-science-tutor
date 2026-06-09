import pool from "../db.js";
import {useState} from "react";
import { useParams } from "react-router-dom";

const params = useParams();
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
