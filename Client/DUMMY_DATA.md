# Dummy Test Data

This document describes the dummy data that has been added to the application for testing purposes.

## Dummy Challenges

The application now includes 5 pre-configured challenges with varying durations and start dates:

| ID   | Challenge Name              | Duration | Started    | Description                      |
|------|-----------------------------|----------|------------|----------------------------------|
| 1001 | Morning Meditation          | 30 days  | 15 days ago| Daily meditation practice        |
| 1002 | Daily Exercise              | 60 days  | 22 days ago| Regular physical activity        |
| 1003 | Read for 30 Minutes         | 21 days  | 10 days ago| Daily reading habit              |
| 1004 | Drink 8 Glasses of Water    | 45 days  | 8 days ago | Hydration tracking               |
| 1005 | Code Every Day              | 90 days  | 25 days ago| Programming practice             |

## Dummy Logs

Each challenge has been populated with logs at different completion rates:

- **Morning Meditation (1001)**: ~70% completion rate
  - Days logged: 11 out of 15 days
  
- **Daily Exercise (1002)**: ~50% completion rate
  - Days logged: 11 out of 22 days
  
- **Read for 30 Minutes (1003)**: ~90% completion rate
  - Days logged: 9 out of 10 days
  
- **Drink 8 Glasses of Water (1004)**: ~60% completion rate
  - Days logged: 5 out of 8 days
  
- **Code Every Day (1005)**: ~80% completion rate
  - Days logged: 19 out of 25 days

## Testing Features

With this dummy data, you can test:

1. **Home Page**: View all 5 challenges in a grid layout with different progress percentages
2. **Logs Page**: Click any challenge card to see its heat map visualization
3. **Heat Map**: Observe the blue tiles (logged days) vs gray tiles (missed days)
4. **Progress Tracking**: Each challenge shows accurate progress based on logged vs total days

## Enabling Real Data

When you're ready to use real data with localStorage persistence:

1. Open `src/Healper/ChallengesContext.jsx`
2. Uncomment the code in the `useEffect` function (lines ~52-72)
3. Open `src/Healper/LogContext.jsx`
4. Uncomment the code in the `useEffect` function (lines ~59-69)

This will restore localStorage functionality and allow you to create and persist your own challenges and logs.
