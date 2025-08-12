const pageConfig = {
    home: {
        title: '首页',
        file: 'pages/home.html',
        isMainPage: true,           // 是否为一级页面（显示底部导航栏）
        navTabId: 'home',          // 对应的底部导航栏标签ID
        hasHeader: true,           // 是否显示应用标题栏
        headerTitle: '首页'
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
    'full-screen': {
        title: '全屏页面',
        file: 'pages/full-screen.html',
        isMainPage: false,         // 非一级页面
        hasHeader: false,          // 不显示标题栏（全屏效果）
        hasBackButton: false,      // 不显示标准返回按钮（使用浮动返回按钮）
        customClass: 'full-screen-mode'  // 添加自定义CSS类
    }
};

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

window.pageConfig = pageConfig;
window.navBarConfig = navBarConfig;
