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
                hasBackButton: pageConfig.hasBackButton === true,
                backTo: pageConfig.backTo || ''
            });
        }

        // 根据页面配置决定是否显示底部导航栏
        let navBar = '';
        if (pageConfig.isMainPage) {
            navBar = await this.buildNavBar(pageConfig.navTabId);
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
    async buildNavBar(activeTabId) {
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

        const navBarTemplate = await this.loadComponent('nav-bar');
        return this.replaceTemplate(navBarTemplate, {
            navItems: navItems
        });
    }

    replaceTemplate(template, data) {
        let result = template;

        // 处理数组循环 {{#arrayName}}content{{/arrayName}}
        result = result.replace(/\{\{#(\w+)\}\}(.*?)\{\{\/\1\}\}/gs, (match, arrayName, content) => {
            const arrayData = data[arrayName];
            if (Array.isArray(arrayData)) {
                return arrayData.map(item => {
                    return this.replaceTemplate(content, item);
                }).join('');
            } else if (arrayData) {
                return content;
            } else {
                return '';
            }
        });

        // 处理反向条件语句 {{^condition}}content{{/condition}}
        result = result.replace(/\{\{\^(\w+)\}\}(.*?)\{\{\/\1\}\}/gs, (match, condition, content) => {
            return !data[condition] ? content : '';
        });

        // 处理简单变量替换 {{variable}}
        result = result.replace(/\{\{(\w+)\}\}/g, (match, key) => {
            return data[key] !== undefined ? data[key] : match;
        });

        return result;
    }
}
