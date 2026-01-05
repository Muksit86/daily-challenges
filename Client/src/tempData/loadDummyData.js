import dummyData from './dummyData.json';

/**
 * Load dummy data into localStorage for testing purposes
 * This will replace any existing challenges and logs
 */
export const loadDummyData = () => {
    try {
        // Save challenges to localStorage
        localStorage.setItem('challenges', JSON.stringify(dummyData.challenges));

        // Save challengeLogs to localStorage (new nested structure)
        localStorage.setItem('challengeLogs', JSON.stringify(dummyData.challengeLogs));

        // Set the first challenge as selected
        if (dummyData.challenges.length > 0) {
            localStorage.setItem('selectedChallengeId', dummyData.challenges[0].id.toString());
        }

        // Count total logs
        const totalLogs = dummyData.challengeLogs.reduce((sum, cl) => sum + cl.logs.length, 0);

        console.log('✅ Dummy data loaded successfully!');
        console.log(`📊 Loaded ${dummyData.challenges.length} challenges`);
        console.log(`📝 Loaded ${totalLogs} logs across ${dummyData.challengeLogs.length} challenges`);

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
        localStorage.removeItem('challengeLogs');
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
    const challengeLogs = JSON.parse(localStorage.getItem('challengeLogs') || '[]');
    const selectedId = localStorage.getItem('selectedChallengeId');

    const totalLogs = challengeLogs.reduce((sum, cl) => sum + cl.logs.length, 0);

    return {
        challengesCount: challenges.length,
        logsCount: totalLogs,
        selectedChallengeId: selectedId,
        challenges: challenges.map(c => ({ id: c.id, title: c.title, days: c.days })),
        challengeLogs: challengeLogs.map(cl => ({ challengeId: cl.challengeId, challengeName: cl.challengeName, logsCount: cl.logs.length }))
    };
};

// For easy testing in browser console
if (typeof window !== 'undefined') {
    window.loadDummyData = loadDummyData;
    window.clearAllData = clearAllData;
    window.getDataSummary = getDataSummary;
}
