// Cross-Repository Navigation System
// Built by K MD SAYAD R@HMAN (Sayad.dev | AI Automation)

const repos = [
    {
        name: 'distressed-property-detection',
        title: 'Real Estate AI Automation',
        industry: 'Real Estate',
        url: 'https://github.com/mdsadrhoman123-stack/distressed-property-detection',
        icon: 'ðŸ ',
        color: '#1e3a5f'
    },
    {
        name: 'edugrow-ma-platform',
        title: 'M&A Deal-Flow Automation',
        industry: 'Mergers & Acquisitions',
        url: 'https://github.com/mdsadrhoman123-stack/edugrow-ma-platform',
        icon: 'ðŸ¤',
        color: '#2c3e50'
    },
    {
        name: 'irish-solar-crm',
        title: 'Solar CRM Automation',
        industry: 'Solar Energy',
        url: 'https://github.com/mdsadrhoman123-stack/irish-solar-crm',
        icon: 'â˜€ï¸',
        color: '#f39c12'
    },
    {
        name: 'medical-document-automation',
        title: 'Healthcare Document Automation',
        industry: 'Healthcare',
        url: 'https://github.com/mdsadrhoman123-stack/medical-document-automation',
        icon: 'ðŸ¥',
        color: '#27ae60'
    },
    {
        name: 'review-outreach-pipeline',
        title: 'E-commerce Review Automation',
        industry: 'E-commerce',
        url: 'https://github.com/mdsadrhoman123-stack/review-outreach-pipeline',
        icon: 'ï¿½',
        color: '#e91e63'
    },
    {
        name: 'flowdesk',
        title: 'Enterprise Intake Automation',
        industry: 'Enterprise',
        url: 'https://github.com/mdsadrhoman123-stack/flowdesk',
        icon: 'ðŸ¢',
        color: '#34495e'
    },
    {
        name: 'paybridge',
        title: 'Payment Reconciliation Automation',
        industry: 'Finance',
        url: 'https://github.com/mdsadrhoman123-stack/paybridge',
        icon: 'ðŸ’³',
        color: '#00695c'
    },
    {
        name: 'reviewshield-ai',
        title: 'Review Management Automation',
        industry: 'Reputation Management',
        url: 'https://github.com/mdsadrhoman123-stack/reviewshield-ai',
        icon: 'â­',
        color: '#ff6f00'
    },
    {
        name: '-impact-report-dashboard',
        title: 'Executive Report Automation',
        industry: 'Executive Reporting',
        url: 'https://github.com/mdsadrhoman123-stack/-impact-report-dashboard',
        icon: 'ðŸ“Š',
        color: '#1565c0'
    }
];

// Navigation Component Builder
function buildNavigation(currentRepo) {
    const nav = document.createElement('div');
    nav.className = 'automation-portfolio-nav';
    nav.style.cssText = `
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 10px;
        border-radius: 8px;
        margin: 15px 0;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    `;
    
    const title = document.createElement('h3');
    title.textContent = 'ðŸš€ Portfolio';
    title.style.cssText = 'color: white; margin-bottom: 8px; font-size: 1.1em;';
    nav.appendChild(title);
    
    const grid = document.createElement('div');
    grid.style.cssText = `
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 8px;
    `;
    
    repos.forEach(repo => {
        if (repo.name !== currentRepo) {
            const card = document.createElement('a');
            card.href = repo.url;
            card.style.cssText = `
                background: rgba(255,255,255,0.1);
                border: 1px solid rgba(255,255,255,0.2);
                border-radius: 6px;
                padding: 8px;
                text-decoration: none;
                color: white;
                transition: all 0.2s ease;
                display: block;
                text-align: center;
            `;
            
            card.innerHTML = `
                <div style="font-size: 1.2em; margin-bottom: 4px;">${repo.icon}</div>
                <div style="font-weight: bold; font-size: 0.85em; margin-bottom: 2px;">${repo.title}</div>
                <div style="font-size: 0.7em; opacity: 0.8;">${repo.industry}</div>
            `;
            
            card.addEventListener('mouseenter', () => {
                card.style.background = repo.color;
                card.style.transform = 'translateY(-3px)';
                card.style.boxShadow = '0 6px 12px rgba(0,0,0,0.2)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.background = 'rgba(255,255,255,0.1)';
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = 'none';
            });
            
            grid.appendChild(card);
        }
    });
    
    nav.appendChild(grid);
    
    return nav;
}

// Inject Navigation into README
function injectNavigation(currentRepo) {
    const readmeContent = document.querySelector('.markdown-body');
    if (readmeContent) {
        const nav = buildNavigation(currentRepo);
        readmeContent.insertBefore(nav, readmeContent.firstChild);
    }
}

// Auto-detect current repository and inject navigation
function autoInjectNavigation() {
    const currentPath = window.location.pathname;
    const currentRepo = repos.find(repo => currentPath.includes(repo.name));
    
    if (currentRepo) {
        injectNavigation(currentRepo.name);
    }
}

// Export for manual usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { buildNavigation, injectNavigation, utoInjectNavigation, repos };
}

// Auto-inject when DOM is ready
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', autoInjectNavigation);
    } else {
        autoInjectNavigation();
    }
}