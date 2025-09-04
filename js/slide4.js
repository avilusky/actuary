// slide4.js - לוגיקת ניתוח גירעון

const Slide4 = {
    charts: {
        deficit: null,
        totalDeficit: null
    },
    
    state: {
        basePremiums: 45,
        baseClaims: -56,
        baseExpenses: -5,
        premiumChange: 0,
        claimsChange: 0,
        fundValue: 0,
        waitingPeriod: 0,
        eligibilityPeriod: 0
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
    
    // טעינת תוכן
    loadContent() {
        const slide = document.getElementById('slide4');
        if (!slide) return;
        
        slide.innerHTML = this.getTemplate();
    },
    
    // הגדרת מאזיני אירועים
    setupEventListeners() {
        // Premium slider
        const premiumSlider = document.getElementById('slide6PremiumSlider');
        if (premiumSlider) {
            premiumSlider.addEventListener('input', (e) => {
                this.state.premiumChange = Number(e.target.value);
                document.getElementById('slide6PremiumValue').textContent = e.target.value;
                this.updateCharts();
            });
        }
        
        // Claims slider
        const claimsSlider = document.getElementById('slide6ClaimsSlider');
        if (claimsSlider) {
            claimsSlider.addEventListener('input', (e) => {
                this.state.claimsChange = Number(e.target.value);
                document.getElementById('slide6ClaimsValue').textContent = e.target.value;
                this.updateCharts();
            });
        }
        
        // Waiting period slider
        const waitingSlider = document.getElementById('slide6WaitingSlider');
        if (waitingSlider) {
            waitingSlider.addEventListener('input', (e) => {
                this.state.waitingPeriod = Number(e.target.value);
                const periodData = AppConfig.waitingPeriods[e.target.value];
                document.getElementById('slide6WaitingValue').textContent = periodData.text;
                this.updateCharts();
            });
        }
        
        // Fund slider
        const fundSlider = document.getElementById('slide6FundSlider');
        if (fundSlider) {
            fundSlider.addEventListener('input', (e) => {
                this.state.fundValue = Number(e.target.value);
                document.getElementById('slide6FundValue').textContent = e.target.value;
                this.updateCharts();
            });
        }
        
        // Eligibility slider
        const eligibilitySlider = document.getElementById('slide6EligibilitySlider');
        if (eligibilitySlider) {
            eligibilitySlider.addEventListener('input', (e) => {
                this.state.eligibilityPeriod = Number(e.target.value);
                const periodData = AppConfig.eligibilityPeriods[e.target.value];
                document.getElementById('slide6EligibilityValue').textContent = periodData.text;
                this.updateCharts();
            });
        }
    },
    
    // תבנית HTML ראשית
    getTemplate() {
        return `
            <div class="slide6-body">
                <div class="slide6-container">
                    <div class="slide6-title">
                        <h1>ניתוח גירעון באוכלוסיית בני 55 ומעלה</h1>
                        <h2>חלוקה לקופות וסימולטור</h2>
                    </div>

                    <div class="slide6-grid">
                        ${this.getControlsTemplate()}
                        ${this.getChartsTemplate()}
                    </div>
                </div>
            </div>
        `;
    },
    
    // תבנית בקרות
    getControlsTemplate() {
        return `
            <div class="slide6-card slide6-controls">
                <h3 class="slide6-control-title">סימולטור טיפול בגירעון</h3>

                <div class="slide6-slider-container">
                    <div class="slide6-slider-group">
                        <div class="slide6-slider-label">
                            <span>העלאת פרמיות</span>
                            <div class="slide6-slider-value">
                                <span id="slide6PremiumValue">0</span>%
                            </div>
                        </div>
                        <input type="range" id="slide6PremiumSlider" class="slide6-range" min="0" max="20" value="0" step="1">
                        <div class="slide6-calculation-impact" id="slide6PremiumImpact"></div>
                    </div>

                    <div class="slide6-slider-group">
                        <div class="slide6-slider-label">
                            <span>הקטנת תביעות</span>
                            <div class="slide6-slider-value">
                                <span id="slide6ClaimsValue">0</span>%
                            </div>
                        </div>
                        <input type="range" id="slide6ClaimsSlider" class="slide6-range" min="0" max="20" value="0" step="1">
                        <div class="slide6-calculation-impact" id="slide6ClaimsImpact"></div>
                    </div>

                    <div class="slide6-slider-group">
                        <div class="slide6-slider-label">
                            <span>תקופת המתנה</span>
                            <div class="slide6-slider-value">
                                <span id="slide6WaitingValue">ללא שינוי</span>
                            </div>
                        </div>
                        <input type="range" id="slide6WaitingSlider" class="slide6-range" min="0" max="3" value="0" step="1">
                        <div class="slide6-calculation-impact" id="slide6WaitingImpact"></div>
                    </div>

                    <div class="slide6-slider-group">
                        <div class="slide6-slider-label">
                            <span>קיצור תקופת זכאות</span>
                            <div class="slide6-slider-value">
                                <span id="slide6EligibilityValue">ללא שינוי</span>
                            </div>
                        </div>
                        <input type="range" id="slide6EligibilitySlider" class="slide6-range" min="0" max="1" value="0" step="1">
                        <div class="slide6-calculation-impact" id="slide6EligibilityImpact"></div>
                    </div>

                    <div class="slide6-slider-group">
                        <div class="slide6-slider-label">
                            <span>יתרת קרן קיימת</span>
                            <div class="slide6-slider-value">
                                <span id="slide6FundValue">0</span> מיליארד ₪
                            </div>
                        </div>
                        <input type="range" id="slide6FundSlider" class="slide6-range" min="0" max="8" value="0" step="1">
                        <div class="slide6-calculation-impact" id="slide6FundImpact"></div>
                    </div>
                </div>

                <div class="slide6-summary-box">
                    <h3>גירעון צפוי לאחר הפעולות</h3>
                    <div class="slide6-deficit-value" id="slide6ProjectedDeficit">16 מיליארד ₪</div>
                </div>
            </div>
        `;
    },
    
    // תבנית גרפים
    getChartsTemplate() {
        return `
            <div class="slide6-card slide6-charts-container">
                <div class="slide6-chart-wrapper">
                    <div class="slide6-chart-title">ניתוח גירעון לפי קופות חולים</div>
                    <canvas id="slide6DeficitChart"></canvas>
                </div>
                <div class="slide6-chart-wrapper">
                    <div class="slide6-chart-title">סך הכל גירעון במערכת</div>
                    <canvas id="slide6TotalDeficitChart"></canvas>
                </div>
            </div>
        `;
    },
    
    // חישוב גירעון כולל
    calculateTotalDeficit() {
        // חישוב פרמיות עם העלאה באחוזים
        let currentPremiums = this.state.basePremiums * (1 + this.state.premiumChange / 100);
        
        // חישוב תביעות - מתחילים מהבסיס
        let currentClaims = this.state.baseClaims;
        
        // הפחתת תביעות ידנית
        currentClaims *= (1 - this.state.claimsChange / 100);
        
        // הפחתה בגין תקופת המתנה
        const waitingImpact = AppConfig.waitingPeriods[this.state.waitingPeriod].impact;
        currentClaims *= (1 - waitingImpact / 100);
        
        // הפחתה בגין קיצור תקופת זכאות
        const eligibilityImpact = AppConfig.eligibilityPeriods[this.state.eligibilityPeriod].impact;
        currentClaims *= (1 - eligibilityImpact / 100);

        return {
            premiums: currentPremiums,
            claimsAndExpenses: currentClaims + this.state.baseExpenses,
            fundValue: this.state.fundValue,
            total: currentPremiums + currentClaims + this.state.baseExpenses + this.state.fundValue
        };
    },
    
    // עדכון השפעות
    updateImpacts() {
        const premiumImpact = document.getElementById('slide6PremiumImpact');
        const claimsImpact = document.getElementById('slide6ClaimsImpact');
        const waitingImpact = document.getElementById('slide6WaitingImpact');
        const eligibilityImpact = document.getElementById('slide6EligibilityImpact');
        const fundImpact = document.getElementById('slide6FundImpact');

        // חישוב הבסיס הנוכחי לאחר כל שינוי קודם
        let currentClaims = this.state.baseClaims;
        
        // חישוב השפעת פרמיות
        const premiumChange = (this.state.basePremiums * this.state.premiumChange / 100).toFixed(1);
        
        // חישוב השפעת הקטנת תביעות
        const claimsChange = (currentClaims * this.state.claimsChange / 100).toFixed(1);
        currentClaims *= (1 - this.state.claimsChange / 100);
        
        // חישוב השפעת תקופת המתנה
        const waitingChange = (currentClaims * AppConfig.waitingPeriods[this.state.waitingPeriod].impact / 100).toFixed(1);
        currentClaims *= (1 - AppConfig.waitingPeriods[this.state.waitingPeriod].impact / 100);
        
        // חישוב השפעת קיצור תקופת זכאות
        const eligibilityChange = (currentClaims * AppConfig.eligibilityPeriods[this.state.eligibilityPeriod].impact / 100).toFixed(1);

        // הצגת ההשפעות
        if (premiumImpact) premiumImpact.textContent = `השפעה: +${Math.abs(premiumChange)} מיליארד ₪`;
        if (claimsImpact) claimsImpact.textContent = `השפעה: +${Math.abs(claimsChange)} מיליארד ₪`;
        if (waitingImpact) waitingImpact.textContent = `השפעה: +${Math.abs(waitingChange)} מיליארד ₪`;
        if (eligibilityImpact) eligibilityImpact.textContent = `השפעה: +${Math.abs(eligibilityChange)} מיליארד ₪`;
        if (fundImpact) fundImpact.textContent = `השפעה: +${this.state.fundValue} מיליארד ₪`;
    },
    
    // יצירת גרפים
    createCharts() {
        this.createDeficitChart();
        this.createTotalDeficitChart();
    },
    
    // יצירת גרף גירעון לפי קופות
    createDeficitChart() {
        const ctx = document.getElementById('slide6DeficitChart');
        if (!ctx) return;
        
        this.charts.deficit = new Chart(ctx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['כללית', 'מכבי', 'לאומית', 'מאוחדת'],
                datasets: [{
                    label: 'פרמיות',
                    data: [23, 16, 2, 4],
                    backgroundColor: '#22c55e',
                    borderRadius: 8,
                    borderSkipped: false
                }, {
                    label: 'תביעות והוצאות',
                    data: [-32, -21, -3, -5],
                    backgroundColor: '#fb923c',
                    borderRadius: 8,
                    borderSkipped: false
                }, {
                    label: 'גירעון',
                    data: [-9, -5, -1, -1],
                    backgroundColor: '#ef4444',
                    borderRadius: 8,
                    borderSkipped: false
                }]
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
                                size: 12,
                                weight: '500'
                            },
                            usePointStyle: true
                        }
                    }
                },
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: 'מיליארדי ₪'
                        },
                        grid: {
                            color: function(context) {
                                if (context.tick.value === 0) {
                                    return '#94a3b8';
                                }
                                return 'rgba(0, 0, 0, 0.1)';
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
        
        // הוסף רק את 5 השורות האלה:
        // הסתרת כל ה-datasets בהתחלה - רק בגרף קופות החולים
        this.charts.deficit.data.datasets.forEach((dataset, index) => {
            const meta = this.charts.deficit.getDatasetMeta(index);
            meta.hidden = true;
        });
        this.charts.deficit.update();
    },
    
    // יצירת גרף גירעון כולל
    createTotalDeficitChart() {
        const ctx = document.getElementById('slide6TotalDeficitChart');
        if (!ctx) return;
        
        this.charts.totalDeficit = new Chart(ctx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: [''],
                datasets: [{
                    label: 'יתרת קרן קיימת',
                    data: [0],
                    backgroundColor: '#60a5fa',
                    borderRadius: 8,
                    borderSkipped: false
                }, {
                    label: 'סה"כ פרמיות',
                    data: [45],
                    backgroundColor: '#22c55e',
                    borderRadius: 8,
                    borderSkipped: false
                }, {
                    label: 'סה"כ תביעות והוצאות',
                    data: [-61],
                    backgroundColor: '#fb923c',
                    borderRadius: 8,
                    borderSkipped: false
                }, {
                    label: 'גירעון כולל',
                    data: [-16],
                    backgroundColor: '#ef4444',
                    borderRadius: 8,
                    borderSkipped: false
                }]
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
                                size: 12,
                                weight: '500'
                            },
                            usePointStyle: true
                        }
                    }
                },
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: 'מיליארדי ₪'
                        },
                        min: -65,
                        max: 65,
                        grid: {
                            color: function(context) {
                                if (context.tick.value === 0) {
                                    return '#94a3b8';
                                }
                                return 'rgba(0, 0, 0, 0.1)';
                            }
                        },
                        ticks: {
                            stepSize: 20
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    },
    
    // עדכון גרפים
    updateCharts() {
        const results = this.calculateTotalDeficit();
        
        // עדכון הנתונים לפי הסדר החדש
        if (this.charts.totalDeficit) {
            this.charts.totalDeficit.data.datasets[0].data = [results.fundValue];
            this.charts.totalDeficit.data.datasets[1].data = [results.premiums];
            this.charts.totalDeficit.data.datasets[2].data = [results.claimsAndExpenses];
            this.charts.totalDeficit.data.datasets[3].data = [results.total];
            
            // עדכון צבע וכותרת לפי התוצאה
            this.charts.totalDeficit.data.datasets[3].backgroundColor = results.total >= 0 ? '#15803d' : '#ef4444';
            this.charts.totalDeficit.data.datasets[3].label = results.total >= 0 ? 'עודף כולל' : 'גירעון כולל';
            
            this.charts.totalDeficit.update();
        }
        
// עדכון הטקסט המוצג
const summaryBox = document.querySelector('.slide6-summary-box');
const summaryTitle = document.querySelector('.slide6-summary-box h3');
const deficitElement = document.getElementById('slide6ProjectedDeficit');

if (summaryTitle && deficitElement && summaryBox) {
    if (results.total >= 0) {
        summaryTitle.textContent = 'עודף צפוי לאחר הפעולות';
        deficitElement.textContent = results.total.toFixed(1) + ' מיליארד ₪';
        deficitElement.style.color = '#15803d';
        deficitElement.className = 'slide6-deficit-value slide6-deficit-positive';
        // שינוי צבע הקופסה החיצונית לירוק בהיר יותר
        summaryBox.style.background = 'linear-gradient(135deg, #f0fdf4, #e6ffed)';
        summaryBox.style.borderColor = '#86efac';
        summaryTitle.style.color = '#166534';
    } else {
        summaryTitle.textContent = 'גירעון צפוי לאחר הפעולות';
        deficitElement.textContent = Math.abs(results.total).toFixed(1) + ' מיליארד ₪';
        deficitElement.style.color = '#ef4444';
        deficitElement.className = 'slide6-deficit-value slide6-deficit-negative';
        // החזרת צבע הקופסה החיצונית לאדום בהיר יותר
        summaryBox.style.background = 'linear-gradient(135deg, #fef2f2, #ffebe9)';
        summaryBox.style.borderColor = '#fca5a5';
        summaryTitle.style.color = '#991b1b';
    }
}
        
        this.updateImpacts();
    },
    
    // ניקוי גרפים
    destroy() {
        if (this.charts.deficit) {
            this.charts.deficit.destroy();
            this.charts.deficit = null;
        }
        if (this.charts.totalDeficit) {
            this.charts.totalDeficit.destroy();
            this.charts.totalDeficit = null;
        }
    }
};

// Export Slide4
window.Slide4 = Slide4;