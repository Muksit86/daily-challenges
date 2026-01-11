import { useNavigate } from "react-router";
import { useAuth } from "../Healper/AuthContext";

/**
 * Custom hook to protect actions during expired trial
 * Redirects to payment page if trial has expired
 * @returns {Function} handleProtectedAction - Wrapper function for protected actions
 */
export const useTrialProtection = () => {
    const navigate = useNavigate();
    const { authType, trialStatus } = useAuth();

    /**
     * Wraps an action and checks trial status before executing
     * If trial is expired, redirects to payment page instead
     * @param {Function} action - The callback function to execute if trial is active
     * @returns {Function} - Wrapped function that checks trial before executing
     */
    const handleProtectedAction = (action) => {
        return (...args) => {
            // Only enforce trial protection for free users
            if (authType === "free" && trialStatus.isExpired) {
                navigate("/payment");
                return;
            }

            // Trial is active or user is email-authenticated, execute action
            if (typeof action === "function") {
                return action(...args);
            }
        };
    };

    return { handleProtectedAction, isTrialExpired: trialStatus.isExpired };
};

export default useTrialProtection;
