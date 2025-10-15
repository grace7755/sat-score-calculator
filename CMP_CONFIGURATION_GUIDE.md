# CMP Configuration Guide for Google AdSense Approval

## Overview

Your site now has a complete IAB TCF v2.2-compliant CMP framework in place, but **requires one final step**: configuring your actual CMP provider ID. This guide walks you through that process.

## Current Status

✅ **Completed:**
- CMP framework deployed (`cmp-config.js`)
- CMP script loaded on all 22 pages site-wide
- Google Consent Mode v2 integration ready
- Fallback consent UI standardized
- AdSense gating implemented
- Header configuration fixed (vercel.json)

❌ **Pending:**
- Replace `YOUR_CMP_ID_HERE` with actual CMP provider ID

## Step 1: Choose a Google-Certified CMP Provider

Select ONE of these IAB TCF v2.2-certified providers:

### Option A: **Cookiebot** (Recommended)
- **Website**: https://cookiebot.com
- **Setup Time**: ~15-30 minutes
- **Cost**: Free tier available + paid plans
- **Steps**:
  1. Sign up at cookiebot.com
  2. Add your domain: `satscorecalculator.io`
  3. Go to **Settings** → **Integration** → **Copy Domain Group ID**
  4. ID format: `{something}-{something}-{something}`

### Option B: **OneTrust**
- **Website**: https://www.onetrust.com/products/cookie-consent/
- **Setup Time**: ~20-40 minutes
- **Cost**: Free tier available + paid plans
- **Steps**:
  1. Sign up at onetrust.com
  2. Add your domain
  3. Go to **Integrations** → **Copy Client ID**

### Option C: **CookieYes**
- **Website**: https://www.cookieyes.com
- **Setup Time**: ~10-20 minutes
- **Cost**: Free tier available + paid plans
- **Steps**:
  1. Sign up at cookieyes.com
  2. Add your domain
  3. Copy **Cookie Script ID** from dashboard

## Step 2: Update CMP Configuration

Once you have your CMP ID, update `cmp-config.js`:

### Location: Line 14 in `cmp-config.js`

**Current (Placeholder):**
```javascript
const CMP_CONFIG = {
    provider: 'cookiebot', // Options: 'cookiebot', 'onetrust', 'cookieyes'
    id: 'YOUR_CMP_ID_HERE', // Replace with your CMP Domain Group ID
    language: 'en',
    autoLoad: true,
    tcfVersion: '2.2'
};
```

**Example (Cookiebot):**
```javascript
const CMP_CONFIG = {
    provider: 'cookiebot',
    id: 'abc123def456ghi789jkl012mnop345', // Your actual Cookiebot Domain Group ID
    language: 'en',
    autoLoad: true,
    tcfVersion: '2.2'
};
```

**Example (OneTrust):**
```javascript
const CMP_CONFIG = {
    provider: 'onetrust',
    id: 'xyz789uvw456rst123pqr890', // Your actual OneTrust Client ID
    language: 'en',
    autoLoad: true,
    tcfVersion: '2.2'
};
```

**Example (CookieYes):**
```javascript
const CMP_CONFIG = {
    provider: 'cookieyes',
    id: 'your-cookie-script-id-here', // Your actual CookieYes Script ID
    language: 'en',
    autoLoad: true,
    tcfVersion: '2.2'
};
```

## Step 3: Test the Configuration

### Local Testing:
1. Replace the CMP ID in `cmp-config.js`
2. Open your site: https://localhost:3000 (or your dev environment)
3. Open **DevTools** → **Console**
4. Check for errors related to CMP loading
5. If no errors, the CMP is loading correctly

### Live Testing (on production):
1. Deploy changes to https://satscorecalculator.io
2. Open DevTools → **Console**
3. Run this command:
   ```javascript
   console.log('CMP ID:', CMP_CONFIG.id);
   console.log('CMP Provider:', CMP_CONFIG.provider);
   ```
4. Verify output shows your actual CMP ID (not `YOUR_CMP_ID_HERE`)

### EU/UK Verification:
- Use a **VPN set to EU/UK** or use browser DevTools to simulate EU location
- Visit https://satscorecalculator.io
- Consent banner should appear (if using certified CMP with proper TCF string)
- Click "Customize" to verify consent modal works correctly

## Step 4: Verify with Lighthouse (Optional)

After configuring CMP, run a **Lighthouse audit** to check:
1. DevTools → **Lighthouse** → Run audit
2. Check for any consent-related warnings
3. Verify "Performance" score is maintained (CMP adds minimal overhead)

## What Happens After CMP Configuration?

### ✅ For EU/UK Users:
1. Page loads → **Google Consent Mode v2 defaults to DENIED**
2. CMP script loads → **Generates IAB TCF v2.2 consent string**
3. User interacts with consent banner → **Consent updates transmitted**
4. After consent → **AdSense loads on trusted signal from CMP**

### ✅ For Non-EU/UK Users:
1. Page loads → Consent defaults to DENIED
2. CMP may skip consent banner (depending on provider settings)
3. Site analytics and ads load after 2-second wait window
4. Experience remains unchanged

## Troubleshooting

### Problem: CMP not loading
**Solution**: Check browser console for errors. Verify:
- CMP ID is correct (no spaces, exact format from provider)
- Provider name matches one of: `'cookiebot'`, `'onetrust'`, `'cookieyes'`
- No typos in `cmp-config.js`

### Problem: "YOUR_CMP_ID_HERE still showing in console"
**Solution**: You haven't replaced the placeholder yet. Follow Step 2 above.

### Problem: Consent banner not appearing
**Solution**: 
- Check if you're accessing from EU/UK IP
- Verify CMP is configured correctly
- Check browser console for errors
- Fallback banner should still work (shows after 2-second wait)

### Problem: AdSense still not approving
**Solution**: 
- Ensure CMP is properly configured (this is Step 1 of AdSense approval)
- After CMP setup, reapply to AdSense with URL: https://satscorecalculator.io
- AdSense will verify TCF compliance and your site

## Files Modified

- **`cmp-config.js`** — Main CMP configuration file (you need to edit line 14)
- **`vercel.json`** — Fixed header configuration (removed Content-Encoding header)
- **`terms.html`** — CMP script already included
- **All HTML pages** — CMP scripts already deployed site-wide

## Quick Checklist

- [ ] Choose a CMP provider (Cookiebot recommended)
- [ ] Sign up and add your domain
- [ ] Copy your CMP ID
- [ ] Replace `YOUR_CMP_ID_HERE` in `cmp-config.js` line 14
- [ ] Test locally to verify no console errors
- [ ] Deploy to production
- [ ] Test from EU/UK IP to see TCF consent string
- [ ] Reapply to Google AdSense for approval

## Next Steps After CMP Setup

1. **Wait 24-48 hours** for CMP configuration to fully propagate
2. **Reapply to Google AdSense** with your domain
3. **Submit for review** — AdSense will verify:
   - ✅ CMP is Google-certified (TCF v2.2)
   - ✅ Consent string is properly generated
   - ✅ AdSense loads only after consent
   - ✅ Privacy policies are in place

## Support

If you encounter issues:
1. Check your CMP provider's documentation
2. Review browser console for error messages
3. Verify your CMP ID format matches provider's requirements
4. Contact your CMP provider's support team

## Additional Resources

- [IAB TCF v2.2 Specification](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework)
- [Google Consent Mode Documentation](https://support.google.com/analytics/answer/9976101)
- [AdSense GDPR Compliance](https://support.google.com/adsense/answer/7666014)

---

**Status**: Site is 99% ready for AdSense approval. Complete CMP configuration to finalize compliance.
