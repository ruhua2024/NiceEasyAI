# NiceEasyAI

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub issues](https://img.shields.io/github/issues/candlesmeet/NiceEasyAI)](https://github.com/candlesmeet/NiceEasyAI/issues)
[![GitHub stars](https://img.shields.io/github/stars/candlesmeet/NiceEasyAI)](https://github.com/candlesmeet/NiceEasyAI/stargazers)

## 简介

NiceEasyAI 是一个专为 AI 项目开发提供便捷快捷操作支持的开源工具库。通过将本仓库作为子模块引入您的 AI 项目，您可以获得一系列预配置的快捷操作，显著提升开发效率和协作体验。

本项目采用配置驱动的架构设计，通过 `.QuickAction.json` 文件定义和管理所有快捷操作，支持智能中文交互，深度集成 Claude AI 能力，为 AI 项目开发提供标准化的工作流程。

## ✨ 特性

- **🎯 专为 AI 项目优化**：针对 AI 开发场景设计的快捷操作
- **🔧 一键工作流**：自动化 Git 提交、推送、文档生成等常见任务
- **🤖 AI 深度集成**：智能需求分析和解决方案生成
- **⚙️ 高度可配置**：通过 JSON 配置文件灵活扩展功能
- **🇨🇳 中文优先**：完全支持中文交互和文档生成
- **📦 子模块友好**：专为 Git 子模块集成设计
- **🚀 零依赖**：无需安装额外依赖包，开箱即用

## 🚀 快速开始

### 1. 引入子模块

在您的 AI 项目根目录下执行：

```bash
git submodule add https://github.com/candlesmeet/NiceEasyAI.git NiceEasyAI
git submodule update --init --recursive
```

### 2. 开始使用

引入成功后，您可以直接在 AI 对话中说明要执行的操作：

- "帮我执行 yd 操作" - 自动完成 Git 提交和推送
- "使用 spec 分析一下这个需求" - 生成需求分析文档

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

**使用示例**：
```
用户：执行 yd 操作
AI：检测到 3 个文件修改，已自动提交并推送：
✅ 添加新功能：用户认证模块
📁 修改文件：src/auth.js, src/config.js, README.md
🚀 已成功推送到远程仓库
```

### spec - 需求分析文档生成

**功能描述**：智能需求分析和解决方案文档生成，包含完整的技术方案设计流程

**使用场景**：
- 新项目需求分析
- 功能模块设计
- 技术方案文档编写
- 代码审查准备

**生成内容**：
1. 需求概述和用户故事
2. 技术方案设计
3. 实现步骤分解
4. 风险评估和应对措施
5. 测试策略建议
6. 部署和运维考虑

**使用示例**：
```
用户：使用 spec 分析用户权限管理需求
AI：正在生成需求分析文档...
📋 已生成完整的需求分析文档，包含：
- 用户角色和权限矩阵
- RBAC 实现方案
- 数据库设计建议
- API 接口规范
- 前端权限控制策略
文档已保存至 docs/specs/用户权限管理.md
```

## ⚠️ 注意事项

### 重要约束

1. **仓库名称不可修改**：
   - 必须保持仓库名称为 `NiceEasyAI`
   - 修改名称会导致快捷操作配置失效
   - 子模块路径也应保持为 `NiceEasyAI`

2. **配置文件位置**：
   - `.QuickAction.json` 必须位于项目根目录
   - 不要重命名或移动此文件
   - 确保文件格式为有效的 JSON

3. **中文交互要求**：
   - 所有快捷操作都强制要求中文交互
   - 提交信息、文档内容都使用中文
   - 确保您的 AI 工具支持中文处理

4. **Git 版本要求**：
   - 需要 Git 2.20 以上版本支持子模块功能
   - 确保已配置 Git 用户信息

## 📄 许可证

本项目采用 **MIT 许可证** 开源，允许：
- ✅ 商业使用
- ✅ 修改和分发
- ✅ 私人使用
- ✅ 专利使用

## 📧 联系我们

**官方邮箱**：ruhua@candlesmeet.com

**技术支持**：
- 📧 技术问题：发送邮件至 ruhua@candlesmeet.com
- 🐛 Bug 报告：[提交 Issue](https://github.com/candlesmeet/NiceEasyAI/issues)
- 💡 功能建议：[创建 Discussion](https://github.com/candlesmeet/NiceEasyAI/discussions)

---

**Made with ❤️ by the NiceEasyAI Team**