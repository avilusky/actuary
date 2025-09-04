// templates.js - תבניות HTML דינמיות

const Templates = {
    // תבנית לדיאלוג
    dialog: {
        create(options) {
            const {
                id = '',
                title = '',
                content = '',
                chartId = '',
                onClose = null
            } = options;
            
            return `
                <div id="${id}" class="slide3-dialog-overlay" onclick="${onClose}">
                    <div class="slide3-dialog-content">
                        <div class="slide3-dialog-title">${title}</div>
                        <div class="slide3-dialog-description">
                            ${content}
                        </div>
                        ${chartId ? `<div class="slide3-dialog-chart">
                            <canvas id="${chartId}"></canvas>
                        </div>` : ''}
                        <button class="slide3-dialog-close" onclick="${onClose}">✕</button>
                    </div>
                </div>
            `;
        }
    },
    
    // תבנית לכרטיס
    card: {
        create(options) {
            const {
                className = 'card',
                title = '',
                content = '',
                footer = ''
            } = options;
            
            return `
                <div class="${className}">
                    ${title ? `<h3>${title}</h3>` : ''}
                    <div class="card-content">
                        ${content}
                    </div>
                    ${footer ? `<div class="card-footer">${footer}</div>` : ''}
                </div>
            `;
        }
    },
    
    // תבנית לטולטיפ
    tooltip: {
        create(text, tooltipText, isLong = false) {
            const className = isLong ? 'slide3-tooltip-trigger slide3-long' : 'slide3-tooltip-trigger';
            return `<span class="${className}" data-tooltip="${tooltipText}">${text}</span>`;
        }
    },
    
    // תבנית לסליידר
    slider: {
        create(options) {
            const {
                id = '',
                label = '',
                min = 0,
                max = 100,
                value = 0,
                step = 1,
                unit = '',
                onChange = null
            } = options;
            
            return `
                <div class="slider-group">
                    <div class="slider-label">
                        <span>${label}</span>
                        <div class="slider-value">
                            <span id="${id}Value">${value}</span>${unit}
                        </div>
                    </div>
                    <input type="range" 
                           id="${id}" 
                           class="input-range" 
                           min="${min}" 
                           max="${max}" 
                           value="${value}" 
                           step="${step}"
                           ${onChange ? `onchange="${onChange}"` : ''}>
                    <div class="slider-impact" id="${id}Impact"></div>
                </div>
            `;
        }
    },
    
    // תבנית לכפתור
    button: {
        create(options) {
            const {
                id = '',
                text = '',
                className = 'btn',
                onClick = null,
                isActive = false
            } = options;
            
            return `
                <button id="${id}" 
                        class="${className}${isActive ? ' active' : ''}"
                        ${onClick ? `onclick="${onClick}"` : ''}>
                    ${text}
                </button>
            `;
        }
    },
    
    // תבנית לסיכום
    summary: {
        create(items) {
            let html = '<div class="summary-box">';
            
            items.forEach(item => {
                html += `
                    <div class="summary-item">
                        <span>${item.label}:</span>
                        <span id="${item.id}">${item.value}</span>
                    </div>
                `;
            });
            
            html += '</div>';
            return html;
        }
    },
    
    // תבנית לרשימה
    list: {
        create(items, className = 'feature-list') {
            let html = `<ul class="${className}">`;
            
            items.forEach(item => {
                html += `<li>${item}</li>`;
            });
            
            html += '</ul>';
            return html;
        }
    },
    
    // תבנית לטבלה
    table: {
        create(options) {
            const {
                headers = [],
                rows = [],
                className = 'data-table'
            } = options;
            
            let html = `<table class="${className}">`;
            
            // Headers
            if (headers.length > 0) {
                html += '<thead><tr>';
                headers.forEach(header => {
                    html += `<th>${header}</th>`;
                });
                html += '</tr></thead>';
            }
            
            // Body
            html += '<tbody>';
            rows.forEach(row => {
                html += '<tr>';
                row.forEach(cell => {
                    html += `<td>${cell}</td>`;
                });
                html += '</tr>';
            });
            html += '</tbody>';
            
            html += '</table>';
            return html;
        }
    },
    
    // תבנית לגריד
    grid: {
        create(items, columns = 2) {
            const className = `grid-${columns}`;
            let html = `<div class="${className}">`;
            
            items.forEach(item => {
                html += `<div class="grid-item">${item}</div>`;
            });
            
            html += '</div>';
            return html;
        }
    },
    
    // תבנית לאינדיקטור טעינה
    loading: {
        create(message = 'טוען...') {
            return `
                <div class="loading">
                    <div class="loading-spinner"></div>
                    <p>${message}</p>
                </div>
            `;
        }
    },
    
    // תבנית להתראה
    alert: {
        create(options) {
            const {
                type = 'info', // info, success, warning, error
                message = '',
                dismissible = false
            } = options;
            
            return `
                <div class="alert alert-${type}">
                    ${message}
                    ${dismissible ? '<button class="alert-close">×</button>' : ''}
                </div>
            `;
        }
    },
    
    // תבנית לפרוגרס בר
    progressBar: {
        create(options) {
            const {
                value = 0,
                max = 100,
                label = '',
                showPercentage = true
            } = options;
            
            const percentage = (value / max) * 100;
            
            return `
                <div class="progress-container">
                    ${label ? `<label>${label}</label>` : ''}
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${percentage}%"></div>
                    </div>
                    ${showPercentage ? `<span class="progress-text">${percentage.toFixed(0)}%</span>` : ''}
                </div>
            `;
        }
    },
    
    // תבנית לטאבים
    tabs: {
        create(options) {
            const {
                tabs = [],
                activeTab = 0
            } = options;
            
            let html = '<div class="tabs-container">';
            
            // Tab headers
            html += '<div class="tabs-header">';
            tabs.forEach((tab, index) => {
                const isActive = index === activeTab;
                html += `
                    <button class="tab-button${isActive ? ' active' : ''}" 
                            data-tab="${index}">
                        ${tab.title}
                    </button>
                `;
            });
            html += '</div>';
            
            // Tab content
            html += '<div class="tabs-content">';
            tabs.forEach((tab, index) => {
                const isActive = index === activeTab;
                html += `
                    <div class="tab-pane${isActive ? ' active' : ''}" 
                         data-tab="${index}">
                        ${tab.content}
                    </div>
                `;
            });
            html += '</div>';
            
            html += '</div>';
            return html;
        }
    },
    
    // תבנית לאקורדיון
    accordion: {
        create(items) {
            let html = '<div class="accordion">';
            
            items.forEach((item, index) => {
                html += `
                    <div class="accordion-item">
                        <button class="accordion-header" data-index="${index}">
                            ${item.title}
                            <span class="accordion-icon">▼</span>
                        </button>
                        <div class="accordion-content" data-index="${index}">
                            ${item.content}
                        </div>
                    </div>
                `;
            });
            
            html += '</div>';
            return html;
        }
    },
    
    // תבנית למודל מספרי
    numberDisplay: {
        create(options) {
            const {
                value = 0,
                label = '',
                prefix = '',
                suffix = '',
                decimals = 0,
                className = 'number-display'
            } = options;
            
            const formattedValue = typeof value === 'number' ? 
                value.toLocaleString('he-IL', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) : 
                value;
            
            return `
                <div class="${className}">
                    ${label ? `<label>${label}</label>` : ''}
                    <div class="number-value">
                        ${prefix}${formattedValue}${suffix}
                    </div>
                </div>
            `;
        }
    },
    
    // פונקציות עזר
    utils: {
        // פורמט מספר
        formatNumber(number, decimals = 0) {
            return number.toLocaleString('he-IL', {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals
            });
        },
        
        // פורמט מטבע
        formatCurrency(amount) {
            return new Intl.NumberFormat('he-IL', {
                style: 'currency',
                currency: 'ILS'
            }).format(amount);
        },
        
        // פורמט אחוזים
        formatPercentage(value, decimals = 0) {
            return `${value.toFixed(decimals)}%`;
        },
        
        // יצירת ID ייחודי
        generateId() {
            return 'id-' + Math.random().toString(36).substr(2, 9);
        }
    }
};

// Export Templates
window.Templates = Templates;