import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import * as logService from "../services/logService";
import { isFreeVersion } from "../services/apiClient";

const LogContext = createContext();

export const LogProvider = ({ children }) => {
  const { user, authType, loading: authLoading } = useAuth();
  // challengeLogs structure: [{ challengeId, challengeName, logs: [...] }, ...]
  const [challengeLogs, setChallengeLogs] = useState([]);
  const [hasLoggedToday, setHasLoggedToday] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // TEST MODE: Read from localStorage or default to false
  const [TEST_MODE, setTEST_MODE] = useState(() => {
    const savedTestMode = localStorage.getItem("TEST_MODE");
    return savedTestMode === "true";
  });

  // Initialize challengeLogs from localStorage or server
  useEffect(() => {
    if (authLoading) return; // Wait for auth to load

    const fetchLogs = async () => {
      setLoading(true);
      setError(null);

      try {
        if (isFreeVersion()) {
          // Free mode: use localStorage
          const savedLogs = localStorage.getItem("challengeLogs");
          if (savedLogs) {
            const parsedLogs = JSON.parse(savedLogs);
            setChallengeLogs(parsedLogs);
          }
        } else if (user && authType === "email") {
          // Email user: fetch from server
          const serverLogs = await logService.getLogs();

          // Transform server logs to client structure
          // Group logs by challenge_id
          const logsMap = new Map();

          serverLogs.forEach((log) => {
            const challengeId = log.challenge_id;
            if (!logsMap.has(challengeId)) {
              logsMap.set(challengeId, {
                challengeId: challengeId,
                challengeName: `Challenge ${challengeId}`, // Will be updated from challenges context
                logs: [],
              });
            }

            logsMap.get(challengeId).logs.push({
              id: log.id,
              date: log.date,
              status: log.completed,
              timestamp: new Date(log.created_at).getTime(),
              notes: log.notes,
              mood: log.mood,
            });
          });

          const transformedLogs = Array.from(logsMap.values());
          setChallengeLogs(transformedLogs);
        }
      } catch (err) {
        console.error("Error fetching logs:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [user, authType, authLoading]);

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
  const addLog = async (challengeId, challengeName, status = true) => {
    const now = new Date();
    const today = TEST_MODE
      ? `${now.toDateString()} ${now.getHours()}:${now.getMinutes()}`
      : now.toDateString();

    // Find the challenge log
    const challengeLog = challengeLogs.find(cl => cl.challengeId === challengeId);

    // Check if already logged today (or this minute in test mode) for this challenge
    const alreadyLoggedToday = challengeLog?.logs.some((log) => {
      const logDate = new Date(log.date);
      const logDateString = TEST_MODE
        ? `${logDate.toDateString()} ${logDate.getHours()}:${logDate.getMinutes()}`
        : logDate.toDateString();
      return logDateString === today;
    });

    if (alreadyLoggedToday) {
      console.warn(TEST_MODE
        ? "You can only log once per minute in test mode!"
        : "You can only log once per day for this challenge!");
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      // Create new log entry
      const newLog = {
        date: new Date().toISOString(),
        status: status, // true = logged, false = missed
        timestamp: Date.now(),
      };

      // If email user, create log on server
      if (!isFreeVersion()) {
        const serverLog = await logService.createLog(
          challengeId,
          new Date().toISOString().split('T')[0], // YYYY-MM-DD format
          status
        );

        // Add server ID to the log
        newLog.id = serverLog.id;
      }

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

      // Save to localStorage for free users
      if (isFreeVersion()) {
        saveToLocalStorage(updatedChallengeLogs);
      }

      return true;
    } catch (err) {
      console.error("Error adding log:", err);
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Get logs as array of 1s and 0s for display (1 = logged, 0 = not logged) for a specific challenge
  // Fills all days from challenge creation to today (or minutes in TEST_MODE)
  const getLogsForDisplay = (challengeId, createdAt) => {
    if (!createdAt) return [];

    const createdDate = new Date(createdAt);
    const today = new Date();
    const daysArray = [];

    // Find the challenge log
    const challengeLog = challengeLogs.find(cl => cl.challengeId === challengeId);
    const logs = challengeLog?.logs || [];

    if (TEST_MODE) {
      // TEST MODE: Iterate by minutes instead of days
      for (
        let d = new Date(createdDate);
        d <= today;
        d.setMinutes(d.getMinutes() + 1)
      ) {
        const currentMinute = new Date(d);
        const minuteString = `${currentMinute.toDateString()} ${currentMinute.getHours()}:${currentMinute.getMinutes()}`;

        // Check if there's a log for this minute
        const minuteLog = logs.find((log) => {
          const logDate = new Date(log.date);
          const logMinuteString = `${logDate.toDateString()} ${logDate.getHours()}:${logDate.getMinutes()}`;
          return logMinuteString === minuteString;
        });

        // Add 1 if logged, 0 if not
        daysArray.push(minuteLog && minuteLog.status ? 1 : 0);
      }
    } else {
      // NORMAL MODE: Iterate by days
      // Reset the time to start of day for accurate comparison
      const startDate = new Date(createdDate);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(today);
      endDate.setHours(0, 0, 0, 0);

      for (
        let d = new Date(startDate);
        d <= endDate;
        d.setDate(d.getDate() + 1)
      ) {
        const currentDay = new Date(d);
        const dayString = currentDay.toDateString();

        // Check if there's a log for this day
        const dayLog = logs.find((log) => {
          const logDate = new Date(log.date);
          const logDateString = logDate.toDateString();
          return logDateString === dayString;
        });

        // Add 1 if logged, 0 if not
        daysArray.push(dayLog && dayLog.status ? 1 : 0);
      }
    }

    return daysArray;
  };

  // Get logs with full date information for calendar display
  const getLogsWithDates = (challengeId, createdAt) => {
    if (!createdAt) return [];

    const createdDate = new Date(createdAt);
    const today = new Date();
    const calendarData = [];

    // Find the challenge log
    const challengeLog = challengeLogs.find(cl => cl.challengeId === challengeId);
    const logs = challengeLog?.logs || [];

    if (TEST_MODE) {
      // TEST MODE: Iterate by minutes
      for (
        let d = new Date(createdDate);
        d <= today;
        d.setMinutes(d.getMinutes() + 1)
      ) {
        const currentMinute = new Date(d);
        const minuteString = `${currentMinute.toDateString()} ${currentMinute.getHours()}:${currentMinute.getMinutes()}`;

        // Check if there's a log for this minute
        const minuteLog = logs.find((log) => {
          const logDate = new Date(log.date);
          const logMinuteString = `${logDate.toDateString()} ${logDate.getHours()}:${logDate.getMinutes()}`;
          return logMinuteString === minuteString;
        });

        calendarData.push({
          date: new Date(currentMinute),
          dayNumber: currentMinute.getMinutes(),
          monthYear: `${currentMinute.toLocaleString('default', { month: 'short' })} ${currentMinute.getFullYear()}`,
          hour: currentMinute.getHours(),
          minute: currentMinute.getMinutes(),
          hasLog: minuteLog && minuteLog.status ? true : false,
          isToday: minuteString === `${today.toDateString()} ${today.getHours()}:${today.getMinutes()}`,
        });
      }
    } else {
      // NORMAL MODE: Iterate by days
      const startDate = new Date(createdDate);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(today);
      endDate.setHours(0, 0, 0, 0);

      for (
        let d = new Date(startDate);
        d <= endDate;
        d.setDate(d.getDate() + 1)
      ) {
        const currentDay = new Date(d);
        const dayString = currentDay.toDateString();

        // Check if there's a log for this day
        const dayLog = logs.find((log) => {
          const logDate = new Date(log.date);
          const logDateString = logDate.toDateString();
          return logDateString === dayString;
        });

        const todayString = new Date().toDateString();

        calendarData.push({
          date: new Date(currentDay),
          dayNumber: currentDay.getDate(),
          monthYear: `${currentDay.toLocaleString('default', { month: 'long' })} ${currentDay.getFullYear()}`,
          dayName: currentDay.toLocaleString('default', { weekday: 'short' }),
          hasLog: dayLog && dayLog.status ? true : false,
          isToday: dayString === todayString,
        });
      }
    }

    return calendarData;
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
  const deleteLogById = async (challengeId) => {
    setLoading(true);
    setError(null);

    try {
      // If email user, delete all logs for this challenge from server
      if (!isFreeVersion()) {
        // Get all logs for this challenge
        const challengeLog = challengeLogs.find(cl => cl.challengeId === challengeId);
        if (challengeLog?.logs) {
          // Delete each log from server
          for (const log of challengeLog.logs) {
            if (log.id) {
              await logService.deleteLog(log.id);
            }
          }
        }
      }

      // Update local state
      const updatedChallengeLogs = challengeLogs.filter(cl => cl.challengeId !== challengeId);
      setChallengeLogs(updatedChallengeLogs);

      // Save to localStorage for free users
      if (isFreeVersion()) {
        saveToLocalStorage(updatedChallengeLogs);
      }

      return { success: true };
    } catch (err) {
      console.error("Error deleting logs:", err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Check if logged today (or this minute in test mode) for a specific challenge
  const hasLoggedTodayForChallenge = (challengeId) => {
    const now = new Date();
    const today = TEST_MODE
      ? `${now.toDateString()} ${now.getHours()}:${now.getMinutes()}`
      : now.toDateString();

    const challengeLog = challengeLogs.find(cl => cl.challengeId === challengeId);
    console.log(challengeLog);

    if (!challengeLog) return false;

    return challengeLog.logs.some((log) => {
      const logDate = new Date(log.date);
      const logDateString = TEST_MODE
        ? `${logDate.toDateString()} ${logDate.getHours()}:${logDate.getMinutes()}`
        : logDate.toDateString();
      return logDateString === today && log.status;
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

  // Toggle test mode and save to localStorage
  const toggleTestMode = () => {
    const newTestMode = !TEST_MODE;
    setTEST_MODE(newTestMode);
    localStorage.setItem("TEST_MODE", newTestMode.toString());
  };

  return (
    <LogContext.Provider
      value={{
        challengeLogs,
        hasLoggedToday,
        loading,
        error,
        addLog,
        getLogsForDisplay,
        getLogsWithDates,
        getAllLogs,
        getLogsCount,
        hasLoggedTodayForChallenge,
        deleteLogById,
        updateChallengeName,
        TEST_MODE,
        toggleTestMode,
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
