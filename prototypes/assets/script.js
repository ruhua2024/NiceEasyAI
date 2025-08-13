// 防鸽金小程序 - 交互脚本

// 页面配置
const pageConfig = {
  // 一级页面（有底部导航栏）
  'home': { hasTabBar: true, hasNavBar: false, title: '首页', scrollable: true },
  'my-activities': { hasTabBar: true, hasNavBar: false, title: '我的活动', scrollable: true },
  'wallet': { hasTabBar: true, hasNavBar: false, title: '钱包', scrollable: true },
  'profile': { hasTabBar: true, hasNavBar: false, title: '我的', scrollable: false },

  // 二级页面（有返回按钮，无底部导航栏）
  'create-activity': { hasTabBar: false, hasNavBar: true, title: '创建活动', scrollable: true },
  'activity-detail': { hasTabBar: false, hasNavBar: true, title: '活动详情', scrollable: true },
  'invite-friends': { hasTabBar: false, hasNavBar: true, title: '邀请朋友', scrollable: true },
  'checkin': { hasTabBar: false, hasNavBar: true, title: '活动签到', scrollable: false },
  'transaction-detail': { hasTabBar: false, hasNavBar: true, title: '交易详情', scrollable: true },
  'settings': { hasTabBar: false, hasNavBar: true, title: '设置', scrollable: true }
};

// 页面列表
const pages = Object.keys(pageConfig);

// 当前模式：normal 或 expanded
let currentMode = 'normal';

// 初始化
document.addEventListener('DOMContentLoaded', function() {
  createModeToggle();
  createPageGrid();
  setupModeToggle();
  enhancedInit();
});

// 创建模式切换按钮
function createModeToggle() {
  const toggleContainer = document.createElement('div');
  toggleContainer.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    padding: 8px;
  `;
  
  const toggleButton = document.createElement('button');
  toggleButton.id = 'modeToggle';
  toggleButton.innerHTML = '<i class="fas fa-expand-arrows-alt"></i> 展开模式';
  toggleButton.style.cssText = `
    background: #007AFF;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 8px 12px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
  `;
  
  toggleContainer.appendChild(toggleButton);
  document.body.appendChild(toggleContainer);
}

// 创建页面网格
function createPageGrid() {
  const container = document.getElementById('pageContainer');
  if (!container) return;
  
  pages.forEach((page, index) => {
    const pageWrapper = document.createElement('div');
    pageWrapper.className = 'page-wrapper';
    pageWrapper.style.cssText = `
      margin-bottom: 40px;
      position: relative;
    `;
    
    // 页面标题
    const pageTitle = document.createElement('h2');
    pageTitle.textContent = pageConfig[page].title;
    pageTitle.style.cssText = `
      text-align: center;
      margin-bottom: 20px;
      color: #333;
      font-size: 18px;
      font-weight: 600;
    `;
    
    // 手机框架
    const phoneFrame = document.createElement('div');
    phoneFrame.className = 'phone-frame';
    phoneFrame.id = `phone-${page}`;
    
    // iframe
    const iframe = document.createElement('iframe');
    iframe.src = `pages/${page}.html`;
    iframe.style.cssText = `
      width: 100%;
      height: 100%;
      border: none;
      border-radius: 18px;
    `;
    iframe.onload = function() {
      adjustIframeHeight(iframe, page);
    };
    
    phoneFrame.appendChild(iframe);
    pageWrapper.appendChild(pageTitle);
    pageWrapper.appendChild(phoneFrame);
    container.appendChild(pageWrapper);
  });
}

// 调整iframe高度
function adjustIframeHeight(iframe, page) {
  try {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    const content = iframeDoc.querySelector('.phone-screen');
    if (content) {
      const config = pageConfig[page];
      let minHeight = 852; // iPhone 15 Pro 高度
      
      if (currentMode === 'expanded') {
        // 展开模式：根据内容调整高度
        const contentHeight = content.scrollHeight;
        iframe.style.height = Math.max(contentHeight, minHeight - 4) + 'px';
        iframe.parentElement.style.height = Math.max(contentHeight + 4, minHeight) + 'px';
      } else {
        // 正常模式：固定高度
        iframe.style.height = (minHeight - 4) + 'px';
        iframe.parentElement.style.height = minHeight + 'px';
      }
    }
  } catch (e) {
    console.log('无法访问iframe内容，可能是跨域限制');
  }
}

// 设置模式切换
function setupModeToggle() {
  const toggleButton = document.getElementById('modeToggle');
  if (!toggleButton) return;
  
  toggleButton.addEventListener('click', function() {
    currentMode = currentMode === 'normal' ? 'expanded' : 'normal';
    
    // 更新按钮状态
    if (currentMode === 'expanded') {
      toggleButton.innerHTML = '<i class="fas fa-compress-arrows-alt"></i> 正常模式';
      toggleButton.style.background = '#34C759';
      document.body.classList.add('expanded');
    } else {
      toggleButton.innerHTML = '<i class="fas fa-expand-arrows-alt"></i> 展开模式';
      toggleButton.style.background = '#007AFF';
      document.body.classList.remove('expanded');
    }
    
    // 重新调整所有iframe高度
    pages.forEach(page => {
      const iframe = document.querySelector(`#phone-${page} iframe`);
      if (iframe) {
        setTimeout(() => adjustIframeHeight(iframe, page), 100);
      }
    });
  });
}

// 工具函数：平滑滚动到指定页面
function scrollToPage(pageId) {
  const element = document.getElementById(`phone-${pageId}`);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center'
    });
  }
}

// 页面快速导航
function createQuickNav() {
  const quickNav = document.createElement('div');
  quickNav.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 25px;
    padding: 8px 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    z-index: 999;
    display: flex;
    gap: 8px;
  `;

  const mainPages = ['home', 'my-activities', 'wallet', 'profile'];
  mainPages.forEach(page => {
    const btn = document.createElement('button');
    btn.innerHTML = getPageIcon(page);
    btn.title = pageConfig[page].title;
    btn.style.cssText = `
      width: 40px;
      height: 40px;
      border-radius: 20px;
      border: none;
      background: transparent;
      color: #8E8E93;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    btn.addEventListener('click', () => scrollToPage(page));
    btn.addEventListener('mouseenter', () => {
      btn.style.background = '#007AFF';
      btn.style.color = 'white';
      btn.style.transform = 'scale(1.1)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.background = 'transparent';
      btn.style.color = '#8E8E93';
      btn.style.transform = 'scale(1)';
    });

    quickNav.appendChild(btn);
  });

  document.body.appendChild(quickNav);
}

// 获取页面图标
function getPageIcon(page) {
  const icons = {
    'home': '<i class="fas fa-home"></i>',
    'my-activities': '<i class="fas fa-calendar-alt"></i>',
    'wallet': '<i class="fas fa-wallet"></i>',
    'profile': '<i class="fas fa-user"></i>',
    'create-activity': '<i class="fas fa-plus"></i>',
    'activity-detail': '<i class="fas fa-info-circle"></i>',
    'invite-friends': '<i class="fas fa-user-plus"></i>',
    'checkin': '<i class="fas fa-check-circle"></i>'
  };
  return icons[page] || '<i class="fas fa-file"></i>';
}

// 添加页面加载进度
function showLoadingProgress() {
  const progress = document.createElement('div');
  progress.id = 'loadingProgress';
  progress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: rgba(0, 122, 255, 0.2);
    z-index: 1001;
  `;

  const bar = document.createElement('div');
  bar.style.cssText = `
    height: 100%;
    background: #007AFF;
    width: 0%;
    transition: width 0.3s ease;
  `;

  progress.appendChild(bar);
  document.body.appendChild(progress);

  return bar;
}

// 隐藏加载进度
function hideLoadingProgress() {
  const progress = document.getElementById('loadingProgress');
  if (progress) {
    setTimeout(() => progress.remove(), 300);
  }
}

// 增强初始化函数
function enhancedInit() {
  const progressBar = showLoadingProgress();
  let loadedPages = 0;

  // 模拟加载进度
  const updateProgress = () => {
    loadedPages++;
    const percent = (loadedPages / pages.length) * 100;
    progressBar.style.width = percent + '%';

    if (loadedPages >= pages.length) {
      setTimeout(() => {
        hideLoadingProgress();
        createQuickNav();
      }, 500);
    }
  };

  // 创建页面时更新进度
  pages.forEach((page, index) => {
    setTimeout(() => {
      updateProgress();
    }, index * 100);
  });
}

// 导出函数供外部使用
window.AppUtils = {
  scrollToPage,
  currentMode: () => currentMode,
  pages: () => pages,
  enhancedInit
};
