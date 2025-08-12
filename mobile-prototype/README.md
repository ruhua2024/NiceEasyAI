# 移动APP原型设计框架

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
│   │   └── pages.css         # 页面特定样式
│   ├── js/
│   │   ├── main.js           # 主要逻辑和初始化
│   │   ├── page-loader.js    # 页面加载器
│   │   └── component-manager.js # 组件管理器
│   └── images/               # 图片资源（待添加）
├── components/
│   ├── phone-frame.html      # 手机外框模板
│   ├── status-bar.html       # 系统状态栏
│   ├── header.html           # 应用标题栏
│   └── nav-bar.html          # 底部导航栏
├── pages/
│   ├── home.html             # 首页内容
│   ├── profile.html          # 个人页面
│   └── settings.html         # 设置页面
└── README.md                 # 项目说明文档
```

## 🚀 快速开始

### ⚠️ 重要：必须启动本地服务器

**为什么需要本地服务器？**

由于浏览器的安全策略（同源策略和CORS限制），直接双击打开HTML文件会导致：
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
- 点击底部导航栏切换页面
- 在"我的"页面点击"设置"进入设置页面
- 在设置页面点击返回按钮回到"我的"页面

## 📝 添加新页面

1. 在 `pages/` 目录下创建新的HTML文件
2. 在 `config/pages.js` 中添加页面配置
3. 如果是一级页面，需要在 `navBarConfig` 中添加对应的导航项

## 🎨 自定义样式

- 修改 `assets/css/base.css` 中的CSS变量来改变主题色彩
- 在 `assets/css/pages.css` 中添加页面特定样式
- 在 `assets/css/components.css` 中修改组件样式

## 📱 响应式设计

框架自动适配不同屏幕尺寸：
- 小屏幕（≤480px）：1列布局
- 中等屏幕（481px-900px）：2列布局
- 大屏幕（901px-1350px）：3列布局
- 超大屏幕（≥1351px）：4列布局

## 🔧 技术特性

- ✅ 零依赖，纯HTML/CSS/JavaScript
- ✅ 模块化架构，易于维护
- ✅ 响应式设计，适配各种屏幕
- ✅ 展开模式，查看完整内容
- ✅ 智能导航栏，支持激活状态
- ✅ 组件化开发，高度可复用

## 🔧 故障排除

### Q: 页面显示"正在加载页面..."或"页面加载失败"
A: 检查以下几点：
1. **确保启动了本地服务器**：不能直接双击打开HTML文件
2. **确保cd到了项目目录**：必须在 `mobile-prototype` 目录下启动服务器
3. **检查浏览器控制台**：查看是否有CORS或网络错误
4. **确认访问地址**：应该是 `http://localhost:8000` 而不是 `http://localhost:8000/mobile-prototype/`

### Q: 导航栏不显示或点击无效
A: 检查以下几点：
1. **确保JavaScript文件正确加载**：查看浏览器控制台是否有错误
2. **检查页面配置**：确认 `config/pages.js` 中的配置正确
3. **验证图标库**：确保FontAwesome图标库正确加载

### Q: 展开模式不工作
A: 检查以下几点：
1. **确保JavaScript正确加载**：查看控制台是否有错误
2. **检查CSS样式**：确认展开模式的CSS样式已加载
3. **验证按钮事件**：确认模式切换按钮的点击事件正常

### Q: 样式显示异常
A: 检查以下几点：
1. **确保CSS文件路径正确**：检查 `assets/css/` 目录下的文件
2. **验证外部依赖**：确认FontAwesome图标库正确加载
3. **检查浏览器兼容性**：某些CSS特性可能需要较新的浏览器

## 📄 许可证

MIT License - 可自由使用和修改
