// init.js - אתחול האפליקציה

const App = {
    // מצב האפליקציה
    state: {
        isInitialized: false,
        currentSlide: 1,
        slides: {},
        isLoading: false
    },
    
    // אתחול ראשי
    init() {
        console.log('Initializing presentation app...');
        
        // בדיקת תלויות
        if (!this.checkDependencies()) {
            console.error('Missing dependencies');
            return;
        }
        
        // אתחול רכיבים
        this.initializeComponents();
        
        // הגדרת אירועים גלובליים
        this.setupGlobalEvents();
        
        // טעינת נתונים
        this.loadData();
        
        // סימון כמאותחל
        this.state.isInitialized = true;
        console.log('App initialized successfully');
    },
    
    // בדיקת תלויות
    checkDependencies() {
        const dependencies = [
            { name: 'Chart.js', check: () => typeof Chart !== 'undefined' },
            { name: 'Navigation', check: () => typeof Navigation !== 'undefined' },
            { name: 'AppConfig', check: () => typeof AppConfig !== 'undefined' }
        ];
        
        let allLoaded = true;
        
        dependencies.forEach(dep => {
            if (!dep.check()) {
                console.error(`Missing dependency: ${dep.name}`);
                allLoaded = false;
            }
        });
        
        return allLoaded;
    },
    
    // אתחול רכיבים
    initializeComponents() {
        // אתחול ניווט
        if (Navigation) {
            Navigation.init();
        }
        
        // אתחול שקפים
        this.initializeSlides();
        
        // אתחול תמיכה בנגישות
        this.initAccessibility();
    },
    
    // אתחול שקפים
    initializeSlides() {
        // רישום כל השקפים
        this.state.slides = {
            1: { name: 'Opening', module: null },
            2: { name: 'Model', module: Slide2 },
            3: { name: 'Premium Calculator', module: Slide3 },
            4: { name: 'Deficit Analysis', module: Slide4 }
        };
        
        // טעינת תוכן לשקפים
        this.loadSlideContent();
    },
    
    // טעינת תוכן שקפים
    loadSlideContent() {
        // טעינת תוכן לכל שקף
        Object.keys(this.state.slides).forEach(slideNum => {
            const slide = this.state.slides[slideNum];
            if (slide.module && slide.module.loadContent) {
                slide.module.loadContent();
            }
        });
    },
    
    // הגדרת אירועים גלובליים
    setupGlobalEvents() {
        // התאמת גודל חלון
        window.addEventListener('resize', this.handleResize.bind(this));
        
        // טיפול בשגיאות
        window.addEventListener('error', this.handleError.bind(this));
        
        // לפני עזיבת העמוד
        window.addEventListener('beforeunload', this.handleBeforeUnload.bind(this));
        
        // מצב אופליין/אונליין
        window.addEventListener('online', this.handleOnline.bind(this));
        window.addEventListener('offline', this.handleOffline.bind(this));
        
        // Visibility change
        document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
    },
    
    // טיפול בשינוי גודל חלון
    handleResize() {
        // עדכון גרפים אם צריך
        if (this.state.currentSlide > 1) {
            const currentModule = this.state.slides[this.state.currentSlide].module;
            if (currentModule && currentModule.charts) {
                Object.values(currentModule.charts).forEach(chart => {
                    if (chart) chart.resize();
                });
            }
        }
    },
    
    // טיפול בשגיאות
    handleError(event) {
        console.error('Global error:', event.error);
        
        // הצגת הודעה למשתמש במקרה של שגיאה קריטית
        if (event.error && event.error.message.includes('Chart')) {
            this.showNotification('שגיאה בטעינת הגרפים. אנא רענן את העמוד.', 'error');
        }
    },
    
    // טיפול לפני עזיבת העמוד
    handleBeforeUnload(event) {
        // שמירת מצב אם יש מה לשמור
        if (this.hasUnsavedChanges()) {
            event.preventDefault();
            event.returnValue = 'יש שינויים שלא נשמרו. האם אתה בטוח שברצונך לעזוב?';
        }
    },
    
    // טיפול במצב אונליין
    handleOnline() {
        console.log('Back online');
        this.showNotification('חזרת למצב מקוון', 'success');
    },
    
    // טיפול במצב אופליין
    handleOffline() {
        console.log('Gone offline');
        this.showNotification('אתה במצב לא מקוון', 'warning');
    },
    
    // טיפול בשינוי נראות
    handleVisibilityChange() {
        if (document.hidden) {
            // עצירת אנימציות כשהטאב לא פעיל
            this.pauseAnimations();
        } else {
            // חידוש אנימציות
            this.resumeAnimations();
        }
    },
    
    // טעינת נתונים
    loadData() {
        // כאן אפשר לטעון נתונים מקובצי JSON חיצוניים
        // לדוגמה:
        // fetch('data/premiums.json')
        //     .then(response => response.json())
        //     .then(data => this.processData(data));
    },
    
    // אתחול נגישות
    initAccessibility() {
        // הוספת ARIA labels
        this.addAriaLabels();
        
        // תמיכה בניווט מקלדת
        this.setupKeyboardNavigation();
        
        // תמיכה בקורא מסך
        this.setupScreenReaderSupport();
    },
    
    // הוספת תוויות ARIA
    addAriaLabels() {
        // כפתורי ניווט
        const prevBtn = document.getElementById('prevSlide');
        const nextBtn = document.getElementById('nextSlide');
        
        if (prevBtn) prevBtn.setAttribute('aria-label', 'שקף קודם');
        if (nextBtn) nextBtn.setAttribute('aria-label', 'שקף הבא');
        
        // שקפים
        document.querySelectorAll('.slide').forEach((slide, index) => {
            slide.setAttribute('role', 'region');
            slide.setAttribute('aria-label', `שקף ${index + 1}`);
        });
    },
    
    // הגדרת ניווט מקלדת
    setupKeyboardNavigation() {
        // כבר מטופל ב-Navigation.js
        // כאן אפשר להוסיף קיצורי דרך נוספים
        document.addEventListener('keydown', (e) => {
            // F11 - מסך מלא
            if (e.key === 'F11') {
                e.preventDefault();
                this.toggleFullscreen();
            }
            
            // ? - הצגת עזרה
            if (e.key === '?' && e.shiftKey) {
                this.showHelp();
            }
        });
    },
    
    // תמיכה בקורא מסך
    setupScreenReaderSupport() {
        // יצירת אזור הכרזות
        const announcer = document.createElement('div');
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        announcer.id = 'screen-reader-announcer';
        document.body.appendChild(announcer);
    },
    
    // הכרזה לקורא מסך
    announce(message) {
        const announcer = document.getElementById('screen-reader-announcer');
        if (announcer) {
            announcer.textContent = message;
            // ניקוי אחרי 1 שנייה
            setTimeout(() => {
                announcer.textContent = '';
            }, 1000);
        }
    },
    
    // מסך מלא
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error('Error attempting to enable fullscreen:', err);
            });
        } else {
            document.exitFullscreen();
        }
    },
    
    // הצגת עזרה
    showHelp() {
        const helpText = `
            קיצורי מקלדת:
            ← → - ניווט בין שקפים
            Home - שקף ראשון
            End - שקף אחרון
            F11 - מסך מלא
            ? - הצגת עזרה
        `;
        
        this.showNotification(helpText, 'info', 5000);
    },
    
    // הצגת התראה
    showNotification(message, type = 'info', duration = 3000) {
        // יצירת אלמנט התראה
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 15px 25px;
            border-radius: 8px;
            background: ${type === 'error' ? '#ef4444' : type === 'warning' ? '#f97316' : type === 'success' ? '#22c55e' : '#3b82f6'};
            color: white;
            font-size: 14px;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // הצגה
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 10);
        
        // הסתרה והסרה
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, duration);
    },
    
    // בדיקה אם יש שינויים שלא נשמרו
    hasUnsavedChanges() {
        // כאן אפשר להוסיף לוגיקה לבדיקת שינויים
        return false;
    },
    
    // עצירת אנימציות
    pauseAnimations() {
        document.querySelectorAll('.animate').forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    },
    
    // חידוש אנימציות
    resumeAnimations() {
        document.querySelectorAll('.animate').forEach(el => {
            el.style.animationPlayState = 'running';
        });
    },
    
    // ניקוי לפני סגירה
    cleanup() {
        // ניקוי גרפים
        Object.values(this.state.slides).forEach(slide => {
            if (slide.module && slide.module.destroy) {
                slide.module.destroy();
            }
        });
        
        // הסרת מאזינים
        window.removeEventListener('resize', this.handleResize);
        window.removeEventListener('error', this.handleError);
        window.removeEventListener('beforeunload', this.handleBeforeUnload);
    }
};

// אתחול כשה-DOM מוכן
document.addEventListener('DOMContentLoaded', () => {
    // המתנה קצרה לוודא שכל הסקריפטים נטענו
    setTimeout(() => {
        App.init();
    }, 100);
});

// Export App
window.App = App;

// הוספת class לתמיכה בקורא מסך בלבד
const style = document.createElement('style');
style.textContent = `
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
`;
document.head.appendChild(style);