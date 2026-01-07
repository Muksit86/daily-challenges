import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import * as challengeService from "../services/challengeService";
import { isFreeVersion } from "../services/apiClient";

const ChallengesContext = createContext();

// Free version challenge limit
const FREE_CHALLENGE_LIMIT = 3;

export const ChallengesProvider = ({ children }) => {
  const { user, authType, loading: authLoading } = useAuth();
  const [challenges, setChallenges] = useState([]);
  const [selectedChallengeId, setSelectedChallengeId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize challenges from localStorage or server
  useEffect(() => {
    if (authLoading) return; // Wait for auth to load

    const fetchChallenges = async () => {
      setLoading(true);
      setError(null);

      try {
        if (isFreeVersion()) {
          // Free mode: use localStorage
          const savedChallenges = localStorage.getItem("challenges");
          const savedSelectedId = localStorage.getItem("selectedChallengeId");
          if (savedChallenges) {
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
          }
        } else if (user && authType === "email") {
          // Email user: fetch from server
          const serverChallenges = await challengeService.getChallenges();

          // Transform server data to match client schema
          const transformedChallenges = serverChallenges.map((challenge) => ({
            id: challenge.id,
            title: challenge.title,
            days: challenge.duration,
            createdAt: challenge.created_at,
            description: challenge.description,
          }));

          setChallenges(transformedChallenges);

          // Select the first challenge if available
          if (transformedChallenges.length > 0) {
            setSelectedChallengeId(transformedChallenges[0].id);
          }
        }
      } catch (err) {
        console.error("Error fetching challenges:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, [user, authType, authLoading]);

  // Add a new challenge
  const addChallenge = async (title, days) => {
    if (!title || !days) {
      console.warn("Title and days are required");
      return { success: false, error: "Title and days are required" };
    }

    setLoading(true);
    setError(null);

    try {
      if (isFreeVersion()) {
        // Check challenge limit for free users
        if (challenges.length >= FREE_CHALLENGE_LIMIT) {
          return {
            success: false,
            error: `Free version is limited to ${FREE_CHALLENGE_LIMIT} challenges. Upgrade to Premium for unlimited challenges!`,
          };
        }

        // Free mode: use localStorage
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

        return { success: true };
      } else {
        // Email user: create on server
        const createdChallenge = await challengeService.createChallenge(
          title.trim(),
          parseInt(days),
          "" // description
        );

        // Transform to client schema
        const newChallenge = {
          id: createdChallenge.id,
          title: createdChallenge.title,
          days: createdChallenge.duration,
          createdAt: createdChallenge.created_at,
          description: createdChallenge.description,
        };

        const updatedChallenges = [newChallenge, ...challenges];
        setChallenges(updatedChallenges);

        // Select the newly created challenge
        setSelectedChallengeId(newChallenge.id);

        return { success: true };
      }
    } catch (err) {
      console.error("Error adding challenge:", err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Delete a challenge
  const deleteChallenge = async (id) => {
    setLoading(true);
    setError(null);

    try {
      // Delete from server if email user
      if (!isFreeVersion()) {
        await challengeService.deleteChallenge(id);
      }

      // Update local state
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

      // Save to localStorage for free users
      if (isFreeVersion()) {
        localStorage.setItem("challenges", JSON.stringify(updatedChallenges));
      }

      return { success: true };
    } catch (err) {
      console.error("Error deleting challenge:", err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
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
  const updateChallenge = async (id, updates) => {
    setLoading(true);
    setError(null);

    try {
      // Update on server if email user
      if (!isFreeVersion()) {
        // Transform updates to server schema
        const serverUpdates = {};
        if (updates.title) serverUpdates.title = updates.title;
        if (updates.days) serverUpdates.duration = updates.days;
        if (updates.description !== undefined)
          serverUpdates.description = updates.description;

        await challengeService.updateChallenge(id, serverUpdates);
      }

      // Update local state
      const updatedChallenges = challenges.map((ch) =>
        ch.id === id ? { ...ch, ...updates } : ch
      );
      setChallenges(updatedChallenges);

      // Save to localStorage for free users
      if (isFreeVersion()) {
        localStorage.setItem("challenges", JSON.stringify(updatedChallenges));
      }

      return { success: true };
    } catch (err) {
      console.error("Error updating challenge:", err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Get challenges count
  const getChallengesCount = () => challenges.length;

  return (
    <ChallengesContext.Provider
      value={{
        challenges,
        selectedChallengeId,
        loading,
        error,
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
