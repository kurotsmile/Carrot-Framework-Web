const mysql = require('mysql2/promise');

const connectDB = async () => {
  return await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'test' 
  });
};

const insert_data = async (connection, table, data) => {
  try {
      const columns = Object.keys(JSON.parse(data));
      const vals = Object.values(JSON.parse(data));
      var values = vals.map(v => {
        return `'${v}'`;
      });
      const query = `INSERT INTO \`${table}\` (${columns.join(', ')}) VALUES (${values.join(', ')})`;

      await connection.execute(query, values);
  } catch (error) {
      console.error('Lỗi khi chèn dữ liệu:', error);
  }
};


const add = async (table, data, act_done, act_fail) => {
  try {
      const keys = Object.keys(JSON.parse(data));
      var columns = keys.map(key => {
        return `${key} varchar(50)`;
      });

      const connection = await connectDB();
      
      const [tableCheck] = await connection.execute("SHOW TABLES LIKE '"+table+"'");
      if (tableCheck.length > 0) {
          await insert_data(connection,table,data);
          connection.end();
          act_done({ message: `Table '${table}' created successfully.` });
          return;
      }

      const columnsDefinition =columns.join(', ');
      const query = `CREATE TABLE \`${table}\` (${columnsDefinition})`;
      await connection.execute(query);

      await insert_data(connection,table,data);

      connection.end();
      act_done({ message: `Table '${table}' created successfully.` });
  } catch (error) {
      act_fail(error);
  }
};

const listRows = async (id_collection) => {
  try {
      const connection = await connectDB();
      const [tableCheck] = await connection.execute("SHOW TABLES LIKE '"+id_collection+"'");

      if (tableCheck.length === 0) {
          connection.end();
          return null;
      }

      const [rows] = await connection.execute('SELECT * FROM `' + id_collection + '`');

      connection.end();
      return rows.length > 0 ? rows : [];
  } catch (error) {
      console.error('Lỗi khi truy vấn:', error);
      return null;
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
  listRows,
  add
};
