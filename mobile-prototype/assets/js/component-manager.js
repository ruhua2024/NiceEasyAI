class ComponentManager {
    constructor() {
        this.componentCache = new Map();
    }

    async loadComponent(componentName) {
        if (this.componentCache.has(componentName)) {
            return this.componentCache.get(componentName);
        }

        try {
            const response = await fetch(`components/${componentName}.html`);
            if (!response.ok) {
                throw new Error(`Failed to load component: ${componentName}`);
            }
            const html = await response.text();
            this.componentCache.set(componentName, html);
            return html;
        } catch (error) {
            console.error(`Error loading component ${componentName}:`, error);
            return '';
        }
    }

    async buildPhoneFrame(pageConfig) {
        const phoneFrame = await this.loadComponent('phone-frame');
        const statusBar = await this.loadComponent('status-bar');
        
        // 根据页面配置决定是否显示标题栏
        let header = '';
        if (pageConfig.hasHeader) {
            header = await this.loadComponent('header');
            header = this.replaceTemplate(header, {
                title: pageConfig.headerTitle || pageConfig.title,
                hasBackButton: pageConfig.hasBackButton || false,
                backTo: pageConfig.backTo || ''
            });
        }

        // 根据页面配置决定是否显示底部导航栏
        let navBar = '';
        if (pageConfig.isMainPage) {
            navBar = await this.loadComponent('nav-bar');
            navBar = this.buildNavBar(pageConfig.navTabId);
        }

        return this.replaceTemplate(phoneFrame, {
            statusBar,
            header,
            navBar,
            customClass: pageConfig.customClass || '',
            pageId: pageConfig.id || ''
        });
    }

    // 构建底部导航栏，支持激活状态
    buildNavBar(activeTabId) {
        if (!window.navBarConfig) {
            console.error('navBarConfig not found');
            return '';
        }

        const navItems = Object.keys(window.navBarConfig).map(tabId => {
            const config = window.navBarConfig[tabId];
            return {
                pageId: tabId,
                label: config.label,
                icon: config.icon,
                iconActive: config.iconActive || config.icon,
                isActive: tabId === activeTabId
            };
        });

        let navBarHtml = '<div class="nav-bar">';
        navItems.forEach(item => {
            const iconClass = item.isActive ? item.iconActive : item.icon;
            const activeClass = item.isActive ? ' active' : '';
            
            navBarHtml += `
                <div class="nav-item${activeClass}" data-page="${item.pageId}">
                    <i class="${iconClass} nav-icon"></i>
                    <span>${item.label}</span>
                </div>
            `;
        });
        navBarHtml += '</div>';

        return navBarHtml;
    }

    replaceTemplate(template, data) {
        return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
            return data[key] !== undefined ? data[key] : match;
        });
    }
}
