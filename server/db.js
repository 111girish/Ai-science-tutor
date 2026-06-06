import {Pool } from 'pg';
import getEnv from './config.js';

const params = getEnv('dbConnect');

const pool = new Pool({
  connectionString: params,
  ssl: {
    rejectUnauthorized: false
  }
})

export default pool;





