class MobilePrototypeApp {
    constructor() {
        this.componentManager = new ComponentManager();
        this.pageLoader = new PageLoader(this.componentManager);
        this.isInitialized = false;
    }

    async init() {
        if (this.isInitialized) return;

        try {
            // 显示加载状态
            this.showLoading();

            // 加载所有页面
            const container = document.getElementById('prototypeContainer');
            await this.pageLoader.renderAllPages(container);

            // 初始化模式切换
            this.initModeToggle();

            // 隐藏加载状态
            this.hideLoading();

            this.isInitialized = true;
            console.log('Mobile prototype app initialized successfully');
        } catch (error) {
            console.error('Failed to initialize app:', error);
            this.showError('应用初始化失败，请刷新页面重试');
        }
    }

    initModeToggle() {
        const modeToggle = document.getElementById('modeToggle');
        const body = document.body;
        let isExpanded = false;

        modeToggle.addEventListener('click', function() {
            isExpanded = !isExpanded;
            
            if (isExpanded) {
                body.classList.add('expanded');
                modeToggle.textContent = '正常模式';
            } else {
                body.classList.remove('expanded');
                modeToggle.textContent = '展开模式';
            }
        });
    }

    showLoading() {
        const container = document.getElementById('prototypeContainer');
        container.innerHTML = `
            <div class="loading">
                <i class="fas fa-spinner fa-spin"></i>
                <span>正在加载页面...</span>
            </div>
        `;
    }

    hideLoading() {
        const loading = document.querySelector('.loading');
        if (loading) {
            loading.remove();
        }
    }

    showError(message) {
        const container = document.getElementById('prototypeContainer');
        container.innerHTML = `
            <div class="error">
                <i class="fas fa-exclamation-triangle"></i>
                <span>${message}</span>
                <button onclick="location.reload()">重新加载</button>
            </div>
        `;
    }
}

// 应用初始化
document.addEventListener('DOMContentLoaded', async () => {
    const app = new MobilePrototypeApp();
    await app.init();
});
