import { config } from 'dotenv';
config({path: './.env'});

const envVars = {
  port : process.env.PORT || 3000,
  dbConnect : process.env.DB_CONNECT,
  accessToken : process.env.ACCESS_TOKEN,
  frontendUrl : process.env.FRONTEND_URL,
  nodeEnv : process.env.NODE_ENV
}

function getEnv(varName) {
  if(envVars[varName]){
    return envVars[varName];
  } else{
    console.log(`${varName} not found`);
    process.exit(1);
  }

}

export default getEnv;

