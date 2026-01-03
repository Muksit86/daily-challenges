import dummyData from './dummyData.json';

/**
 * Load dummy data into localStorage for testing purposes
 * This will replace any existing challenges and logs
 */
export const loadDummyData = () => {
    try {
        // Save challenges to localStorage
        localStorage.setItem('challenges', JSON.stringify(dummyData.challenges));

        // Save logs to localStorage
        localStorage.setItem('dailyLogs', JSON.stringify(dummyData.logs));

        // Set the first challenge as selected
        if (dummyData.challenges.length > 0) {
            localStorage.setItem('selectedChallengeId', dummyData.challenges[0].id.toString());
        }

        console.log('✅ Dummy data loaded successfully!');
        console.log(`📊 Loaded ${dummyData.challenges.length} challenges`);
        console.log(`📝 Loaded ${dummyData.logs.length} logs`);

        return true;
    } catch (error) {
        console.error('❌ Error loading dummy data:', error);
        return false;
    }
};

/**
 * Clear all data from localStorage
 */
export const clearAllData = () => {
    try {
        localStorage.removeItem('challenges');
        localStorage.removeItem('dailyLogs');
        localStorage.removeItem('selectedChallengeId');

        console.log('🗑️ All data cleared successfully!');
        return true;
    } catch (error) {
        console.error('❌ Error clearing data:', error);
        return false;
    }
};

/**
 * Get summary of current data
 */
export const getDataSummary = () => {
    const challenges = JSON.parse(localStorage.getItem('challenges') || '[]');
    const logs = JSON.parse(localStorage.getItem('dailyLogs') || '[]');
    const selectedId = localStorage.getItem('selectedChallengeId');

    return {
        challengesCount: challenges.length,
        logsCount: logs.length,
        selectedChallengeId: selectedId,
        challenges: challenges.map(c => ({ id: c.id, title: c.title, days: c.days }))
    };
};

// For easy testing in browser console
if (typeof window !== 'undefined') {
    window.loadDummyData = loadDummyData;
    window.clearAllData = clearAllData;
    window.getDataSummary = getDataSummary;
}
