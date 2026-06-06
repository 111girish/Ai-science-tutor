import bcrypt from "bcrypt"
import pool from "../db.js"
import getEnv from "../config.js";
import jwt from 'jsonwebtoken';

export const Register = async (req, res) => {
  const {full_name, user_name, password, email} = req.body;

  if (!full_name|| !user_name || !password || !email) return res.send("Something is missing!!");

  const saltRounds = 12;
  const hashed = await bcrypt.hash(password, saltRounds);

  const text = "INSERT INTO users(full_name, user_name, password, email) VALUES ($1, $2, $3, $4) RETURNING * ;"
  const values = [full_name, user_name, hashed, email];

  const client = await pool.connect();
  try {
    const result = await client.query(text, values);
    const data = result.rows[0];
    console.log("Data is saved: ", data);
    res.status(201).json({message: "The user has been registered!!"});

  } catch(err){
    console.log(err);
    res.status(500).json({message: "The user registration has failed!!"});
  } finally{
    client.release();
  }
}

export const Login = async (req, res) => {
  const {user_name, email, password} = req.body;
  if (!user_name|| !email|| !password) return res.send("Something is missing!!");

  const accessToken = getEnv('accessToken');
  const text = 'SELECT * FROM users WHERE user_name = $1';
  const values = [user_name];

  const client = await pool.connect();
  try {
    const result = await client.query(text, values);
    const data = result.rows[0];
    const dataPassword = data.password;
    const dataUser = data.user_name;
    const dataEmail = data.email;
    const userId = data.user_id;

    const compare = await bcrypt.compare(password, dataPassword);

    if (!(user_name === dataUser && compare && email === dataEmail)){
      return res.status(401).json({message: "Either username, password or email don't match!"});
    }

    const payload = {
      user_name: user_name,
      userId: userId
    };
    const secret = `${accessToken}`;
    const token = jwt.sign(payload, secret, {expiresIn: "1h"});
    res.status(200).json({message: "The user is verified!", token});


  }catch (err){
    res.status(500).json({message: "There seems to be an error!!!"});
  }finally{
    client.release();
  }
}