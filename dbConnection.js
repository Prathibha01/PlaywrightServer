// dbConnection.js
import pg from 'pg';
import dbConfig from './dbConfig';

// Create a database connection
const connection = pg.createConnection(dbConfig);

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database');
  }
});

export default connection;