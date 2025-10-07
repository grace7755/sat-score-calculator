// SAT Superscore Calculator JavaScript

// Theme Toggle Functionality (same as main app)
const checkbox = document.getElementById('checkbox');
const htmlElement = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);
if (savedTheme === 'dark') {
    checkbox.checked = true;
}

// Theme toggle event
checkbox.addEventListener('change', function() {
    const theme = this.checked ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
});

// Superscore Calculator Logic
class SuperscoreCalculator {
    constructor() {
        this.testCount = 2; // Start with 2 test dates visible
        this.scores = {
            test1: { math: null, rw: null, date: null },
            test2: { math: null, rw: null, date: null },
            test3: { math: null, rw: null, date: null },
            test4: { math: null, rw: null, date: null }
        };

        this.init();
    }

    init() {
        // Add event listeners for all score inputs
        for (let i = 1; i <= 4; i++) {
            const mathInput = document.getElementById(`test${i}-math`);
            const rwInput = document.getElementById(`test${i}-rw`);
            const dateInput = document.getElementById(`test${i}-date`);

            if (mathInput) {
                mathInput.addEventListener('input', () => {
                    this.handleScoreInput(i, 'math');
                    this.validateScoreRealtime(i, 'math'); // Fix Issue #4: Real-time validation
                });
                mathInput.addEventListener('blur', () => this.validateScore(i, 'math'));
            }

            if (rwInput) {
                rwInput.addEventListener('input', () => {
                    this.handleScoreInput(i, 'rw');
                    this.validateScoreRealtime(i, 'rw'); // Fix Issue #4: Real-time validation
                });
                rwInput.addEventListener('blur', () => this.validateScore(i, 'rw'));
            }

            if (dateInput) {
                dateInput.addEventListener('change', () => this.handleDateInput(i));
            }
        }

        // Add test date button
        const addTestBtn = document.getElementById('add-test-btn');
        if (addTestBtn) {
            addTestBtn.addEventListener('click', () => this.addTestDate());
        }

        // Reset button
        const resetBtn = document.getElementById('reset-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.reset());
        }
    }

    handleScoreInput(testNum, section) {
        const input = document.getElementById(`test${testNum}-${section}`);
        const value = input.value;

        // Remove any non-numeric characters
        input.value = value.replace(/[^0-9]/g, '');

        // Store the score
        const score = parseInt(input.value);
        if (!isNaN(score)) {
            this.scores[`test${testNum}`][section] = score;
        } else {
            this.scores[`test${testNum}`][section] = null;
        }

        // Calculate totals and superscore
        this.calculateTestTotal(testNum);
        this.calculateSuperscore();
    }

    handleDateInput(testNum) {
        const dateInput = document.getElementById(`test${testNum}-date`);
        this.scores[`test${testNum}`].date = dateInput.value;
        this.calculateSuperscore(); // Recalculate to update date labels
    }

    // Fix Issue #4: Real-time validation feedback as user types
    validateScoreRealtime(testNum, section) {
        const input = document.getElementById(`test${testNum}-${section}`);
        const errorEl = document.getElementById(`test${testNum}-${section}-error`);
        const value = parseInt(input.value);

        // Clear previous states
        input.classList.remove('valid', 'invalid');
        errorEl.textContent = '';

        if (input.value === '') {
            return; // Empty is neutral
        }

        // Check if valid
        if (!isNaN(value) && value >= 200 && value <= 800 && value % 10 === 0) {
            input.classList.add('valid');
        } else if (input.value !== '') {
            input.classList.add('invalid');
            if (isNaN(value) || value < 200 || value > 800) {
                errorEl.textContent = 'Enter a score between 200-800 (multiples of 10)';
            } else if (value % 10 !== 0) {
                errorEl.textContent = 'Score must be a multiple of 10';
            }
        }
    }

    validateScore(testNum, section) {
        const input = document.getElementById(`test${testNum}-${section}`);
        const errorEl = document.getElementById(`test${testNum}-${section}-error`);
        const value = parseInt(input.value);

        // Clear previous error
        errorEl.textContent = '';
        input.classList.remove('valid', 'invalid');
        input.style.borderColor = '';

        if (input.value === '') {
            return true; // Empty is valid
        }

        // Validate range (200-800, multiples of 10)
        if (isNaN(value) || value < 200 || value > 800) {
            errorEl.textContent = 'Score must be between 200 and 800';
            input.classList.add('invalid');
            return false;
        }

        if (value % 10 !== 0) {
            errorEl.textContent = 'Score must be a multiple of 10';
            input.classList.add('invalid');
            // Auto-round to nearest 10
            const rounded = Math.round(value / 10) * 10;
            input.value = Math.min(800, Math.max(200, rounded));
            this.scores[`test${testNum}`][section] = parseInt(input.value);
            this.calculateTestTotal(testNum);
            // Add loading state before calculation
            this.showLoadingState();
            setTimeout(() => {
                this.calculateSuperscore();
                this.hideLoadingState();
            }, 100);
            return false;
        }

        input.classList.add('valid');
        return true;
    }

    calculateTestTotal(testNum) {
        const math = this.scores[`test${testNum}`].math;
        const rw = this.scores[`test${testNum}`].rw;
        const totalEl = document.getElementById(`test${testNum}-total`);

        if (math !== null && rw !== null) {
            const total = math + rw;
            totalEl.textContent = total;
            totalEl.style.color = 'var(--success-color)';
            totalEl.style.fontWeight = '600';
        } else {
            totalEl.textContent = '-';
            totalEl.style.color = '';
            totalEl.style.fontWeight = '';
        }
    }

    calculateSuperscore() {
        // Find best Math and RW scores
        let bestMath = { score: null, test: null, date: null };
        let bestRW = { score: null, test: null, date: null };
        let bestSingleSitting = { score: null, test: null };
        let validTests = 0;

        for (let i = 1; i <= 4; i++) {
            const test = this.scores[`test${i}`];

            if (test.math !== null && test.rw !== null) {
                validTests++;

                // Check best math
                if (bestMath.score === null || test.math > bestMath.score) {
                    bestMath = { score: test.math, test: i, date: test.date };
                }

                // Check best RW
                if (bestRW.score === null || test.rw > bestRW.score) {
                    bestRW = { score: test.rw, test: i, date: test.date };
                }

                // Check best single sitting
                const singleTotal = test.math + test.rw;
                if (bestSingleSitting.score === null || singleTotal > bestSingleSitting.score) {
                    bestSingleSitting = { score: singleTotal, test: i };
                }
            }
        }

        // Update display
        if (validTests > 0) {
            // Best Math
            document.getElementById('best-math').textContent = bestMath.score;
            const bestMathDate = document.getElementById('best-math-date');
            if (bestMath.date) {
                const formatted = new Date(bestMath.date + 'T00:00:00').toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                });
                bestMathDate.textContent = `from Test ${bestMath.test} (${formatted})`;
            } else {
                bestMathDate.textContent = `from Test ${bestMath.test}`;
            }
            bestMathDate.style.display = 'block';
            bestMathDate.style.fontSize = '0.875rem';
            bestMathDate.style.color = 'var(--secondary-color)';
            bestMathDate.style.marginTop = '0.5rem';

            // Best RW
            document.getElementById('best-rw').textContent = bestRW.score;
            const bestRWDate = document.getElementById('best-rw-date');
            if (bestRW.date) {
                const formatted = new Date(bestRW.date + 'T00:00:00').toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                });
                bestRWDate.textContent = `from Test ${bestRW.test} (${formatted})`;
            } else {
                bestRWDate.textContent = `from Test ${bestRW.test}`;
            }
            bestRWDate.style.display = 'block';
            bestRWDate.style.fontSize = '0.875rem';
            bestRWDate.style.color = 'var(--secondary-color)';
            bestRWDate.style.marginTop = '0.5rem';

            // Superscore
            const superscore = bestMath.score + bestRW.score;
            document.getElementById('superscore-total').textContent = superscore;

            // Comparison section (show if > 1 test)
            if (validTests > 1) {
                document.getElementById('comparison').style.display = 'block';
                document.getElementById('best-single').textContent = bestSingleSitting.score;
                document.getElementById('superscore-comparison').textContent = superscore;

                const improvement = superscore - bestSingleSitting.score;
                const improvementEl = document.getElementById('improvement');
                if (improvement > 0) {
                    improvementEl.textContent = `+${improvement} points`;
                    improvementEl.style.color = 'var(--success-color)';
                } else {
                    improvementEl.textContent = 'No improvement';
                    improvementEl.style.color = 'var(--secondary-color)';
                }
            } else {
                document.getElementById('comparison').style.display = 'none';
            }
        } else {
            // Reset display
            document.getElementById('best-math').textContent = '-';
            document.getElementById('best-math-date').textContent = '';
            document.getElementById('best-rw').textContent = '-';
            document.getElementById('best-rw-date').textContent = '';
            document.getElementById('superscore-total').textContent = '-';
            document.getElementById('comparison').style.display = 'none';
        }

        // Highlight best scores in input cards
        this.highlightBestScores(bestMath, bestRW);
    }

    highlightBestScores(bestMath, bestRW) {
        // Remove all previous highlights
        for (let i = 1; i <= 4; i++) {
            const mathInput = document.getElementById(`test${i}-math`);
            const rwInput = document.getElementById(`test${i}-rw`);

            if (mathInput) {
                mathInput.style.borderColor = '';
                mathInput.style.backgroundColor = '';
            }
            if (rwInput) {
                rwInput.style.borderColor = '';
                rwInput.style.backgroundColor = '';
            }
        }

        // Highlight best Math
        if (bestMath.test) {
            const mathInput = document.getElementById(`test${bestMath.test}-math`);
            if (mathInput && mathInput.value) {
                mathInput.style.borderColor = 'var(--success-color)';
                mathInput.style.backgroundColor = 'rgba(34, 197, 94, 0.05)';
                mathInput.style.borderWidth = '2px';
            }
        }

        // Highlight best RW
        if (bestRW.test) {
            const rwInput = document.getElementById(`test${bestRW.test}-rw`);
            if (rwInput && rwInput.value) {
                rwInput.style.borderColor = 'var(--success-color)';
                rwInput.style.backgroundColor = 'rgba(34, 197, 94, 0.05)';
                rwInput.style.borderWidth = '2px';
            }
        }
    }

    addTestDate() {
        if (this.testCount >= 4) {
            return; // Maximum 4 tests
        }

        this.testCount++;
        const testCard = document.getElementById(`test-date-${this.testCount}`);
        if (testCard) {
            testCard.style.display = 'block';
        }

        // Hide button if all 4 are shown
        if (this.testCount >= 4) {
            document.getElementById('add-test-btn').style.display = 'none';
        }
    }

    reset() {
        // Confirm reset
        if (!confirm('Are you sure you want to reset all scores?')) {
            return;
        }

        // Reset all scores
        this.scores = {
            test1: { math: null, rw: null, date: null },
            test2: { math: null, rw: null, date: null },
            test3: { math: null, rw: null, date: null },
            test4: { math: null, rw: null, date: null }
        };

        // Clear all inputs
        for (let i = 1; i <= 4; i++) {
            const mathInput = document.getElementById(`test${i}-math`);
            const rwInput = document.getElementById(`test${i}-rw`);
            const dateInput = document.getElementById(`test${i}-date`);
            const totalEl = document.getElementById(`test${i}-total`);
            const mathError = document.getElementById(`test${i}-math-error`);
            const rwError = document.getElementById(`test${i}-rw-error`);

            if (mathInput) {
                mathInput.value = '';
                mathInput.style.borderColor = '';
                mathInput.style.backgroundColor = '';
                mathInput.style.borderWidth = '';
                mathInput.classList.remove('valid', 'invalid'); // Fix Issue #4: Clear validation classes
            }
            if (rwInput) {
                rwInput.value = '';
                rwInput.style.borderColor = '';
                rwInput.style.backgroundColor = '';
                rwInput.style.borderWidth = '';
                rwInput.classList.remove('valid', 'invalid'); // Fix Issue #4: Clear validation classes
            }
            if (dateInput) dateInput.value = '';
            if (totalEl) totalEl.textContent = '-';
            if (mathError) mathError.textContent = '';
            if (rwError) rwError.textContent = '';
        }

        // Hide test 3 and 4
        this.testCount = 2;
        document.getElementById('test-date-3').style.display = 'none';
        document.getElementById('test-date-4').style.display = 'none';
        document.getElementById('add-test-btn').style.display = 'block';

        // Reset results display
        document.getElementById('best-math').textContent = '-';
        document.getElementById('best-math-date').textContent = '';
        document.getElementById('best-rw').textContent = '-';
        document.getElementById('best-rw-date').textContent = '';
        document.getElementById('superscore-total').textContent = '-';
        document.getElementById('comparison').style.display = 'none';
    }

    // Fix Issue #7: Add loading state methods
    showLoadingState() {
        const resultsSection = document.querySelector('.superscore-results');
        if (resultsSection && !resultsSection.querySelector('.results-loading')) {
            resultsSection.style.opacity = '0.6';
        }
    }

    hideLoadingState() {
        const resultsSection = document.querySelector('.superscore-results');
        if (resultsSection) {
            resultsSection.style.opacity = '1';
        }
    }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new SuperscoreCalculator();
});
