// slide2.js - לוגיקת שקף המודל

const Slide2 = {
    charts: {
        survival: null,
        premium: null
    },
    
    // אתחול השקף
    init() {
        this.loadContent();
        // עיכוב קצר לוודא שה-DOM נטען
        setTimeout(() => {
            this.setupEventListeners();
            this.ensureDialogsInBody();
        }, 100);
    },
    
    // טעינת תוכן השקף
    loadContent() {
        const slide = document.getElementById('slide2');
        if (!slide) return;
        
        slide.innerHTML = this.getTemplate();
    },
    
    // וידוא שהדיאלוגים נמצאים ב-body
    ensureDialogsInBody() {
        // מציאת כל הדיאלוגים
        const dialogs = document.querySelectorAll('.slide3-dialog-overlay');
        
        // העברה ל-body אם הם לא שם
        dialogs.forEach(dialog => {
            if (dialog.parentElement !== document.body) {
                document.body.appendChild(dialog);
            }
        });
    },
    
    // הגדרת מאזיני אירועים
    setupEventListeners() {
        // Dialog triggers
        const dialogTriggers = document.querySelectorAll('.slide3-dialog-trigger');
        dialogTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const dialogType = e.currentTarget.getAttribute('data-dialog');
                this.openDialog(dialogType);
            });
        });
    },
    
    // תבנית HTML של השקף
    getTemplate() {
        return `
            <div class="slide3-body">
                <div class="slide3-slide">
<div class="example-ribbon">מודל לדוגמה</div>
                    <div class="slide3-title">
                        <h1>מודל חדש - שילוב חיסכון וביטוח סיעודי</h1>
                        <h2>פתרון ארוך טווח למערכת הביטוח הסיעודי בישראל</h2>
                    </div>
        
                    <div class="slide3-model-stages">
                        ${this.getSavingsStageTemplate()}
                        ${this.getInsuranceStageTemplate()}
                    </div>
        
                    ${this.getGuaranteesTemplate()}
                </div>
            </div>
            ${this.getDialogsTemplate()}
        `;
    },
    
    // תבנית שלב החיסכון
    getSavingsStageTemplate() {
        return `
            <div class="slide3-stage-card slide3-savings">
                <h3>שלב ראשון - חיסכון (עד גיל 70)</h3>
                <ul class="slide3-feature-list">
                    <li><strong>חיסכון אישי</strong> בפוליסת חיסכון פרטית בפרמיות קבועות או משתנות</li>
                    <li><strong>ניהול השקעות</strong> מסלול המותאם לגיל ולסיכון</li>
                    <li><strong>דמי ניהול:</strong> 1% מהצבירה</li>
<li style="display: flex; align-items: center; position: relative;">
<strong style="margin-left: 0.5rem;" class="slide3-tooltip-trigger" data-tooltip="בהתאם לאיזון אקטוארי">יעדי חיסכון:</strong>
    <div class="slide3-savings-goals">
        <div class="slide3-savings-goal-item">
            <span class="slide3-savings-goal-label">זכר:</span>
            <span class="slide3-savings-goal-amount">80,000 ₪</span>
        </div>
        <div class="slide3-savings-goal-item slide3-women">
            <span class="slide3-savings-goal-label">נקבה:</span>
            <span class="slide3-savings-goal-amount">100,000 ₪</span>
        </div>
    </div>
<span style="font-size: 0.75rem; color: #64748b; position: absolute; left: 20px; top: 50%; transform: translateY(-50%); background: linear-gradient(90deg, rgba(251,252,253,0.95), rgba(248,250,252,0.95)); padding: 4px 10px; border-radius: 14px; border: 1px solid rgba(226,232,240,0.3); font-weight: 500; letter-spacing: 0.3px;">לתגמולים של 5,000 ₪ לחודש</span>
</li>

                    <li><strong>תשואה שנתית חזויה:</strong> <span class="slide3-tooltip-trigger" data-tooltip="לפי נתוני רשות שוק ההון במסלול כללי">4%</span></li>
                    <li><strong>גיל הצטרפות אופטימלי:</strong>עד <span class="slide3-dialog-trigger" data-dialog="age55">55</span></li>
                </ul>
            </div>
        `;
    },
    
    // תבנית שלב הביטוח
    getInsuranceStageTemplate() {
        return `
            <div class="slide3-stage-card slide3-insurance">
                <h3>שלב שני - ביטוח סיעודי (מגיל 70)</h3>
                <ul class="slide3-feature-list">
                    <li><strong>המרה אוטומטית</strong> לפרמיה חד-פעמית בגיל <span class="slide3-dialog-trigger" data-dialog="age70">70</span></li>
                    <li><strong>ללא חיתום נוסף</strong> במעבר בין השלבים</li>
                    <li><strong>כיסוי מקיף</strong> לכל החיים</li>
                    <li style="position: relative;"><strong>תגמול חודשי:</strong> <span class="slide3-tooltip-trigger" data-tooltip="זהה לתגמולים בביטוח סיעודי קבוצתי בקופות החולים כיום, מתואם למקדם המרה שייקבע בגיל 70">5,000 ₪</span><span style="font-size: 0.75rem; color: #64748b; position: absolute; left: 20px; top: 50%; transform: translateY(-50%); background: linear-gradient(90deg, rgba(251,252,253,0.95), rgba(248,250,252,0.95)); padding: 4px 10px; border-radius: 14px; border: 1px solid rgba(226,232,240,0.3); font-weight: 500; letter-spacing: 0.3px;">משתנה לפי הצבירה</span></li>
                    <li><strong>תקופת תשלום:</strong> <span class="slide3-tooltip-trigger" data-tooltip="זהה לביטוח סיעודי קבוצתי בקופות החולים, כאשר בפועל משך התביעה הממוצע עומד על 38 חודשים">עד 60 חודשים</span></li>
                    <li><strong>תשואה שנתית חזויה:</strong> <span class="slide3-tooltip-trigger slide3-long" data-tooltip="ריבית חסרת סיכון לטווח ארוך">2.5%</span></li>
                </ul>
            </div>
        `;
    },
    
    // תבנית הבטחות
    getGuaranteesTemplate() {
        return `
            <div class="slide3-guarantees">
                <h3>הבטחות מובנות במוצר</h3>
                <div class="slide3-guarantee-grid">
                    <div class="slide3-guarantee-item">
                        <h4>הבטחת מוות ללא תביעה</h4>
                        <p>30,000 ₪ במקרה פטירה ללא מצב סיעודי</p>
                    </div>
                    <div class="slide3-guarantee-item">
                        <h4>הבטחת תשלום מינימלי</h4>
                        <p>12 חודשי תשלום במקרה פטירה תוך כדי קבלת תגמולים</p>
                    </div>
                    <div class="slide3-guarantee-item">
                        <h4>החזר חיסכון</h4>
                        <p>החזר יתרה צבורה במקרה פטירה/סיעוד לפני גיל 70</p>
                    </div>
                </div>
            </div>
        `;
    },
    
    // תבנית הדיאלוגים
    getDialogsTemplate() {
        return `
            <div id="slide3-ageDialog" class="slide3-dialog-overlay" style="display: none;">
                <div class="slide3-dialog-content" onclick="event.stopPropagation()">
                    <div class="slide3-dialog-title">חישוב גיל המעבר - 70</div>
                    <div class="slide3-dialog-description">
                        התרשים מציג את שיעורי השרידות באוכלוסיית המבוטחים מגיל 0 עד 100 (הקו הכחול).
                        הקו האדום מסמן את רף ה-85%, המייצג את שיעור ההישרדות בגיל 70. כ-85% מהאוכלוסייה
                        מגיעים לגיל 70 ללא כניסה למצב סיעודי, נתון המהווה בסיס לקביעת גיל זה כנקודת המעבר מחיסכון לביטוח.
                    </div>
                    <div class="slide3-dialog-chart">
                        <canvas id="slide3-survivalChart"></canvas>
                    </div>
                    <button class="slide3-dialog-close" onclick="Slide2.closeDialog('age70')">✕</button>
                </div>
            </div>
            
            <div id="slide3-age55Dialog" class="slide3-dialog-overlay" style="display: none;">
                <div class="slide3-dialog-content" onclick="event.stopPropagation()">
                    <div class="slide3-dialog-title">גיל ההצטרפות למוצר</div>
                    <div class="slide3-dialog-description">
                        הגיל האופטימלי להצטרפות הוא מתחת ל-55 שנים, וזאת משלושה טעמים עיקריים:
                    </div>
                    
                    <div class="slide3-dialog-description">
                        <ol>
                            <li>מניעת אנטי-סלקציה - הגבלת הגיל מצמצמת את האפשרות להצטרפות סלקטיבית של אוכלוסייה מבוגרת בעלת סיכון מוגבר.</li>
                            <li>היתכנות כלכלית - צבירת החיסכון הנדרש בפרק זמן קצר מחייבת הפקדות חודשיות גבוהות במיוחד:</li>
                            <table class="slide3-premium-table">
                                <thead>
                                    <tr>
                                        <th>גיל ההצטרפות</th>
                                        <th>זכר</th>
                                        <th>נקבה</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>55</td>
                                        <td>₪ 370</td>
                                        <td>₪ 470</td>
                                    </tr>
                                    <tr>
                                        <td>60</td>
                                        <td>₪ 600</td>
                                        <td>₪ 750</td>
                                    </tr>
                                    <tr>
                                        <td>65</td>
                                        <td>₪ 1200</td>
                                        <td>₪ 1600</td>
                                    </tr>
                                </tbody>
                            </table>
                            <li>תמחור הוגן - גיל 55 נבחר גם בשל היותו נקודת מפנה משמעותית במודל הקיים של הביטוח הקבוצתי בקופות החולים.</li>
                        </ol>
                    </div>
                    <div class="slide3-dialog-chart">
                        <canvas id="slide3-premiumChart"></canvas>
                    </div>
                    <button class="slide3-dialog-close" onclick="Slide2.closeDialog('age55')">✕</button>
                </div>
            </div>
        `;
    },
    
    // פתיחת הדיאלוג
    openDialog(type) {
        const dialogId = type === 'age70' ? 'slide3-ageDialog' : 'slide3-age55Dialog';
        const dialog = document.getElementById(dialogId);
        
        if (dialog) {
            // הצגת הדיאלוג
            dialog.style.display = 'flex';
            
            // הוספת event listener לסגירה בלחיצה על הרקע
            dialog.onclick = (e) => {
                if (e.target === dialog) {
                    this.closeDialog(type);
                }
            };
            
            // יצירת הגרף המתאים
            setTimeout(() => {
                if (type === 'age70') {
                    this.createSurvivalChart();
                } else {
                    this.createPremiumChart();
                }
            }, 100);
        }
    },
    
    // סגירת הדיאלוג
    closeDialog(type) {
        const dialogId = type === 'age70' ? 'slide3-ageDialog' : 'slide3-age55Dialog';
        const dialog = document.getElementById(dialogId);
        
        if (dialog) {
            dialog.style.display = 'none';
            
            // ניקוי הגרף
            if (type === 'age70' && this.charts.survival) {
                this.charts.survival.destroy();
                this.charts.survival = null;
            } else if (type === 'age55' && this.charts.premium) {
                this.charts.premium.destroy();
                this.charts.premium = null;
            }
        }
    },
    
    // יצירת גרף שרידות
    createSurvivalChart() {
        // בדיקה אם הגרף כבר קיים
        if (this.charts.survival) {
            this.charts.survival.destroy();
            this.charts.survival = null;
        }
        
        const ctx = document.getElementById('slide3-survivalChart');
        if (!ctx) return;
        
        const labels = Array.from({length: 11}, (_, i) => i * 10);
        
        const survivalData = labels.map(age => {
            if (age <= 70) {
                const x = age / 70;
                const decay = x * x;
                return 100 - (15 * decay);
            } else {
                const baseDecay = 1.3;
                const acceleratedDecay = (age - 70) * 0.05;
                return Math.max(85 - ((age - 70) * (baseDecay + acceleratedDecay)), 0);
            }
        });

        const pctLine = Array(11).fill(85);

        this.charts.survival = new Chart(ctx.getContext('2d'), {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'שרידות',
                    data: survivalData,
                    borderColor: '#3b82f6',
                    borderWidth: 2.5,
                    tension: 0.4,
                    fill: false,
                    pointRadius: 0,
                    pointHoverRadius: 0
                }, {
                    label: 'רף קריטי',
                    data: pctLine,
                    borderColor: 'rgba(239, 68, 68, 0.6)',
                    borderWidth: 1.5,
                    tension: 0,
                    fill: false,
                    borderDash: [4, 4],
                    pointRadius: 0,
                    pointHoverRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            pointStyle: 'line',
                            padding: 20,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        enabled: true,
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y.toFixed(1) + '%';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: 'rgba(0,0,0,0.05)',
                            drawBorder: false
                        },
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            },
                            stepSize: 10,
                            font: {
                                size: 11
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            stepSize: 10,
                            font: {
                                size: 11
                            }
                        },
                        title: {
                            display: true,
                            text: 'גיל',
                            font: {
                                size: 12
                            }
                        }
                    }
                }
            }
        });
    },
    
    // יצירת גרף פרמיות
    createPremiumChart() {
        // בדיקה אם הגרף כבר קיים
        if (this.charts.premium) {
            this.charts.premium.destroy();
            this.charts.premium = null;
        }
        
        const ctx = document.getElementById('slide3-premiumChart');
        if (!ctx) return;
        
        const years = ['2024', '2029', '2034', '2039', '2044', '2049', '2054', '2059', '2064'];
        const existingModel = [1600, 1700, 1630, 1330, 920, 470, 150, 20, 1];
        const newModel = [1600, 1200, 880, 540, 270, 100, 30, 3, 0];
        
        this.charts.premium = new Chart(ctx.getContext('2d'), {
            type: 'line',
            data: {
                labels: years,
                datasets: [
                    {
                        label: 'תביעות שישולמו',
                        data: existingModel,
                        borderColor: '#94a3b8',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: false,
                        pointRadius: 0,
                        pointHoverRadius: 0
                    },
                    {
                        label: 'פרמיות שיתקבלו',
                        data: newModel,
                        borderColor: '#0ea5e9',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: false,
                        pointRadius: 0,
                        pointHoverRadius: 0
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
                            usePointStyle: true,
                            pointStyle: 'line',
                            padding: 20,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y.toLocaleString();
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0,0,0,0.05)',
                            drawBorder: false
                        },
                        ticks: {
                            font: {
                                size: 11
                            },
                            callback: function(value) {
                                return value.toLocaleString();
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                size: 11
                            }
                        }
                    }
                }
            }
        });
    },
    
    // ניקוי גרפים
    destroy() {
        if (this.charts.survival) {
            this.charts.survival.destroy();
            this.charts.survival = null;
        }
        if (this.charts.premium) {
            this.charts.premium.destroy();
            this.charts.premium = null;
        }
    }
};

// Export Slide2
window.Slide2 = Slide2;