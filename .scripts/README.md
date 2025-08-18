# NiceEasyAI 终端快捷操作系统

## 🚀 简介

这个系统允许你在终端中使用 `///` 命令快速触发 NiceEasyAI 的快捷操作，无需每次都输入完整的 AI 命令。

## 📦 安装

在 NiceEasyAI 项目根目录中运行：

```bash
bash scripts/install.sh
```

安装完成后，重新加载 shell 配置或重新打开终端。

## 🎯 使用方法

### 基本命令

```bash
# 显示帮助信息
/// help

# 列出所有可用的快捷操作
/// list

# 执行特定的快捷操作
/// pbase
/// uibase
/// hbase
/// copyui
/// spec
/// db
/// yd
/// add

# 复制命令到剪贴板
/// copy pbase
/// copy uibase
```

### 命令示例

```bash
# 执行项目配置生成器
/// pbase
# 输出: 阅读NiceEasyAI/.QuickAction.index.md，执行pbase快捷操作

# 复制命令到剪贴板（推荐）
/// copy pbase
# 自动复制到剪贴板，可直接粘贴到 AI 对话中

# 查看所有快捷操作
/// list
# 显示详细的操作列表和描述
```

## ✨ 特性

- **🎯 简洁命令**: 使用 `///` 前缀，简单易记
- **📋 自动复制**: 支持一键复制到剪贴板
- **🔍 智能提示**: 提供命令补全和错误提示
- **🎨 彩色输出**: 清晰的视觉反馈
- **🔧 自动检测**: 自动查找配置文件
- **💡 帮助系统**: 完整的帮助和使用说明

## 🛠️ 系统要求

- **Shell**: Bash 或 Zsh
- **系统**: macOS, Linux, Windows (WSL)
- **可选依赖**: 
  - `jq` (推荐，用于 JSON 解析)
  - `pbcopy` (macOS) 或 `xclip`/`xsel` (Linux) 用于剪贴板功能

### 安装可选依赖

```bash
# macOS
brew install jq

# Ubuntu/Debian
sudo apt-get install jq xclip

# CentOS/RHEL
sudo yum install jq xsel
```

## 📁 文件结构

```
scripts/
├── quick-action.sh    # 主脚本
├── install.sh         # 安装脚本
├── uninstall.sh       # 卸载脚本
└── README.md          # 使用说明
```

## 🔧 工作原理

1. **命令解析**: `///` 函数捕获用户输入
2. **配置查找**: 自动在当前目录及父目录中查找 `.QuickAction.json`
3. **操作验证**: 检查快捷操作是否存在
4. **命令生成**: 生成标准的 AI 命令格式
5. **输出处理**: 显示或复制到剪贴板

## 🚨 故障排除

### 命令不存在

```bash
# 检查安装状态
which ///

# 重新加载配置
source ~/.zshrc  # 或 ~/.bashrc

# 重新安装
bash scripts/install.sh
```

### 找不到配置文件

确保在包含 `NiceEasyAI` 目录的项目中运行命令，或者当前目录包含 `.QuickAction.json` 文件。

### JSON 解析错误

```bash
# 安装 jq
brew install jq  # macOS
sudo apt-get install jq  # Ubuntu

# 或确保 Python 可用
python3 --version
```

## 🗑️ 卸载

```bash
bash scripts/uninstall.sh
```

卸载程序会：
- 创建配置文件备份
- 移除 shell 函数定义
- 保留脚本文件（可手动删除）

## 🔄 更新

要更新到最新版本：

1. 拉取最新代码
2. 重新运行安装脚本

```bash
git pull origin main
bash scripts/install.sh
```

## 💡 使用技巧

1. **快速复制**: 使用 `/// copy <action>` 直接复制到剪贴板
2. **命令补全**: 输入 `/// ` 后按 Tab 键查看可用选项
3. **批量操作**: 可以在脚本中组合多个命令
4. **别名设置**: 可以为常用操作设置更短的别名

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个工具！

## 📄 许可证

MIT License - 详见 LICENSE 文件
