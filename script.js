// Dropdown menu functionality for Tools navigation
const initializeDropdown = () => {
    const dropdown = document.querySelector('.nav-dropdown');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    if (dropdownToggle && dropdownMenu && dropdown) {
        dropdownToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = dropdownMenu.classList.toggle('active');
            dropdownToggle.setAttribute('aria-expanded', isActive.toString());
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                dropdownMenu.classList.remove('active');
                dropdownToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
};

// Language switcher integration with xnx3/translate (keeping only what's needed)
const initializeLanguageSwitcher = () => {
    const languageSwitcher = document.getElementById('languageSwitcher');
    if (languageSwitcher) {
        const savedLang = localStorage.getItem('userLanguage') || 'en';
        languageSwitcher.value = savedLang;
        
        const langMap = {
            'en': 'english',
            'de': 'deutsch',
            'es': 'spanish'
        };
        
        if (savedLang !== 'en' && typeof translate !== 'undefined') {
            translate.changeLanguage(langMap[savedLang]);
        }
        
        languageSwitcher.addEventListener('change', function() {
            const selectedLang = this.value;
            localStorage.setItem('userLanguage', selectedLang);
            
            if (typeof translate !== 'undefined') {
                if (selectedLang === 'en') {
                    translate.changeLanguage('english');
                } else {
                    translate.changeLanguage(langMap[selectedLang]);
                }
            }
        });
    }
};

// Legacy translations object (kept for backwards compatibility but not actively used)
const translations = {
    en: {
        translation: {
            appTitle: "SAT Score Calculator",
            enterScores: "Enter Your Scores",
            readingWriting: "Reading and Writing",
            math: "Math",
            module1: "Module 1",
            module2: "Module 2",
            yourScores: "Your Scores",
            totalSATScore: "Total SAT Score",
            understandingScores: "Understanding Your Scores",
            rwScoreRange: "Reading and Writing scores range from 200-800",
            mathScoreRange: "Math scores range from 200-800",
            totalScoreRange: "Total SAT scores range from 400-1600",
            infoBanner: "Enter your raw scores for each module to calculate your estimated SAT score. Hover over the info icons for guidance.",
            rwTooltip: "Reading and Writing section consists of two modules, each scored out of 27 points",
            mathTooltip: "Math section consists of two modules, each scored out of 22 points",
            
            // Content Section Translations
            contentTitle: "SAT Score Calculator: Your Path to Success",
            contentIntro: "The SAT Score Calculator is a user-friendly tool designed to help students estimate their potential SAT scores based on practice test results. By inputting the number of correct answers from each section of a practice test, users can receive an estimated score, aiding in identifying strengths and areas for improvement.",
            
            structureTitle: "Understanding the SAT Structure",
            structureIntro: "The SAT comprises two main sections:",
            
            ebrwTitle: "1. Evidence-Based Reading and Writing (EBRW)",
            ebrwDesc: "This section evaluates reading comprehension and writing skills.",
            
            mathTitle: "2. Mathematics",
            mathDesc: "This section assesses mathematical reasoning and problem-solving abilities.",
            
            sectionNote: "Each section is scored on a scale of 200 to 800, combining for a total possible score ranging from 400 to 1600.",
            
            howToUseTitle: "How to Use the SAT Score Calculator",
            step1: "Complete a Practice Test: Take a full-length SAT practice test under timed conditions to simulate the actual exam environment.",
            step2: "Count Correct Answers: After completing the test, tally the number of correct answers in each section.",
            step3: "Input Scores: Enter these numbers into the SAT Score Calculator.",
            step4: "Receive Estimated Scores: The calculator will provide an estimated score for each section and a total score, offering insight into your current performance level.",
            
            benefitsTitle: "Benefits of Using the SAT Score Calculator",
            benefit1: "Identify Strengths and Weaknesses: Determine which areas require more focus and practice.",
            benefit2: "Set Target Scores: Establish realistic goals based on current performance.",
            benefit3: "Track Progress: Monitor improvements over time by comparing scores from multiple practice tests.",
            
            preparingTitle: "Preparing for the SAT",
            preparingDesc: "Regular use of the SAT Score Calculator, combined with consistent practice and review, can enhance readiness for the actual exam. Understanding the scoring system and familiarizing oneself with the test format are crucial steps toward achieving a desirable score."
        }
    },
    de: {
        translation: {
            appTitle: "SAT-Punkterechner",
            enterScores: "Geben Sie Ihre Punktzahlen ein",
            readingWriting: "Lesen und Schreiben",
            math: "Mathematik",
            module1: "Modul 1",
            module2: "Modul 2",
            yourScores: "Ihre Punktzahlen",
            totalSATScore: "Gesamt-SAT-Punktzahl",
            understandingScores: "Verstehen Ihrer Punktzahlen",
            rwScoreRange: "Lese- und Schreibpunktzahlen reichen von 200-800",
            mathScoreRange: "Mathematikpunktzahlen reichen von 200-800",
            totalScoreRange: "Gesamt-SAT-Punktzahlen reichen von 400-1600",
            infoBanner: "Geben Sie Ihre Rohwerte für jedes Modul ein, um Ihre geschätzte SAT-Punktzahl zu berechnen. Fahren Sie mit der Maus über die Info-Symbole für Hilfe.",
            rwTooltip: "Der Lese- und Schreibteil besteht aus zwei Modulen mit jeweils 27 Punkten",
            mathTooltip: "Der Mathematikteil besteht aus zwei Modulen mit jeweils 22 Punkten",
            
            // German Content Section Translations
            contentTitle: "SAT-Punkterechner: Ihr Weg zum Erfolg",
            contentIntro: "Der SAT-Punkterechner ist ein benutzerfreundliches Tool, das Schülern hilft, ihre potenziellen SAT-Punktzahlen anhand von Übungstestergebnissen einzuschätzen. Durch die Eingabe der Anzahl richtiger Antworten aus jedem Abschnitt eines Übungstests können Benutzer eine geschätzte Punktzahl erhalten und dabei Stärken und Verbesserungsbereiche identifizieren.",
            
            structureTitle: "Verstehen der SAT-Struktur",
            structureIntro: "Der SAT besteht aus zwei Hauptabschnitten:",
            
            ebrwTitle: "1. Evidenzbasiertes Lesen und Schreiben (EBRW)",
            ebrwDesc: "Dieser Abschnitt bewertet Leseverständnis und Schreibfähigkeiten.",
            
            mathTitle: "2. Mathematik",
            mathDesc: "Dieser Abschnitt bewertet mathematisches Denken und Problemlösungsfähigkeiten.",
            
            sectionNote: "Jeder Abschnitt wird auf einer Skala von 200 bis 800 bewertet, die sich zu einer möglichen Gesamtpunktzahl von 400 bis 1600 addiert.",
            
            howToUseTitle: "Wie man den SAT-Punkterechner verwendet",
            step1: "Übungstest absolvieren: Machen Sie einen vollständigen SAT-Übungstest unter zeitlich begrenzten Bedingungen, um die tatsächliche Prüfungsumgebung zu simulieren.",
            step2: "Richtige Antworten zählen: Zählen Sie nach Abschluss des Tests die Anzahl der richtigen Antworten in jedem Abschnitt.",
            step3: "Punktzahlen eingeben: Geben Sie diese Zahlen in den SAT-Punkterechner ein.",
            step4: "Geschätzte Punktzahlen erhalten: Der Rechner liefert eine geschätzte Punktzahl für jeden Abschnitt und eine Gesamtpunktzahl, die Einblick in Ihr aktuelles Leistungsniveau gibt.",
            
            benefitsTitle: "Vorteile der Verwendung des SAT-Punkterechners",
            benefit1: "Stärken und Schwächen identifizieren: Bestimmen Sie, welche Bereiche mehr Fokus und Übung erfordern.",
            benefit2: "Zielpunktzahlen festlegen: Setzen Sie realistische Ziele basierend auf der aktuellen Leistung.",
            benefit3: "Fortschritt verfolgen: Überwachen Sie Verbesserungen im Laufe der Zeit durch den Vergleich von Punktzahlen aus mehreren Übungstests.",
            
            preparingTitle: "Vorbereitung auf den SAT",
            preparingDesc: "Die regelmäßige Nutzung des SAT-Punkterechners in Kombination mit konsequentem Üben und Wiederholen kann die Bereitschaft für die tatsächliche Prüfung verbessern. Das Verständnis des Bewertungssystems und die Vertrautheit mit dem Testformat sind entscheidende Schritte zum Erreichen einer wünschenswerten Punktzahl."
        }
    },
    es: {
        translation: {
            appTitle: "Calculadora de Puntaje SAT",
            enterScores: "Ingrese sus Puntajes",
            readingWriting: "Lectura y Escritura",
            math: "Matemáticas",
            module1: "Módulo 1",
            module2: "Módulo 2",
            yourScores: "Sus Puntajes",
            totalSATScore: "Puntaje Total SAT",
            understandingScores: "Entendiendo sus Puntajes",
            rwScoreRange: "Los puntajes de Lectura y Escritura van de 200 a 800",
            mathScoreRange: "Los puntajes de Matemáticas van de 200 a 800",
            totalScoreRange: "Los puntajes totales del SAT van de 400 a 1600",
            infoBanner: "Ingrese sus puntajes brutos para cada módulo para calcular su puntaje SAT estimado. Pase el cursor sobre los iconos de información para obtener orientación.",
            rwTooltip: "La sección de Lectura y Escritura consta de dos módulos, cada uno con 27 puntos",
            mathTooltip: "La sección de Matemáticas consta de dos módulos, cada uno con 22 puntos",
            
            // Spanish Content Section Translations
            contentTitle: "Calculadora de Puntaje SAT: Tu Camino al Éxito",
            contentIntro: "La Calculadora de Puntaje SAT es una herramienta fácil de usar diseñada para ayudar a los estudiantes a estimar sus puntajes potenciales del SAT basados en resultados de pruebas de práctica. Al ingresar el número de respuestas correctas de cada sección de una prueba de práctica, los usuarios pueden recibir un puntaje estimado, ayudando a identificar fortalezas y áreas de mejora.",
            
            structureTitle: "Entendiendo la Estructura del SAT",
            structureIntro: "El SAT consta de dos secciones principales:",
            
            ebrwTitle: "1. Lectura y Escritura Basadas en Evidencia (EBRW)",
            ebrwDesc: "Esta sección evalúa la comprensión lectora y las habilidades de escritura.",
            
            mathTitle: "2. Matemáticas",
            mathDesc: "Esta sección evalúa el razonamiento matemático y las habilidades de resolución de problemas.",
            
            sectionNote: "Cada sección se califica en una escala de 200 a 800, combinándose para un puntaje total posible que va de 400 a 1600.",
            
            howToUseTitle: "Cómo Usar la Calculadora de Puntaje SAT",
            step1: "Completar una Prueba de Práctica: Toma una prueba de práctica SAT completa bajo condiciones cronometradas para simular el ambiente real del examen.",
            step2: "Contar Respuestas Correctas: Después de completar la prueba, cuenta el número de respuestas correctas en cada sección.",
            step3: "Ingresar Puntajes: Ingresa estos números en la Calculadora de Puntaje SAT.",
            step4: "Recibir Puntajes Estimados: La calculadora proporcionará un puntaje estimado para cada sección y un puntaje total, ofreciendo una visión de tu nivel de rendimiento actual.",
            
            benefitsTitle: "Beneficios de Usar la Calculadora de Puntaje SAT",
            benefit1: "Identificar Fortalezas y Debilidades: Determina qué áreas requieren más enfoque y práctica.",
            benefit2: "Establecer Puntajes Objetivo: Establece metas realistas basadas en el rendimiento actual.",
            benefit3: "Seguir el Progreso: Monitorea las mejoras a lo largo del tiempo comparando puntajes de múltiples pruebas de práctica.",
            
            preparingTitle: "Preparándose para el SAT",
            preparingDesc: "El uso regular de la Calculadora de Puntaje SAT, combinado con práctica constante y revisión, puede mejorar la preparación para el examen real. Entender el sistema de puntuación y familiarizarse con el formato de la prueba son pasos cruciales para lograr un puntaje deseable."
        }
    }
};

// Note: Translation is handled by xnx3/translate library loaded in HTML
// The language switcher functionality is implemented in initializeLanguageSwitcher()

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

// DOM Elements - with null checks
const inputs = {
    rwModule1: null,
    rwModule2: null,
    mathModule1: null,
    mathModule2: null
};

const outputs = {
    rwScore: null,
    mathScore: null,
    totalScore: null
};

let scoreChart = null;

// Initialize DOM elements after DOM is loaded
const initializeDOMElements = () => {
    inputs.rwModule1 = document.getElementById('rwModule1');
    inputs.rwModule2 = document.getElementById('rwModule2');
    inputs.mathModule1 = document.getElementById('mathModule1');
    inputs.mathModule2 = document.getElementById('mathModule2');
    
    outputs.rwScore = document.getElementById('rwScore');
    outputs.mathScore = document.getElementById('mathScore');
    outputs.totalScore = document.getElementById('totalScore');
    
    scoreChart = document.getElementById('scoreChart');
};

// Validate input with proper error handling
const validateInput = (input, max, errorId) => {
    if (!input) return false;
    
    const errorElement = document.getElementById(errorId);
    const value = parseInt(input.value);

    if (input.value === '') {
        if (errorElement) errorElement.textContent = '';
        return false;
    }

    if (isNaN(value)) {
        if (errorElement) errorElement.textContent = 'Please enter a valid number';
        return false;
    }

    if (value < 0 || value > max) {
        if (errorElement) errorElement.textContent = `Please enter a number between 0 and ${max}`;
        return false;
    }

    if (errorElement) errorElement.textContent = '';
    return true;
};

// Get scaled score from raw score
const getScaledScore = (rawScore, conversionTable) => {
    // Handle edge cases
    if (rawScore < 0) return 200;
    if (!conversionTable[rawScore]) return 200;
    return conversionTable[rawScore];
};

// Debounce function to prevent excessive calculations
let calculateTimeout;
const debounce = (func, wait) => {
    return (...args) => {
        clearTimeout(calculateTimeout);
        calculateTimeout = setTimeout(() => func.apply(this, args), wait);
    };
};

// Calculate scores with proper validation and layout shift prevention
const calculateScores = () => {
    try {
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

            console.log('SAT Calculator: Scores calculated', {
                rwRaw: rwRawScore,
                rwScaled: rwScaled,
                mathRaw: mathRawScore,
                mathScaled: mathScaled,
                total: totalScaled
            });

            // Use requestAnimationFrame to prevent layout shifts
            requestAnimationFrame(() => {
                // Update display with null checks
                if (outputs.rwScore) outputs.rwScore.textContent = rwScaled;
                if (outputs.mathScore) outputs.mathScore.textContent = mathScaled;
                if (outputs.totalScore) outputs.totalScore.textContent = totalScaled;

                // Update chart
                updateChart(rwScaled, mathScaled, totalScaled);
            });
        }
    } catch (error) {
        console.error('SAT Calculator: Error calculating scores', error);
    }
};

// Debounced version for input events
const debouncedCalculateScores = debounce(calculateScores, 150);

// Lightweight custom chart implementation (replaces Chart.js) - optimized
let chartData = { 
    rwScore: 0, 
    mathScore: 0, 
    totalScore: 0,
    currentTheme: null
};

// Update chart with new data (optimized to prevent reflows)
const updateChart = (rwScore, mathScore, totalScore) => {
    // Preserve existing theme when updating scores
    chartData = { 
        rwScore, 
        mathScore, 
        totalScore,
        currentTheme: chartData.currentTheme
    };
    
    // Use requestAnimationFrame to prevent forced reflows
    requestAnimationFrame(() => {
        renderCustomChart();
    });
};

// Initialize custom chart (lightweight replacement for Chart.js)
const initializeChart = () => {
    const chartContainer = document.getElementById('scoreChart');
    if (!chartContainer) return;

    // Replace canvas with a div-based chart
    chartContainer.outerHTML = '<div id="scoreChart" class="custom-chart"></div>';
    renderCustomChart();
};

// Render custom bar chart using CSS (optimized to prevent reflows)
const renderCustomChart = () => {
    const chartContainer = document.getElementById('scoreChart');
    if (!chartContainer) return;

    const maxScore = 1600;
    const { rwScore, mathScore, totalScore, currentTheme } = chartData;
    
    // Use cached theme to avoid DOM read that could force reflow
    const isDarkTheme = (currentTheme || document.documentElement.getAttribute('data-theme')) === 'dark';
    
    chartContainer.innerHTML = `
        <div class="chart-title">Your SAT Scores</div>
        <div class="chart-bars">
            <div class="chart-bar">
                <div class="bar-label">Reading & Writing</div>
                <div class="bar-container">
                    <div class="bar-fill" style="height: ${(rwScore / 800) * 100}%; background-color: ${isDarkTheme ? 'rgba(96, 165, 250, 0.8)' : 'rgba(0, 0, 0, 0.8)'}"></div>
                </div>
                <div class="bar-value">${rwScore}</div>
            </div>
            <div class="chart-bar">
                <div class="bar-label">Math</div>
                <div class="bar-container">
                    <div class="bar-fill" style="height: ${(mathScore / 800) * 100}%; background-color: ${isDarkTheme ? 'rgba(96, 165, 250, 0.8)' : 'rgba(0, 0, 0, 0.8)'}"></div>
                </div>
                <div class="bar-value">${mathScore}</div>
            </div>
            <div class="chart-bar">
                <div class="bar-label">Total</div>
                <div class="bar-container">
                    <div class="bar-fill" style="height: ${(totalScore / 1600) * 100}%; background-color: ${isDarkTheme ? 'rgba(96, 165, 250, 0.9)' : 'rgba(0, 0, 0, 0.9)'}"></div>
                </div>
                <div class="bar-value">${totalScore}</div>
            </div>
        </div>
    `;
};

// Add event listeners with proper handling
const addEventListeners = () => {
    Object.values(inputs).forEach(input => {
        if (!input) return;
        
        input.addEventListener('input', () => {
            debouncedCalculateScores();
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                calculateScores(); // Immediate calculation on Enter
            }
        });
    });
};

// Check for pre-filled values and calculate immediately
const calculateIfValuesExist = () => {
    const hasValues = Object.values(inputs).every(input => {
        return input && input.value && input.value.trim() !== '';
    });
    
    if (hasValues) {
        console.log('SAT Calculator: Pre-filled values detected, calculating...');
        calculateScores();
    } else {
        console.log('SAT Calculator: No pre-filled values, waiting for user input');
    }
};

// Main initialization function - called after dependencies load
window.initializeApp = () => {
    console.log('SAT Calculator: Initializing application...');
    
    initializeDOMElements();
    console.log('SAT Calculator: DOM elements initialized', {
        inputsFound: Object.values(inputs).every(el => el !== null),
        outputsFound: Object.values(outputs).every(el => el !== null),
        chartFound: scoreChart !== null
    });
    
    initializeChart();
    addEventListeners();
    initializeLanguageSwitcher();
    initializeDropdown();
    
    // Check if there are pre-filled values and calculate immediately
    calculateIfValuesExist();
    
    console.log('SAT Calculator: Application initialized successfully');
};

// Initialize basic functionality immediately (doesn't require dependencies)
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme switcher immediately (doesn't need Chart.js or i18next)
    const themeSwitch = document.getElementById('checkbox');
    const currentTheme = localStorage.getItem('theme');

    // Check for saved theme preference
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark' && themeSwitch) {
            themeSwitch.checked = true;
        }
    }

    // Add theme switch event listener
    if (themeSwitch) {
        themeSwitch.addEventListener('change', handleThemeSwitch);
    }

    // Initialize the calculator app
    initializeApp();
});

// Theme switch handler - optimized to prevent forced reflows
const handleThemeSwitch = (e) => {
    const newTheme = e.target.checked ? 'dark' : 'light';
    
    // Batch all DOM operations to prevent forced reflows
    requestAnimationFrame(() => {
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Delay chart update to next frame to avoid reflow
        requestAnimationFrame(() => {
            updateChartColors(newTheme);
        });
    });
};

// Update chart colors based on theme (optimized to prevent reflows)
const updateChartColors = (theme) => {
    // Store theme to avoid DOM reads during rendering
    chartData.currentTheme = theme;
    
    // Re-render the custom chart with new theme colors
    requestAnimationFrame(() => {
        renderCustomChart();
    });
};















