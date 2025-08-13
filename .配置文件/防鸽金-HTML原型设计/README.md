# 防鸽金-HTML原型设计

## 项目简介

这是一个基于纯HTML的高保真移动端原型设计项目，专注于真实的手机界面预览体验。项目采用组件化架构，支持智能展开模式，可以快速复制和定制为其他项目的原型设计。

## 项目特色

- 🎨 **高保真设计**：贴近真实iOS设计规范，模拟iPhone 13 Pro尺寸
- 📱 **纯手机界面**：专注于移动端体验，无多余装饰元素
- 🔧 **组件化架构**：可复用的组件系统，便于维护和扩展
- 📏 **智能展开模式**：自动检测页面内容高度，支持正常/展开模式切换
- 🎯 **响应式布局**：支持3-2-1列自适应展示
- ⚡ **快速开发**：基于此项目可快速创建新的原型设计

## 目录结构

```
防鸽金-HTML原型设计/
├── index.html              # 主入口页面，包含所有页面预览
├── components/             # 可复用组件目录
│   ├── status-bar.html     # 系统状态栏组件
│   ├── bottom-nav.html     # 底部导航栏组件
│   └── header.html         # 头部导航组件（返回按钮+页面标题）
├── pages/                  # 页面文件目录
│   ├── 邀约首页.html       # 一级页面示例
│   ├── 押金管理.html       # 一级页面示例
│   ├── 个人中心.html       # 一级页面示例
│   ├── 创建邀约.html       # 非一级页面示例
│   ├── 邀约详情.html       # 非一级页面示例
│   ├── 个人信息与设置.html  # 非一级页面示例
│   └── 历史记录.html       # 非一级页面示例
├── js/                     # JavaScript文件目录
│   └── common.js           # 通用脚本，包含组件加载逻辑
└── README.md               # 项目说明文档
```

## 组件系统说明

### 1. 系统状态栏 (status-bar.html)
- **用途**：所有页面都需要引入
- **功能**：显示时间、电量、信号等系统信息
- **样式**：透明/半透明背景，固定在页面顶部

### 2. 底部导航栏 (bottom-nav.html)
- **用途**：仅一级页面使用
- **功能**：提供主要功能模块的快速切换
- **样式**：毛玻璃效果，固定在页面底部

### 3. 头部导航组件 (header.html)
- **用途**：仅非一级页面使用
- **功能**：包含返回按钮和页面标题
- **样式**：半透明背景，毛玻璃效果

## 页面类型区分

### 一级页面
- **特征**：应用主要入口页面，包含底部导航栏
- **组件组合**：系统状态栏 + 底部导航栏
- **示例**：邀约首页、押金管理、个人中心

### 非一级页面
- **特征**：从一级页面进入的子页面，包含返回按钮
- **组件组合**：系统状态栏 + 头部导航组件
- **示例**：创建邀约、邀约详情、个人信息与设置

## 智能展开模式

项目支持两种查看模式：

### 正常模式
- 所有页面统一高度（812px）
- 适合快速浏览和页面对比
- 内容较多的页面会出现滚动

### 展开模式
- 自动检测页面内容高度
- 内容超过812px的页面自动展开显示完整内容
- 适合查看详细页面设计

**切换方式**：点击页面顶部的"正常模式"/"展开模式"按钮

## 快速开发新项目指南

### 方法：手动复制定制

#### 步骤1：复制项目结构
```bash
# 复制整个项目目录
cp -r 防鸽金-HTML原型设计 新项目名称-HTML原型设计
cd 新项目名称-HTML原型设计
```

#### 步骤2：修改项目基础信息
**2.1 更新主入口页面 (index.html)**
```html
<!-- 修改项目标题 -->
<h1 class="text-4xl font-bold text-black mb-4">新项目名称</h1>

<!-- 修改项目描述 -->
<p class="text-xl text-black mb-6">新项目的功能描述和特色介绍</p>
```

**2.2 调整页面配置**
```javascript
// 在 index.html 中找到页面配置部分，修改为新项目的页面
const firstLevelPages = [
    { name: '新首页', file: '新首页.html' },
    { name: '新功能页', file: '新功能页.html' },
    // 根据新项目需求添加或删除页面
];
```

#### 步骤3：定制页面内容
**3.1 规划页面结构**
- 分析新项目的功能模块
- 确定一级页面（主要入口页面）
- 确定非一级页面（详情页、设置页等）

**3.2 重命名和修改页面文件**
```bash
# 重命名页面文件（使用中文命名）
mv pages/邀约首页.html pages/新项目首页.html
mv pages/押金管理.html pages/新功能管理.html
# 继续重命名其他页面...
```

**3.3 修改页面内容**
- 更新页面标题和内容
- 调整页面布局和功能模块
- 替换示例数据为新项目的真实数据

#### 步骤4：调整视觉设计
**4.1 配色方案调整**
```css
/* 在各页面中修改主色调 */
.bg-orange-400 → .bg-blue-500    /* 主色调 */
.bg-teal-500 → .bg-green-500     /* 辅助色 */
.bg-yellow-400 → .bg-purple-400  /* 强调色 */
```

**4.2 组件样式定制**
- 修改 `components/status-bar.html` 的状态栏样式
- 调整 `components/bottom-nav.html` 的导航项目
- 更新 `components/header.html` 的头部样式

#### 步骤5：内容替换和优化
**5.1 图片资源更新**
```html
<!-- 替换示例图片为项目相关图片 -->
<img src="https://picsum.photos/100/100" alt="用户头像">
<!-- 改为 -->
<img src="https://picsum.photos/id/项目相关ID/100/100" alt="新项目图片">
```

**5.2 文本内容更新**
- 替换所有示例文本为新项目的真实内容
- 更新功能描述和用户引导文案
- 调整按钮文字和交互提示

**5.3 功能模块调整**
- 根据新项目需求添加或删除功能模块
- 调整页面间的跳转逻辑（如需要）
- 更新底部导航的功能分类

#### 步骤6：测试和优化
**6.1 功能测试**
- 使用 Live Server 启动项目
- 测试所有页面的显示效果
- 验证智能展开模式是否正常工作

**6.2 响应式测试**
- 测试不同屏幕尺寸下的显示效果
- 验证3-2-1列布局的自适应性
- 检查移动端的触摸体验

**6.3 性能优化**
- 检查页面加载速度
- 优化图片资源大小
- 确保组件加载正常

#### 定制化技巧

**快速批量替换**
```bash
# 使用 sed 命令批量替换文本（macOS/Linux）
find pages/ -name "*.html" -exec sed -i 's/防鸽金/新项目名/g' {} \;

# 或使用 VS Code 的全局搜索替换功能
# Ctrl+Shift+H 打开全局替换
```

**配色方案快速切换**
```javascript
// 在 common.js 中定义配色变量，便于统一修改
const colorScheme = {
    primary: 'bg-blue-500',
    secondary: 'bg-green-500',
    accent: 'bg-purple-400',
    neutral: 'bg-gray-100'
};
```

**组件参数化**
```javascript
// 让组件支持参数传递，提高复用性
function loadHeaderComponent(pageTitle, showBackButton = true) {
    // 动态加载头部组件并设置参数
}
```

## 开发环境要求

### 必需环境
- **本地服务器**：推荐使用 Live Server (VS Code插件)
- **避免直接打开**：不要直接双击HTML文件，会导致跨域问题
- **现代浏览器**：Chrome、Firefox、Safari、Edge 最新版本

### 推荐开发工具

#### 代码编辑器
- **VS Code** + 以下插件：
  - Live Server：本地服务器
  - Tailwind CSS IntelliSense：CSS智能提示
  - Auto Rename Tag：标签自动重命名
  - Prettier：代码格式化
  - HTML CSS Support：HTML中CSS支持

#### 调试工具
- **Chrome DevTools**：页面调试和性能分析
- **Firefox Developer Tools**：跨浏览器测试
- **Responsive Design Mode**：移动端适配测试

#### 设计工具
- **Figma/Sketch**：UI设计参考
- **ColorZilla**：颜色提取工具
- **WhatFont**：字体识别工具

### 环境配置步骤

#### 1. 安装VS Code和插件
```bash
# 安装VS Code（如果还没有）
# 然后安装推荐插件：Live Server, Tailwind CSS IntelliSense
```

#### 2. 启动本地服务器
```bash
# 方法1：使用VS Code Live Server
# 右键点击 index.html → "Open with Live Server"

# 方法2：使用Python内置服务器
python -m http.server 8000

# 方法3：使用Node.js http-server
npx http-server -p 8000
```

#### 3. 访问项目
```
# 浏览器访问
http://localhost:5500  # Live Server默认端口
# 或
http://localhost:8000  # 自定义端口
```

### 开发最佳实践

#### 文件组织规范
```
新项目-HTML原型设计/
├── index.html              # 主入口，包含项目概览
├── components/             # 组件目录
│   ├── status-bar.html     # 系统状态栏
│   ├── bottom-nav.html     # 底部导航
│   └── header.html         # 头部导航
├── pages/                  # 页面目录
│   ├── 一级页面/           # 可选：按类型分组
│   └── 功能页面/           # 可选：按功能分组
├── js/                     # 脚本目录
│   ├── common.js           # 通用脚本
│   └── config.js           # 配置文件（可选）
├── assets/                 # 资源目录（可选）
│   ├── images/             # 图片资源
│   └── icons/              # 图标资源
└── README.md               # 项目说明
```

#### 命名规范
- **文件名**：使用中文命名，如 `用户登录.html`
- **CSS类名**：使用Tailwind CSS原子类
- **JavaScript变量**：使用驼峰命名法
- **组件ID**：使用kebab-case，如 `status-bar`

#### 代码规范
```html
<!-- HTML结构规范 -->
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>页面标题</title>
    <!-- 外部资源 -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <!-- 页面内容 -->
    <script src="../js/common.js"></script>
</body>
</html>
```

#### 组件开发规范
```javascript
// 组件加载标准模式
async function loadComponent(componentName, targetElement) {
    try {
        const response = await fetch(`../components/${componentName}.html`);
        const html = await response.text();
        document.querySelector(targetElement).innerHTML = html;
    } catch (error) {
        console.error(`加载组件 ${componentName} 失败:`, error);
    }
}
```

## 技术特点

### 前端技术栈
- **HTML5**：语义化标签，结构清晰
- **Tailwind CSS**：原子化CSS框架，快速样式开发
- **FontAwesome**：图标库，丰富的图标资源
- **JavaScript**：组件加载和交互逻辑

### 设计规范
- **iOS设计规范**：贴近真实移动端体验
- **响应式设计**：支持不同屏幕尺寸
- **组件化思维**：可复用、可维护的组件系统

### 性能优化
- **组件复用**：避免重复代码
- **图片优化**：使用 picsum.photos 真实图片
- **加载优化**：分批加载页面，提升用户体验

## 注意事项

1. **文件命名**：页面文件必须使用中文命名
2. **组件引入**：使用 JavaScript fetch() 方式加载组件，严禁使用 iframe
3. **滚动条隐藏**：确保页面滚动条完全隐藏，保持真实手机体验
4. **跨域问题**：必须在本地服务器环境下运行，避免 file:// 协议
5. **展开模式**：需要同源环境才能正常检测页面内容高度

## 常见问题与故障排除

### 🔧 环境相关问题

#### Q: 为什么展开模式不工作？
**A: 跨域问题导致**
- **原因**：直接打开HTML文件使用 `file://` 协议，无法获取iframe内容高度
- **解决方案**：
  ```bash
  # 使用Live Server启动项目
  # 在VS Code中右键index.html → "Open with Live Server"

  # 或使用其他本地服务器
  python -m http.server 8000
  npx http-server -p 8000
  ```

#### Q: 页面显示空白或组件加载失败？
**A: 路径问题或服务器问题**
- **检查控制台错误**：F12打开开发者工具查看错误信息
- **检查文件路径**：确保组件路径正确 `../components/组件名.html`
- **确认服务器运行**：确保项目在本地服务器环境下运行

#### Q: 样式显示异常？
**A: CSS资源加载问题**
- **检查网络连接**：Tailwind CSS和FontAwesome需要网络加载
- **使用本地资源**：如需离线使用，下载CSS文件到本地
- **清除缓存**：Ctrl+F5强制刷新页面

### 📱 显示相关问题

#### Q: 如何添加新页面？
**A: 完整添加流程**
1. **创建页面文件**
   ```bash
   # 在pages目录下创建新页面
   touch pages/新页面名称.html
   ```

2. **编写页面内容**
   ```html
   <!-- 复制现有页面作为模板 -->
   <!-- 修改页面内容和样式 -->
   ```

3. **更新主入口**
   ```javascript
   // 在index.html中添加页面配置
   const newPages = [
       { name: '新页面名称', file: '新页面名称.html' }
   ];
   ```

#### Q: 如何修改配色方案？
**A: 系统性配色修改**
1. **定义配色变量**
   ```javascript
   // 在common.js中定义配色方案
   const colorScheme = {
       primary: 'blue',      // 主色调
       secondary: 'green',   // 辅助色
       accent: 'purple',     // 强调色
       neutral: 'gray'       // 中性色
   };
   ```

2. **批量替换颜色**
   ```bash
   # 使用全局搜索替换
   # 将 bg-orange-400 替换为 bg-blue-500
   # 将 text-teal-600 替换为 text-green-600
   ```

3. **组件样式统一**
   ```css
   /* 在组件中使用CSS变量 */
   :root {
       --primary-color: #3b82f6;
       --secondary-color: #10b981;
   }
   ```

### ⚙️ 功能相关问题

#### Q: 组件如何传递参数？
**A: 动态参数传递方法**
```javascript
// 方法1：通过数据属性传递
async function loadHeaderComponent(pageTitle) {
    const response = await fetch('../components/header.html');
    let html = await response.text();
    html = html.replace('{{pageTitle}}', pageTitle);
    document.querySelector('#header').innerHTML = html;
}

// 方法2：加载后动态修改
async function loadComponent(componentName, params = {}) {
    await loadComponent(componentName);
    Object.keys(params).forEach(key => {
        const element = document.querySelector(`[data-param="${key}"]`);
        if (element) element.textContent = params[key];
    });
}
```

#### Q: 如何实现页面跳转？
**A: 原型中的跳转处理**
```javascript
// 原型设计中通常不需要真实跳转
```

#### Q: 如何调整手机框尺寸？
**A: 修改viewport尺寸**
```css
/* 在index.html的CSS中修改 */
.mobile-viewport {
    width: 375px;    /* iPhone 13 Pro宽度 */
    height: 812px;   /* iPhone 13 Pro高度 */
    /* 其他尺寸选项：
       iPhone SE: 375x667
       iPhone 12: 390x844
       iPhone 14 Pro Max: 430x932
    */
}
```

### 🚀 性能优化问题

#### Q: 页面加载速度慢？
**A: 优化加载性能**
1. **图片优化**
   ```html
   <!-- 使用适当尺寸的图片 -->
   <img src="https://picsum.photos/300/200" alt="优化后的图片">
   <!-- 避免过大的图片尺寸 -->
   ```

2. **组件懒加载**
   ```javascript
   // 只在需要时加载组件
   const observer = new IntersectionObserver((entries) => {
       entries.forEach(entry => {
           if (entry.isIntersecting) {
               loadComponent(entry.target.dataset.component);
           }
       });
   });
   ```

3. **资源预加载**
   ```html
   <!-- 预加载关键资源 -->
   <link rel="preload" href="https://cdn.tailwindcss.com" as="style">
   ```

#### Q: 如何调试JavaScript错误？
**A: 调试技巧**
```javascript
// 1. 使用console.log调试
console.log('组件加载状态:', componentLoaded);

// 2. 使用try-catch捕获错误
try {
    await loadComponent('header');
} catch (error) {
    console.error('组件加载失败:', error);
}

// 3. 使用浏览器调试工具
// F12 → Console → 查看错误信息
// F12 → Network → 检查资源加载状态
```

### 📋 开发流程问题

#### Q: 如何进行版本管理？
**A: Git版本控制建议**
```bash
# 初始化Git仓库
git init
git add .
git commit -m "初始化项目"

# 创建开发分支
git checkout -b feature/新功能

# 提交更改
git add .
git commit -m "添加新页面：用户设置"
```

#### Q: 如何团队协作开发？
**A: 协作开发规范**
1. **分工明确**：按页面或组件分配任务
2. **命名统一**：使用统一的文件和变量命名规范
3. **代码审查**：合并前进行代码审查
4. **文档更新**：及时更新README和注释

## 高级用法与扩展

### 🎨 自定义主题系统

#### 创建主题配置文件
```javascript
// js/themes.js
const themes = {
    light: {
        primary: 'bg-blue-500',
        secondary: 'bg-gray-100',
        text: 'text-gray-900',
        background: 'bg-white'
    },
    dark: {
        primary: 'bg-blue-600',
        secondary: 'bg-gray-800',
        text: 'text-gray-100',
        background: 'bg-gray-900'
    },
    custom: {
        primary: 'bg-purple-500',
        secondary: 'bg-pink-100',
        text: 'text-purple-900',
        background: 'bg-gradient-to-br from-purple-50 to-pink-50'
    }
};

// 主题切换函数
function switchTheme(themeName) {
    const theme = themes[themeName];
    document.documentElement.setAttribute('data-theme', themeName);
    // 应用主题样式...
}
```

#### 响应式主题适配
```css
/* 支持系统主题自动切换 */
@media (prefers-color-scheme: dark) {
    :root {
        --bg-primary: #1f2937;
        --text-primary: #f9fafb;
    }
}

@media (prefers-color-scheme: light) {
    :root {
        --bg-primary: #ffffff;
        --text-primary: #111827;
    }
}
```

### 📊 数据驱动的页面生成

#### 配置化页面生成
```javascript
// js/page-config.js
const pageConfigs = {
    "电商首页": {
        components: ['status-bar', 'search-bar', 'banner', 'categories', 'products', 'bottom-nav'],
        layout: 'grid',
        theme: 'light',
        data: {
            banners: ['banner1.jpg', 'banner2.jpg'],
            categories: ['服装', '数码', '家居'],
            products: [...]
        }
    },
    "用户中心": {
        components: ['status-bar', 'header', 'user-info', 'menu-list'],
        layout: 'stack',
        theme: 'light'
    }
};

// 自动生成页面
function generatePage(pageName) {
    const config = pageConfigs[pageName];
    const pageHTML = buildPageFromConfig(config);
    return pageHTML;
}
```

#### 动态内容注入
```javascript
// 支持模板变量替换
const templateEngine = {
    render(template, data) {
        return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
            return data[key] || match;
        });
    }
};

// 使用示例
const template = '<h1>{{title}}</h1><p>{{description}}</p>';
const data = { title: '页面标题', description: '页面描述' };
const html = templateEngine.render(template, data);
```

### 🔄 交互原型功能

#### 页面状态管理
```javascript
// js/state-manager.js
class StateManager {
    constructor() {
        this.state = {};
        this.listeners = {};
    }

    setState(key, value) {
        this.state[key] = value;
        this.notify(key, value);
    }

    getState(key) {
        return this.state[key];
    }

    subscribe(key, callback) {
        if (!this.listeners[key]) {
            this.listeners[key] = [];
        }
        this.listeners[key].push(callback);
    }

    notify(key, value) {
        if (this.listeners[key]) {
            this.listeners[key].forEach(callback => callback(value));
        }
    }
}

// 使用示例
const stateManager = new StateManager();
stateManager.subscribe('currentPage', (page) => {
    console.log('页面切换到:', page);
});
```

#### 交互动画系统
```javascript
// js/animations.js
const animations = {
    slideIn: (element, direction = 'right') => {
        element.style.transform = `translateX(${direction === 'right' ? '100%' : '-100%'})`;
        element.style.transition = 'transform 0.3s ease';
        setTimeout(() => {
            element.style.transform = 'translateX(0)';
        }, 10);
    },

    fadeIn: (element, duration = 300) => {
        element.style.opacity = '0';
        element.style.transition = `opacity ${duration}ms ease`;
        setTimeout(() => {
            element.style.opacity = '1';
        }, 10);
    },

    scaleIn: (element) => {
        element.style.transform = 'scale(0.8)';
        element.style.transition = 'transform 0.2s ease';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 10);
    }
};
```

### 📱 移动端增强功能

#### 触摸手势支持
```javascript
// js/touch-gestures.js
class TouchGestureHandler {
    constructor(element) {
        this.element = element;
        this.startX = 0;
        this.startY = 0;
        this.init();
    }

    init() {
        this.element.addEventListener('touchstart', this.handleTouchStart.bind(this));
        this.element.addEventListener('touchmove', this.handleTouchMove.bind(this));
        this.element.addEventListener('touchend', this.handleTouchEnd.bind(this));
    }

    handleTouchStart(e) {
        this.startX = e.touches[0].clientX;
        this.startY = e.touches[0].clientY;
    }

    handleTouchMove(e) {
        // 处理滑动逻辑
    }

    handleTouchEnd(e) {
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const deltaX = endX - this.startX;
        const deltaY = endY - this.startY;

        // 判断手势方向
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX > 50) {
                this.onSwipeRight();
            } else if (deltaX < -50) {
                this.onSwipeLeft();
            }
        }
    }

    onSwipeLeft() {
        // 左滑处理
        console.log('左滑手势');
    }

    onSwipeRight() {
        // 右滑处理
        console.log('右滑手势');
    }
}
```

#### 设备适配优化
```javascript
// js/device-adapter.js
class DeviceAdapter {
    constructor() {
        this.deviceInfo = this.getDeviceInfo();
        this.adaptLayout();
    }

    getDeviceInfo() {
        const userAgent = navigator.userAgent;
        return {
            isIOS: /iPad|iPhone|iPod/.test(userAgent),
            isAndroid: /Android/.test(userAgent),
            isMobile: /Mobi|Android/i.test(userAgent),
            screenWidth: window.screen.width,
            screenHeight: window.screen.height,
            pixelRatio: window.devicePixelRatio
        };
    }

    adaptLayout() {
        if (this.deviceInfo.isIOS) {
            document.body.classList.add('ios-device');
        } else if (this.deviceInfo.isAndroid) {
            document.body.classList.add('android-device');
        }

        // 适配不同屏幕尺寸
        if (this.deviceInfo.screenWidth <= 375) {
            document.body.classList.add('small-screen');
        } else if (this.deviceInfo.screenWidth >= 414) {
            document.body.classList.add('large-screen');
        }
    }
}
```

### 🛠️ 开发工具集成

#### 自动化构建脚本
```javascript
// build.js - 简单的构建脚本
const fs = require('fs');
const path = require('path');

class ProjectBuilder {
    constructor(config) {
        this.config = config;
    }

    async build() {
        console.log('开始构建项目...');

        // 1. 复制基础文件
        await this.copyBaseFiles();

        // 2. 生成页面文件
        await this.generatePages();

        // 3. 优化资源
        await this.optimizeAssets();

        console.log('构建完成！');
    }

    async copyBaseFiles() {
        // 复制组件和基础文件
    }

    async generatePages() {
        // 根据配置生成页面
    }

    async optimizeAssets() {
        // 优化图片和CSS
    }
}

// 使用示例
const builder = new ProjectBuilder({
    projectName: '新项目',
    pages: ['首页', '列表页', '详情页'],
    theme: 'light'
});

builder.build();
```

#### 实时预览服务器
```javascript
// dev-server.js - 开发服务器
const express = require('express');
const chokidar = require('chokidar');
const WebSocket = require('ws');

class DevServer {
    constructor(port = 3000) {
        this.port = port;
        this.app = express();
        this.setupServer();
        this.setupFileWatcher();
    }

    setupServer() {
        this.app.use(express.static('.'));
        this.app.listen(this.port, () => {
            console.log(`开发服务器运行在 http://localhost:${this.port}`);
        });
    }

    setupFileWatcher() {
        const watcher = chokidar.watch(['pages/**/*.html', 'components/**/*.html']);
        watcher.on('change', (path) => {
            console.log(`文件变更: ${path}`);
            // 通知浏览器刷新
            this.notifyReload();
        });
    }

    notifyReload() {
        // WebSocket通知浏览器刷新
    }
}

new DevServer(3000);
```

## 版本信息

- **当前版本**：1.0.0
- **创建时间**：2025年
- **技术栈**：HTML5 + Tailwind CSS + FontAwesome + JavaScript
- **兼容性**：现代浏览器，移动端优先
- **更新日志**：
  - v1.0.0：初始版本，包含基础组件和智能展开功能
  - 后续版本将添加更多交互功能和主题支持

## 贡献指南

### 如何贡献
1. **Fork项目**：创建项目的分支
2. **创建功能分支**：`git checkout -b feature/新功能`
3. **提交更改**：`git commit -m "添加新功能"`
4. **推送分支**：`git push origin feature/新功能`
5. **创建Pull Request**：提交合并请求

### 贡献规范
- 遵循现有的代码风格和命名规范
- 添加必要的注释和文档
- 确保新功能与现有功能兼容
- 提供测试用例和使用示例

## 联系方式

如有问题或建议，请通过以下方式联系：
- **项目仓库**：查看项目根目录的相关文档
- **技术支持**：参考快捷操作文档 (.QuickAction.json)
- **问题反馈**：创建Issue描述问题和建议
- **功能请求**：提交Feature Request说明需求

## 许可证

本项目采用 MIT 许可证，详情请查看 LICENSE 文件。

---
