// Script to generate dummy data with 10 challenges, each having 100 days of filled logs

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Challenge titles
const challengeTitles = [
    "Morning Workout",
    "Read 10 Pages Daily",
    "Drink 8 Glasses of Water",
    "Sleep Before 11 PM",
    "Meditate 5 Minutes",
    "Practice Coding 1 Hour",
    "Walk 10,000 Steps",
    "No Social Media After 9 PM",
    "Journal for 10 Minutes",
    "Learn Something New"
];

// Generate challenges
const challenges = [];
const logs = [];

// Starting date: 100 days ago from today (2026-01-04)
const today = new Date('2026-01-04T12:00:00+05:30');
const startDate = new Date(today);
startDate.setDate(startDate.getDate() - 99); // 100 days ago (including today)

// Generate 10 challenges
for (let i = 0; i < 10; i++) {
    const challengeStartDate = new Date(startDate);
    challengeStartDate.setDate(startDate.getDate() + (i * 2)); // Stagger start dates slightly

    const challengeId = challengeStartDate.getTime();

    challenges.push({
        id: challengeId,
        title: challengeTitles[i],
        days: 100,
        createdAt: challengeStartDate.toISOString()
    });

    // Generate 100 days of logs for this challenge
    for (let day = 0; day < 100; day++) {
        const logDate = new Date(challengeStartDate);
        logDate.setDate(challengeStartDate.getDate() + day);

        // Vary the time of day slightly for realism
        const hours = 7 + Math.floor(Math.random() * 3); // Between 7-9 AM
        const minutes = Math.floor(Math.random() * 60); // Random minutes
        logDate.setHours(hours, minutes, 0, 0);

        // Most logs are successful (true), but add some failures randomly (10% chance)
        const status = Math.random() > 0.1;

        logs.push({
            date: logDate.toISOString(),
            status: status,
            timestamp: logDate.getTime(),
            challengeId: challengeId
        });
    }
}

// Create the data object
const dummyData = {
    challenges: challenges,
    logs: logs
};

// Write to file
const outputPath = path.join(__dirname, 'dummyData.json');
fs.writeFileSync(outputPath, JSON.stringify(dummyData, null, 2));
