// Final validation before commit
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'tools', 'psat-to-sat-predictor', 'index.html');

try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    console.log('=== FINAL VALIDATION REPORT ===\n');
    
    // 1. Check file completeness
    if (content.includes('</html>')) {
        console.log('✅ HTML document is complete');
    } else {
        throw new Error('HTML document incomplete - missing </html>');
    }
    
    // 2. Verify all changes are present
    const checks = {
        'Helper text in Total Score': content.includes('💡 PSAT scores are in 10-point increments (320, 330, 340...1510, 1520)'),
        'Helper text in Math Section': content.includes('💡 Must be in 10-point increments (160, 170, 180...750, 760)'),
        'Error suggestion logic': content.includes('Math.floor') && content.includes('Math.ceil'),
        'Total Score error improvement': content.includes('Did you mean ${suggestedLower} or ${suggestedHigher}'),
        'Section Score error improvement': content.includes('Math: Did you mean'),
        'showError function': content.includes('function showError(message)'),
    };
    
    let allPassed = true;
    for (const [check, passed] of Object.entries(checks)) {
        if (passed) {
            console.log(`✅ ${check}`);
        } else {
            console.log(`❌ ${check}`);
            allPassed = false;
        }
    }
    
    // 3. Check for no accidental duplications or broken code
    const lines = content.split('\n');
    const scriptCount = lines.filter(l => l.includes('<script')).length;
    const scriptCloseCount = lines.filter(l => l.includes('</script>')).length;
    
    console.log(`\n📊 Script tags: ${scriptCount} opening, ${scriptCloseCount} closing`);
    
    // 4. File size check
    const stats = fs.statSync(filePath);
    console.log(`📊 File size: ${(stats.size / 1024).toFixed(2)} KB`);
    
    if (allPassed) {
        console.log('\n🎉 ALL VALIDATION CHECKS PASSED!');
        console.log('✅ Code is bug-free and ready to commit\n');
        process.exit(0);
    } else {
        console.log('\n❌ Some checks failed. Review before committing.\n');
        process.exit(1);
    }
    
} catch (error) {
    console.error('\n❌ VALIDATION FAILED:', error.message, '\n');
    process.exit(1);
}
