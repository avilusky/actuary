// navigation.js - ניווט בין שקפים

const Navigation = {
    currentSlideIndex: 1,
    totalSlides: 4,
    isTransitioning: false,
    
    // אתחול מערכת הניווט
    init() {
        this.setupEventListeners();
        this.updateIndicators();
        this.initKeyboardNavigation();
        this.initTouchNavigation();
        this.setupLogoVisibility();
    },
    
    // הגדרת מאזינים לאירועים
    setupEventListeners() {
        const prevBtn = document.getElementById('prevSlide');
        const nextBtn = document.getElementById('nextSlide');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.changeSlide(-1));
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.changeSlide(1));
        }
    },
    
    // ניווט מקלדת
    initKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (this.isTransitioning) return;
            
            switch(e.key) {
                case 'ArrowRight':
                    this.changeSlide(-1);
                    break;
                case 'ArrowLeft':
                    this.changeSlide(1);
                    break;
                case 'Home':
                    this.goToSlide(1);
                    break;
                case 'End':
                    this.goToSlide(this.totalSlides);
                    break;
                case 'Escape':
                    // אפשר להוסיף פונקציונליות למקש Escape
                    break;
            }
        });
    },
    
    // ניווט מגע (swipe)
    initTouchNavigation() {
        let touchStartX = 0;
        let touchEndX = 0;
        const minSwipeDistance = 50;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX, minSwipeDistance);
        });
    },
    
    // טיפול בתנועת swipe
    handleSwipe(startX, endX, minDistance) {
        const distance = endX - startX;
        
        if (Math.abs(distance) < minDistance) return;
        
        if (distance > 0) {
            // Swipe right (RTL - previous slide)
            this.changeSlide(-1);
        } else {
            // Swipe left (RTL - next slide)
            this.changeSlide(1);
        }
    },
    
    // החלפת שקף
    changeSlide(direction) {
        if (this.isTransitioning) return;
        
        const nextIndex = this.currentSlideIndex + direction;
        
        if (nextIndex < 1 || nextIndex > this.totalSlides) return;
        
        this.isTransitioning = true;
        
        // הסרת overflow-x
        document.body.style.overflowX = 'hidden';
        
        const slides = document.querySelectorAll('.slide');
        const currentSlide = slides[this.currentSlideIndex - 1];
        const nextSlide = slides[nextIndex - 1];
        
        // הכנת השקפים למעבר
        this.prepareSlides(currentSlide, nextSlide, direction);
        
        // ביצוע האנימציה
        requestAnimationFrame(() => {
            this.animateSlides(currentSlide, nextSlide, direction);
        });
        
        // עדכון אינדקס
        this.currentSlideIndex = nextIndex;
        
        // עדכון UI
        this.updateIndicators();
        this.updateLogo();
        
        // טעינת תוכן דינמי לשקף
        this.loadSlideContent(nextIndex);
        
        // סיום המעבר
        setTimeout(() => {
            this.cleanupTransition(currentSlide, nextSlide);
            this.isTransitioning = false;
        }, AppConfig.animations.slideTransition);
    },
    
    // מעבר ישיר לשקף מסוים
    goToSlide(slideNumber) {
        if (slideNumber === this.currentSlideIndex) return;
        
        const direction = slideNumber > this.currentSlideIndex ? 1 : -1;
        const steps = Math.abs(slideNumber - this.currentSlideIndex);
        
        // אפשר להוסיף אנימציה מיוחדת למעבר ישיר
        this.currentSlideIndex = slideNumber - direction;
        this.changeSlide(direction);
    },
    
    // הכנת שקפים למעבר
    prepareSlides(currentSlide, nextSlide, direction) {
        // הסרת כל המצבים הקודמים
        document.querySelectorAll('.slide').forEach(slide => {
            slide.style.display = 'none';
            slide.classList.remove('active', 'prev', 'next');
        });
        
        // הצגת השקפים הרלוונטיים
        currentSlide.style.display = 'block';
        nextSlide.style.display = 'block';
        
        // הגדרת מיקום התחלתי (הפוך בגלל RTL)
        if (direction > 0) {
            nextSlide.style.transform = 'translateX(-100%)';
            currentSlide.style.transform = 'translateX(0)';
        } else {
            nextSlide.style.transform = 'translateX(100%)';
            currentSlide.style.transform = 'translateX(0)';
        }
    },
    
    // אנימציית המעבר
    animateSlides(currentSlide, nextSlide, direction) {
        currentSlide.style.transition = 'all 0.5s ease-in-out';
        nextSlide.style.transition = 'all 0.5s ease-in-out';
        
        if (direction > 0) {
            currentSlide.style.transform = 'translateX(100%)';
        } else {
            currentSlide.style.transform = 'translateX(-100%)';
        }
        
        nextSlide.style.transform = 'translateX(0)';
        nextSlide.style.opacity = '1';
        currentSlide.style.opacity = '0';
        nextSlide.classList.add('active');
    },
    
    // ניקוי לאחר המעבר
    cleanupTransition(currentSlide, nextSlide) {
        currentSlide.style.display = 'none';
        currentSlide.style.transition = 'none';
        nextSlide.style.transition = 'none';
    },
    
    // עדכון אינדיקטורים
    updateIndicators() {
        const currentSlideElement = document.getElementById('currentSlide');
        const prevBtn = document.getElementById('prevSlide');
        const nextBtn = document.getElementById('nextSlide');
        
        if (currentSlideElement) {
            currentSlideElement.textContent = this.currentSlideIndex;
        }
        
        if (prevBtn) {
            prevBtn.disabled = this.currentSlideIndex === 1;
        }
        
        if (nextBtn) {
            nextBtn.disabled = this.currentSlideIndex === this.totalSlides;
        }
    },
    
    // עדכון הלוגו
    updateLogo() {
        const logo = document.querySelector('.slide-logo');
        if (logo) {
            logo.style.display = this.currentSlideIndex === 1 ? 'none' : 'block';
        }
    },
    
    // הגדרת נראות הלוגו
    setupLogoVisibility() {
        setInterval(() => {
            this.updateLogo();
        }, 100);
    },
    
    // טעינת תוכן דינמי לשקף
    loadSlideContent(slideIndex) {
        setTimeout(() => {
            switch(slideIndex) {
                case 2:
                    if (typeof Slide2 !== 'undefined' && Slide2.init) {
                        Slide2.init();
                    }
                    break;
                case 3:
                    if (typeof Slide3 !== 'undefined' && Slide3.init) {
                        Slide3.init();
                    }
                    break;
                case 4:
                    if (typeof Slide4 !== 'undefined' && Slide4.init) {
                        Slide4.init();
                    }
                    break;
            }
        }, AppConfig.animations.chartDelay);
    }
};

// Export Navigation
window.Navigation = Navigation;