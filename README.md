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
- "添加一个新的快捷操作" - 动态扩展功能

## 📖 使用指南

### 引入子模块

#### 首次添加
```bash
# 添加子模块
git submodule add https://github.com/candlesmeet/NiceEasyAI.git NiceEasyAI

# 初始化子模块
git submodule update --init --recursive

# 提交更改
git add .gitmodules NiceEasyAI
git commit -m "feat: 添加 NiceEasyAI 快捷操作子模块"
```

#### 更新子模块
```bash
# 拉取最新更新
git submodule update --remote NiceEasyAI

# 提交更新
git add NiceEasyAI
git commit -m "chore: 更新 NiceEasyAI 子模块到最新版本"
```

#### 克隆包含子模块的项目
```bash
# 克隆主项目
git clone https://github.com/your-org/your-ai-project.git

# 初始化和更新子模块
git submodule update --init --recursive
```

### 使用快捷操作

快捷操作通过 `.QuickAction.json` 文件配置，支持以下使用方式：

1. **直接对话触发**：在 AI 对话中直接说明要执行的操作
2. **配置文件引用**：AI 会自动读取 `.QuickAction.json` 中的配置
3. **参数化调用**：支持通过参数传递自定义配置

### 自定义配置

您可以通过修改 `.QuickAction.json` 文件来自定义快捷操作：

```json
{
  "global": {
    "language": "zh-CN",
    "aiIntegration": true
  },
  "shortcuts": {
    "your_custom_action": {
      "description": "自定义操作描述",
      "steps": [...]
    }
  }
}
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

### add - 添加新操作

**功能描述**：动态添加新的快捷操作到配置文件中，支持功能扩展

**使用场景**：
- 添加项目特定的快捷操作
- 扩展团队工作流
- 自定义重复性任务自动化

**支持的操作类型**：
- Git 相关操作（分支管理、标签创建等）
- 文件处理（批量重命名、格式转换等）
- 代码生成（模板创建、脚手架等）
- 部署发布（构建、发布、回滚等）

**使用示例**：
```
用户：添加一个发布新版本的操作
AI：正在创建发布新版本快捷操作...
🔧 已添加新操作 "release"：
- 自动更新版本号
- 生成变更日志
- 创建 Git 标签
- 推送发布版本
配置已更新到 .QuickAction.json
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

### 最佳实践

1. **子模块管理**：
   - 定期更新子模块获取最新功能
   - 在 CI/CD 流程中包含子模块更新步骤
   - 使用标签版本控制子模块更新

2. **配置维护**：
   - 定期备份 `.QuickAction.json` 配置
   - 团队内统一配置标准
   - 新成员入职时提供配置说明

3. **使用监控**：
   - 记录快捷操作使用频率
   - 收集团队反馈优化流程
   - 定期评估和优化快捷操作

## 📄 开源协议

本项目采用 **MIT 许可证** 开源，允许：
- ✅ 商业使用
- ✅ 修改和分发
- ✅ 私人使用
- ✅ 专利使用

**许可证详情**：[MIT License](https://opensource.org/licenses/MIT)

```
MIT License

Copyright (c) 2024 如花

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 📧 联系我们

**官方邮箱**：ruhua@candlesmeet.com

**技术支持**：
- 📧 技术问题：发送邮件至 ruhua@candlesmeet.com
- 🐛 Bug 报告：[提交 Issue](https://github.com/candlesmeet/NiceEasyAI/issues)
- 💡 功能建议：[创建 Discussion](https://github.com/candlesmeet/NiceEasyAI/discussions)

**合作咨询**：
- 企业定制化需求
- 技术培训和支持
- 集成方案咨询

**响应时间**：
- 技术问题：1-2 个工作日
- 合作咨询：3-5 个工作日

## 🤝 贡献

我们欢迎所有形式的贡献！

### 如何参与

#### 1. 报告问题
- 使用 [Issue 模板](https://github.com/candlesmeet/NiceEasyAI/issues/new/choose)
- 提供详细的复现步骤
- 包含环境信息和错误日志

#### 2. 提交代码
- Fork 项目仓库
- 创建功能分支：`git checkout -b feature/your-feature`
- 提交更改：`git commit -m "feat: 添加新功能描述"`
- 推送分支：`git push origin feature/your-feature`
- 创建 Pull Request

#### 3. 改进文档
- 修正 README 中的错误或过时信息
- 添加更多使用示例
- 改进中文表达和格式

#### 4. 分享经验
- 撰写使用心得和案例分享
- 参与社区讨论
- 帮助回答其他用户的问题

### 贡献者指南

1. **代码规范**：
   - 遵循现有的代码风格
   - 添加必要的注释说明
   - 确保配置文件格式正确

2. **文档规范**：
   - 使用清晰的中文描述
   - 提供具体的代码示例
   - 包含必要的截图或图表

3. **测试要求**：
   - 在本地测试所有修改
   - 确保不破坏现有功能
   - 验证子模块集成正常

### 致谢

感谢所有为 NiceEasyAI 项目做出贡献的开发者和用户！

## 📄 许可证

版权所有 © 2024 如花

本项目基于 [MIT License](https://opensource.org/licenses/MIT) 开源协议发布。

---

**Made with ❤️ by the NiceEasyAI Team**