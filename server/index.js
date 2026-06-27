import express from "express";
import getEnv from "./config.js";
import cors from 'cors';
import pool from "./db.js";


import apiRoutes from "./routes/api.js";
import authRoutes from "./routes/auth.js";
import subjectRoutes from './routes/subjects.js';
import conversationRoutes from './routes/conversations.js';


const PORT = getEnv('port');
const FRONTEND_URL = getEnv('frontendUrl')

const app = express();
app.use(express.json());

app.use(cors({
  origin: `${FRONTEND_URL}`,
  credentials: true
}))

app.use('/api', apiRoutes);
app.use('/api', authRoutes);
app.use('/api/', subjectRoutes);
app.use('/api/', conversationRoutes);

app.get("/", (req, res) => (res.send("HELLO FROM THE HOMEPAGE!!! ")));

app.listen(PORT, () => (console.log(`Server Running on PORT : http://localhost:${PORT}`)));

(async () =>{
  const client = await pool.connect();
try{
  const result = await client.query("SELECT NOW()");
  console.log(result.rows[0]);
} catch(err){
  console.log(err);

} finally{
  client.release();
}
})()