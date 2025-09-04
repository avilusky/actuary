// config.js - הגדרות ונתונים גלובליים

const AppConfig = {
    // הגדרות כלליות
    slides: {
        total: 4,
        current: 1
    },
    
    // הגדרות אנימציות
    animations: {
        slideTransition: 500,
        chartDelay: 300
    },
    
    // צבעים לגרפים
    colors: {
        model1: {
            primary: '#22c55e',
            secondary: '#4ade80',
            background: 'rgba(34, 197, 94, 0.1)'
        },
        model2: {
            primary: '#3b82f6',
            secondary: '#60a5fa',
            background: 'rgba(59, 130, 246, 0.1)'
        },
        kupot: {
            primary: '#f97316',
            secondary: '#fb923c',
            background: 'rgba(249, 115, 22, 0.1)'
        },
        deficit: {
            positive: '#22c55e',
            negative: '#ef4444',
            neutral: '#94a3b8'
        }
    },
    
    // נתוני פרמיות - גברים
    malePremiums: {
        20: {20: 16, 25: 20, 30: 26, 35: 33, 40: 42, 45: 54, 50: 69, 55: 88, 60: 112, 65: 143, 70: 174},
        25: {25: 22, 30: 28, 35: 36, 40: 46, 45: 58, 50: 75, 55: 95, 60: 122, 65: 155, 70: 189},
        30: {30: 31, 35: 39, 40: 50, 45: 64, 50: 82, 55: 104, 60: 133, 65: 170, 70: 207},
        35: {35: 44, 40: 56, 45: 71, 50: 91, 55: 116, 60: 148, 65: 189, 70: 230},
        40: {40: 63, 45: 81, 50: 103, 55: 132, 60: 168, 65: 215, 70: 261},
        45: {45: 95, 50: 121, 55: 154, 60: 197, 65: 251, 70: 305},
        50: {50: 147, 55: 187, 60: 239, 65: 305, 70: 371},
        55: {55: 243, 60: 310, 65: 396, 70: 481}
    },
    
    // נתוני פרמיות - נשים
    femalePremiums: {
        20: {20: 20, 25: 26, 30: 33, 35: 41, 40: 53, 45: 68, 50: 86, 55: 110, 60: 140, 65: 179, 70: 218},
        25: {25: 28, 30: 37, 35: 45, 40: 57, 45: 73, 50: 93, 55: 119, 60: 152, 65: 194, 70: 236},
        30: {30: 39, 35: 49, 40: 63, 45: 80, 50: 102, 55: 131, 60: 167, 65: 213, 70: 258},
        35: {35: 55, 40: 70, 45: 89, 50: 114, 55: 145, 60: 185, 65: 237, 70: 288},
        40: {40: 79, 45: 101, 50: 129, 55: 165, 60: 210, 65: 269, 70: 327},
        45: {45: 118, 50: 151, 55: 193, 60: 246, 65: 314, 70: 381},
        50: {50: 184, 55: 234, 60: 299, 65: 382, 70: 464},
        55: {55: 304, 60: 388, 65: 495, 70: 601}
    },
    
    // נתוני פרמיות קבועות
    fixedPremiums: {
        male: {
            20: 46, 25: 58, 30: 74, 35: 94,
            40: 123, 45: 164, 50: 229, 55: 338
        },
        female: {
            20: 58, 25: 73, 30: 92, 35: 118,
            40: 154, 45: 206, 50: 286, 55: 422
        }
    },
    
    // נתוני קופות חולים
    kupotPremiums: {
        20: 12, 25: 19, 30: 40, 35: 63, 40: 81,
        45: 147, 50: 203, 55: 255, 60: 301,
        65: 353, 70: 390, 75: 412, 80: 412, 85: 412
    },
    
    // נתוני גירעון
    deficitData: {
        basePremiums: 45,
        baseClaims: -56,
        baseExpenses: -5,
        fundGroups: {
            'כללית': { premiums: 23, claims: -32, deficit: -9 },
            'מכבי': { premiums: 16, claims: -21, deficit: -5 },
            'לאומית': { premiums: 2, claims: -3, deficit: -1 },
            'מאוחדת': { premiums: 4, claims: -5, deficit: -1 }
        }
    },
    
    // הגדרות תקופות
    waitingPeriods: {
        0: { text: 'ללא שינוי', impact: 0 },
        1: { text: 'חצי שנה', impact: 10 },
        2: { text: '9 חודשים', impact: 15 },
        3: { text: 'שנה', impact: 20 }
    },
    
    eligibilityPeriods: {
        0: { text: 'ללא שינוי', impact: 0 },
        1: { text: 'קיצור ל-4 שנים', impact: 10 }
    },
    
    // הגדרות Chart.js ברירת מחדל
    chartDefaults: {
        responsive: true,
        maintainAspectRatio: false,
        font: {
            family: 'system-ui, -apple-system, sans-serif',
            size: 12
        },
        color: '#64748b'
    }
};

// הגדרת ברירות מחדל ל-Chart.js
if (typeof Chart !== 'undefined') {
    Chart.defaults.font.family = AppConfig.chartDefaults.font.family;
    Chart.defaults.font.size = AppConfig.chartDefaults.font.size;
    Chart.defaults.color = AppConfig.chartDefaults.color;
}

// Export configuration
window.AppConfig = AppConfig;