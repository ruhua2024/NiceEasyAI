// 页面路径配置
// 修改这个值来切换示例页面和用户页面
// 'examples' = 使用示例页面（学习参考）
// 'user' = 使用用户自定义页面（实际开发）
let pagesPath = 'user';  // 默认使用用户模式

// 动态生成页面配置的函数
function generatePageConfig(path) {
    return {
        home: {
            title: '首页',
            file: `pages/${path}/home.html`,
            isMainPage: true,           // 是否为一级页面（显示底部导航栏）
            navTabId: 'home',          // 对应的底部导航栏标签ID
            hasHeader: true,           // 是否显示应用标题栏
            headerTitle: '首页'
        },
        profile: {
            title: '我的',
            file: `pages/${path}/profile.html`,
            isMainPage: true,          // 一级页面
            navTabId: 'profile',       // 对应导航栏的我的标签
            hasHeader: true,
            headerTitle: '我的'
        },
        settings: {
            title: '设置',
            file: `pages/${path}/settings.html`,
            isMainPage: false,         // 非一级页面（不显示底部导航栏）
            hasHeader: true,           // 显示标题栏
            headerTitle: '设置',
            hasBackButton: true,       // 显示返回按钮
            backTo: 'profile'          // 返回到我的页面
        },
        'full-screen': {
            title: '全屏页面',
            file: `pages/${path}/full-screen.html`,
            isMainPage: false,         // 非一级页面
            hasHeader: false,          // 不显示标题栏（全屏效果）
            hasBackButton: false,      // 不显示标准返回按钮（使用浮动返回按钮）
            customClass: 'full-screen-mode'  // 添加自定义CSS类
        }
    };
}

// 初始页面配置
let pageConfig = generatePageConfig(pagesPath);

// 底部导航栏配置
const navBarConfig = {
    home: {
        label: '首页',
        icon: 'fas fa-house',        // FontAwesome 6.x 使用 fa-house 替代 fa-home
        iconActive: 'fas fa-house'   // 激活时保持一致，通过CSS颜色区分
    },
    profile: {
        label: '我的',
        icon: 'far fa-user',         // 非激活：空心用户
        iconActive: 'fas fa-user'    // 激活：实心用户
    }
};

// 切换页面路径的函数
function switchPagesPath(newPath) {
    pagesPath = newPath;
    pageConfig = generatePageConfig(pagesPath);

    // 更新全局变量
    window.pageConfig = pageConfig;
    window.pagesPath = pagesPath;

    // 触发页面重新加载
    if (window.pageLoader && window.pageLoader.reloadCurrentPage) {
        window.pageLoader.reloadCurrentPage();
    }

    // 更新切换按钮状态
    updatePathToggleButton();
}

// 更新切换按钮状态的函数
function updatePathToggleButton() {
    const toggleButton = document.querySelector('.path-toggle-button');
    if (toggleButton) {
        if (pagesPath === 'examples') {
            toggleButton.textContent = 'my';
            toggleButton.title = '当前：示例模式，点击切换到用户模式';
        } else {
            toggleButton.textContent = '用例';
            toggleButton.title = '当前：用户模式，点击切换到示例模式';
        }
    }
}

// 导出配置到全局变量
window.pageConfig = pageConfig;
window.navBarConfig = navBarConfig;
window.pagesPath = pagesPath;
window.switchPagesPath = switchPagesPath;
window.updatePathToggleButton = updatePathToggleButton;

/*
 * 使用说明：
 *
 * 【切换页面模式】
 * 1. 修改上方的 pagesPath 变量：
 *    - 'examples' = 显示示例页面，用于学习和参考
 *    - 'user' = 显示用户页面，用于实际开发
 *
 * 【开发流程】
 * 1. 初始阶段：使用 'examples' 模式学习框架功能
 * 2. 开发阶段：切换到 'user' 模式，在 pages/user/ 目录下创建自己的页面
 * 3. 参考阶段：随时切换回 'examples' 模式查看示例实现
 *
 * 【目录结构】
 * pages/
 * ├── examples/          # 示例页面（完整功能演示）
 * │   ├── home.html      # 首页示例
 * │   ├── profile.html   # 个人页面示例
 * │   ├── settings.html  # 设置页面示例
 * │   └── full-screen.html # 全屏页面示例
 * └── user/              # 用户页面（自定义开发）
 *     └── (用户自己创建的页面文件)
 *
 * 【注意事项】
 * - 修改 pagesPath 后需要刷新浏览器
 * - 确保对应目录下存在相应的页面文件
 * - 可以复制示例文件到用户目录作为开发起点
 */
