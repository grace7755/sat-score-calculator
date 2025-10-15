# Google Consent Mode v2 Integration Guide

## Overview
This guide shows how to integrate the consent management system into all pages of the SAT Score Calculator website.

## Files Already Created ✅
1. `/consent-config.js` - Consent management JavaScript
2. `/consent-banner.html` - Banner HTML/CSS (for reference)
3. `/methodology.html` - Fully integrated example
4. `/index.html` - Fully integrated example

## Integration Steps for Each Page

### STEP 1: Replace Old Analytics Code in `<head>` Section

**Remove this old code:**
```html
<!-- Lightweight Google Analytics (optimized for performance) -->
<script>
    // Ultra-lightweight analytics tracking (reduced payload)
    (function() {
        // Only load analytics if user hasn't opted out
        if (localStorage.getItem('analytics-opt-out') === 'true') return;
        
        // Load minimal analytics after significant delay...
        // [REST OF OLD ANALYTICS CODE]
    })();
</script>

<!-- AdSense code (Deferred for performance) -->
<script>
    window.addEventListener('load', function() {
        var adsenseScript = document.createElement('script');
        adsenseScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6578959056593527';
        adsenseScript.async = true;
        adsenseScript.crossOrigin = 'anonymous';
        document.head.appendChild(adsenseScript);
    });
</script>
```

**Replace with this new code:**
```html
<!-- Google Consent Mode v2 (Must load BEFORE any analytics or ads) -->
<script>
    // Initialize Google Consent Mode v2 with default denied state
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    
    // Set default consent state - all denied until user accepts
    gtag('consent', 'default', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'analytics_storage': 'denied',
        'functionality_storage': 'granted',
        'personalization_storage': 'denied',
        'security_storage': 'granted',
        'wait_for_update': 500
    });
    
    // Note: Analytics and AdSense will be loaded by consent-config.js after user consent
</script>
```

### STEP 2: Add Consent Banner Before `</body>` Tag

**Add this code just before the closing `</body>` tag:**

```html
    <!-- Google Consent Banner & Configuration -->
    <script src="/consent-config.js"></script>
    
    <!-- Consent Banner UI (Inline for all pages) -->
    <style>
        #consent-banner{display:none;position:fixed;bottom:0;left:0;right:0;background:#fff;box-shadow:0 -2px 10px rgba(0,0,0,.1);padding:1.5rem;z-index:999999;border-top:3px solid var(--primary-color,#000);animation:slideUp .3s ease-out}@keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}.consent-content{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:2rem;flex-wrap:wrap}.consent-text{flex:1;min-width:300px}.consent-text h3{margin:0 0 .5rem 0;font-size:1.125rem;color:var(--heading-text,#111)}.consent-text p{margin:0;font-size:.9375rem;color:var(--text-color,#666);line-height:1.6}.consent-text a{color:var(--hover-color,#0070f3);text-decoration:underline}.consent-buttons{display:flex;gap:.75rem;flex-wrap:wrap}.consent-btn{padding:.75rem 1.5rem;border:none;border-radius:6px;font-size:.9375rem;font-weight:600;cursor:pointer;transition:all .2s;white-space:nowrap}.consent-btn-primary{background:var(--primary-color,#000);color:#fff}.consent-btn-primary:hover{background:#333;transform:translateY(-1px)}.consent-btn-secondary{background:transparent;color:var(--text-color,#111);border:2px solid var(--border-color,#eaeaea)}.consent-btn-secondary:hover{border-color:var(--primary-color,#000);background:var(--background-color,#fafafa)}.consent-btn-link{background:transparent;color:var(--hover-color,#0070f3);padding:.75rem 1rem;text-decoration:underline}#consent-settings-modal{display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.6);z-index:1000000;align-items:center;justify-content:center;padding:1rem}.consent-modal-content{background:#fff;border-radius:12px;padding:2rem;max-width:600px;width:100%;max-height:90vh;overflow-y:auto;box-shadow:0 10px 40px rgba(0,0,0,.2)}.consent-modal-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;padding-bottom:1rem;border-bottom:2px solid var(--border-color,#eaeaea)}.consent-modal-header h2{margin:0;font-size:1.5rem;color:var(--heading-text,#111)}.consent-close-btn{background:transparent;border:none;font-size:1.5rem;cursor:pointer;color:var(--text-color,#666);padding:.25rem;line-height:1}.consent-close-btn:hover{color:var(--primary-color,#000)}.consent-option{padding:1.25rem;margin-bottom:1rem;border:1px solid var(--border-color,#eaeaea);border-radius:8px;background:var(--background-color,#fafafa)}.consent-option-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:.5rem}.consent-option-header h4{margin:0;font-size:1.0625rem;color:var(--heading-text,#111)}.consent-toggle{position:relative;width:50px;height:26px}.consent-toggle input[type="checkbox"]{opacity:0;width:0;height:0}.consent-toggle-slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#ccc;border-radius:26px;transition:.3s}.consent-toggle-slider:before{position:absolute;content:"";height:20px;width:20px;left:3px;bottom:3px;background-color:#fff;border-radius:50%;transition:.3s}.consent-toggle input:checked+.consent-toggle-slider{background-color:var(--success-color,#0070f3)}.consent-toggle input:checked+.consent-toggle-slider:before{transform:translateX(24px)}.consent-toggle input:disabled+.consent-toggle-slider{opacity:.5;cursor:not-allowed}.consent-option-description{font-size:.875rem;color:var(--secondary-color,#666);line-height:1.6}.consent-modal-footer{margin-top:1.5rem;padding-top:1rem;border-top:2px solid var(--border-color,#eaeaea);display:flex;gap:.75rem;justify-content:flex-end}@media (max-width:768px){.consent-content{flex-direction:column;align-items:stretch}.consent-buttons{justify-content:stretch}.consent-btn{flex:1;text-align:center}.consent-modal-content{padding:1.5rem}.consent-modal-footer{flex-direction:column}}
    </style>
    
    <div id="consent-banner">
        <div class="consent-content">
            <div class="consent-text">
                <h3>🍪 We Value Your Privacy</h3>
                <p>We use cookies to enhance your experience, analyze site traffic, and serve personalized ads. By clicking "Accept All", you consent to our use of cookies. <a href="/privacy-policy.html">Learn more</a></p>
            </div>
            <div class="consent-buttons">
                <button id="consent-accept-all" class="consent-btn consent-btn-primary">Accept All</button>
                <button id="consent-reject-all" class="consent-btn consent-btn-secondary">Reject All</button>
                <button id="consent-settings-btn" class="consent-btn consent-btn-link">Customize</button>
            </div>
        </div>
    </div>
    
    <div id="consent-settings-modal">
        <div class="consent-modal-content">
            <div class="consent-modal-header">
                <h2>Cookie Preferences</h2>
                <button id="consent-settings-close" class="consent-close-btn" aria-label="Close">×</button>
            </div>
            <div class="consent-options">
                <div class="consent-option">
                    <div class="consent-option-header">
                        <h4>Essential Cookies</h4>
                        <label class="consent-toggle">
                            <input type="checkbox" checked disabled>
                            <span class="consent-toggle-slider"></span>
                        </label>
                    </div>
                    <p class="consent-option-description">These cookies are necessary for the website to function and cannot be switched off.</p>
                </div>
                <div class="consent-option">
                    <div class="consent-option-header">
                        <h4>Analytics Cookies</h4>
                        <label class="consent-toggle">
                            <input type="checkbox" id="consent-analytics">
                            <span class="consent-toggle-slider"></span>
                        </label>
                    </div>
                    <p class="consent-option-description">These cookies help us understand how visitors interact with our website by collecting information anonymously.</p>
                </div>
                <div class="consent-option">
                    <div class="consent-option-header">
                        <h4>Advertising Cookies</h4>
                        <label class="consent-toggle">
                            <input type="checkbox" id="consent-ads">
                            <span class="consent-toggle-slider"></span>
                        </label>
                    </div>
                    <p class="consent-option-description">These cookies may be set by our advertising partners to build a profile of your interests and show you relevant ads.</p>
                </div>
                <div class="consent-option">
                    <div class="consent-option-header">
                        <h4>Personalization Cookies</h4>
                        <label class="consent-toggle">
                            <input type="checkbox" id="consent-personalization">
                            <span class="consent-toggle-slider"></span>
                        </label>
                    </div>
                    <p class="consent-option-description">These cookies enable enhanced functionality and personalization, such as remembering your preferences.</p>
                </div>
            </div>
            <div class="consent-modal-footer">
                <button id="consent-save-settings" class="consent-btn consent-btn-primary">Save Preferences</button>
            </div>
        </div>
    </div>

</body>
```

## Pages That Need Integration

### Main Pages (Priority: HIGH)
- [x] index.html ✅ COMPLETED
- [x] methodology.html ✅ COMPLETED  
- [ ] about.html
- [ ] contact.html
- [ ] privacy-policy.html (also needs content update - see below)
- [ ] terms.html

### Blog Pages (Priority: HIGH)
- [ ] blog/index.html
- [ ] blog/sat-score-calculator-guide.html
- [ ] blog/accurate-sat-score-calculator.html
- [ ] blog/complete-sat-study-schedule-3-month-prep-plan.html
- [ ] blog/digital-sat-vs-paper-sat-2025.html
- [ ] blog/dsat-score-calculator.html
- [ ] blog/how-to-improve-sat-score-200-points.html
- [ ] blog/sat-math-score-calculator.html
- [ ] blog/sat-reading-strategies.html
- [ ] blog/sat-score-predictor.html
- [ ] blog/sat-score-requirements-top-universities.html

### Tool Pages (Priority: HIGH)
- [ ] tools/sat-superscore-calculator/index.html
- [ ] tools/psat-to-sat-predictor/index.html
- [ ] tools/master-gpa-calculator/index.html

## Privacy Policy Content Update

Add this new section after "Cookies & Similar Technologies" in `privacy-policy.html`:

```html
<h2>Consent Management & Your Control</h2>
<p>We respect your privacy choices and provide you with full control over non-essential cookies. When you first visit our website, you'll see a consent banner allowing you to:</p>

<h3>Your Consent Options</h3>
<ul>
    <li><strong>Accept All:</strong> Consent to all cookie categories including analytics, advertising, and personalization cookies.</li>
    <li><strong>Reject All:</strong> Only essential cookies will be used. Analytics, advertising, and personalization cookies will be blocked.</li>
    <li><strong>Customize:</strong> Choose which specific cookie categories you want to allow. You can enable or disable each category individually.</li>
</ul>

<h3>Managing Your Consent</h3>
<p>You can change your cookie preferences at any time by:</p>
<ul>
    <li>Clicking the "Manage Consent" button: <button onclick="window.ConsentManager && window.ConsentManager.showSettings()" style="padding:0.5rem 1rem;background:#0070f3;color:white;border:none;border-radius:4px;cursor:pointer;">Manage Cookie Preferences</button></li>
    <li>Using your browser settings to block or delete cookies</li>
    <li>Visiting this page and updating your preferences</li>
</ul>

<h3>Google Consent Mode v2</h3>
<p>We implement Google Consent Mode v2, which ensures that Google services (Analytics and AdSense) only operate according to your consent choices. This means:</p>
<ul>
    <li>If you deny consent, analytics and advertising cookies will not be set</li>
    <li>Google services will operate in a privacy-enhanced mode</li>
    <li>Your choices are stored locally in your browser and persist across sessions</li>
    <li>You can withdraw consent at any time using the "Manage Consent" button above</li>
</ul>

<h3>Cookie Retention</h3>
<p>Your consent choices are stored in your browser's local storage and will be remembered for future visits. If you clear your browser data, you will need to set your preferences again.</p>
```

Also update the "Cookies & Similar Technologies" section to list the four cookie types:

```html
<h3>Types of Cookies We Use</h3>
<ul>
    <li><strong>Essential Cookies:</strong> Necessary for the website to function properly. You cannot opt-out of essential cookies.</li>
    <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website through Google Analytics 4.</li>
    <li><strong>Advertising Cookies:</strong> May be set by advertising partners to show you relevant advertisements.</li>
    <li><strong>Personalization Cookies:</strong> Enable enhanced functionality and personalization.</li>
</ul>
```

## Testing Checklist

After integration, test each page:

1. **Banner Appearance:**
   - [ ] Banner appears on first visit
   - [ ] Banner doesn't appear after accepting/rejecting
   - [ ] Banner is mobile responsive

2. **Functionality:**
   - [ ] "Accept All" grants all consents
   - [ ] "Reject All" only allows essential cookies
   - [ ] "Customize" opens settings modal
   - [ ] Settings modal allows individual toggles
   - [ ] "Save Preferences" stores choices

3. **Consent Persistence:**
   - [ ] Choices persist across page navigation
   - [ ] Choices persist after browser close/reopen
   - [ ] Analytics loads only after consent
   - [ ] AdSense loads only after consent

4. **Privacy Policy:**
   - [ ] "Manage Consent" button works
   - [ ] New sections are visible
   - [ ] All links work correctly

## Important Notes

1. **Google Consent Mode v2 is REQUIRED** for AdSense approval in EU/UK
2. **Consent banner must appear** before any analytics or ads load
3. **Choices must be respected** - scripts should not load if denied
4. **Privacy Policy must be updated** with consent management information

## Support Resources

- Google Consent Mode v2 Documentation: https://developers.google.com/tag-platform/security/guides/consent
- TCF v2.0 Framework: https://iabeurope.eu/tcf-2-0/
- GDPR Compliance Guide: https://gdpr.eu/cookies/

## Quick Copy-Paste Snippets

### For HEAD section (all pages):
Copy from lines 17-36 of `/index.html`

### For before </body> (all pages):
Copy from lines 1771-1845 of `/index.html`

### For Privacy Policy content:
See "Privacy Policy Content Update" section above

---

**Status:** 2 of 17 pages complete (methodology.html, index.html)
**Priority:** Complete all main pages first, then blog pages, then tool pages
**Estimated Time:** 2-3 hours for manual updates
