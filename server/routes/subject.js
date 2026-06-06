import { Router } from "express";
import authentication from "../middleware/authentication.js";
import { getSubjects } from "../controllers/subjectController.js";

const apiSub = Router();

apiSub.get('/subjects', authentication, getSubjects);

export default apiSub;