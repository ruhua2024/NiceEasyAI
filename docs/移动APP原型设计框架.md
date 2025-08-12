# 移动APP原型设计框架

## 🚀 快速开始

这是一个用于快速创建移动APP原型的完整框架。通过模块化的HTML/CSS/JavaScript架构，AI和开发者都可以在几分钟内创建出专业级别的移动应用原型。

### ✨ 核心特性

- 🎨 **逼真的手机外观**：iPhone风格的外框设计，包含圆角、阴影等细节
- 📱 **完整的系统UI**：状态栏、导航栏、标题栏等iOS风格组件
- 🔄 **展开模式**：支持正常模式和展开模式切换，便于查看完整内容
- 🧩 **模块化架构**：每个页面独立开发，组件可复用
- ⚡ **零依赖**：仅使用原生HTML/CSS/JavaScript，无需框架
- 📐 **响应式设计**：适配不同屏幕尺寸
- 🎯 **易于扩展**：添加新页面只需创建HTML文件和配置

### 🎯 适用场景

- 产品原型演示
- 用户体验测试
- 客户需求展示
- 开发团队设计参考
- 移动应用概念验证
- AI辅助原型生成

## 📁 项目结构

```
mobile-prototype/
├── index.html                 # 主入口文件
├── config/
│   └── pages.js              # 页面配置文件
├── assets/
│   ├── css/
│   │   ├── base.css          # 基础样式和CSS变量
│   │   ├── components.css    # 组件样式（手机框、状态栏等）
│   │   ├── pages.css         # 页面特定样式
│   │   └── responsive.css    # 响应式样式
│   ├── js/
│   │   ├── main.js           # 主要逻辑和初始化
│   │   ├── page-loader.js    # 页面加载器
│   │   ├── component-manager.js # 组件管理器
│   │   └── mode-toggle.js    # 展开模式控制
│   └── images/               # 图片资源
├── components/
│   ├── phone-frame.html      # 手机外框模板
│   ├── status-bar.html       # 系统状态栏
│   ├── header.html           # 应用标题栏
│   └── nav-bar.html          # 底部导航栏
└── pages/
    ├── home.html             # 首页内容
    ├── profile.html          # 个人页面
    ├── settings.html         # 设置页面
    └── ...                   # 其他页面
```

## 🛠️ 快速搭建步骤

### 步骤1：创建项目结构

```bash
mkdir mobile-prototype
cd mobile-prototype
mkdir -p {config,assets/{css,js,images},components,pages}
```

### 步骤2：创建主入口文件

**index.html**
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>移动APP原型设计</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="assets/css/base.css">
    <link rel="stylesheet" href="assets/css/components.css">
    <link rel="stylesheet" href="assets/css/pages.css">
</head>
<body>
    <button class="mode-toggle" id="modeToggle">展开模式</button>
    <h1 class="main-title">移动APP原型设计</h1>
    <div class="prototype-container" id="prototypeContainer">
        <div class="loading">
            <i class="fas fa-spinner fa-spin"></i>
            <span>正在加载页面...</span>
        </div>
    </div>
    
    <script src="config/pages.js"></script>
    <script src="assets/js/component-manager.js"></script>
    <script src="assets/js/page-loader.js"></script>
    <script src="assets/js/mode-toggle.js"></script>
    <script src="assets/js/main.js"></script>
</body>
</html>
```

### 步骤3：配置页面信息

**config/pages.js**
```javascript
const pageConfig = {
    home: {
        title: '首页',
        file: 'pages/home.html',
        isMainPage: true,           // 是否为一级页面（显示底部导航栏）
        navTabId: 'home',          // 对应的底部导航栏标签ID
        hasHeader: true,           // 是否显示应用标题栏
        headerTitle: '首页'
    },
    discover: {
        title: '发现',
        file: 'pages/discover.html',
        isMainPage: true,          // 一级页面
        navTabId: 'discover',      // 对应导航栏的发现标签
        hasHeader: true,
        headerTitle: '发现'
    },
    profile: {
        title: '我的',
        file: 'pages/profile.html',
        isMainPage: true,          // 一级页面
        navTabId: 'profile',       // 对应导航栏的我的标签
        hasHeader: true,
        headerTitle: '我的'
    },
    settings: {
        title: '设置',
        file: 'pages/settings.html',
        isMainPage: false,         // 非一级页面（不显示底部导航栏）
        hasHeader: true,           // 显示标题栏
        headerTitle: '设置',
        hasBackButton: true,       // 显示返回按钮
        backTo: 'profile'          // 返回到我的页面
    },
    'user-detail': {
        title: '用户详情',
        file: 'pages/user-detail.html',
        isMainPage: false,         // 非一级页面
        hasHeader: true,
        headerTitle: '用户详情',
        hasBackButton: true,
        backTo: 'discover'
    },
    'full-screen': {
        title: '全屏页面',
        file: 'pages/full-screen.html',
        isMainPage: false,         // 非一级页面
        hasHeader: false,          // 不显示标题栏（全屏效果）
        hasBackButton: false
    }
    // 添加更多页面配置...
};

// 底部导航栏配置
const navBarConfig = {
    home: {
        label: '首页',
        icon: 'fas fa-home',
        iconActive: 'fas fa-home'  // 激活状态图标（可以不同）
    },
    discover: {
        label: '发现',
        icon: 'fas fa-compass',
        iconActive: 'fas fa-compass'
    },
    profile: {
        label: '我的',
        icon: 'fas fa-user',
        iconActive: 'fas fa-user'
    }
};

window.pageConfig = pageConfig;
window.navBarConfig = navBarConfig;
```

### 步骤4：创建基础组件

**components/phone-frame.html**
```html
<div class="screen {{customClass}}" data-page="{{pageId}}">
    {{statusBar}}
    {{header}}
    <div class="content">
        {{content}}
    </div>
    {{navBar}}
</div>
```

**components/status-bar.html**
```html
<div class="status-bar">
    <div class="status-bar-time">9:41</div>
    <div class="status-bar-icons">
        <i class="fas fa-signal"></i>
        <i class="fas fa-wifi"></i>
        <i class="fas fa-battery-full"></i>
    </div>
</div>
```

**components/header.html**
```html
<div class="header">
    {{#hasBackButton}}
    <div class="back-button" data-back-to="{{backTo}}">
        <i class="fas fa-chevron-left"></i>
    </div>
    {{/hasBackButton}}
    {{title}}
</div>
```

**components/nav-bar.html**
```html
<div class="nav-bar">
    {{#navItems}}
    <div class="nav-item {{#isActive}}active{{/isActive}}" data-page="{{pageId}}">
        <i class="{{#isActive}}{{iconActive}}{{/isActive}}{{^isActive}}{{icon}}{{/isActive}} nav-icon"></i>
        <span>{{label}}</span>
    </div>
    {{/navItems}}
</div>
```

### 步骤5：创建核心样式

**assets/css/base.css**
```css
:root {
    --phone-width: 390px;
    --phone-height: 844px;
    --phone-radius: 40px;
    --primary-color: #007AFF;
    --background-color: #f5f5f7;
    --text-color: #000000;
    --text-secondary: #8E8E93;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif;
}

body {
    background-color: var(--background-color);
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
}

.main-title {
    width: 100%;
    text-align: center;
    margin-bottom: 30px;
    font-size: 24px;
    font-weight: 600;
    color: var(--text-color);
}

.prototype-container {
    display: grid;
    gap: 30px;
    justify-content: center;
    width: 100%;
    max-width: 1400px; /* 最大宽度限制 */

    /* 响应式网格布局 */
    grid-template-columns: repeat(auto-fit, minmax(390px, 390px));

    /* 确保手机宽度固定，间距保持一致 */
    justify-items: center;
}
```

**assets/css/components.css**
```css
.phone {
    width: var(--phone-width);
    height: var(--phone-height);
    background-color: #fff;
    border-radius: var(--phone-radius);
    overflow: hidden;
    position: relative;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
    transition: height 0.5s ease;
}

.screen {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: auto;
    display: flex;
    flex-direction: column;
}

.status-bar {
    height: 44px;
    width: 100%;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    z-index: 10;
}

.header {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: 600;
    background-color: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid #f0f0f0;
    position: relative;
}

.back-button {
    position: absolute;
    left: 20px;
    color: var(--primary-color);
    cursor: pointer;
}

.content {
    flex: 1;
    overflow-y: auto;
    padding: 15px;
}

.nav-bar {
    height: 80px;
    background-color: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top: 1px solid #f0f0f0;
}

.nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--text-secondary);
    font-size: 10px;
    gap: 5px;
    cursor: pointer;
    transition: all 0.2s ease;
    padding: 8px 12px;
    border-radius: 8px;
    min-width: 60px;
}

.nav-item:hover {
    background-color: rgba(0, 122, 255, 0.1);
}

.nav-item.active {
    color: var(--primary-color);
    background-color: rgba(0, 122, 255, 0.1);
}

.nav-item.active .nav-icon {
    transform: scale(1.1);
}

.nav-icon {
    font-size: 22px;
    transition: transform 0.2s ease;
}

/* 隐藏导航栏的样式（用于非一级页面） */
.phone[data-page-type="non-main"] .nav-bar {
    display: none;
}

/* 调整非一级页面的内容区域高度 */
.phone[data-page-type="non-main"] .content {
    height: calc(100vh - 94px); /* 减去状态栏和标题栏的高度 */
}

/* 展开模式样式 */
.mode-toggle {
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 20px;
    padding: 8px 16px;
    cursor: pointer;
    z-index: 1000;
    font-size: 14px;
    font-weight: 600;
}

/* 展开模式下手机容器高度自适应 */
.expanded .phone {
    height: auto;
    min-height: var(--phone-height);
}

/* 展开模式下屏幕容器显示所有内容 */
.expanded .screen {
    overflow: visible;
    height: auto;
}

/* 展开模式下内容区域显示所有内容，并为导航栏预留空间 */
.expanded .content {
    overflow: visible;
    height: auto;
    padding-bottom: 80px; /* 为底部导航栏预留空间 */
}

/* 展开模式下底部导航栏固定在底部 */
.expanded .phone .nav-bar {
    position: sticky !important;
    bottom: 0 !important;
    z-index: 100 !important;
    flex-shrink: 0 !important;
    /* 确保导航栏在展开模式下始终可见 */
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

/* 展开模式下确保屏幕容器为flex布局 */
.expanded .phone .screen {
    display: flex !important;
    flex-direction: column !important;
}

/* 展开模式下内容区域自动扩展 */
.expanded .phone .content {
    flex: 1 !important;
    overflow-y: auto !important;
}

/* 响应式布局 */
@media (max-width: 480px) {
    /* 小屏幕：1列布局 */
    .prototype-container {
        grid-template-columns: 1fr;
        gap: 20px;
        padding: 0 10px;
    }

    .phone {
        width: 100%;
        max-width: 390px;
        margin: 0 auto;
    }

    body {
        padding: 10px;
    }

    .main-title {
        font-size: 20px;
        margin-bottom: 20px;
    }
}

@media (min-width: 481px) and (max-width: 900px) {
    /* 中等屏幕：2列布局 */
    .prototype-container {
        grid-template-columns: repeat(2, 390px);
        gap: 25px;
    }
}

@media (min-width: 901px) and (max-width: 1350px) {
    /* 大屏幕：3列布局 */
    .prototype-container {
        grid-template-columns: repeat(3, 390px);
        gap: 30px;
    }
}

@media (min-width: 1351px) {
    /* 超大屏幕：最多3列布局（当前只有3个页面） */
    .prototype-container {
        grid-template-columns: repeat(3, 390px);
        gap: 35px;
    }
}


```

### 步骤6：创建JavaScript核心逻辑

**assets/js/component-manager.js**
```javascript
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
```

**assets/js/page-loader.js**
```javascript
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
```

**assets/js/main.js**
```javascript
class MobilePrototypeApp {
    constructor() {
        this.componentManager = new ComponentManager();
        this.pageLoader = new PageLoader(this.componentManager);
    }

    async init() {
        try {
            const container = document.getElementById('prototypeContainer');
            await this.pageLoader.renderAllPages(container);
            this.initModeToggle();
            console.log('Mobile prototype app initialized successfully');
        } catch (error) {
            console.error('Failed to initialize app:', error);
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
}

// 应用初始化
document.addEventListener('DOMContentLoaded', async () => {
    const app = new MobilePrototypeApp();
    await app.init();
});
```

## 🚀 运行项目

### ⚠️ 重要：必须启动本地服务器

**为什么需要本地服务器？**

由于浏览器的安全策略（同源策略和CORS限制），直接双击打开HTML文件会导致以下问题：
- 无法使用 `fetch()` API 加载组件和页面文件
- 浏览器会阻止 `file://` 协议访问其他本地文件
- 页面会显示"页面加载失败"或一直显示加载状态

### 📂 正确的启动步骤

1. **切换到项目目录**（重要！）
```bash
cd mobile-prototype
```

2. **启动本地服务器**

**方法一：使用 VS Code Live Server（推荐）**
```
1. 在VS Code中打开 mobile-prototype 文件夹
2. 右键点击 index.html 文件
3. 选择 "Open with Live Server"
4. 浏览器会自动打开项目
```

**方法二：使用命令行**
```bash
# 使用Python
python -m http.server 8000

# 或使用Node.js
npx http-server

# 或使用PHP
php -S localhost:8000
```

3. **打开浏览器访问**
```
# Live Server 会自动打开浏览器
# 命令行方式需要手动访问：
http://localhost:8000
```

### ❌ 常见错误

**错误做法：**
```bash
# 在上级目录启动服务器
python -m http.server 8000
# 然后访问 http://localhost:8000/mobile-prototype/
```

这会导致JavaScript中的相对路径无法正确解析！

**正确做法：**
```bash
# 先cd到项目目录
cd mobile-prototype
# 再启动服务器
python -m http.server 8000
# 访问 http://localhost:8000
```

### 🧪 测试功能
- 点击右上角"展开模式"按钮测试展开功能
- 在不同页面间导航测试
- 测试各种交互功能

## 📝 添加新页面

### 1. 创建页面文件
在 `pages/` 目录下创建新的HTML文件：

```html
<!-- pages/new-page.html -->
<div class="page-container">
    <h2>新页面标题</h2>
    <p>页面内容...</p>
</div>
```

### 2. 更新页面配置
在 `config/pages.js` 中添加新页面配置：

**添加一级页面（显示底部导航栏）：**
```javascript
'new-main-page': {
    title: '新功能',
    file: 'pages/new-main-page.html',
    isMainPage: true,          // 一级页面，显示底部导航栏
    navTabId: 'new-feature',   // 对应的导航栏标签
    hasHeader: true,           // 显示标题栏
    headerTitle: '新功能'
}
```

**添加非一级页面（不显示底部导航栏）：**
```javascript
'new-detail-page': {
    title: '详情页面',
    file: 'pages/new-detail-page.html',
    isMainPage: false,         // 非一级页面，不显示底部导航栏
    hasHeader: true,           // 显示标题栏
    headerTitle: '详情页面',
    hasBackButton: true,       // 显示返回按钮
    backTo: 'home'            // 返回到首页
}
```

**添加全屏页面（不显示任何导航）：**
```javascript
'fullscreen-page': {
    title: '全屏页面',
    file: 'pages/fullscreen-page.html',
    isMainPage: false,         // 非一级页面
    hasHeader: false,          // 不显示标题栏（全屏效果）
    hasBackButton: false
}
```

**如果添加了新的一级页面，还需要更新导航栏配置：**
```javascript
// 在 navBarConfig 中添加对应的导航项
const navBarConfig = {
    // 现有配置...
    'new-feature': {
        label: '新功能',
        icon: 'fas fa-star',           // 未激活状态图标
        iconActive: 'fas fa-star'      // 激活状态图标
    }
};
```

### 3. 添加页面样式
在 `assets/css/pages.css` 中添加页面特定样式：

```css
.page-container {
    padding: 20px;
}
```

就这么简单！新页面会自动出现在原型中。

## 📱 响应式布局设计

### 自适应屏幕尺寸

框架采用CSS Grid布局，根据屏幕宽度自动调整手机显示数量：

```css
.prototype-container {
    display: grid;
    gap: 30px;
    justify-content: center;

    /* 响应式网格布局 */
    grid-template-columns: repeat(auto-fit, minmax(390px, 390px));

    /* 确保手机宽度固定，间距保持一致 */
    justify-items: center;
}
```

### 断点设计

| 屏幕宽度 | 显示列数 | 间距 | 适用设备 |
|---------|---------|------|---------|
| ≤ 480px | 1列 | 20px | 手机竖屏 |
| 481px - 900px | 2列 | 25px | 平板竖屏 |
| 901px - 1350px | 3列 | 30px | 笔记本电脑 |
| ≥ 1351px | 3列 | 35px | 大屏显示器 |

### 特殊适配

**小屏幕优化：**
```css
@media (max-width: 480px) {
    .phone {
        width: 100%;
        max-width: 390px;      /* 保持手机最大宽度 */
        margin: 0 auto;        /* 居中显示 */
    }
}
```

### 📝 扩展说明

当前框架包含3个页面（首页、我的、设置），因此最大布局设置为3列。如果你添加了更多页面，可以调整CSS中的最大列数：

```css
@media (min-width: 1351px) {
    .prototype-container {
        grid-template-columns: repeat(4, 390px); /* 改为4列或更多 */
        gap: 35px;
    }
}
```

### 核心设计原则

1. **手机尺寸固定**：始终保持390px×844px尺寸，确保原型的真实性和稳定性
2. **可配置缩放**：支持全局缩放比例调整，通过CSS transform实现，不影响布局计算
3. **间距自适应**：根据屏幕大小调整手机间距，网格布局基于固定390px尺寸
4. **居中对齐**：无论显示几列，都保持居中对齐
5. **最大宽度限制**：容器最大宽度根据页面数量调整
6. **尺寸稳定性**：移除横屏适配，避免因窗口变化导致的尺寸跳变

### ⚙️ 全局配置

框架支持通过CSS变量进行全局配置：

```css
/* config.css */
:root {
    /* 缩放比例配置 */
    --global-scale: 0.8;  /* 80% 缩放 */

    /* 间距配置 */
    --phone-gap-small: 20px;    /* 小屏幕间距 */
    --phone-gap-medium: 25px;   /* 中等屏幕间距 */
    --phone-gap-large: 30px;    /* 大屏幕间距 */
    --phone-gap-xlarge: 35px;   /* 超大屏幕间距 */
}
```

**推荐缩放比例：**
- `1.0` = 100% 原始大小（开发和测试）
- `0.8` = 80% 缩小显示（演示推荐）
- `0.6` = 60% 更小显示（大屏展示）
- `1.2` = 120% 放大显示（细节检查）

**间距配置说明：**
- `small`: 小屏幕（≤480px）使用的间距
- `medium`: 中等屏幕（481px-900px）使用的间距
- `large`: 大屏幕（901px-1350px）使用的间距
- `xlarge`: 超大屏幕（≥1351px）使用的间距

## 🎨 自定义底部导航栏

### 修改导航栏名称和图标

在 `config/pages.js` 中修改 `navBarConfig` 配置：

```javascript
const navBarConfig = {
    home: {
        label: '首页',                    // 导航栏显示的文字
        icon: 'fas fa-home',             // 未激活状态图标
        iconActive: 'fas fa-home'        // 激活状态图标
    },
    discover: {
        label: '发现',                   // 可以改为任何名称，如"探索"
        icon: 'far fa-compass',          // 未激活：空心指南针
        iconActive: 'fas fa-compass'     // 激活：实心指南针
    },
    message: {
        label: '消息',                   // 新增消息功能
        icon: 'far fa-comment',          // 未激活：空心消息图标
        iconActive: 'fas fa-comment'     // 激活：实心消息图标
    },
    profile: {
        label: '我的',
        icon: 'far fa-user',             // 未激活：空心用户图标
        iconActive: 'fas fa-user'        // 激活：实心用户图标
    }
};
```

### 调整导航栏图标数量

**重要原则：底部导航栏的图标数量必须与一级页面数量对应！**

#### 示例1：3个导航图标（推荐）
```javascript
// 页面配置 - 3个一级页面
const pageConfig = {
    home: {
        title: '首页',
        file: 'pages/home.html',
        isMainPage: true,
        navTabId: 'home',              // 对应导航栏的home
        hasHeader: true,
        headerTitle: '首页'
    },
    discover: {
        title: '发现',
        file: 'pages/discover.html',
        isMainPage: true,
        navTabId: 'discover',          // 对应导航栏的discover
        hasHeader: true,
        headerTitle: '发现'
    },
    profile: {
        title: '我的',
        file: 'pages/profile.html',
        isMainPage: true,
        navTabId: 'profile',           // 对应导航栏的profile
        hasHeader: true,
        headerTitle: '我的'
    }
};

// 导航栏配置 - 对应3个图标
const navBarConfig = {
    home: {
        label: '首页',
        icon: 'fas fa-home',
        iconActive: 'fas fa-home'
    },
    discover: {
        label: '发现',
        icon: 'far fa-compass',
        iconActive: 'fas fa-compass'
    },
    profile: {
        label: '我的',
        icon: 'far fa-user',
        iconActive: 'fas fa-user'
    }
};
```

#### 示例2：5个导航图标（最大推荐数量）
```javascript
// 页面配置 - 5个一级页面
const pageConfig = {
    home: { isMainPage: true, navTabId: 'home', /* ... */ },
    discover: { isMainPage: true, navTabId: 'discover', /* ... */ },
    message: { isMainPage: true, navTabId: 'message', /* ... */ },
    shop: { isMainPage: true, navTabId: 'shop', /* ... */ },
    profile: { isMainPage: true, navTabId: 'profile', /* ... */ }
};

// 导航栏配置 - 对应5个图标
const navBarConfig = {
    home: { label: '首页', icon: 'fas fa-home', iconActive: 'fas fa-home' },
    discover: { label: '发现', icon: 'far fa-compass', iconActive: 'fas fa-compass' },
    message: { label: '消息', icon: 'far fa-comment', iconActive: 'fas fa-comment' },
    shop: { label: '商城', icon: 'far fa-shopping-bag', iconActive: 'fas fa-shopping-bag' },
    profile: { label: '我的', icon: 'far fa-user', iconActive: 'fas fa-user' }
};
```

### 常用图标推荐

```javascript
// 首页类
'fas fa-home'           // 房子图标
'fas fa-house-user'     // 带用户的房子

// 发现/探索类
'fas fa-compass'        // 指南针
'fas fa-search'         // 搜索
'fas fa-globe'          // 地球

// 消息/聊天类
'fas fa-comment'        // 对话框
'fas fa-comments'       // 多个对话框
'fas fa-envelope'       // 信封

// 商城/购物类
'fas fa-shopping-cart'  // 购物车
'fas fa-shopping-bag'   // 购物袋
'fas fa-store'          // 商店

// 个人/我的类
'fas fa-user'           // 用户
'fas fa-user-circle'    // 圆形用户头像
'fas fa-cog'            // 设置齿轮

// 其他常用
'fas fa-heart'          // 爱心（收藏/喜欢）
'fas fa-star'           // 星星（评分/收藏）
'fas fa-bell'           // 铃铛（通知）
'fas fa-camera'         // 相机
'fas fa-map-marker-alt' // 位置标记
```

### 注意事项

1. **数量限制**：建议底部导航栏图标数量为3-5个，最多不超过5个
2. **对应关系**：每个一级页面的 `navTabId` 必须在 `navBarConfig` 中有对应配置
3. **图标状态**：建议使用 `far`（空心）作为未激活状态，`fas`（实心）作为激活状态
4. **标签长度**：导航栏标签建议2-4个字符，避免文字过长

## ❓ 常见问题

### Q: 为什么需要启动本地服务器？
A: 因为浏览器的安全策略限制：
1. **同源策略**：`file://` 协议被认为是不安全的本地文件访问
2. **CORS限制**：浏览器阻止 `fetch()` API 访问本地文件
3. **相对路径问题**：直接打开HTML文件会导致路径解析错误

如果直接双击打开HTML文件，会看到"页面加载失败"或控制台CORS错误。

### Q: 忘记cd到项目目录会怎样？
A: 如果在上级目录启动服务器，会导致：
1. **路径错误**：JavaScript中的相对路径无法正确解析
2. **访问地址错误**：需要访问 `http://localhost:8000/mobile-prototype/` 而不是 `http://localhost:8000`
3. **功能异常**：页面加载和组件渲染可能失败

**正确步骤：**
```bash
cd mobile-prototype          # 先切换到项目目录
python -m http.server 8000   # 再启动服务器
```

### Q: 如何修改手机尺寸？
A: 在 `assets/css/base.css` 中修改CSS变量：
```css
:root {
    --phone-width: 375px;  /* iPhone SE */
    --phone-height: 667px;
}
```

### Q: 如何自定义主题？
A: 修改CSS变量来改变主题色彩：
```css
:root {
    --primary-color: #FF6B6B;    /* 主色调 */
    --background-color: #F8F9FA; /* 背景色 */
}
```

### Q: 如何添加动画效果？
A: 在CSS中添加transition和transform：
```css
.card {
    transition: transform 0.3s ease;
}

.card:hover {
    transform: translateY(-5px) scale(1.02);
}
```

### Q: 一级页面和非一级页面有什么区别？
A:
- **一级页面** (`isMainPage: true`)：显示底部导航栏，通常是应用的主要功能页面
- **非一级页面** (`isMainPage: false`)：不显示底部导航栏，通常是详情页、设置页等子页面

### Q: 如何控制导航栏图标的激活状态？
A: 在 `navBarConfig` 中为每个导航项配置两种状态的图标：
```javascript
'home': {
    label: '首页',
    icon: 'far fa-home',        // 未激活状态（空心图标）
    iconActive: 'fas fa-home'   // 激活状态（实心图标）
}
```

### Q: 如何创建无标题栏的全屏页面？
A: 设置页面配置中的 `hasHeader: false`：
```javascript
'splash-screen': {
    title: '启动页',
    file: 'pages/splash-screen.html',
    isMainPage: false,         // 非一级页面
    hasHeader: false,          // 不显示标题栏
    hasBackButton: false
}
```

### Q: 底部导航栏不显示或显示错误怎么办？
A: 检查以下几点：
1. **确保一级页面的 `navTabId` 在 `navBarConfig` 中有对应配置**
2. **检查 `navBarConfig` 的图标数量是否与一级页面数量一致**
3. **确认图标类名是否正确（需要FontAwesome支持）**

### Q: 如何调整底部导航栏的样式？
A: 在 `assets/css/components.css` 中修改 `.nav-bar` 相关样式：
```css
.nav-bar {
    height: 80px;              /* 调整导航栏高度 */
    background-color: #ffffff; /* 修改背景色 */
    /* 其他样式... */
}

.nav-item {
    font-size: 12px;           /* 调整文字大小 */
    /* 其他样式... */
}
```

### Q: 展开模式下底部导航栏的行为如何？
A: 展开模式下底部导航栏会：
1. **固定在底部**：使用 `position: sticky` 确保始终可见
2. **添加阴影**：增加上方阴影，提升视觉层次
3. **预留空间**：内容区域底部预留80px空间，避免内容被遮挡
4. **保持功能**：导航功能完全正常，可以正常切换页面

如果导航栏位置异常，检查CSS中是否包含：
```css
.expanded .phone .nav-bar {
    position: sticky !important;
    bottom: 0 !important;
    z-index: 100 !important;
    flex-shrink: 0 !important;
}

.expanded .phone .screen {
    display: flex !important;
    flex-direction: column !important;
}

.expanded .phone .content {
    flex: 1 !important;
    overflow-y: auto !important;
    padding-bottom: 80px; /* 为导航栏预留空间 */
}
```

### Q: 如何自定义响应式断点？
A: 在 `assets/css/components.css` 中修改媒体查询：
```css
@media (max-width: 768px) {
    /* 自定义小屏幕样式 */
    .prototype-container {
        grid-template-columns: 1fr;
        gap: 15px;
    }
}

@media (min-width: 1200px) {
    /* 自定义大屏幕样式 */
    .prototype-container {
        grid-template-columns: repeat(3, 390px);
    }
}
```

### Q: 手机在小屏幕上显示不完整怎么办？
A: 检查以下设置：
1. **确保设置了最大宽度**：`max-width: 390px`
2. **添加自动边距**：`margin: 0 auto`
3. **调整容器内边距**：减少 `padding` 值
4. **使用缩放**：在极小屏幕上使用 `transform: scale(0.9)`

### Q: 如何在超宽屏幕上限制显示列数？
A: 修改网格布局的最大列数：
```css
@media (min-width: 1600px) {
    .prototype-container {
        grid-template-columns: repeat(3, 390px); /* 当前最多3列 */
        max-width: 1200px; /* 限制容器最大宽度 */
    }
}
```

## 🎯 框架优势

- **🚀 快速开发**：几分钟内创建专业原型
- **📱 逼真效果**：iPhone风格的精美外观
- **🧩 模块化**：每个页面独立，易于维护
- **⚡ 零依赖**：纯HTML/CSS/JS，无需框架
- **🔄 展开模式**：支持完整内容展示
- **📐 智能响应式**：自适应屏幕尺寸，手机宽度固定，间距自动调整
- **🎛️ 灵活控制**：支持一级/二级页面，智能显示/隐藏导航栏
- **🎨 状态管理**：导航栏图标支持激活/未激活状态
- **📋 标题栏控制**：可独立控制每个页面的标题栏显示
- **🔧 导航栏定制**：支持自定义导航栏名称、图标和数量
- **🤖 AI友好**：结构清晰，便于AI理解和生成

### 🎛️ 页面控制特性

- **智能导航栏**：一级页面显示底部导航，非一级页面自动隐藏
- **状态指示**：导航栏图标支持激活/未激活两种视觉状态
- **灵活标题栏**：每个页面可独立控制是否显示标题栏
- **返回导航**：非一级页面支持返回按钮，可指定返回目标页面
- **全屏支持**：支持创建无导航栏的全屏页面效果
- **导航栏定制**：支持3-5个导航图标，可自定义名称和图标样式
- **配置对应**：导航栏配置与一级页面自动对应，确保一致性
- **响应式布局**：根据屏幕宽度自动调整显示列数（1-3列）
- **固定尺寸**：手机宽度始终保持390px，确保原型真实性
- **自适应间距**：不同屏幕尺寸下自动调整手机间距

### 📱 典型使用场景

- **一级页面**：首页、发现、我的等主要功能页面
- **非一级页面**：设置、详情、编辑等子功能页面
- **全屏页面**：启动页、播放器、相机等沉浸式页面

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 📄 许可证

MIT License - 可自由使用和修改

---

**立即开始，快速创建你的移动APP原型！** 🚀
