/**
 * Google-Certified CMP (Consent Management Platform) Configuration
 * This file integrates IAB TCF v2.2 compliant CMP with Google Consent Mode v2
 * 
 * SETUP INSTRUCTIONS:
 * 1. Sign up for a Google-certified CMP service (Cookiebot recommended)
 * 2. Get your CMP Domain Group ID / Client ID
 * 3. Replace 'YOUR_CMP_ID_HERE' below with your actual CMP ID
 * 4. Update consent-config.js to remove direct consent handling
 * 5. Test with EU/UK IP to verify TCF string generation
 */

// CMP Configuration - CONFIGURED WITH COOKIEYES
const CMP_CONFIG = {
    provider: 'cookieyes', // Using CookieYes (Google-certified)
    id: '42b2bcc64380b01610f13dc3', // CookieYes Script ID
    language: 'en',
    autoLoad: true,
    tcfVersion: '2.2'
};

/**
 * Initialize Google Consent Mode v2 BEFORE CMP loads
 * This ensures consent defaults are set before any tracking
 */
function initializeConsentMode() {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    
    // Set default consent state (all denied until CMP loads)
    gtag('consent', 'default', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'analytics_storage': 'denied',
        'functionality_storage': 'granted',
        'personalization_storage': 'denied',
        'security_storage': 'granted',
        'wait_for_update': 2000 // Wait for CMP to load (2 seconds)
    });
    
    // Make gtag available globally
    window.gtag = gtag;
}

/**
 * Load the CMP script based on provider
 */
function loadCMP() {
    const cmpId = CMP_CONFIG.id;
    
    // Check if CMP ID is configured
    if (cmpId === 'YOUR_CMP_ID_HERE') {
        console.warn('⚠️ CMP not configured. Please set your CMP ID in cmp-config.js');
        console.info('Using fallback consent banner. For EU/UK compliance, configure a certified CMP.');
        // Fall back to custom consent banner
        return false;
    }
    
    let scriptSrc = '';
    let scriptId = '';
    
    switch(CMP_CONFIG.provider.toLowerCase()) {
        case 'cookiebot':
            scriptSrc = `https://consent.cookiebot.com/uc.js`;
            scriptId = 'Cookiebot';
            break;
            
        case 'onetrust':
            scriptSrc = `https://cdn.cookielaw.org/scripttemplates/otSDKStub.js`;
            scriptId = 'onetrust-script';
            break;
            
        case 'cookieyes':
            scriptSrc = `https://cdn-cookieyes.com/client_data/${cmpId}/script.js`;
            scriptId = 'cookieyes-script';
            break;
            
        default:
            console.error('Invalid CMP provider specified');
            return false;
    }
    
    // Create and load CMP script
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = scriptSrc;
    script.type = 'text/javascript';
    script.async = true;
    
    // Add CMP-specific attributes
    if (CMP_CONFIG.provider === 'cookiebot') {
        script.setAttribute('data-cbid', cmpId);
        script.setAttribute('data-blockingmode', 'auto');
        script.setAttribute('data-georegions', '{"region":"US","cbid":"' + cmpId + '"}');
        script.setAttribute('data-consentmode', 'lax'); // Google Consent Mode integration
    } else if (CMP_CONFIG.provider === 'onetrust') {
        script.setAttribute('data-domain-script', cmpId);
        script.setAttribute('data-document-language', 'true');
    }
    
    // Insert script in head (before any other scripts)
    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(script, firstScript);
    
    return true;
}

/**
 * Set up CMP event listeners to sync with Google Consent Mode
 */
function setupCMPListeners() {
    const provider = CMP_CONFIG.provider.toLowerCase();
    
    if (provider === 'cookiebot') {
        // Cookiebot event listeners
        window.addEventListener('CookiebotOnAccept', function () {
            updateGoogleConsentFromCMP();
        });
        
        window.addEventListener('CookiebotOnDecline', function () {
            updateGoogleConsentFromCMP();
        });
        
        window.addEventListener('CookiebotOnLoad', function () {
            // CMP is loaded, apply stored consent if available
            if (window.Cookiebot && window.Cookiebot.consented) {
                updateGoogleConsentFromCMP();
            }
        });
        
    } else if (provider === 'onetrust') {
        // OneTrust event listeners
        window.addEventListener('OneTrustLoaded', function () {
            updateGoogleConsentFromCMP();
        });
        
        window.addEventListener('consent.onetrust', function () {
            updateGoogleConsentFromCMP();
        });
        
    } else if (provider === 'cookieyes') {
        // CookieYes event listeners
        document.addEventListener('cookieyes_consent_update', function () {
            updateGoogleConsentFromCMP();
        });
    }
}

/**
 * Update Google Consent Mode based on CMP consent choices
 */
function updateGoogleConsentFromCMP() {
    const provider = CMP_CONFIG.provider.toLowerCase();
    let consentSettings = {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied',
        personalization_storage: 'denied'
    };
    
    // Map CMP consent categories to Google Consent Mode
    if (provider === 'cookiebot' && window.Cookiebot) {
        consentSettings = {
            ad_storage: window.Cookiebot.consent.marketing ? 'granted' : 'denied',
            ad_user_data: window.Cookiebot.consent.marketing ? 'granted' : 'denied',
            ad_personalization: window.Cookiebot.consent.marketing ? 'granted' : 'denied',
            analytics_storage: window.Cookiebot.consent.statistics ? 'granted' : 'denied',
            personalization_storage: window.Cookiebot.consent.preferences ? 'granted' : 'denied'
        };
        
    } else if (provider === 'onetrust' && window.OnetrustActiveGroups) {
        // OneTrust uses group IDs (customize based on your setup)
        const groups = window.OnetrustActiveGroups.split(',');
        consentSettings = {
            ad_storage: groups.includes('C0004') ? 'granted' : 'denied', // Targeting Cookies
            ad_user_data: groups.includes('C0004') ? 'granted' : 'denied',
            ad_personalization: groups.includes('C0004') ? 'granted' : 'denied',
            analytics_storage: groups.includes('C0002') ? 'granted' : 'denied', // Performance Cookies
            personalization_storage: groups.includes('C0003') ? 'granted' : 'denied' // Functional Cookies
        };
        
    } else if (provider === 'cookieyes' && window.CookieYes) {
        // CookieYes category mapping
        const categories = window.CookieYes.getConsent();
        consentSettings = {
            ad_storage: categories.advertisement ? 'granted' : 'denied',
            ad_user_data: categories.advertisement ? 'granted' : 'denied',
            ad_personalization: categories.advertisement ? 'granted' : 'denied',
            analytics_storage: categories.analytics ? 'granted' : 'denied',
            personalization_storage: categories.functional ? 'granted' : 'denied'
        };
    }
    
    // Update Google Consent Mode
    if (window.gtag) {
        gtag('consent', 'update', consentSettings);
    }
    
    // Load analytics and ads if consented
    loadConsentedServices(consentSettings);
}

/**
 * Load Google services based on consent
 */
function loadConsentedServices(consentSettings) {
    // Load Google Analytics if analytics_storage is granted
    if (consentSettings.analytics_storage === 'granted' && !window.analyticsLoaded) {
        const gaScript = document.createElement('script');
        gaScript.async = true;
        gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-7T393J35ZL';
        gaScript.onload = function() {
            gtag('js', new Date());
            gtag('config', 'G-7T393J35ZL', {
                'anonymize_ip': true,
                'cookie_flags': 'SameSite=None;Secure'
            });
            window.analyticsLoaded = true;
        };
        document.head.appendChild(gaScript);
    }
    
    // Load Google AdSense if ad_storage is granted
    if (consentSettings.ad_storage === 'granted' && !window.adsenseLoaded) {
        const adsScript = document.createElement('script');
        adsScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6578959056593527';
        adsScript.async = true;
        adsScript.crossOrigin = 'anonymous';
        adsScript.onload = function() {
            window.adsenseLoaded = true;
            console.log('✅ AdSense loaded after consent');
        };
        document.head.appendChild(adsScript);
    }
}

/**
 * Get TCF String for debugging (EU compliance verification)
 */
function getTCFString() {
    if (window.__tcfapi) {
        window.__tcfapi('getTCData', 2, function(tcData, success) {
            if (success) {
                console.log('TCF String:', tcData.tcString);
                console.log('TCF Consent:', tcData.purpose.consents);
                console.log('Vendor Consents:', tcData.vendor.consents);
            }
        });
    } else {
        console.warn('TCF API not available');
    }
}

/**
 * Initialize CMP on page load
 */
function initCMP() {
    // Step 1: Initialize Consent Mode defaults
    initializeConsentMode();
    
    // Step 2: Try to load CMP
    const cmpLoaded = loadCMP();
    
    if (cmpLoaded) {
        // Step 3: Set up CMP event listeners
        setupCMPListeners();
        
        console.log('✅ CMP configuration loaded:', CMP_CONFIG.provider);
    } else {
        // Fallback to custom consent banner
        console.log('ℹ️ Using fallback consent banner (consent-config.js)');
        
        // Load fallback consent manager
        if (window.ConsentManager) {
            // The existing ConsentManager will handle consent
            console.log('✅ Fallback consent banner active');
        }
    }
    
    // Expose TCF debugging function
    window.getTCFString = getTCFString;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCMP);
} else {
    initCMP();
}

// Export for use in other scripts
window.CMPManager = {
    updateConsent: updateGoogleConsentFromCMP,
    getTCFString: getTCFString,
    config: CMP_CONFIG
};
