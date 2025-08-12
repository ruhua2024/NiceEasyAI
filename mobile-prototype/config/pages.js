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
    }
};

// 底部导航栏配置
const navBarConfig = {
    home: {
        label: '首页',
        icon: 'far fa-home',
        iconActive: 'fas fa-home'
    },
    profile: {
        label: '我的',
        icon: 'far fa-user',
        iconActive: 'fas fa-user'
    }
};

window.pageConfig = pageConfig;
window.navBarConfig = navBarConfig;
