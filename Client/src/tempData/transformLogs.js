// Script to transform logs from flat structure to nested structure
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, 'dummyData.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Group logs by challengeId
const logsByChallenge = {};

data.logs.forEach(log => {
    const challengeId = log.challengeId;
    if (!logsByChallenge[challengeId]) {
        logsByChallenge[challengeId] = [];
    }

    // Remove challengeId from individual log entries
    const { challengeId: _, ...logWithoutChallengeId } = log;
    logsByChallenge[challengeId].push(logWithoutChallengeId);
});

// Create new challengeLogs structure
const challengeLogs = [];

data.challenges.forEach(challenge => {
    challengeLogs.push({
        challengeId: challenge.id,
        challengeName: challenge.title,
        logs: logsByChallenge[challenge.id] || []
    });
});

// Create new data structure
const newData = {
    challenges: data.challenges,
    challengeLogs: challengeLogs
};

// Write back to file
fs.writeFileSync(dataPath, JSON.stringify(newData, null, 2), 'utf8');

newData.challengeLogs.forEach((cl, idx) => {
    console.log(`  ${idx + 1}. ${cl.challengeName}: ${cl.logs.length} logs`);
});
