# Dummy Data for Testing

This folder contains dummy data for testing the ChallengerDaily app.

## Files

- **`dummyData.json`** - Contains 5 sample challenges and 56 logs spanning from mid-December to today
- **`loadDummyData.js`** - Utility functions to load/clear the dummy data

## Dummy Challenges Included

1. **Morning Workout** - 30 days challenge (started Dec 15, 2025)
2. **Read 10 Pages** - 21 days challenge (started Dec 20, 2025)
3. **Drink 8 Glasses of Water** - 14 days challenge (started Dec 25, 2025)
4. **Sleep Before 11 PM** - 30 days challenge (started Dec 28, 2025)
5. **Meditate 5 Minutes** - 7 days challenge (started Dec 30, 2025)

## How to Use

### Method 1: Import and Call in Your Code

```javascript
import { loadDummyData, clearAllData, getDataSummary } from './tempData/loadDummyData';

// Load dummy data
loadDummyData(); // Then refresh the page

// Clear all data
clearAllData(); // Then refresh the page

// Get data summary
const summary = getDataSummary();
console.log(summary);
```

### Method 2: Browser Console (Easiest)

1. Import the `loadDummyData.js` file somewhere in your app (e.g., in `main.jsx` temporarily)
2. Open your browser console (F12)
3. Run these commands:

```javascript
// Load dummy data
loadDummyData()
// Then refresh the page

// Clear all data
clearAllData()
// Then refresh the page

// Check current data
getDataSummary()
```

### Method 3: Manual Copy-Paste

1. Open `dummyData.json`
2. Copy the challenges array
3. In browser console, run:
```javascript
localStorage.setItem('challenges', JSON.stringify([/* paste challenges array */]))
localStorage.setItem('selectedChallengeId', '1704067200000')
```
4. Copy the logs array
5. In browser console, run:
```javascript
localStorage.setItem('dailyLogs', JSON.stringify([/* paste logs array */]))
```
6. Refresh the page

## Quick Test Setup

Add this to your `main.jsx` temporarily:

```javascript
import { loadDummyData } from './tempData/loadDummyData';

// Uncomment the line below to auto-load dummy data on app start
// loadDummyData();
```

Then refresh your browser to see the dummy data!

## Data Summary

- **5 challenges** with varying durations (7-30 days)
- **56 logs** spread across multiple challenges
- Realistic completion patterns (some missed days, mostly completed)
- Spans from December 15, 2025 to January 3, 2026
- Different challenge start dates to show various progress levels

## Notes

- The dummy data will **overwrite** any existing data in localStorage
- Remember to call `clearAllData()` when you want to start fresh
- You need to **refresh the page** after loading/clearing data for the React context to pick up changes
