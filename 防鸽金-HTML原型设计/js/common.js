// 通用组件加载函数
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(`../components/${componentPath}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = html;
            console.log(`组件加载成功: ${componentPath}`);
        } else {
            console.error(`找不到元素: ${elementId}`);
        }
    } catch (error) {
        console.error(`加载组件失败: ${componentPath}`, error);
        // 如果是header组件加载失败，提供备用方案
        if (elementId === 'header') {
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = `
                    <div style="
                        position: fixed; top: 44px; left: 0; right: 0; height: 56px;
                        background: rgba(255,255,255,0.95); backdrop-filter: blur(20px);
                        border-bottom: 1px solid rgba(0,0,0,0.1); z-index: 1000;
                        display: flex; align-items: center; padding: 0 16px;
                    ">
                        <button onclick="history.back()" style="
                            width: 40px; height: 40px; border: none; border-radius: 20px;
                            background: transparent; color: #264653; cursor: pointer;
                            display: flex; align-items: center; justify-content: center;
                        ">←</button>
                        <div style="flex: 1; text-align: center; margin: 0 16px;">
                            <h1 id="title-text" style="
                                font-size: 18px; font-weight: 600; color: #264653; margin: 0;
                                overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
                            ">${document.title || '页面标题'}</h1>
                        </div>
                        <div style="width: 40px; height: 40px;"></div>
                    </div>
                `;
            }
        }
    }
}

// 加载header组件并设置标题
async function loadHeader(pageTitle) {
    try {
        await loadComponent('header', 'header.html');

        // 使用更可靠的方式设置标题，包含重试机制
        const setTitleWithRetry = (retryCount = 0) => {
            const maxRetries = 5;
            const retryDelay = 100;

            if (window.setPageTitle && pageTitle) {
                window.setPageTitle(pageTitle);
                console.log(`页面标题设置成功: ${pageTitle}`);
                return;
            }

            // 备用方案：直接操作DOM元素
            const titleElement = document.getElementById('title-text');
            if (titleElement && pageTitle) {
                titleElement.textContent = pageTitle;
                console.log(`页面标题通过DOM设置成功: ${pageTitle}`);
                return;
            }

            // 如果还没成功且还有重试次数，继续重试
            if (retryCount < maxRetries) {
                setTimeout(() => {
                    setTitleWithRetry(retryCount + 1);
                }, retryDelay * (retryCount + 1)); // 递增延迟
            } else {
                console.warn(`页面标题设置失败，已重试${maxRetries}次: ${pageTitle}`);
            }
        };

        // 初始延迟后开始设置标题
        setTimeout(() => {
            setTitleWithRetry();
        }, 150);

    } catch (error) {
        console.error('加载header组件失败:', error);
    }
}

// 通用页面初始化函数
async function initializePage(pageTitle) {
    try {
        // 设置页面标题
        if (pageTitle) {
            document.title = pageTitle;
        }

        // 加载通用组件
        await loadComponent('status-bar', 'status-bar.html');
        await loadHeader(pageTitle);

        console.log('页面初始化完成');
    } catch (error) {
        console.error('页面初始化失败:', error);
    }
}

// 确保返回按钮可见的函数
function ensureBackButtonVisible() {
    const backButton = document.getElementById('back-button');
    if (backButton && !backButton.innerHTML.trim()) {
        // 如果返回按钮容器为空，添加备用返回按钮
        backButton.innerHTML = `
            <div style="position: fixed; top: 44px; left: 16px; z-index: 1000;">
                <button onclick="history.back()" style="
                    width: 40px; height: 40px; border: none; border-radius: 20px;
                    background: rgba(255,255,255,0.9); color: #264653;
                    display: flex; align-items: center; justify-content: center;
                    cursor: pointer; backdrop-filter: blur(10px);
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    font-size: 18px; font-weight: bold;
                ">
                    ← 
                </button>
            </div>
        `;
    }
}

// 页面加载完成后的检查
document.addEventListener('DOMContentLoaded', function() {
    // 延迟检查返回按钮是否正确加载
    setTimeout(ensureBackButtonVisible, 500);
});
