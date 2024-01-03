import { readdir, mkdir, copyFile,unlink } from 'fs/promises';
import { join } from 'path';
const maxFileCount = 30;
import fs from 'fs';

async function copyReport() {
  const sourcePath = 'playwright-report'; // Default location of Playwright report
  const destinationFolder = 'custom-reports';

  try {
    // Ensure the destination folder exists
    await mkdir(destinationFolder, { recursive: true });

    // Get the current timestamp
    const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/T/g, '_').split('.')[0];

    // Build the destination filename with a timestamp
    const destinationFilename = `report_${timestamp}.html`;

    // Copy the HTML report to the destination folder with the unique filename
    await copyFile(join(sourcePath, 'index.html'), join(destinationFolder, destinationFilename));
    console.log(`Report copied to: ${join(destinationFolder, destinationFilename)}`);

    // Copy all files from the 'data' folder to the destination folder
    const dataFolder = join(sourcePath, 'data');
    const filesInDataFolder = await readdir(dataFolder);
    

    for (const file of filesInDataFolder) {
      const timestampedFilename = `${timestamp}_${file}`;
      await copyFile(join(dataFolder, file), join(destinationFolder, timestampedFilename));
      console.log(`File copied to: ${join(destinationFolder, timestampedFilename)}`);
    }
    await deleteOlderFiles(destinationFolder, maxFileCount);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

async function deleteOlderFiles(folder, maxFileCount) {
  const filesInFolder = await readdir(folder)
;

  // Sort files by modification time in descending order
  const sortedFiles = filesInFolder
    .map(file => ({ file, mtime: (fs.statSync(join(folder, file)).mtime) }))
    .sort((a, b) => b.mtime - a.mtime);

  // Delete files beyond the maximum count
  const filesToDelete = sortedFiles.slice(maxFileCount);
  for (const { file } of filesToDelete) {
    await unlink(join(folder, file));
    console.log(`Deleted old file: ${join(folder, file)}`);
  }
}

copyReport();










// import { readdir, mkdir, copyFile } from 'fs/promises';
// import { join } from 'path';

// async function copyReport() {
//   const sourcePath = 'playwright-report'; // Default location of Playwright report
//   const destinationFolder = 'custom-reports';

//   try {
//     // Ensure the destination folder exists
//     await mkdir(destinationFolder, { recursive: true });

//     // Get the current timestamp
//     const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/T/g, '_').split('.')[0];

//     // Build the destination filename with a timestamp
//     const destinationFilename = `report_${timestamp}.html`;

//     // Copy the HTML report to the destination folder with the unique filename
//     await copyFile(join(sourcePath, 'index.html'), join(destinationFolder, destinationFilename));
//     console.log(`Report copied to: ${join(destinationFolder, destinationFilename)}`);

//     // Copy all files from the 'data' folder to the destination folder
//     const dataFolder = join(sourcePath, 'data');
//     const filesInDataFolder = await readdir(dataFolder);

//     for (const file of filesInDataFolder) {
//       await copyFile(join(dataFolder, file), join(destinationFolder, file));
//       console.log(`File copied to: ${join(destinationFolder, file)}`);
//     }
//   } catch (error) {
//     console.error('Error:', error.message);
//     process.exit(1);
//   }
// }

// copyReport();