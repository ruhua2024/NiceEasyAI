# 用户页面目录

这个目录用于存放您自定义的页面文件。

## 🚀 快速开始

### 1. 切换到用户模式
在 `config/pages.js` 文件中，将 `pagesPath` 修改为 `'user'`：

```javascript
const pagesPath = 'user';  // 改为 'user'
```

### 2. 创建页面文件
在当前目录下创建您的页面文件：

- `home.html` - 首页内容
- `profile.html` - 个人页面内容  
- `settings.html` - 设置页面内容
- `full-screen.html` - 全屏页面内容（可选）

### 3. 参考示例文件
您可以复制 `pages/examples/` 目录下的示例文件作为开发起点：

```bash
# 复制示例文件到用户目录
cp pages/examples/home.html pages/user/
cp pages/examples/profile.html pages/user/
cp pages/examples/settings.html pages/user/
```

## 📝 页面文件格式

每个页面文件应该包含一个HTML片段，例如：

```html
<div class="page-container">
    <h2>我的自定义页面</h2>
    <p>这里是页面内容...</p>
    
    <div class="card">
        <div class="card-title">功能卡片</div>
        <div class="card-info">卡片描述信息</div>
    </div>
</div>
```

## 🎨 样式说明

- 使用框架提供的CSS类名（如 `.card`, `.section-title` 等）
- 可以在页面文件中添加 `<style>` 标签自定义样式
- 全局样式修改请在 `assets/css/pages.css` 中进行

## 🔄 模式切换

- **学习模式**：`pagesPath = 'examples'` - 查看完整示例
- **开发模式**：`pagesPath = 'user'` - 使用自定义页面

随时可以在两种模式之间切换来参考示例或测试自己的页面。

## 💡 开发提示

1. **保持文件名一致**：确保文件名与配置中的页面ID匹配
2. **使用组件样式**：充分利用框架提供的组件样式类
3. **测试响应式**：在不同屏幕尺寸下测试页面效果
4. **参考示例**：遇到问题时切换到示例模式查看实现方法

## 📁 目录结构

```
pages/
├── examples/           # 示例页面（只读参考）
│   ├── home.html
│   ├── profile.html
│   ├── settings.html
│   └── full-screen.html
└── user/              # 用户页面（您的开发目录）
    ├── README.md      # 本说明文件
    └── (您的页面文件)
```

开始创建您的第一个页面吧！🎉
