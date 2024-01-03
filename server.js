import express from 'express';
import cors from 'cors';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import bodyParser from 'body-parser';
import pg from 'pg';
// import pkg from 'pg';
// import { Pool } from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 8000;

// Enable CORS
app.use(cors());
app.use(express.json());

const server = http.createServer(app);  // Create an HTTP server

app.use(bodyParser.json());

// Set up PostgreSQL connection pool
const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'Prathi01',
  port: 5432,
});

// Function to get Playwright scripts from a directory and its subdirectories
function getPlaywrightScripts(directory) {
    const entries = fs.readdirSync(directory, { withFileTypes: true });
  
    const files = entries
      .filter((entry) => entry.isFile() && entry.name.endsWith('.spec.js'))
      .map((entry) => entry.name);
  
    const subdirectories = entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => ({
        directory: entry.name,
        files: fs.readdirSync(path.join(directory, entry.name))
          .filter((file) => file.endsWith('.spec.js')),
      }));
      console.log('Files in directory:', files);
    return { files, subdirectories };
  }

// API endpoint to get Playwright scripts
app.get('/get-playwright-scripts', (req, res) => {
  // Assuming your scripts are in the 'scripts' directory, adjust the path accordingly
  const scriptDirectory = path.join(process.cwd(), 'tests');
  const playwrightScripts = getPlaywrightScripts(scriptDirectory);
  res.json(playwrightScripts);
});

// Utility function to execute SQL queries
const executeQuery = async (query, values = []) => {
  try {
    const result = await pool.query(query, values);
    return { success: true, data: result.rows };
  } catch (error) {
    console.error('Database error:', error);
    return { success: false, error: 'Database error' };
  }
};

// Utility function to insert a new row into Execution_Progress table
const insertExecutionProgress = async (scriptName, status) => {
  //const uuid = uuidv4(); // Generate a new UUID
  //console.log('scriptname:', scriptName, 'status:', status);
  //const query = 'INSERT INTO Execution_Progress (script_name, status, uuid) VALUES ($1, $2, $3) RETURNING id';
 const query = 'INSERT INTO Execution_Progress (script_name, status) VALUES ($1, $2) RETURNING id';
  const values = [scriptName, status];
  return await executeQuery(query, values);
};

// Utility function to update the status of a specific execution
const updateExecutionStatus = async (executionId, status) => {
      console.log('Updating status:', status, 'for execution ID:', executionId);
  const query = 'UPDATE Execution_Progress SET status = $1 WHERE id = $2';
  const values = [status, executionId];
  return await executeQuery(query, values);
};

// API endpoint to run the Playwright script
// app.post('/execute-playwright-script', async (req, res) => {
//   const selectedScript = req.body.selectedScript;

//   if (!selectedScript) {
//     res.status(400).send('No script selected.');
//     return res.status(400).json({ success: false, error: 'No script selected.' });
//   }

//   try {
//     // Insert a new row with status "Started"
//     const insertResult = await insertExecutionProgress(selectedScript, 'Started');
//     const executionId = insertResult.data[0].id;

//     //notify the frontend
//     // Update the status to "In Progress"
//     await updateExecutionStatus(executionId, 'In Progress');

//     // Construct the command to run the selected script
//     const command = `npx playwright test ${selectedScript}`;

//     const childProcess = exec(command, async (error, stdout, stderr) => {
//       // Update the row's status based on the outcome
//       const status = error ? 'Failed' : 'Passed';
//       await updateExecutionStatus(executionId, status);

//       if (error) {
//         console.error(`Error executing Playwright script: ${error}`);
//         return res.status(500).send('Internal Server Error');
//       } else {
//         console.log(`Playwright script executed successfully:\n${stdout}`);
//         return res.status(200).send('Playwright script executed successfully');
//       }
//     });

//     childProcess.stderr.on('data', (data) => {
//       console.error(`stderr: ${data}`);
//     });
//   } catch (error) {
//     console.error('Error communicating with the database:', error);
//     return res.status(500).json({ success: false, error: 'Internal Server Error' });
//   }
// });

// API endpoint to run the Playwright script
app.post('/execute-playwright-script', async (req, res) => {
  const selectedScript = req.body.selectedScript;

  if (!selectedScript) {
    res.status(400).send('No script selected.');
    return res.status(400).json({ success: false, error: 'No script selected.' });
  }

  try {
    // Insert a new row with status "Started" and UUID
    const insertResult = await insertExecutionProgress(selectedScript, 'Started');
    const executionId = insertResult.data[0].id;
    //const executionUuid = insertResult.data[0].uuid;

    // Notify the frontend with UUID
    res.status(200).json({ success: true, executionId });

    // Update the status to "In Progress"
    await updateExecutionStatus(executionId, 'In Progress');

    // Construct the command to run the selected script
    const command = `npx playwright test ${selectedScript}`;

    const childProcess = exec(command, async (error, stdout, stderr) => {
      // Update the row's status based on the outcome
      const status = error ? 'Failed' : 'Passed';
      await updateExecutionStatus(executionId, status);
    });

    childProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
  } catch (error) {
    console.error('Error communicating with the database:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


// API endpoint to run all Playwright scripts
app.post('/execute-all-playwright-scripts', async (req, res) => {
  
  const command = `npm test`;
   const childProcess = exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Playwright scripts: ${error}`);
      return res.status(500).send('Internal Server Error');
    } else {
      console.log(`Playwright scripts executed successfully:\n${stdout}`);
      return res.status(200).send('Playwright scripts executed successfully');
    }
  });

  childProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
});

// enpoint to get the status when Execution starts when I click Run
// 
// Add this route to your server code
// app.get('/get-latest-execution-status', async (req, res) => {
//   const scriptName = req.params.scriptName;

//   try {
//     // Fetch the latest execution status from the database
//     const query = 'SELECT status FROM Execution_Progress WHERE script_name = $1 ORDER BY id DESC LIMIT 1';
//     const result = await pool.query(query, [scriptName]);

//     if (result.rows.length > 0) {
//       const latestStatus = result.rows[0].status;
//       res.json({ success: true, status: latestStatus });
//     } else {
//       res.json({ success: false, error: 'No status found for the script.' });
//     }
//   } catch (error) {
//     console.error('Error fetching latest execution status:', error);
//     res.status(500).json({ success: false, error: 'Internal Server Error' });
//   }
// });

// New endpoint to get execution status
app.get('/get-execution-status/:uuid', async (req, res) => {
  const uuid = req.params.uuid;

  try {
    // Get the status based on the UUID
    const status = await getExecutionStatusByUuid(uuid);

    res.status(200).json({ success: true, status });
  } catch (error) {
    console.error('Error communicating with the database:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// Utility function to get the status of a specific execution
const getExecutionStatusByUuid = async (executionId) => {
  const query = 'SELECT status FROM Execution_Progress WHERE id = $1';
  const values = [executionId];
  return await executeQuery(query, values);
};

// Serve HTML reports from the 'playwright-reports' directory
app.use('/playwright-report', express.static('playwright-report'));

// Serve the index.html file
app.get('/playwright-report/index.html', (req, res) => {
  const indexPath = path.join(__dirname, 'playwright-report', 'index.html');
  res.sendFile(indexPath);
});

// API endpoint to list files in the 'custom-reports' directory
app.get('/list-custom-reports', (req, res) => {
  const folderPath = path.join(__dirname, 'custom-reports');
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      res.status(500).send('Internal Server Error');
    } else {
      // Create clickable links for each folder
      const folderLinks = files.map((folder) => ({
        folder,
        link: `http://localhost:3000/list-custom-reports/${folder}`,
        // link: `http://localhost:3000/all/custom-reports/${folder}`,
      }));

      // Send the list of clickable folder links as JSON
      res.json({ folders: folderLinks });
    }
  });
});

// // New API endpoint to fetch individual files
app.get('/open-reports', async (req, res) => {
  const fileName = req.params.file;
  const filePath = path.join(__dirname, 'custom-reports', fileName);

  try {
    const data = await fs.readFile(filePath, 'utf8');
    // Send the file content as JSON
    res.json({ content: data });
  } catch (err) {
    console.error('Error reading file:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Handle default route with a simple response
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
