# NiceEasyAI（集成spec开发模式，开箱即用）

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub issues](https://img.shields.io/github/issues/candlesmeet/NiceEasyAI)](https://github.com/candlesmeet/NiceEasyAI/issues)
[![GitHub stars](https://img.shields.io/github/stars/candlesmeet/NiceEasyAI)](https://github.com/candlesmeet/NiceEasyAI/stargazers)

## 简介

NiceEasyAI 是一个专为 AI 项目开发，提供快捷操作支持的开源工具库。通过将本仓库作为子模块引入您的 AI 项目，您可以获得一系列预配置的快捷操作，显著提升开发效率和协作体验。

## ✨ 特性

- **🎯 专为 AI 项目优化**：集成亚马逊Kiro同款的spec开发模式、智能需求分析和解决方案生成
- **🚀 零依赖**：无需安装额外依赖包，开箱即用
- **🔧 一键工作流**：自动化 Git 提交、推送、文档生成等常见任务
- **⚙️ 高度可配置**：通过 JSON 配置文件灵活扩展功能
- **🇨🇳 中文优先**：完全让AI支持中文交互和文档生成
- **📦 子模块友好**：专为 Git 子模块集成设计
- **🚀 新手小白友好**：专为新手小白设计

## 🚀 快速开始

### 1. 引入子模块

在您的 AI 项目根目录下执行：

```bash
# 使用GitHub源
git submodule add https://github.com/ruhua2024/NiceEasyAI.git NiceEasyAI
git submodule update --init --recursive
```

```bash
# 或使用Gitee源（国内访问更快）
git submodule add https://gitee.com/candlesmeet_0/nice-easy-ai.git NiceEasyAI
git submodule update --init --recursive
```

### 2. 开始使用

<span style="color: orange"><strong>引入成功后，您可以直接在 AI 对话中发给AI：</strong></span>

```bash
查看NiceEasyAI/.QuickAction.json，执行里面的yd快捷操作
```
```bash
查看NiceEasyAI/.QuickAction.json，执行里面的spec快捷操作
```

<span style="color: orange"><strong>如果需要新增自定义的快捷操作，直接发给AI：</strong></span>

```bash
查看NiceEasyAI/.QuickAction.json，执行里面的add快捷操作
```

## 🛠️ 快捷操作详解

### yd - 自动提交推送

**功能描述**：自动化 Git 工作流，从暂存到推送一键完成

**使用场景**：
- 完成代码修改后的快速提交
- 标准化 Git 提交信息格式
- 简化日常开发工作流

**执行流程**：
1. 自动检测文件更改
2. 生成符合 Conventional Commits 规范的中文提交信息
3. 执行暂存、提交、推送操作
4. 提供操作结果反馈


### spec - 标准需求+技术文档生成

**功能描述**：智能需求分析和解决方案文档生成，包含完整的技术方案设计流程

**使用场景**：
- 新项目需求分析
- 功能模块设计
- 技术方案文档编写
- 代码审查准备

**生成内容**：
1. 需求概述
2. 技术方案设计
3. 实现步骤分解
4. 自动导入任务系统开始实施


## ⚠️ 注意事项

### 重要约束

1. **仓库名称不可修改**：
   - 必须保持仓库名称为 `NiceEasyAI`
   - 修改名称会导致快捷操作配置失效
   - 子模块路径也应保持为 `NiceEasyAI`

2. **配置文件位置**：
   - `.QuickAction.json` 必须位于项目根目录
   - 不要重命名或移动此文件


## 📧 联系我们

**技术支持**：
- 📧 技术问题：发送邮件至 ruhua@candlesmeet.com
- 🐛 Bug 报告：[提交 Issue](https://github.com/candlesmeet/NiceEasyAI/issues)
- 💡 功能建议：[创建 Discussion](https://github.com/candlesmeet/NiceEasyAI/discussions)

---

**Made with ❤️ by the NiceEasyAI Team**