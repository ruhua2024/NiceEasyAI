class PageLoader {
    constructor(componentManager) {
        this.componentManager = componentManager;
        this.pageCache = new Map();
        this.currentPages = [];
    }

    async loadPageContent(pageFile) {
        if (this.pageCache.has(pageFile)) {
            return this.pageCache.get(pageFile);
        }

        try {
            const response = await fetch(pageFile);
            if (!response.ok) {
                throw new Error(`Failed to load page: ${pageFile}`);
            }
            const html = await response.text();
            this.pageCache.set(pageFile, html);
            return html;
        } catch (error) {
            console.error(`Error loading page ${pageFile}:`, error);
            return '<div class="error">页面加载失败</div>';
        }
    }

    async renderPage(pageId, container) {
        const config = pageConfig[pageId];
        if (!config) {
            console.error(`Page config not found: ${pageId}`);
            return;
        }

        config.id = pageId;
        const pageContent = await this.loadPageContent(config.file);
        const phoneFrame = await this.componentManager.buildPhoneFrame(config);
        const finalHtml = phoneFrame.replace('{{content}}', pageContent);
        
        const phoneDiv = document.createElement('div');
        phoneDiv.className = 'phone';
        phoneDiv.setAttribute('data-page', pageId);
        
        // 根据页面类型添加标记，用于CSS样式控制
        const pageType = config.isMainPage ? 'main' : 'non-main';
        phoneDiv.setAttribute('data-page-type', pageType);
        
        phoneDiv.innerHTML = finalHtml;
        
        container.appendChild(phoneDiv);
        this.bindPageEvents(phoneDiv, pageId);
        
        return phoneDiv;
    }

    async renderAllPages(container) {
        container.innerHTML = '';
        this.currentPages = [];

        for (const pageId of Object.keys(pageConfig)) {
            const phoneElement = await this.renderPage(pageId, container);
            this.currentPages.push({
                id: pageId,
                element: phoneElement,
                config: pageConfig[pageId]
            });
        }
    }

    bindPageEvents(phoneElement, pageId) {
        // 导航栏点击事件
        const navItems = phoneElement.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPage = item.getAttribute('data-page');
                if (targetPage) {
                    this.scrollToPage(targetPage);
                }
            });
        });

        // 返回按钮事件
        const backButton = phoneElement.querySelector('.back-button');
        if (backButton) {
            backButton.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPage = backButton.getAttribute('data-back-to');
                if (targetPage) {
                    this.scrollToPage(targetPage);
                }
            });
        }

        // 绑定页面特定的事件
        this.bindPageSpecificEvents(phoneElement, pageId);
    }

    bindPageSpecificEvents(phoneElement, pageId) {
        switch (pageId) {
            case 'home':
                this.bindHomePageEvents(phoneElement);
                break;
            case 'profile':
                this.bindProfilePageEvents(phoneElement);
                break;
            case 'settings':
                this.bindSettingsPageEvents(phoneElement);
                break;
        }
    }

    bindHomePageEvents(phoneElement) {
        // 搜索框事件
        const searchInput = phoneElement.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('focus', () => {
                console.log('搜索框获得焦点');
            });
        }

        // 卡片点击事件
        const cards = phoneElement.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                console.log('卡片被点击');
            });
        });
    }

    bindProfilePageEvents(phoneElement) {
        // 菜单项点击事件
        const menuItems = phoneElement.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                const menuText = item.querySelector('.menu-text').textContent;
                if (menuText === '设置') {
                    this.scrollToPage('settings');
                }
            });
        });
    }

    bindSettingsPageEvents(phoneElement) {
        // 切换开关事件
        const toggleSwitches = phoneElement.querySelectorAll('.toggle-switch');
        toggleSwitches.forEach(toggle => {
            toggle.addEventListener('click', () => {
                toggle.classList.toggle('active');
            });
        });
    }

    scrollToPage(pageId) {
        const targetPage = this.currentPages.find(page => page.id === pageId);
        if (targetPage) {
            targetPage.element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}
