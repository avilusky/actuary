// slide3.js - לוגיקת מחשבון פרמיות

const Slide3 = {
    charts: {
        monthly: null,
        cumulative: null
    },
    
    state: {
        currentGender: 'male',
        currentAge: 30
    },
    
    // אתחול השקף
    init() {
        this.loadContent();
        setTimeout(() => {
            this.setupEventListeners();
            this.createCharts();
            this.updateCharts();
        }, 100);
    },
    
    // טעינת תוכן השקף
    loadContent() {
        const slide = document.getElementById('slide3');
        if (!slide) return;
        
        slide.innerHTML = this.getTemplate();
    },
    
    // הגדרת מאזיני אירועים
    setupEventListeners() {
        // Age slider - תיקון: slide3AgeInput במקום slide5AgeInput
        const ageInput = document.getElementById('slide3AgeInput');
        if (ageInput) {
            ageInput.addEventListener('input', (e) => {
                this.state.currentAge = parseInt(e.target.value);
                document.getElementById('slide3AgeDisplay').textContent = this.state.currentAge;
                this.updateCharts();
            });
        }
        
        // Gender buttons - תיקון: slide3MaleBtn במקום slide5MaleBtn
        const maleBtn = document.getElementById('slide3MaleBtn');
        const femaleBtn = document.getElementById('slide3FemaleBtn');
        
        if (maleBtn) {
            maleBtn.addEventListener('click', () => {
                this.state.currentGender = 'male';
                maleBtn.classList.add('active');
                femaleBtn.classList.remove('active');
                this.updateCharts();
            });
        }
        
        if (femaleBtn) {
            femaleBtn.addEventListener('click', () => {
                this.state.currentGender = 'female';
                femaleBtn.classList.add('active');
                maleBtn.classList.remove('active');
                this.updateCharts();
            });
        }
    },
    
    // תבנית HTML
    getTemplate() {
        return `
            <div class="slide5-body">
                <div class="slide5-container">
                    <div class="slide5-title">
                        <h1>מחשבון פרמיות</h1>
                        <h2>השוואת פרמיות בין המודל החדש לקופות החולים</h2>
                    </div>

                    <div class="slide5-grid">
                        ${this.getControlsTemplate()}
                        ${this.getChartsTemplate()}
                    </div>
                </div>
            </div>
        `;
    },
    
    // תבנית בקרות - תיקון כל ה-IDs
    getControlsTemplate() {
        return `
            <div class="slide5-card slide5-controls">
                <div class="slide5-control-group">
                    <label>גיל הצטרפות:</label>
                    <input type="range" id="slide3AgeInput" class="slide5-range" min="20" max="55" step="5" value="30"/>
                    <div class="slide5-age-display" id="slide3AgeDisplay">30</div>
                </div>

                <div class="slide5-control-group">
                    <label>מין:</label>
                    <div class="slide5-gender-buttons">
                        <button class="slide5-gender-button active" id="slide3MaleBtn">זכר</button>
                        <button class="slide5-gender-button" id="slide3FemaleBtn">נקבה</button>
                    </div>
                </div>

                <div class="slide5-summary-box">
                    <h3>סיכום תשלומים</h3>
                    <div class="slide5-summary-item">
                        <span>פרמיה התחלתית - קבועה:</span>
                        <span id="slide3FixedModelInitial">₪0</span>
                    </div>
                    <div class="slide5-summary-item">
                        <span>פרמיה התחלתית - משתנה:</span>
                        <span id="slide3NewModelInitial">₪0</span>
                    </div>
                    <div class="slide5-summary-item">
                        <span>פרמיה התחלתית - קופות חולים:</span>
                        <span id="slide3KupotInitial">₪0</span>
                    </div>
                    <div class="slide5-summary-item">
                        <span>סך תשלום - פרמיה קבועה:</span>
                        <span id="slide3FixedModelTotal">₪0</span>
                    </div>
                    <div class="slide5-summary-item">
                        <span>סך תשלום - פרמיה משתנה:</span>
                        <span id="slide3NewModelTotal">₪0</span>
                    </div>
                    <div class="slide5-summary-item">
                        <span>סך תשלום - קופות חולים:</span>
                        <span id="slide3KupotTotal">₪0</span>
                    </div>
                </div>

                <div class="slide5-note">
                    <strong>הערה:</strong> בעוד שהפרמיות בקופות החולים הן תשלום עבור הביטוח בלבד, במודל החדש הפרמיות נצברות כחיסכון אישי לטובת המבוטח
                </div>
            </div>
        `;
    },
    
    // תבנית גרפים - תיקון IDs
    getChartsTemplate() {
        return `
            <div class="slide5-card slide5-charts-container">
                <div class="slide5-chart-wrapper">
                    <div class="slide5-chart-title">פרמיה חודשית</div>
                    <canvas id="slide3MonthlyChart"></canvas>
                </div>
                <div class="slide5-chart-wrapper">
                    <div class="slide5-chart-title">פרמיות מצטברות</div>
                    <canvas id="slide3CumulativeChart"></canvas>
                </div>
            </div>
        `;
    },
    
    // יצירת גרפים - תיקון IDs
    createCharts() {
        const monthlyCtx = document.getElementById('slide3MonthlyChart');
        const cumulativeCtx = document.getElementById('slide3CumulativeChart');
        
        if (!monthlyCtx || !cumulativeCtx) return;

        // גרף חודשי
        this.charts.monthly = new Chart(monthlyCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: [],
                datasets: [
                    {
                        label: 'מודל חדש - פרמיה קבועה',
                        data: [],
                        borderColor: AppConfig.colors.model1.primary,
                        backgroundColor: AppConfig.colors.model1.background,
                        tension: 0.4,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        borderWidth: 2.5,
                        pointBackgroundColor: '#ffffff',
                        pointBorderColor: AppConfig.colors.model1.primary,
                        pointBorderWidth: 2
                    },
                    {
                        label: 'מודל חדש - פרמיה משתנה',
                        data: [],
                        borderColor: AppConfig.colors.model2.primary,
                        backgroundColor: AppConfig.colors.model2.background,
                        tension: 0.4,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        borderWidth: 2.5,
                        pointBackgroundColor: '#ffffff',
                        pointBorderColor: AppConfig.colors.model2.primary,
                        pointBorderWidth: 2
                    },
                    {
                        label: 'קופות חולים',
                        data: [],
                        borderColor: AppConfig.colors.kupot.primary,
                        backgroundColor: AppConfig.colors.kupot.background,
                        tension: 0.4,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        borderWidth: 2.5,
                        pointBackgroundColor: '#ffffff',
                        pointBorderColor: AppConfig.colors.kupot.primary,
                        pointBorderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            padding: 12,
                            font: {
                                size: 12
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'פרמיה חודשית (₪)'
                        },
                        ticks: {
                            stepSize: 100
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'גיל'
                        }
                    }
                }
            }
        });

        // גרף מצטבר
        this.charts.cumulative = new Chart(cumulativeCtx.getContext('2d'), {
            type: 'bar',
            plugins: [{
                beforeDraw: function(chart) {
                    chart.data.datasets[0].borderRadius = 8;
                    chart.data.datasets[0].borderSkipped = false;
                }
            }],
            data: {
                labels: ['מודל חדש - קבועה', 'מודל חדש - משתנה', 'קופות חולים'],
                datasets: [{
                    data: [0, 0, 0],
                    backgroundColor: [
                        AppConfig.colors.model1.primary,
                        AppConfig.colors.model2.primary,
                        AppConfig.colors.kupot.primary
                    ],
                    borderColor: '#ffffff',
                    borderWidth: 2,
                    borderRadius: 7,
                    borderSkipped: false,
                    barThickness: 90
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'סך תשלומים (₪)'
                        },
                        ticks: {
                            callback: function(value) {
                                return new Intl.NumberFormat('he-IL').format(value) + ' ₪';
                            },
                            stepSize: 50000
                        }
                    }
                }
            }
        });
    },
    
    // עדכון גרפים
    updateCharts() {
        const premiumsData = this.state.currentGender === 'male' ? 
            AppConfig.malePremiums : AppConfig.femalePremiums;
        const fixedPremium = AppConfig.fixedPremiums[this.state.currentGender][this.state.currentAge];
        
        const monthlyData = [];
        let newModelCumulative = 0;
        let fixedModelCumulative = 0;
        let kupotCumulative = 0;

        // חישוב נתונים
        for (let age = this.state.currentAge; age <= 85; age += 5) {
            let newModelMonthly = null;
            let fixedModelMonthly = null;
            const kupotMonthly = AppConfig.kupotPremiums[age] || 
                AppConfig.kupotPremiums[Math.floor(age/5)*5];

            if (age <= 70) {
                newModelMonthly = premiumsData[this.state.currentAge] && 
                    premiumsData[this.state.currentAge][age] ? 
                    premiumsData[this.state.currentAge][age] : null;
                fixedModelMonthly = fixedPremium;
                
                if (newModelMonthly) {
                    newModelCumulative += newModelMonthly * 12 * 5;
                }
                if (fixedModelMonthly) {
                    fixedModelCumulative += fixedModelMonthly * 12 * 5;
                }
            }
            
            kupotCumulative += kupotMonthly * 12 * 5;

            monthlyData.push({
                age: age,
                newModel: newModelMonthly,
                fixed: fixedModelMonthly,
                kupot: kupotMonthly
            });
        }

        // עדכון גרף חודשי
        if (this.charts.monthly) {
            this.charts.monthly.data.labels = monthlyData.map(d => d.age);
            this.charts.monthly.data.datasets[0].data = monthlyData.map(d => d.fixed);
            this.charts.monthly.data.datasets[1].data = monthlyData.map(d => d.newModel);
            this.charts.monthly.data.datasets[2].data = monthlyData.map(d => d.kupot);
            this.charts.monthly.update();
        }

        // עדכון גרף מצטבר
        if (this.charts.cumulative) {
            this.charts.cumulative.data.datasets[0].data = [
                fixedModelCumulative, 
                newModelCumulative, 
                kupotCumulative
            ];
            this.charts.cumulative.update();
        }

        // עדכון סיכום
        this.updateSummary(
            fixedPremium,
            monthlyData[0].newModel,
            monthlyData[0].kupot,
            fixedModelCumulative,
            newModelCumulative,
            kupotCumulative
        );
    },
    
    // עדכון סיכום - תיקון IDs
    updateSummary(fixedInitial, newInitial, kupotInitial, fixedTotal, newTotal, kupotTotal) {
        const elements = {
            'slide3FixedModelInitial': `₪${fixedInitial}`,
            'slide3NewModelInitial': `₪${newInitial}`,
            'slide3KupotInitial': `₪${kupotInitial}`,
            'slide3FixedModelTotal': `₪${fixedTotal.toLocaleString()}`,
            'slide3NewModelTotal': `₪${newTotal.toLocaleString()}`,
            'slide3KupotTotal': `₪${kupotTotal.toLocaleString()}`
        };
        
        Object.keys(elements).forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = elements[id];
            }
        });
    },
    
    // ניקוי גרפים
    destroy() {
        if (this.charts.monthly) {
            this.charts.monthly.destroy();
            this.charts.monthly = null;
        }
        if (this.charts.cumulative) {
            this.charts.cumulative.destroy();
            this.charts.cumulative = null;
        }
    }
};

// Export Slide3
window.Slide3 = Slide3;