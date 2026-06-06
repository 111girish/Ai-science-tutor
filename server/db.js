import {Pool } from 'pg';
import getEnv from './config.js';

const params = getEnv['dbConnect'];

const pool = new Pool({
  connectionString: params,
})

export default pool;





