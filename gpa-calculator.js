// GPA Calculator - Complete Implementation
// Handles all GPA calculation scenarios: semester, cumulative, transfer, weighted, unweighted

(function() {
    'use strict';

    // State management
    const state = {
        gradeLevel: 'high-school',
        calcType: 'semester',
        useCredits: true,
        useWeighted: false,
        usePercentage: false,
        courses: [],
        schools: [],
        prevGPA: 0,
        prevCredits: 0
    };

    // Grade conversion tables
    const gradeConversions = {
        'A+': { unweighted: 4.0, honors: 4.5, ap: 5.0, percentage: 97 },
        'A': { unweighted: 4.0, honors: 4.5, ap: 5.0, percentage: 95 },
        'A-': { unweighted: 3.7, honors: 4.2, ap: 4.7, percentage: 91 },
        'B+': { unweighted: 3.3, honors: 3.8, ap: 4.3, percentage: 88 },
        'B': { unweighted: 3.0, honors: 3.5, ap: 4.0, percentage: 85 },
        'B-': { unweighted: 2.7, honors: 3.2, ap: 3.7, percentage: 81 },
        'C+': { unweighted: 2.3, honors: 2.8, ap: 3.3, percentage: 78 },
        'C': { unweighted: 2.0, honors: 2.5, ap: 3.0, percentage: 75 },
        'C-': { unweighted: 1.7, honors: 2.2, ap: 2.7, percentage: 71 },
        'D+': { unweighted: 1.3, honors: 1.8, ap: 2.3, percentage: 68 },
        'D': { unweighted: 1.0, honors: 1.5, ap: 2.0, percentage: 65 },
        'F': { unweighted: 0.0, honors: 0.0, ap: 0.0, percentage: 0 }
    };

    // Initialize calculator
    function init() {
        setupEventListeners();
        updateUI();
        addInitialCourse();
    }

    // Event listeners
    function setupEventListeners() {
        // Grade level toggles
        document.querySelectorAll('[data-grade-level]').forEach(btn => {
            btn.addEventListener('click', function() {
                setActiveToggle(this, '[data-grade-level]');
                state.gradeLevel = this.dataset.gradeLevel;
                updateUI();
            });
        });

        // Calculation type toggles
        document.querySelectorAll('[data-calc-type]').forEach(btn => {
            btn.addEventListener('click', function() {
                setActiveToggle(this, '[data-calc-type]');
                state.calcType = this.dataset.calcType;
                updateUI();
            });
        });

        // Configuration toggles
        document.getElementById('useCredits').addEventListener('change', function() {
            state.useCredits = this.checked;
            updateUI();
        });

        document.getElementById('useWeighted').addEventListener('change', function() {
            state.useWeighted = this.checked;
            updateUI();
        });

        document.getElementById('usePercentage').addEventListener('change', function() {
            state.usePercentage = this.checked;
            updateUI();
        });

        // Action buttons
        document.getElementById('addCourseBtn').addEventListener('click', addCourse);
        document.getElementById('addSchoolBtn').addEventListener('click', addSchool);
        document.getElementById('calculateBtn').addEventListener('click', calculateGPA);
        document.getElementById('resetBtn').addEventListener('click', resetCalculator);
    }

    // Set active toggle button
    function setActiveToggle(clickedBtn, selector) {
        document.querySelectorAll(selector).forEach(btn => btn.classList.remove('active'));
        clickedBtn.classList.add('active');
    }

    // Update UI based on state
    function updateUI() {
        // Show/hide weighted toggle based on grade level
        const weightedToggle = document.getElementById('weightedToggle');
        if (state.gradeLevel === 'high-school') {
            weightedToggle.style.display = 'flex';
        } else {
            weightedToggle.style.display = 'none';
            state.useWeighted = false;
            document.getElementById('useWeighted').checked = false;
        }

        // Show/hide sections based on calculation type
        const cumulativeInputs = document.getElementById('cumulativeInputs');
        const transferInputs = document.getElementById('transferInputs');
        const coursesSectionTitle = document.getElementById('coursesSectionTitle');
        const prevCreditsGroup = document.getElementById('prevCreditsGroup');

        cumulativeInputs.style.display = 'none';
        transferInputs.style.display = 'none';

        if (state.calcType === 'cumulative') {
            cumulativeInputs.style.display = 'block';
            coursesSectionTitle.textContent = 'Current Semester Courses';
            if (state.useCredits) {
                prevCreditsGroup.style.display = 'block';
            } else {
                prevCreditsGroup.style.display = 'none';
            }
        } else if (state.calcType === 'transfer') {
            transferInputs.style.display = 'block';
            coursesSectionTitle.textContent = 'Current School Courses';
        } else {
            coursesSectionTitle.textContent = state.gradeLevel === 'middle-school'
                ? 'Your Courses'
                : 'Current Semester Courses';
        }

        // Update existing courses
        updateAllCourseInputs();
    }

    // Add course row
    function addCourse() {
        const courseId = 'course_' + Date.now();
        state.courses.push({ id: courseId });
        renderCourse(courseId);
    }

    // Add initial course
    function addInitialCourse() {
        for (let i = 0; i < 4; i++) {
            addCourse();
        }
    }

    // Render course input row
    function renderCourse(courseId) {
        const coursesList = document.getElementById('coursesList');
        const courseDiv = document.createElement('div');
        courseDiv.className = 'course-row';
        courseDiv.dataset.courseId = courseId;

        let html = `
            <div class="input-group">
                <label>Course Name (optional)</label>
                <input type="text" class="course-name" placeholder="e.g., AP Calculus">
            </div>
        `;

        if (state.usePercentage) {
            html += `
                <div class="input-group">
                    <label>Grade (%)</label>
                    <input type="number" class="course-grade" min="0" max="100" placeholder="e.g., 92">
                </div>
            `;
        } else {
            html += `
                <div class="input-group">
                    <label>Grade</label>
                    <select class="course-grade">
                        <option value="">Select...</option>
                        <option value="A+">A+ (4.0)</option>
                        <option value="A">A (4.0)</option>
                        <option value="A-">A- (3.7)</option>
                        <option value="B+">B+ (3.3)</option>
                        <option value="B">B (3.0)</option>
                        <option value="B-">B- (2.7)</option>
                        <option value="C+">C+ (2.3)</option>
                        <option value="C">C (2.0)</option>
                        <option value="C-">C- (1.7)</option>
                        <option value="D+">D+ (1.3)</option>
                        <option value="D">D (1.0)</option>
                        <option value="F">F (0.0)</option>
                    </select>
                </div>
            `;
        }

        if (state.useCredits) {
            html += `
                <div class="input-group">
                    <label>Credits</label>
                    <input type="number" class="course-credits" step="0.5" min="0" placeholder="3">
                </div>
            `;
        }

        if (state.useWeighted && state.gradeLevel === 'high-school') {
            html += `
                <div class="input-group">
                    <label>Course Type</label>
                    <select class="course-type">
                        <option value="regular">Regular</option>
                        <option value="honors">Honors</option>
                        <option value="ap">AP/IB</option>
                    </select>
                </div>
            `;
        }

        html += `
            <button class="btn-remove" onclick="window.gpaCalc.removeCourse('${courseId}')" aria-label="Remove course">×</button>
        `;

        courseDiv.innerHTML = html;
        coursesList.appendChild(courseDiv);
    }

    // Update all course inputs when settings change
    function updateAllCourseInputs() {
        const coursesList = document.getElementById('coursesList');
        const existingCourses = Array.from(coursesList.children);

        // Store current values
        const courseValues = existingCourses.map(courseDiv => {
            return {
                id: courseDiv.dataset.courseId,
                name: courseDiv.querySelector('.course-name')?.value || '',
                grade: courseDiv.querySelector('.course-grade')?.value || '',
                credits: courseDiv.querySelector('.course-credits')?.value || '',
                type: courseDiv.querySelector('.course-type')?.value || 'regular'
            };
        });

        // Clear and re-render
        coursesList.innerHTML = '';
        state.courses = [];

        courseValues.forEach(course => {
            state.courses.push({ id: course.id });
            renderCourse(course.id);

            // Restore values
            const courseDiv = coursesList.querySelector(`[data-course-id="${course.id}"]`);
            if (courseDiv) {
                const nameInput = courseDiv.querySelector('.course-name');
                const gradeInput = courseDiv.querySelector('.course-grade');
                const creditsInput = courseDiv.querySelector('.course-credits');
                const typeInput = courseDiv.querySelector('.course-type');

                if (nameInput) nameInput.value = course.name;
                if (gradeInput && !state.usePercentage) gradeInput.value = course.grade;
                if (creditsInput) creditsInput.value = course.credits;
                if (typeInput) typeInput.value = course.type;
            }
        });
    }

    // Remove course
    function removeCourse(courseId) {
        state.courses = state.courses.filter(c => c.id !== courseId);
        const courseDiv = document.querySelector(`[data-course-id="${courseId}"]`);
        if (courseDiv) {
            courseDiv.remove();
        }
    }

    // Add school for transfer GPA
    function addSchool() {
        const schoolId = 'school_' + Date.now();
        state.schools.push({ id: schoolId });
        renderSchool(schoolId);
    }

    // Render school input
    function renderSchool(schoolId) {
        const schoolsList = document.getElementById('schoolsList');
        const schoolDiv = document.createElement('div');
        schoolDiv.className = 'school-row';
        schoolDiv.dataset.schoolId = schoolId;

        let html = `
            <div class="input-group">
                <label>School Name</label>
                <input type="text" class="school-name" placeholder="e.g., Community College">
            </div>
            <div class="input-group">
                <label>GPA</label>
                <input type="number" class="school-gpa" step="0.01" min="0" max="5" placeholder="3.50">
            </div>
        `;

        if (state.useCredits) {
            html += `
                <div class="input-group">
                    <label>Total Credits</label>
                    <input type="number" class="school-credits" step="0.5" min="0" placeholder="45">
                </div>
            `;
        } else {
            html += `
                <div class="input-group">
                    <label>Number of Courses</label>
                    <input type="number" class="school-courses" min="0" placeholder="12">
                </div>
            `;
        }

        html += `
            <button class="btn-remove" onclick="window.gpaCalc.removeSchool('${schoolId}')" aria-label="Remove school">×</button>
        `;

        schoolDiv.innerHTML = html;
        schoolsList.appendChild(schoolDiv);
    }

    // Remove school
    function removeSchool(schoolId) {
        state.schools = state.schools.filter(s => s.id !== schoolId);
        const schoolDiv = document.querySelector(`[data-school-id="${schoolId}"]`);
        if (schoolDiv) {
            schoolDiv.remove();
        }
    }

    // Convert percentage to letter grade
    function percentageToGrade(percentage) {
        percentage = parseFloat(percentage);
        if (percentage >= 97) return 'A+';
        if (percentage >= 93) return 'A';
        if (percentage >= 90) return 'A-';
        if (percentage >= 87) return 'B+';
        if (percentage >= 83) return 'B';
        if (percentage >= 80) return 'B-';
        if (percentage >= 77) return 'C+';
        if (percentage >= 73) return 'C';
        if (percentage >= 70) return 'C-';
        if (percentage >= 67) return 'D+';
        if (percentage >= 65) return 'D';
        return 'F';
    }

    // Get grade points for a course
    function getGradePoints(grade, courseType = 'regular') {
        if (!grade || !gradeConversions[grade]) return 0;

        if (state.useWeighted && state.gradeLevel === 'high-school') {
            if (courseType === 'ap') return gradeConversions[grade].ap;
            if (courseType === 'honors') return gradeConversions[grade].honors;
        }

        return gradeConversions[grade].unweighted;
    }

    // Calculate GPA
    function calculateGPA() {
        try {
            let result;

            if (state.calcType === 'transfer') {
                result = calculateTransferGPA();
            } else if (state.calcType === 'cumulative') {
                result = calculateCumulativeGPA();
            } else {
                result = calculateSemesterGPA();
            }

            displayResults(result);
        } catch (error) {
            alert('Please check your inputs and try again. Make sure all required fields are filled.');
            console.error('Calculation error:', error);
        }
    }

    // Calculate semester GPA
    function calculateSemesterGPA() {
        const courses = getCourseData();

        if (courses.length === 0) {
            throw new Error('Please add at least one course');
        }

        let totalGradePoints = 0;
        let totalCredits = 0;
        const breakdown = [];

        courses.forEach(course => {
            let grade = course.grade;
            if (state.usePercentage) {
                grade = percentageToGrade(course.grade);
            }

            const gradePoints = getGradePoints(grade, course.type);
            const credits = state.useCredits ? parseFloat(course.credits) || 0 : 1;

            if (credits > 0 && gradePoints >= 0) {
                const weightedPoints = gradePoints * credits;
                totalGradePoints += weightedPoints;
                totalCredits += credits;

                breakdown.push({
                    name: course.name || 'Course',
                    grade: grade,
                    gradePoints: gradePoints.toFixed(2),
                    credits: credits,
                    contribution: weightedPoints.toFixed(2)
                });
            }
        });

        if (totalCredits === 0) {
            throw new Error('No valid courses entered');
        }

        const gpa = totalGradePoints / totalCredits;

        return {
            gpa: gpa,
            totalCredits: totalCredits,
            breakdown: breakdown,
            type: 'semester'
        };
    }

    // Calculate cumulative GPA
    function calculateCumulativeGPA() {
        const prevGPA = parseFloat(document.getElementById('prevGPA').value) || 0;
        const prevCredits = state.useCredits ? parseFloat(document.getElementById('prevCredits').value) || 0 : 0;

        const semesterResult = calculateSemesterGPA();

        let cumulativeGPA;
        let totalCredits;

        if (state.useCredits) {
            const prevGradePoints = prevGPA * prevCredits;
            const newGradePoints = semesterResult.gpa * semesterResult.totalCredits;
            totalCredits = prevCredits + semesterResult.totalCredits;

            if (totalCredits > 0) {
                cumulativeGPA = (prevGradePoints + newGradePoints) / totalCredits;
            } else {
                cumulativeGPA = semesterResult.gpa;
            }
        } else {
            // Without credits, simple average
            cumulativeGPA = semesterResult.gpa; // Simplified for now
        }

        return {
            gpa: cumulativeGPA,
            semesterGPA: semesterResult.gpa,
            totalCredits: totalCredits,
            breakdown: semesterResult.breakdown,
            type: 'cumulative',
            prevGPA: prevGPA,
            prevCredits: prevCredits
        };
    }

    // Calculate transfer GPA
    function calculateTransferGPA() {
        const schools = getSchoolData();
        const currentCourses = getCourseData();

        if (schools.length === 0 && currentCourses.length === 0) {
            throw new Error('Please add at least one school or course');
        }

        let totalGradePoints = 0;
        let totalCredits = 0;

        // Add previous schools
        schools.forEach(school => {
            const gpa = parseFloat(school.gpa) || 0;
            const credits = state.useCredits ? parseFloat(school.credits) || 0 : parseFloat(school.courses) || 0;

            if (credits > 0) {
                totalGradePoints += gpa * credits;
                totalCredits += credits;
            }
        });

        // Add current courses
        if (currentCourses.length > 0) {
            const semesterResult = calculateSemesterGPA();
            totalGradePoints += semesterResult.gpa * semesterResult.totalCredits;
            totalCredits += semesterResult.totalCredits;
        }

        if (totalCredits === 0) {
            throw new Error('No valid data entered');
        }

        const gpa = totalGradePoints / totalCredits;

        return {
            gpa: gpa,
            totalCredits: totalCredits,
            schoolCount: schools.length,
            breakdown: currentCourses.length > 0 ? calculateSemesterGPA().breakdown : [],
            type: 'transfer'
        };
    }

    // Get course data from inputs
    function getCourseData() {
        const courseRows = document.querySelectorAll('.course-row');
        const courses = [];

        courseRows.forEach(row => {
            const name = row.querySelector('.course-name')?.value || '';
            const grade = row.querySelector('.course-grade')?.value || '';
            const credits = row.querySelector('.course-credits')?.value || '3';
            const type = row.querySelector('.course-type')?.value || 'regular';

            if (grade) {
                courses.push({ name, grade, credits, type });
            }
        });

        return courses;
    }

    // Get school data from inputs
    function getSchoolData() {
        const schoolRows = document.querySelectorAll('.school-row');
        const schools = [];

        schoolRows.forEach(row => {
            const name = row.querySelector('.school-name')?.value || '';
            const gpa = row.querySelector('.school-gpa')?.value || '';
            const credits = row.querySelector('.school-credits')?.value || '';
            const courses = row.querySelector('.school-courses')?.value || '';

            if (gpa && (credits || courses)) {
                schools.push({ name, gpa, credits, courses });
            }
        });

        return schools;
    }

    // Display results
    function displayResults(result) {
        const resultsSection = document.getElementById('results');
        const gpaValue = document.getElementById('gpaValue');
        const gpaContext = document.getElementById('gpaContext');
        const progressFill = document.getElementById('progressFill');
        const breakdownTable = document.getElementById('breakdownTable');
        const statsGrid = document.getElementById('statsGrid');

        // Display GPA
        const gpa = result.gpa.toFixed(2);
        gpaValue.textContent = gpa;

        // Context message
        const context = getGPAContext(result.gpa);
        gpaContext.textContent = context;

        // Progress bar
        const percentage = Math.min((result.gpa / 4.0) * 100, 100);
        progressFill.style.width = percentage + '%';

        // Color coding
        if (result.gpa >= 3.5) {
            progressFill.style.background = 'linear-gradient(to right, var(--success-color), #22c55e)';
        } else if (result.gpa >= 2.5) {
            progressFill.style.background = 'linear-gradient(to right, #f59e0b, #fbbf24)';
        } else {
            progressFill.style.background = 'linear-gradient(to right, var(--error-color), #ef4444)';
        }

        // Breakdown table
        if (result.breakdown && result.breakdown.length > 0) {
            let tableHTML = '<table class="breakdown-table"><thead><tr><th>Course</th><th>Grade</th><th>Points</th>';

            if (state.useCredits) {
                tableHTML += '<th>Credits</th><th>Contribution</th>';
            }

            tableHTML += '</tr></thead><tbody>';

            result.breakdown.forEach(course => {
                tableHTML += `<tr>
                    <td>${course.name}</td>
                    <td>${course.grade}</td>
                    <td>${course.gradePoints}</td>`;

                if (state.useCredits) {
                    tableHTML += `<td>${course.credits}</td><td>${course.contribution}</td>`;
                }

                tableHTML += '</tr>';
            });

            tableHTML += '</tbody></table>';
            breakdownTable.innerHTML = tableHTML;
        } else {
            breakdownTable.innerHTML = '';
        }

        // Stats
        let statsHTML = '<div class="stat-item"><div class="stat-label">GPA</div><div class="stat-value">' + gpa + '</div></div>';

        if (state.useCredits) {
            statsHTML += '<div class="stat-item"><div class="stat-label">Total Credits</div><div class="stat-value">' + result.totalCredits.toFixed(1) + '</div></div>';
        }

        if (result.type === 'cumulative' && result.semesterGPA) {
            statsHTML += '<div class="stat-item"><div class="stat-label">Semester GPA</div><div class="stat-value">' + result.semesterGPA.toFixed(2) + '</div></div>';
        }

        if (result.type === 'transfer' && result.schoolCount) {
            statsHTML += '<div class="stat-item"><div class="stat-label">Schools Combined</div><div class="stat-value">' + result.schoolCount + '</div></div>';
        }

        statsGrid.innerHTML = statsHTML;

        // Show results
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Get GPA context message
    function getGPAContext(gpa) {
        if (gpa >= 3.9) return 'Excellent! A+ average - Top tier performance';
        if (gpa >= 3.7) return 'Outstanding! A average - Highly competitive';
        if (gpa >= 3.5) return 'Great! A- average - Competitive for selective colleges';
        if (gpa >= 3.3) return 'Very Good! B+ average - Above average performance';
        if (gpa >= 3.0) return 'Good! B average - Solid academic standing';
        if (gpa >= 2.7) return 'Fair - B- average';
        if (gpa >= 2.0) return 'Needs improvement - Maintain good standing';
        return 'Below average - Focus on improvement';
    }

    // Reset calculator
    function resetCalculator() {
        // Reset state
        state.courses = [];
        state.schools = [];
        state.prevGPA = 0;
        state.prevCredits = 0;

        // Clear inputs
        document.getElementById('coursesList').innerHTML = '';
        document.getElementById('schoolsList').innerHTML = '';
        document.getElementById('prevGPA').value = '';
        document.getElementById('prevCredits').value = '';
        document.getElementById('results').style.display = 'none';

        // Add initial courses
        addInitialCourse();
    }

    // Expose public methods
    window.gpaCalc = {
        removeCourse: removeCourse,
        removeSchool: removeSchool
    };

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
