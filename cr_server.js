const express = require('express');
const path = require('path');
const appWeb = express();
const appAPI = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { listRows,add,get,update,del,del_all} =require('./Carrot-Framework-Web/cr_mysql_api');

appWeb.use(express.static(__dirname));
appAPI.use(cors({
  origin: 'http://localhost:3000'
}));
appAPI.use(bodyParser.json());
appAPI.use(bodyParser.urlencoded({ extended: true }));

appWeb.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); 
});

appWeb.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'cms.html')); 
});

appAPI.get('/api/list', async (req, res) => {
  const table = req.query.table;
  if (!table) {return res.status(400).json({ error: 'Table parameter is required' });}
  try {
    const rows = await listRows(table);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

appAPI.post('/api/add', (req, res) => {
  const { table, data } = req.body;

  if (!table || !data) {return res.status(400).json({ error: 'Table and data are required' });}
  add(table, data, 
      (result) => {
          res.json({ message: 'Data inserted successfully', result });
      },(error) => {
          res.status(500).json({ error: 'Failed to insert data', details: error.message });
      }
  );
});

appAPI.post('/api/update', (req, res) => {
  const { table, data } = req.body;

  if (!table || !data) {return res.status(400).json({ error: 'Table and data are required' });}
  update(table, data, 
      (result) => {
          res.json({ message: 'Data updated successfully', result });
      },(error) => {
          res.status(500).json({ error: 'Failed to insert data', details: error.message });
      }
  );
});

appAPI.post('/api/get', (req, res) => {
  const { table, id_doc } = req.body;
  if (!table || !id_doc) {return res.status(400).json({ error: 'Table and id_doc are required' });}
  get(table, id_doc,
      (result) => {
          res.json(result);
      },(error) => {
          res.status(500).json({ error: 'Failed to insert data', details: error.message });
      }
  );
});

appAPI.post('/api/del', (req, res) => {
  const { table, id_doc } = req.body;
  if (!table || !id_doc) {return res.status(400).json({ error: 'Table and id_doc are required' });}
  del(table, id_doc,
      (result) => {
          res.json(result);
      },(error) => {
          res.status(500).json({ error: 'Failed to insert data', details: error.message });
      }
  );
});

appAPI.post('/api/del_all', (req, res) => {
  const { table } = req.body;
  if (!table) {return res.status(400).json({ error: 'Table are required' });}
  del_all(table,
      (result) => {
          res.json(result);
      },(error) => {
          res.status(500).json({ error: 'Failed to insert data', details: error.message });
      }
  );
});


appWeb.listen(3000, () => {
  console.log('Web server running on port 3000');
});

appAPI.listen(3001, () => {
  console.log('API server running on port 3001');
});
