import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Directory containing the final video files
const finalsDir = path.join(__dirname, 'finals');

// Output file for the probe results
const outputFile = path.join(__dirname, 'probeResults.json');

const probeVideo = (filePath) => {
    return new Promise((resolve, reject) => {
        exec(`ffprobe -v quiet -print_format json -show_format -show_streams "${filePath}"`, (err, stdout, stderr) => {
            if (err) {
                reject(`Error probing ${filePath}: ${stderr}`);
            } else {
                resolve({ filePath, metadata: JSON.parse(stdout) });
            }
        });
    });
};

const probeAllVideos = async () => {
    try {
        const files = fs.readdirSync(finalsDir);
        const videoFiles = files.filter(file => path.extname(file) === '.mp4');
        const probePromises = videoFiles.map(file => probeVideo(path.join(finalsDir, file)));

        const results = await Promise.all(probePromises);
        fs.writeFileSync(outputFile, JSON.stringify(results, null, 2), 'utf-8');

        console.log(`Probing completed. Results saved to ${outputFile}`);
    } catch (error) {
        console.error(`Error probing videos: ${error.message}`);
    }
};

probeAllVideos();
