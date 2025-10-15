# Google-Certified CMP Setup Guide

## Overview

This guide explains how to configure a Google-certified Consent Management Platform (CMP) with IAB Transparency & Consent Framework (TCF) v2.2 for AdSense compliance, particularly for EU/UK traffic.

## Why You Need a Certified CMP

### AdSense Requirements:
1. **EU/UK Compliance**: Google requires a certified CMP for serving ads to EU/UK users under GDPR
2. **TCF String**: A certified CMP generates IAB TCF consent strings that Google can read
3. **Proper Consent Flow**: Ensures ads only load after explicit user consent
4. **Approval Requirement**: Some AdSense applications require certified CMP implementation

### What Was Fixed:
✅ **Removed all direct AdSense script tags** from all pages  
✅ **Created CMP integration framework** (`cmp-config.js`)  
✅ **Fixed consent key mismatches** (removed legacy `advertising` → now uses `ads`)  
✅ **Centralized consent management** - AdSense loads only via `ConsentManager.loadAdSense()`  

## Current Setup (Fallback Mode)

Your site currently works in **fallback mode** with a custom consent banner. This is acceptable for:
- ✅ Non-EU/UK traffic
- ✅ Initial testing and development
- ✅ Sites without EU/UK visitors

**However**, for full AdSense compliance with EU/UK traffic, you must configure a certified CMP.

## Recommended CMP Providers

### 1. Cookiebot (Recommended for Small Sites)
- **Free Tier**: Up to 100 pages
- **TCF v2.2 Certified**: ✅
- **Easy Setup**: Simplest integration
- **Cost**: Free → $9/month
- **Website**: https://www.cookiebot.com/

### 2. OneTrust
- **Enterprise Grade**: Best for large sites
- **TCF v2.2 Certified**: ✅
- **Advanced Features**: Multi-region support
- **Cost**: Contact for pricing (typically $1000+/year)
- **Website**: https://www.onetrust.com/

### 3. CookieYes
- **Budget Friendly**: Good middle option
- **TCF v2.2 Certified**: ✅
- **Good Support**: Responsive team
- **Cost**: Free → $49/year
- **Website**: https://www.cookieyes.com/

## Setup Instructions

### Step 1: Sign Up for a CMP

Choose one of the providers above and sign up for an account.

**For Cookiebot (Recommended):**
1. Go to https://www.cookiebot.com/
2. Click "Sign up free"
3. Add your domain: `satscorecalculator.io`
4. Complete the setup wizard
5. Get your **Domain Group ID** (looks like: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

### Step 2: Configure the CMP ID

Open `cmp-config.js` and update the configuration:

```javascript
const CMP_CONFIG = {
    provider: 'cookiebot',  // Options: 'cookiebot', 'onetrust', 'cookieyes'
    id: 'YOUR_ACTUAL_CMP_ID_HERE',  // Replace with your Domain Group ID
    language: 'en',
    autoLoad: true,
    tcfVersion: '2.2'
};
```

**Example for Cookiebot:**
```javascript
const CMP_CONFIG = {
    provider: 'cookiebot',
    id: '12345678-abcd-efgh-ijkl-123456789012',  // Your actual ID
    language: 'en',
    autoLoad: true,
    tcfVersion: '2.2'
};
```

### Step 3: Test the Integration

1. **Clear your browser cache and cookies**
2. **Visit your site**: https://satscorecalculator.io/
3. **You should see**: The CMP's consent banner (not the fallback banner)
4. **Open DevTools Console** and verify:
   ```
   ✅ CMP configuration loaded: cookiebot
   ```

### Step 4: Verify TCF String Generation

1. **Open browser DevTools Console**
2. **Type**: `getTCFString()`
3. **You should see**:
   ```
   TCF String: CO1Z_qJO1Z_qJAHABBENCCCsAP_AAH_AAAqIH...
   TCF Consent: {1: true, 2: true, ...}
   Vendor Consents: {755: true, ...}
   ```

If you see this, your CMP is working correctly!

### Step 5: Test Consent Flow

1. **Visit site** → CMP banner appears
2. **Click "Accept All"** → Open Network tab in DevTools
3. **Verify**: `adsbygoogle.js` loads AFTER consent (look in Network tab)
4. **Check Console**: You should see `✅ AdSense loaded after consent`

### Step 6: Test EU Compliance

Use a VPN or browser extension to test from an EU IP:
1. **Connect to EU VPN** (Germany, France, etc.)
2. **Visit site**
3. **Verify**: CMP shows TCF-compliant consent options
4. **Verify**: TCF string is generated

## Category Mapping

The CMP categories map to Google Consent Mode as follows:

| CMP Category | Google Consent Mode | Purpose |
|-------------|-------------------|---------|
| Marketing/Advertising | `ad_storage`, `ad_user_data`, `ad_personalization` | AdSense ads |
| Statistics/Analytics | `analytics_storage` | Google Analytics |
| Preferences/Functional | `personalization_storage` | User preferences |
| Essential/Necessary | `functionality_storage`, `security_storage` | Always granted |

## Fallback Behavior

If CMP is not configured (`id: 'YOUR_CMP_ID_HERE'`), the site will:
1. Display a warning in console: `⚠️ CMP not configured`
2. Use the custom consent banner (`consent-banner.html`)
3. Still respect Google Consent Mode v2
4. Still gate AdSense behind consent

**This fallback is acceptable for non-EU traffic but not recommended for EU/UK compliance.**

## Testing Checklist

- [ ] CMP banner appears on first visit
- [ ] Custom fallback banner does NOT appear (if CMP configured)
- [ ] AdSense script does NOT load before consent
- [ ] Click "Accept All" → AdSense loads
- [ ] Check Network tab → No pre-consent ad requests
- [ ] Console shows: `✅ CMP configuration loaded`
- [ ] Console shows: `✅ AdSense loaded after consent`
- [ ] TCF string generated (EU users): `getTCFString()` works
- [ ] Consent persists across page loads
- [ ] "Reject All" works correctly (no ads load)

## Advanced Configuration

### Custom Consent Modal Styling

Most CMPs allow custom CSS. Add branding to match your site:

**For Cookiebot:**
1. Go to Cookiebot dashboard
2. Navigate to "Design & UI"
3. Customize colors, fonts, and button styles
4. Match your site's design (`--primary-color: #000`)

### Multi-Language Support

```javascript
const CMP_CONFIG = {
    provider: 'cookiebot',
    id: 'YOUR_CMP_ID_HERE',
    language: 'auto',  // Auto-detect user language
    autoLoad: true,
    tcfVersion: '2.2'
};
```

### Regional Targeting

Configure different consent requirements per region:

```javascript
// For Cookiebot, set in dashboard:
// Settings → Geolocation → Configure by region
// - EU/UK: Opt-in (TCF)
// - US: Implied consent
// - Other: Warning banner
```

## Troubleshooting

### CMP Banner Not Appearing

**Check:**
1. Is `cmp-config.js` loaded? (View source, search for `cmp-config.js`)
2. Is the CMP ID correct? (Check dashboard)
3. Browser cache cleared?
4. Console errors?

**Solution:**
```javascript
// Check if CMP loaded
console.log(window.CMPManager);  // Should show object
console.log(window.Cookiebot);    // Should show object (for Cookiebot)
```

### AdSense Still Loading Before Consent

**Check:**
1. Are there any remaining direct `<script>` tags for AdSense?
2. Run: `grep -r "pagead2.googlesyndication.com" .` (should find none)

**Verify all pages have removed:**
```html
<!-- This should NOT exist anymore -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6578959056593527"></script>
```

### TCF String Not Generated

**This means:**
- CMP is not properly loaded
- CMP is not TCF certified (check provider)
- Browser blocking CMP script

**Solution:**
1. Check CMP provider is IAB TCF v2.2 certified
2. Check browser extensions (disable ad blockers for testing)
3. Check CMP script loads: Network tab → Filter by domain

### Consent Not Persisting

**Check:**
1. Are cookies blocked in browser?
2. Is localStorage available?
3. Are third-party cookies enabled?

**Test:**
```javascript
// Check consent storage
console.log(localStorage.getItem('user_consent_preferences'));
console.log(document.cookie);
```

## Integration with AdSense

Once CMP is configured:

1. **AdSense will see the TCF string** in ad requests
2. **Google will honor consent choices** automatically
3. **Ads will only serve if consent granted**
4. **No manual ad tag changes needed**

## Updating After CMP Setup

After configuring CMP, update your Privacy Policy:

**Add to Privacy Policy:**
```markdown
We use [Cookiebot/OneTrust/CookieYes], a Google-certified Consent Management 
Platform that complies with IAB Transparency & Consent Framework (TCF) v2.2. 
This ensures your consent choices are respected across all advertising partners.
```

## Cost Considerations

### Free Tiers:
- **Cookiebot**: 100 pages free (perfect for your site)
- **CookieYes**: 5,000 pageviews/month free

### Paid Plans:
- **Cookiebot**: $9/month (up to 100 pages, unlimited pageviews)
- **CookieYes**: $49/year (25,000 pageviews/month)
- **OneTrust**: Contact for pricing (enterprise)

## Next Steps

1. ✅ **Choose a CMP provider** (Recommend: Cookiebot free tier)
2. ✅ **Sign up and get your CMP ID**
3. ✅ **Update `cmp-config.js` with your ID**
4. ✅ **Test thoroughly** using the checklist above
5. ✅ **Deploy to production**
6. ✅ **Monitor in AdSense dashboard** for approval

## Support & Resources

### Documentation:
- **Cookiebot**: https://www.cookiebot.com/en/developer/
- **OneTrust**: https://my.onetrust.com/s/topic/0TO1Q000000ItRyWAK/
- **CookieYes**: https://www.cookieyes.com/documentation/

### IAB TCF:
- **TCF v2.2 Spec**: https://iabeurope.eu/tcf-2-0/
- **Google Consent Mode**: https://support.google.com/analytics/answer/9976101

### Google AdSense:
- **Consent Requirements**: https://support.google.com/adsense/answer/10008200
- **EU Consent Policy**: https://support.google.com/adsense/answer/9760862

## Questions?

If you need help:
1. Check CMP provider documentation
2. Review browser console for errors
3. Test with `getTCFString()` command
4. Verify no direct AdSense scripts remain

---

**Summary:** The framework is in place. Simply add your CMP ID to `cmp-config.js` and your site will be fully compliant with AdSense requirements for EU/UK traffic!
