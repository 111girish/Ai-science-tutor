import {Router} from 'express'

const apiRoutes = Router();

apiRoutes.get('/health', (req, res) => {
  res.send({status: "OK!! The api fucking works twinn"})
});


export default apiRoutes;