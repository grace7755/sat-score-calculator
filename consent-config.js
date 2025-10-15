/**
 * Google Consent Mode v2 Configuration
 * This file manages user consent for analytics, ads, and personalization
 */

// Initialize Consent Mode v2 with default denied state
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

// Set default consent state (denied until user accepts)
gtag('consent', 'default', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'denied',
    'functionality_storage': 'granted', // Essential cookies
    'personalization_storage': 'denied',
    'security_storage': 'granted', // Essential cookies
    'wait_for_update': 500 // Wait 500ms for consent banner
});

// Consent Management Functions
const ConsentManager = {
    // Cookie name for storing consent
    CONSENT_COOKIE: 'user_consent_preferences',
    CONSENT_VERSION: '1.0',
    
    // Get stored consent
    getConsent() {
        try {
            const consentData = localStorage.getItem(this.CONSENT_COOKIE);
            if (consentData) {
                return JSON.parse(consentData);
            }
        } catch (e) {
            console.error('Error reading consent:', e);
        }
        return null;
    },
    
    // Save consent preferences
    saveConsent(preferences) {
        const consentData = {
            ...preferences,
            timestamp: new Date().toISOString(),
            version: this.CONSENT_VERSION
        };
        
        try {
            localStorage.setItem(this.CONSENT_COOKIE, JSON.stringify(consentData));
            this.updateGoogleConsent(preferences);
            return true;
        } catch (e) {
            console.error('Error saving consent:', e);
            return false;
        }
    },
    
    // Update Google Consent Mode
    updateGoogleConsent(preferences) {
        gtag('consent', 'update', {
            'ad_storage': preferences.ads ? 'granted' : 'denied',
            'ad_user_data': preferences.ads ? 'granted' : 'denied',
            'ad_personalization': preferences.personalization ? 'granted' : 'denied',
            'analytics_storage': preferences.analytics ? 'granted' : 'denied',
            'personalization_storage': preferences.personalization ? 'granted' : 'denied'
        });
        
        // Reload scripts if consent is granted
        if (preferences.analytics && !window.analyticsLoaded) {
            this.loadAnalytics();
        }
        
        if (preferences.ads && !window.adsenseLoaded) {
            this.loadAdSense();
        }
    },
    
    // Load Google Analytics
    loadAnalytics() {
        if (window.analyticsLoaded) return;
        
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-7T393J35ZL';
        script.onload = function() {
            gtag('js', new Date());
            gtag('config', 'G-7T393J35ZL', {
                'anonymize_ip': true,
                'cookie_flags': 'SameSite=None;Secure'
            });
            window.analyticsLoaded = true;
        };
        document.head.appendChild(script);
    },
    
    // Load Google AdSense
    loadAdSense() {
        if (window.adsenseLoaded) return;
        
        const script = document.createElement('script');
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6578959056593527';
        script.async = true;
        script.crossOrigin = 'anonymous';
        script.onload = function() {
            window.adsenseLoaded = true;
        };
        document.head.appendChild(script);
    },
    
    // Accept all cookies
    acceptAll() {
        const preferences = {
            analytics: true,
            ads: true,
            personalization: true,
            essential: true
        };
        this.saveConsent(preferences);
        this.hideBanner();
    },
    
    // Reject non-essential cookies
    rejectAll() {
        const preferences = {
            analytics: false,
            ads: false,
            personalization: false,
            essential: true
        };
        this.saveConsent(preferences);
        this.hideBanner();
    },
    
    // Save custom preferences
    saveCustom(preferences) {
        preferences.essential = true; // Essential always granted
        this.saveConsent(preferences);
        this.hideBanner();
    },
    
    // Show consent banner
    showBanner() {
        const banner = document.getElementById('consent-banner');
        if (banner) {
            banner.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    },
    
    // Hide consent banner
    hideBanner() {
        const banner = document.getElementById('consent-banner');
        if (banner) {
            banner.style.display = 'none';
            document.body.style.overflow = ''; // Restore scrolling
        }
    },
    
    // Show settings modal
    showSettings() {
        const modal = document.getElementById('consent-settings-modal');
        if (modal) {
            modal.style.display = 'flex';
        }
    },
    
    // Hide settings modal
    hideSettings() {
        const modal = document.getElementById('consent-settings-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    },
    
    // Initialize on page load
    init() {
        // Check if consent already given
        const consent = this.getConsent();
        
        if (consent) {
            // Apply stored consent
            this.updateGoogleConsent(consent);
        } else {
            // Show consent banner after a short delay
            setTimeout(() => this.showBanner(), 1000);
        }
        
        // Set up event listeners
        this.setupEventListeners();
    },
    
    // Set up button event listeners
    setupEventListeners() {
        // Accept all button
        const acceptBtn = document.getElementById('consent-accept-all');
        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => this.acceptAll());
        }
        
        // Reject all button
        const rejectBtn = document.getElementById('consent-reject-all');
        if (rejectBtn) {
            rejectBtn.addEventListener('click', () => this.rejectAll());
        }
        
        // Settings button
        const settingsBtn = document.getElementById('consent-settings-btn');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => {
                this.hideBanner();
                this.showSettings();
            });
        }
        
        // Close settings button
        const closeSettingsBtn = document.getElementById('consent-settings-close');
        if (closeSettingsBtn) {
            closeSettingsBtn.addEventListener('click', () => this.hideSettings());
        }
        
        // Save settings button
        const saveSettingsBtn = document.getElementById('consent-save-settings');
        if (saveSettingsBtn) {
            saveSettingsBtn.addEventListener('click', () => {
                const preferences = {
                    analytics: document.getElementById('consent-analytics')?.checked || false,
                    ads: document.getElementById('consent-ads')?.checked || false,
                    personalization: document.getElementById('consent-personalization')?.checked || false
                };
                this.saveCustom(preferences);
                this.hideSettings();
            });
        }
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ConsentManager.init());
} else {
    ConsentManager.init();
}

// Expose globally for privacy policy "Manage Consent" link
window.ConsentManager = ConsentManager;
