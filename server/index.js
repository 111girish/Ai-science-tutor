import express from "express";
import getEnv from "./config.js";
import cors from 'cors';

import apiRoutes from "./routes/api.js";

const PORT = getEnv('port');

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}))

app.use('/api', apiRoutes);

app.get("/", (req, res) => (res.send("HELLO FROM THE HOMEPAGE!!! ")));

app.listen(PORT, () => (console.log(`Server Running on PORT : http://localhost:${PORT}`)));
