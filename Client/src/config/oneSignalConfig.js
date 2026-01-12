// OneSignal Configuration
export const ONE_SIGNAL_CONFIG = {
    appId: import.meta.env.VITE_ONESIGNAL_APP_ID,

    // Safari Web ID (optional - only needed for Safari push notifications)
    safari_web_id: undefined,

    // Prompt options
    notifyButton: {
        enable: false, // We'll use custom UI instead
    },

    // Service Worker
    serviceWorkerParam: { scope: '/' },
    serviceWorkerPath: '/OneSignalSDKWorker.js',

    // Auto-resubscribe users
    autoResubscribe: true,

    // Persist notifications (show even when page is open)
    persistNotification: false,

    // Prompt before subscribing
    autoRegister: false, // We'll manually handle this

    // Allow localhostAsSecureOrigin for development
    allowLocalhostAsSecureOrigin: true,
};

export default ONE_SIGNAL_CONFIG;
