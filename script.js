// Score conversion tables based on official SAT guidelines
const RW_CONVERSION_TABLE = {
    54: 800, 53: 780, 52: 760, 51: 750, 50: 730, 49: 720, 48: 710, 47: 700,
    46: 690, 45: 680, 44: 670, 43: 660, 42: 650, 41: 640, 40: 630, 39: 620,
    38: 610, 37: 600, 36: 590, 35: 580, 34: 570, 33: 560, 32: 550, 31: 540,
    30: 530, 29: 520, 28: 510, 27: 500, 26: 490, 25: 480, 24: 470, 23: 460,
    22: 450, 21: 440, 20: 430, 19: 420, 18: 410, 17: 400, 16: 390, 15: 380,
    14: 370, 13: 360, 12: 350, 11: 340, 10: 330, 9: 320, 8: 310, 7: 300,
    6: 290, 5: 280, 4: 270, 3: 260, 2: 250, 1: 230, 0: 200
};

const MATH_CONVERSION_TABLE = {
    44: 800, 43: 790, 42: 770, 41: 760, 40: 750, 39: 730, 38: 720, 37: 710,
    36: 700, 35: 690, 34: 680, 33: 670, 32: 660, 31: 650, 30: 640, 29: 630,
    28: 620, 27: 610, 26: 600, 25: 590, 24: 580, 23: 570, 22: 560, 21: 550,
    20: 540, 19: 530, 18: 520, 17: 510, 16: 500, 15: 490, 14: 480, 13: 470,
    12: 460, 11: 450, 10: 440, 9: 430, 8: 420, 7: 410, 6: 400, 5: 390,
    4: 380, 3: 360, 2: 330, 1: 290, 0: 200
};

// DOM Elements
const inputs = {
    rwModule1: document.getElementById('rwModule1'),
    rwModule2: document.getElementById('rwModule2'),
    mathModule1: document.getElementById('mathModule1'),
    mathModule2: document.getElementById('mathModule2')
};

const outputs = {
    rwScore: document.getElementById('rwScore'),
    mathScore: document.getElementById('mathScore'),
    totalScore: document.getElementById('totalScore')
};

const scoreChart = document.getElementById('scoreChart');
let chart = null;

// Validate input with proper error handling
const validateInput = (input, max, errorId) => {
    const errorElement = document.getElementById(errorId);
    const value = parseInt(input.value);

    if (input.value === '') {
        errorElement.textContent = '';
        return false;
    }

    if (isNaN(value)) {
        errorElement.textContent = 'Please enter a valid number';
        return false;
    }

    if (value < 0 || value > max) {
        errorElement.textContent = `Please enter a number between 0 and ${max}`;
        return false;
    }

    errorElement.textContent = '';
    return true;
};

// Get scaled score from raw score
const getScaledScore = (rawScore, conversionTable) => {
    // Handle edge cases
    if (rawScore < 0) return 200;
    if (!conversionTable[rawScore]) return 200;
    return conversionTable[rawScore];
};

// Calculate scores with proper validation
const calculateScores = () => {
    // Validate all inputs
    const isRWModule1Valid = validateInput(inputs.rwModule1, 27, 'rwModule1Error');
    const isRWModule2Valid = validateInput(inputs.rwModule2, 27, 'rwModule2Error');
    const isMathModule1Valid = validateInput(inputs.mathModule1, 22, 'mathModule1Error');
    const isMathModule2Valid = validateInput(inputs.mathModule2, 22, 'mathModule2Error');

    // Only calculate if all inputs are valid
    if (isRWModule1Valid && isRWModule2Valid && isMathModule1Valid && isMathModule2Valid) {
        // Calculate Reading and Writing score
        const rwRawScore = parseInt(inputs.rwModule1.value) + parseInt(inputs.rwModule2.value);
        const rwScaled = getScaledScore(rwRawScore, RW_CONVERSION_TABLE);

        // Calculate Math score
        const mathRawScore = parseInt(inputs.mathModule1.value) + parseInt(inputs.mathModule2.value);
        const mathScaled = getScaledScore(mathRawScore, MATH_CONVERSION_TABLE);

        // Calculate total score
        const totalScaled = rwScaled + mathScaled;

        // Update display
        outputs.rwScore.textContent = rwScaled;
        outputs.mathScore.textContent = mathScaled;
        outputs.totalScore.textContent = totalScaled;

        // Update chart
        updateChart(rwScaled, mathScaled, totalScaled);
    }
};

// Update chart with new data
const updateChart = (rwScore, mathScore, totalScore) => {
    if (!chart) return;

    chart.data.datasets[0].data = [rwScore, mathScore, totalScore];
    chart.update('none'); // Use 'none' mode for smoother updates
};

// Initialize chart with proper configuration
const initializeChart = () => {
    if (!scoreChart) return;

    const ctx = scoreChart.getContext('2d');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const isLightTheme = !currentTheme || currentTheme === 'light';
    
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Reading & Writing', 'Math', 'Total'],
            datasets: [{
                label: 'SAT Scores',
                data: [0, 0, 0],
                backgroundColor: [
                    'rgba(0, 0, 0, 0.7)',
                    'rgba(0, 0, 0, 0.7)',
                    'rgba(0, 0, 0, 0.9)'
                ],
                borderColor: [
                    'rgba(0, 0, 0, 1)',
                    'rgba(0, 0, 0, 1)',
                    'rgba(0, 0, 0, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1600,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    ticks: {
                        stepSize: 200,
                        font: {
                            weight: 'bold'
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            weight: 'bold'
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: (context) => `Score: ${context.raw}`
                    }
                }
            }
        }
    });
};

// Add event listeners with proper handling
const addEventListeners = () => {
    Object.values(inputs).forEach(input => {
        if (!input) return;
        
        input.addEventListener('input', () => {
            calculateScores();
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                calculateScores();
            }
        });
    });
};

// Initialize calculator
document.addEventListener('DOMContentLoaded', () => {
    initializeChart();
    addEventListeners();
});

// Theme Switcher
const themeSwitch = document.getElementById('checkbox');
const currentTheme = localStorage.getItem('theme');

// Check for saved theme preference
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        themeSwitch.checked = true;
    }
}

// Theme switch handler
const handleThemeSwitch = (e) => {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        updateChartColors('dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        updateChartColors('light');
    }
};

// Update chart colors based on theme
const updateChartColors = (theme) => {
    if (!chart) return;
    
    const colors = theme === 'dark' ? {
        backgroundColor: [
            'rgba(96, 165, 250, 0.7)',   // Light blue
            'rgba(96, 165, 250, 0.7)',
            'rgba(96, 165, 250, 0.9)'
        ],
        borderColor: [
            'rgba(96, 165, 250, 1)',
            'rgba(96, 165, 250, 1)',
            'rgba(96, 165, 250, 1)'
        ],
        gridColor: 'rgba(241, 245, 249, 0.1)',  // Light grid lines
        tickColor: '#f1f5f9'                    // Light text
    } : {
        backgroundColor: [
            'rgba(0, 0, 0, 0.7)',
            'rgba(0, 0, 0, 0.7)',
            'rgba(0, 0, 0, 0.9)'
        ],
        borderColor: [
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)'
        ],
        gridColor: 'rgba(0, 0, 0, 0.1)',
        tickColor: '#000000'
    };

    chart.data.datasets[0].backgroundColor = colors.backgroundColor;
    chart.data.datasets[0].borderColor = colors.borderColor;
    chart.options.scales.y.grid.color = colors.gridColor;
    chart.options.scales.y.ticks.color = colors.tickColor;
    chart.options.scales.x.ticks.color = colors.tickColor;
    chart.update();
};

// Add theme switch event listener
themeSwitch.addEventListener('change', handleThemeSwitch);















