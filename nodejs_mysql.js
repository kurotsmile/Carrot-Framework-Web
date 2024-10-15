const mysql = require('mysql2/promise');

const connectDB = async () => {
  return await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'test' 
  });
};

const listRows = async (id_collection) => {
  try {
      const connection = await connectDB();
      const [rows] = await connection.execute('SELECT * FROM `'+id_collection+'`');
      connection.end();
      return rows;
  } catch (error) {
      console.error('Lỗi khi truy vấn:', error);
  }
};

const executeQuery = (query, params) => {
  return new Promise((resolve, reject) => {
    pool.query(query, params, (error, results) => {
      if (error) { return reject(error);}
      resolve(results);
    });
  });
};


const closeConnection = () => {
  return new Promise((resolve, reject) => {
    pool.end((err) => {
      if (err) { return reject(err); }
      resolve();
    });
  });
};

module.exports = {
  executeQuery,
  closeConnection,
  listRows
};
