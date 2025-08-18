# NiceEasyAI（集成spec开发模式，适合所有AI项目，开箱即用！）

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
- **🚀 新手小白友好**：专为新手小白设计，适合所有AI项目，开箱即用！

## 🚀 快速开始

### 1. 引入子模块

在您的 AI 项目根目录下，新建终端执行：

```bash
# 使用Gitee源（国内访问更快）
git submodule add https://gitee.com/candlesmeet_0/nice-easy-ai.git NiceEasyAI
git submodule update --init --recursive
```

```bash
# 或使用GitHub源
git submodule add https://github.com/ruhua2024/NiceEasyAI.git NiceEasyAI
git submodule update --init --recursive
```

### 2. 开始使用

**🔥 引入成功后，您可以直接在 AI 对话中发给AI：**

```bash
阅读NiceEasyAI/.QuickAction.index.md，执行pbase快捷操作
```
```bash
阅读NiceEasyAI/.QuickAction.index.md，执行uibase快捷操作
```
```bash
阅读NiceEasyAI/.QuickAction.index.md，执行copyui快捷操作
```
```bash
阅读NiceEasyAI/.QuickAction.index.md，执行spec快捷操作
```
```bash
阅读NiceEasyAI/.QuickAction.index.md，执行db快捷操作
```
```bash
阅读NiceEasyAI/.QuickAction.index.md，执行yd快捷操作
```

**🔥 如果需要新增自定义的快捷操作，直接发给AI：**

```bash
阅读NiceEasyAI/.QuickAction.index.md，执行add快捷操作
```


**💡 键盘快捷输入技巧：**

如果觉得每次输入命令很麻烦，可以在电脑的键盘设置中新增自定义短语，实现快速输入：

- **Mac用户**：
  1. 打开「系统设置」→ 进入「键盘」设置 → 找到「自定义短语」选项
  2. 新增以下短语规则：
     - 输入码：`pbase` → 替换为：`阅读NiceEasyAI/.QuickAction.index.md，执行pbase快捷操作`
     - 输入码：`uibase` → 替换为：`阅读NiceEasyAI/.QuickAction.index.md，执行uibase快捷操作`
     - 输入码：`copyui` → 替换为：`阅读NiceEasyAI/.QuickAction.index.md，执行copyui快捷操作`
     - 输入码：`cutpage` → 替换为：`阅读NiceEasyAI/.QuickAction.index.md，执行cutpage快捷操作`
     - 输入码：`hbase` → 替换为：`阅读NiceEasyAI/.QuickAction.index.md，执行hbase快捷操作`
     - 输入码：`spec` → 替换为：`阅读NiceEasyAI/.QuickAction.index.md，执行spec快捷操作`
     - 输入码：`dbbase` → 替换为：`阅读NiceEasyAI/.QuickAction.index.md，执行dbbase快捷操作`
     - 输入码：`db` → 替换为：`阅读NiceEasyAI/.QuickAction.index.md，执行db快捷操作`
     - 输入码：`add` → 替换为：`阅读NiceEasyAI/.QuickAction.index.md，执行add快捷操作`
     - 输入码：`yd` → 替换为：`阅读NiceEasyAI/.QuickAction.index.md，执行yd快捷操作`

- **Windows用户**：
  1. 打开「设置」→ 进入「时间和语言」→ 选择「输入」→ 点击「高级键盘设置」→ 找到「自定义短语」选项
  2. 添加与上述相同的快捷短语替换规则


设置完成后，只需在输入框中敲入对应的快捷码（如`pbase`、`uibase`、`copyui`、`cutpage`、`hbase`、`spec`、`dbbase`、`db`、`add`、`yd`），系统会自动替换为完整命令，大幅提升操作效率！

## 🚀 终端快捷操作（推荐）

**🔥 更便捷的方式：直接在终端中使用 `///` 命令！**

### 安装终端快捷操作

```bash
# 在 NiceEasyAI 项目根目录中运行
bash .scripts/install.sh
```

### 使用方法

```bash
# 直接复制快捷操作命令到剪贴板
/// pbase          # 复制 pbase 命令到剪贴板
/// uibase         # 复制 uibase 命令到剪贴板
/// spec           # 复制 spec 命令到剪贴板

# 查看所有可用操作
/// list           # 显示所有快捷操作详情
/// help           # 显示帮助信息

# 手动复制（如果需要）
/// copy pbase     # 明确指定复制操作
```

**💡 使用优势：**
- ⚡ **一键复制**：`/// pbase` 直接复制到剪贴板，无需手动选择
- 🎯 **命令补全**：支持 Tab 键自动补全快捷操作名称
- 🔍 **智能提示**：输入错误时提供可用操作建议
- 🎨 **彩色输出**：清晰的视觉反馈和状态提示
- 📱 **跨平台**：支持 macOS、Linux、Windows (WSL)


## 🛠️ 快捷操作详解

### 💡 使用建议
1. **新项目**: pbase → uibase → hbase → cutpage → dbbase
2. **数据库设计**: pbase → db 或 pbase → cutpage → dbbase
3. **UI复刻**: uibase + copyui
4. **需求分析**: spec
5. **Git操作**: yd

### pbase - 项目配置文件生成器

**功能描述**：智能分析用户需求并生成标准的 project-config.json 文件，支持MVP思想和页面元素智能分析

**使用场景**：
- 新项目初始化配置
- 项目信息标准化管理
- 团队协作配置共享
- 多页面复刻时的配置复用

**智能功能**：
1. 自动项目类型识别
2. 智能用户群体分析
3. 核心功能自动提取
4. 项目规模智能评估
5. 模块划分自动生成
6. 页面层级智能分类
7. 页面元素智能分析
8. UI组件自动推断

### uibase - 视觉设计系统生成器

**功能描述**：基于现有设计资源生成统一的视觉设计规范文档

**使用场景**：
- 建立项目视觉设计标准
- 统一团队设计规范
- 配色方案标准化
- UI组件库规范制定

**生成内容**：
1. 配色系统规范
2. 图标系统引用规范
3. 组件库引用规范
4. 基础数值与间距规范
5. 字体与排版规范

### hbase - HTML原型生成器

**功能描述**：基于防鸽金HTML原型设计模版进行开发，生成纯手机界面的高保真HTML原型，专注于真实预览体验

**使用场景**：
- 基于模版快速开发HTML原型
- 真实iOS设计规范模拟
- 智能展开模式实现
- 响应式布局展示

**核心特性**：
1. 基于成熟模版开发，非从零开始
2. 智能展开模式（正常模式/展开模式切换）
3. 响应式布局（3-2-1列自适应）
4. 真实iOS状态栏和导航栏模拟
5. 组件复用系统
6. 智能分批创建策略

### copyui - UI截图智能复刻

**功能描述**：微信小程序UI设计支持，分析截图还原页面视觉与布局结构，理解页面核心功能与用户使用场景

**使用场景**：
- 微信小程序UI复刻
- 页面视觉还原
- 组件化设计建议
- 视觉一致性保证

**核心特性**：
1. 智能截图分析
2. 视觉设计方案对照
3. 标准配色系统映射
4. 组件化设计建议
5. Tailwind CSS实现方案
6. 项目配置文件支持

### spec - 标准需求+技术文档生成

**功能描述**：智能需求分析和解决方案文档生成，包含完整的技术方案设计流程，支持云开发集成

**使用场景**：
- 新项目需求分析
- 功能模块设计
- 技术方案文档编写
- 代码审查准备

**生成内容**：
1. 需求概述与EARS语法规范
2. 技术方案设计与Mermaid图表
3. 实现步骤分解与任务列表
4. 自动导入任务系统开始实施
5. 云开发操作工具说明（如项目使用）

### cutpage - 原型图智能分析器

**功能描述**：深度分析设计师原型图，智能拆解页面元素，提炼业务实体，分析交互逻辑

**使用场景**：
- 原型图元素拆解分析
- 业务实体识别与建模
- 交互逻辑梳理与流程分析
- 产品需求理解与技术转化

**核心功能**：
1. 智能区分静态内容与动态数据元素
2. 系统性提炼业务实体及关联关系
3. 深度分析页面间交互逻辑和业务流程
4. 生成Mermaid图表展示页面跳转和数据流向

**生成文档**：
1. 《页面元素拆解表.md》- 页面元素详细分析
2. 《业务实体清单.md》- 业务实体和关联关系
3. 《原型图交互逻辑.md》- 交互逻辑和业务流程分析

### dbbase - 数据库设计文档生成器

**功能描述**：基于cutpage生成的分析文档，结合用户技术栈选择，生成完整的数据库设计和交互文档体系

**使用场景**：
- 基于分析文档生成数据库设计
- 微信云开发技术栈集成
- 完整技术架构设计
- 交互说明文档生成

**生成内容**：
1. 业务流程图.md - 可视化用户操作全链路
2. 系统架构图.md - 完整的技术架构设计
3. 数据字典.md - 数据库表结构和字段定义
4. 交互说明文档.md - 页面操作流程和异常处理

**技术栈支持**：
- 前端：原生微信小程序或uniapp跨端框架
- 后端：微信云开发（云函数+文档数据库+云存储）

### db - 数据库设计器

**功能描述**：智能分析项目需求并生成完整的数据库设计方案

**使用场景**：
- 数据库架构设计
- API接口规范制定
- 数据模型关系梳理
- 性能优化策略制定

**支持数据库类型**：
- MySQL - 关系型数据库，适合传统Web应用
- PostgreSQL - 功能强大的开源关系型数据库
- MongoDB - 文档型NoSQL数据库，适合灵活数据结构
- SQLite - 轻量级嵌入式数据库，适合小型应用

**生成内容**：
1. 数据库概述与选型说明
2. 数据实体分析与表结构设计
3. API接口设计规范
4. 数据模型关系图（Mermaid ER图）
5. 索引优化策略与性能建议
6. 数据安全与权限设计
7. 部署与维护指南

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

### add - 快捷操作添加器

**功能描述**：添加新的快捷操作到.QuickAction.json文件中

**使用场景**：
- 扩展快捷操作功能
- 自定义工作流程
- 团队协作标准化

**功能特性**：
1. 智能冲突检查
2. 配置格式验证
3. 自动更新配置文件
4. 用户确认机制

### 索引文件自动更新工具

**功能描述**：自动根据.QuickAction.json文件生成或更新.QuickAction.index.md索引文档

**使用场景**：
- 修改快捷操作后自动更新索引
- 确保索引文档与配置文件同步
- 批量更新快捷操作描述

**使用方法**：

```bash
# 在项目根目录运行
python .scripts/update_quickaction_index.py
```

**功能特性**：
1. 自动解析.QuickAction.json结构
2. 智能计算每个快捷操作的行号范围
3. 生成标准化的索引文档格式
4. 自动更新最后修改时间和快捷操作总数
5. 提供详细的更新统计信息

**输出示例**：
```
🚀 开始更新 .QuickAction.index.md 文件...
✅ JSON 文件加载成功
✅ 索引内容生成完成
✅ 索引文件保存成功

📊 更新统计:
   - 总快捷操作数: 10
   - 文件位置: .QuickAction.index.md
   - 更新时间: 2025-08-18 22:08:14

📋 快捷操作列表:
   - yd: 59-71行
   - pbase: 72-297行
   - uibase: 298-385行
   ...
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


## 📧 联系我们

**技术支持**：
- 📧 技术问题：发送邮件至 ruhua@candlesmeet.com
- 🐛 Bug 报告：[提交 Issue](https://github.com/candlesmeet/NiceEasyAI/issues)
- 💡 功能建议：[创建 Discussion](https://github.com/candlesmeet/NiceEasyAI/discussions)

### 更新到最新版本

**🔥 要获取NiceEasyAI的最新功能和修复：**

```bash
# 进入NiceEasyAI子模块目录
cd NiceEasyAI
# 拉取最新代码
git pull origin main
# 返回项目根目录并更新子模块引用
cd ..
git add NiceEasyAI
git commit -m "更新NiceEasyAI到最新版本"
git push
```

---

**Made with ❤️ by the NiceEasyAI Team**