import React, { createContext, useContext, useState, useEffect } from "react";

const LogContext = createContext();

export const LogProvider = ({ children }) => {
  // challengeLogs structure: [{ challengeId, challengeName, logs: [...] }, ...]
  const [challengeLogs, setChallengeLogs] = useState([]);
  const [hasLoggedToday, setHasLoggedToday] = useState(false);

  // Initialize challengeLogs from localStorage
  useEffect(() => {
    const savedLogs = localStorage.getItem("challengeLogs");
    if (savedLogs) {
      try {
        const parsedLogs = JSON.parse(savedLogs);
        setChallengeLogs(parsedLogs);
      } catch (error) {
        console.error("Error parsing challengeLogs from localStorage:", error);
        setChallengeLogs([]);
      }
    }
  }, []);

  // Helper function to save to localStorage
  const saveToLocalStorage = (logs) => {
    localStorage.setItem("challengeLogs", JSON.stringify(logs));
  };

  // Get or create challenge log entry
  const getOrCreateChallengeLog = (challengeId, challengeName) => {
    let challengeLog = challengeLogs.find(cl => cl.challengeId === challengeId);

    if (!challengeLog) {
      challengeLog = {
        challengeId: challengeId,
        challengeName: challengeName,
        logs: []
      };
      const updatedLogs = [...challengeLogs, challengeLog];
      setChallengeLogs(updatedLogs);
      saveToLocalStorage(updatedLogs);
    }

    return challengeLog;
  };

  // Add a new log (only if not logged today for that challenge)
  const addLog = (challengeId, challengeName, status = true) => {
    const today = new Date().toDateString();

    // Find the challenge log
    const challengeLog = challengeLogs.find(cl => cl.challengeId === challengeId);

    // Check if already logged today for this challenge
    const alreadyLoggedToday = challengeLog?.logs.some((log) => {
      const logDate = new Date(log.date).toDateString();
      return logDate === today;
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
    };

    // Update or create challenge log
    const updatedChallengeLogs = challengeLogs.map(cl => {
      if (cl.challengeId === challengeId) {
        return {
          ...cl,
          logs: [newLog, ...cl.logs]
        };
      }
      return cl;
    });

    // If challenge log doesn't exist, create it
    if (!challengeLog) {
      updatedChallengeLogs.push({
        challengeId: challengeId,
        challengeName: challengeName,
        logs: [newLog]
      });
    }

    setChallengeLogs(updatedChallengeLogs);
    setHasLoggedToday(true);
    saveToLocalStorage(updatedChallengeLogs);

    return true;
  };

  // Get logs as array of 1s and 0s for display (1 = logged, 0 = not logged) for a specific challenge
  // Fills all days from challenge creation to today
  const getLogsForDisplay = (challengeId, createdAt) => {
    if (!createdAt) return [];

    const createdDate = new Date(createdAt);
    const today = new Date();
    const daysArray = [];

    // Find the challenge log
    const challengeLog = challengeLogs.find(cl => cl.challengeId === challengeId);
    const logs = challengeLog?.logs || [];

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
        return logDate === dayString;
      });

      // Add 1 if logged, 0 if not
      daysArray.push(dayLog && dayLog.status ? 1 : 0);
    }

    return daysArray;
  };

  // Get all logs for a specific challenge
  const getAllLogs = (challengeId) => {
    if (!challengeId) {
      // Return all logs if no challenge specified
      return challengeLogs;
    }

    const challengeLog = challengeLogs.find(cl => cl.challengeId === challengeId);
    return challengeLog?.logs || [];
  };

  // Get logs count for a specific challenge
  const getLogsCount = (challengeId) => {
    const challengeLog = challengeLogs.find(cl => cl.challengeId === challengeId);
    if (!challengeLog) return 0;

    return challengeLog.logs.filter(log => log.status).length;
  };

  // Delete all logs for a specific challenge
  const deleteLogById = (challengeId) => {
    const updatedChallengeLogs = challengeLogs.filter(cl => cl.challengeId !== challengeId);
    setChallengeLogs(updatedChallengeLogs);
    saveToLocalStorage(updatedChallengeLogs);
  };

  // Check if logged today for a specific challenge
  const hasLoggedTodayForChallenge = (challengeId) => {
    const today = new Date().toDateString();
    const challengeLog = challengeLogs.find(cl => cl.challengeId === challengeId);

    if (!challengeLog) return false;

    return challengeLog.logs.some((log) => {
      const logDate = new Date(log.date).toDateString();
      return logDate === today && log.status;
    });
  };

  // Update challenge name when title is edited
  const updateChallengeName = (challengeId, newName) => {
    const updatedChallengeLogs = challengeLogs.map(cl => {
      if (cl.challengeId === challengeId) {
        return {
          ...cl,
          challengeName: newName
        };
      }
      return cl;
    });
    setChallengeLogs(updatedChallengeLogs);
    saveToLocalStorage(updatedChallengeLogs);
  };

  return (
    <LogContext.Provider
      value={{
        challengeLogs,
        hasLoggedToday,
        addLog,
        getLogsForDisplay,
        getAllLogs,
        getLogsCount,
        hasLoggedTodayForChallenge,
        deleteLogById,
        updateChallengeName,
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
