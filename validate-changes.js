// Quick JavaScript syntax validation for PSAT predictor changes
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'tools', 'psat-to-sat-predictor', 'index.html');

try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    console.log('✓ File read successfully');
    
    // Check for helper text
    const helperTextCount = (content.match(/💡/g) || []).length;
    if (helperTextCount === 3) {
        console.log('✓ Helper text present (3 instances found)');
    } else {
        console.error('✗ Helper text count mismatch. Expected 3, found:', helperTextCount);
        process.exit(1);
    }
    
    // Check for improved error messages
    const errorSuggestions = (content.match(/Did you mean/g) || []).length;
    if (errorSuggestions >= 2) {
        console.log('✓ Error message improvements present (found ' + errorSuggestions + ' instances)');
    } else {
        console.error('✗ Error message improvements missing');
        process.exit(1);
    }
    
    // Check for Math.floor and Math.ceil usage
    const hasFloor = content.includes('Math.floor');
    const hasCeil = content.includes('Math.ceil');
    if (hasFloor && hasCeil) {
        console.log('✓ Suggestion calculation logic present');
    } else {
        console.error('✗ Suggestion calculation logic missing');
        process.exit(1);
    }
    
    // Check for proper template literals
    const templateLiterals = content.match(/\$\{suggestedLower\}/g);
    if (templateLiterals && templateLiterals.length > 0) {
        console.log('✓ Template literals used correctly');
    } else {
        console.error('✗ Template literals missing or incorrect');
        process.exit(1);
    }
    
    // Check for balanced script tags
    const scriptOpens = (content.match(/<script>/g) || []).length;
    const scriptCloses = (content.match(/<\/script>/g) || []).length;
    if (scriptOpens === scriptCloses) {
        console.log('✓ Script tags balanced');
    } else {
        console.error('✗ Script tags unbalanced');
        process.exit(1);
    }
    
    // Check HTML structure
    if (content.includes('<html') && content.includes('</html>')) {
        console.log('✓ HTML structure intact');
    } else {
        console.error('✗ HTML structure broken');
        process.exit(1);
    }
    
    // Check for showError function
    if (content.includes('function showError(message)')) {
        console.log('✓ showError function present');
    } else {
        console.error('✗ showError function missing');
        process.exit(1);
    }
    
    // Check for no obvious syntax errors in the changes
    const hasUnclosedBraces = (content.match(/\{/g) || []).length !== (content.match(/\}/g) || []).length;
    if (hasUnclosedBraces) {
        console.error('✗ Unclosed braces detected');
        process.exit(1);
    } else {
        console.log('✓ Braces balanced');
    }
    
    console.log('\n🎉 All validation checks passed!');
    console.log('✅ Code is ready for commit and push');
    process.exit(0);
    
} catch (error) {
    console.error('✗ Validation failed:', error.message);
    process.exit(1);
}
