import React, { createContext, useContext, useState, useEffect } from "react";

const LogContext = createContext();

// Helper function to create a log entry for a specific date
const createLog = (daysAgo, challengeId) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return {
    date: date.toISOString(),
    status: true,
    timestamp: date.getTime(),
    challengeId: challengeId,
  };
};

export const LogProvider = ({ children }) => {
  // Generate dummy logs for testing
  const generateDummyLogs = () => {
    const logs = [];

    // Challenge 1001 (Morning Meditation) - 15 days old, ~70% completion
    const challenge1001Logs = [0, 1, 2, 3, 5, 6, 7, 9, 10, 12, 14];
    challenge1001Logs.forEach(day => {
      if (day < 15) logs.push(createLog(day, 1001));
    });

    // Challenge 1002 (Daily Exercise) - 22 days old, ~50% completion
    const challenge1002Logs = [0, 2, 3, 5, 7, 9, 10, 13, 15, 18, 20];
    challenge1002Logs.forEach(day => {
      if (day < 22) logs.push(createLog(day, 1002));
    });

    // Challenge 1003 (Read for 30 Minutes) - 10 days old, ~90% completion
    const challenge1003Logs = [0, 1, 2, 3, 4, 5, 6, 8, 9];
    challenge1003Logs.forEach(day => {
      if (day < 10) logs.push(createLog(day, 1003));
    });

    // Challenge 1004 (Drink 8 Glasses of Water) - 8 days old, ~60% completion
    const challenge1004Logs = [0, 1, 3, 5, 7];
    challenge1004Logs.forEach(day => {
      if (day < 8) logs.push(createLog(day, 1004));
    });

    // Challenge 1005 (Code Every Day) - 25 days old, ~80% completion
    const challenge1005Logs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 15, 16, 18, 20, 22, 24];
    challenge1005Logs.forEach(day => {
      if (day < 25) logs.push(createLog(day, 1005));
    });

    return logs;
  };

  const [logs, setLogs] = useState(generateDummyLogs());
  const [hasLoggedToday, setHasLoggedToday] = useState(false);

  // Initialize logs from localStorage
  useEffect(() => {
    // COMMENTED OUT FOR TESTING - Uncomment to enable localStorage persistence
    /*
    const savedLogs = localStorage.getItem("dailyLogs");
    if (savedLogs) {
      try {
        const parsedLogs = JSON.parse(savedLogs);
        setLogs(parsedLogs);
        checkTodayLog(parsedLogs);
      } catch (error) {
        console.error("Error parsing logs from localStorage:", error);
        setLogs([]);
      }
    }
    */
  }, []);

  // Check if user has already logged today for a specific challenge
  const checkTodayLog = (logsArray, challengeId) => {
    const today = new Date().toDateString();
    const loggedToday = logsArray.some((log) => {
      const logDate = new Date(log.date).toDateString();
      return logDate === today && log.challengeId === challengeId;
    });
    setHasLoggedToday(loggedToday);
  };

  // Add a new log (only if not logged today for that challenge)
  const addLog = (challengeId, status = true) => {
    const today = new Date().toDateString();

    // Check if already logged today for this challenge
    const alreadyLoggedToday = logs.some((log) => {
      const logDate = new Date(log.date).toDateString();
      return logDate === today && log.challengeId === challengeId;
    });

    if (alreadyLoggedToday) {
      console.warn("You can only log once per day for this challenge!");
      return false;
    }

    // Create new log entry
    const newLog = {
      date: new Date().toISOString(),
      status: status, // true = logged, false = missed
      timestamp: Date.now(),
      challengeId: challengeId, // Track which challenge this log belongs to
    };

    const updatedLogs = [newLog, ...logs];
    setLogs(updatedLogs);
    setHasLoggedToday(true);

    // Save to localStorage
    localStorage.setItem("dailyLogs", JSON.stringify(updatedLogs));

    return true;
  };

  // Get logs as array of 1s and 0s for display (1 = logged, 0 = not logged) for a specific challenge
  // Fills all days from challenge creation to today
  const getLogsForDisplay = (challengeId, createdAt) => {
    if (!createdAt) return [];

    const createdDate = new Date(createdAt);
    const today = new Date();
    const daysArray = [];

    // Generate all days from creation date to today
    for (
      let d = new Date(createdDate);
      d <= today;
      d.setDate(d.getDate() + 1)
    ) {
      const currentDay = new Date(d);
      const dayString = currentDay.toDateString();

      // Check if there's a log for this day
      const dayLog = logs.find((log) => {
        const logDate = new Date(log.date).toDateString();
        return logDate === dayString && log.challengeId === challengeId;
      });

      // Add 1 if logged, 0 if not
      daysArray.push(dayLog && dayLog.status ? 1 : 0);
    }

    return daysArray;
  };

  // Get all logs
  const getAllLogs = () => logs;

  // Get logs count for a specific challenge
  const getLogsCount = (challengeId) => {
    return logs.filter((log) => log.status && log.challengeId === challengeId)
      .length;
  };

  // Check if logged today for a specific challenge
  const hasLoggedTodayForChallenge = (challengeId) => {
    const today = new Date().toDateString();
    return logs.some((log) => {
      const logDate = new Date(log.date).toDateString();
      return logDate === today && log.status && log.challengeId === challengeId;
    });
  };

  return (
    <LogContext.Provider
      value={{
        logs,
        hasLoggedToday,
        addLog,
        getLogsForDisplay,
        getAllLogs,
        getLogsCount,
        hasLoggedTodayForChallenge,
      }}
    >
      {children}
    </LogContext.Provider>
  );
};

export const useLog = () => {
  const context = useContext(LogContext);
  if (!context) {
    throw new Error("useLog must be used within LogProvider");
  }
  return context;
};
