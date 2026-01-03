import React, { createContext, useContext, useState, useEffect } from "react";

const ChallengesContext = createContext();

export const ChallengesProvider = ({ children }) => {
  const [challenges, setChallenges] = useState([]);
  const [selectedChallengeId, setSelectedChallengeId] = useState(null);

  // Initialize challenges from localStorage
  useEffect(() => {
    const savedChallenges = localStorage.getItem("challenges");
    const savedSelectedId = localStorage.getItem("selectedChallengeId");
    if (savedChallenges) {
      try {
        const parsedChallenges = JSON.parse(savedChallenges);
        setChallenges(parsedChallenges);

        // Set selected challenge if saved, otherwise select the first one
        if (
          savedSelectedId &&
          parsedChallenges.some((ch) => ch.id === parseInt(savedSelectedId))
        ) {
          setSelectedChallengeId(parseInt(savedSelectedId));
        } else if (parsedChallenges.length > 0) {
          setSelectedChallengeId(parsedChallenges[0].id);
        }
      } catch (error) {
        console.error("Error parsing challenges from localStorage:", error);
        setChallenges([]);
      }
    }
  }, []);

  // Add a new challenge
  const addChallenge = (title, days) => {
    if (!title || !days) {
      console.warn("Title and days are required");
      return false;
    }

    const newChallenge = {
      id: Date.now(),
      title: title.trim(),
      days: parseInt(days),
      createdAt: new Date().toISOString(),
    };

    const updatedChallenges = [newChallenge, ...challenges];
    setChallenges(updatedChallenges);

    // Select the newly created challenge
    setSelectedChallengeId(newChallenge.id);
    localStorage.setItem("selectedChallengeId", newChallenge.id);

    // Save to localStorage
    localStorage.setItem("challenges", JSON.stringify(updatedChallenges));

    return true;
  };

  // Delete a challenge
  const deleteChallenge = (id) => {
    const updatedChallenges = challenges.filter((ch) => ch.id !== id);
    setChallenges(updatedChallenges);

    // If deleted challenge was selected, select the first one
    if (selectedChallengeId === id) {
      const newSelected =
        updatedChallenges.length > 0 ? updatedChallenges[0].id : null;
      setSelectedChallengeId(newSelected);
      if (newSelected) {
        localStorage.setItem("selectedChallengeId", newSelected);
      } else {
        localStorage.removeItem("selectedChallengeId");
      }
    }

    // Save to localStorage
    localStorage.setItem("challenges", JSON.stringify(updatedChallenges));
  };

  // Select a challenge
  const selectChallenge = (id) => {
    setSelectedChallengeId(id);
    localStorage.setItem("selectedChallengeId", id);
  };

  // Get all challenges
  const getChallenges = () => challenges;

  // Get selected challenge
  const getSelectedChallenge = () => {
    return challenges.find((ch) => ch.id === selectedChallengeId) || null;
  };

  // Delete all challenges
  const deleteAllChallenges = () => {
    setChallenges([]);
    setSelectedChallengeId(null);
    localStorage.removeItem("challenges");
    localStorage.removeItem("selectedChallengeId");
  };

  // Update a challenge
  const updateChallenge = (id, updates) => {
    const updatedChallenges = challenges.map((ch) =>
      ch.id === id ? { ...ch, ...updates } : ch
    );
    setChallenges(updatedChallenges);
    localStorage.setItem("challenges", JSON.stringify(updatedChallenges));
  };

  // Get challenges count
  const getChallengesCount = () => challenges.length;

  return (
    <ChallengesContext.Provider
      value={{
        challenges,
        selectedChallengeId,
        addChallenge,
        deleteChallenge,
        deleteAllChallenges,
        updateChallenge,
        selectChallenge,
        getChallenges,
        getSelectedChallenge,
        getChallengesCount,
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
};

export const useChallenges = () => {
  const context = useContext(ChallengesContext);
  if (!context) {
    throw new Error("useChallenges must be used within ChallengesProvider");
  }
  return context;
};
