import jwt from 'jsonwebtoken';
import getEnv from '../config.js';


const authentication = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) return res.status(401).json({message: "Authentication failed!!"});

  const token = authHeader.split(' ')[1] || '';
  const secret = getEnv('accessToken');

  try{
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } 
  catch(err) {

    console.log(err);
    res.status(401).json({message: "Authentication failed"});
  } 
}

export default authentication;

