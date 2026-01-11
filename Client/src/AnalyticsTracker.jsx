import { useLocation } from "react-router";
import { useEffect } from "react";
import posthog from "posthog-js";

export const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    posthog.capture("$pageview");
  }, [location.pathname]);

  return null;
};
