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

const update = async (table, data, act_done, act_fail) => {
  try {
    const connection = await connectDB();
    const jsonData = JSON.parse(data);
    const keys = Object.keys(jsonData);
    const values = Object.values(jsonData);
    const id_doc = jsonData.id_doc; 
    const updateQuery = "UPDATE " + table + " SET " + keys.map(key => `${key} = ?`).join(', ') + " WHERE id_doc = ?";
    await connection.execute(updateQuery, [...values, id_doc]);
      connection.end();
      act_done({ message: `Record with id_doc '${id_doc}' updated successfully.` });
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

const get = async (table, id_doc, act_done, act_fail) => {
  try {
      const connection = await connectDB();
      const [rows] = await connection.execute("SELECT * FROM `"+table+"` WHERE `id_doc`= '"+id_doc+"'");
      connection.end();

      if (rows.length === 0) {
          act_done(null);
      } else {
          act_done(rows[0]);
      }
  } catch (error) {
      act_fail(error); 
  }
};

const del = async (table, id_doc, act_done, act_fail) => {
  try {
      const connection = await connectDB();
      const [result] = await connection.execute("DELETE FROM `" + table + "` WHERE `id_doc`= ?", [id_doc]);
      connection.end();
      act_done({ message: `Record with id_doc '${id_doc}' deleted successfully.`, affectedRows: result.affectedRows });
  } catch (error) {
      act_fail(error);
  }
};

const q = (query, params) => {
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
  q,closeConnection,listRows,add,get,insert_data,update,del
};
