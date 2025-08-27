#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
自动更新 .QuickAction.index.md 文件的脚本
基于 .QuickAction.json 的结构化内容生成索引文档
"""

import json
import os
from datetime import datetime
from typing import Dict, List, Tuple, Any

class QuickActionIndexUpdater:
    def __init__(self, json_file: str = ".QuickAction.json", index_file: str = ".QuickAction.index.md"):
        self.json_file = json_file
        self.index_file = index_file
        self.json_content = None
        self.json_lines = []
        
    def load_json_file(self) -> bool:
        """加载并解析 JSON 文件"""
        try:
            with open(self.json_file, 'r', encoding='utf-8') as f:
                self.json_content = json.load(f)
                
            # 同时读取原始文件行内容，用于计算行号
            with open(self.json_file, 'r', encoding='utf-8') as f:
                self.json_lines = f.readlines()
                
            return True
        except Exception as e:
            print(f"❌ 加载 JSON 文件失败: {e}")
            return False
    
    def find_line_number(self, search_text: str, start_line: int = 0) -> int:
        """在 JSON 文件中查找指定文本的行号"""
        for i, line in enumerate(self.json_lines[start_line:], start_line):
            if search_text in line:
                return i + 1  # 返回1基索引的行号
        return -1
    
    def get_quickaction_info(self) -> List[Dict[str, Any]]:
        """提取快捷操作信息和行号"""
        if not self.json_content or 'QuickAction' not in self.json_content:
            return []
        
        quickactions = []
        quickaction_section = self.json_content['QuickAction']
        
        # 找到 QuickAction 节的起始行
        quickaction_start = self.find_line_number('"QuickAction": {')
        
        for action_key, action_data in quickaction_section.items():
            # 查找每个快捷操作的起始行
            action_start = self.find_line_number(f'"{action_key}": {{', quickaction_start)
            
            # 查找结束行（下一个快捷操作的开始或节的结束）
            action_keys = list(quickaction_section.keys())
            current_index = action_keys.index(action_key)
            
            if current_index < len(action_keys) - 1:
                # 不是最后一个，找下一个的开始行
                next_action = action_keys[current_index + 1]
                action_end = self.find_line_number(f'"{next_action}": {{', action_start) - 1
            else:
                # 是最后一个，找到 QuickAction 节的结束
                action_end = self.find_line_number('}', action_start)
                # 向后查找真正的结束位置
                brace_count = 0
                for i, line in enumerate(self.json_lines[action_start-1:], action_start-1):
                    for char in line:
                        if char == '{':
                            brace_count += 1
                        elif char == '}':
                            brace_count -= 1
                            if brace_count == 0:
                                action_end = i + 1
                                break
                    if brace_count == 0:
                        break
            
            # 提取描述信息
            description = action_data.get('description', '无描述')
            
            quickactions.append({
                'key': action_key,
                'description': description,
                'start_line': action_start,
                'end_line': action_end,
                'data': action_data
            })
        
        return quickactions
    
    def get_global_settings_info(self) -> Tuple[int, int]:
        """获取全局设置的行号范围"""
        global_start = self.find_line_number('"global_settings": {')
        quickaction_start = self.find_line_number('"QuickAction": {')
        global_end = quickaction_start - 1 if quickaction_start > 0 else len(self.json_lines)
        
        return global_start, global_end
    
    def generate_index_content(self) -> str:
        """生成索引文档内容"""
        quickactions = self.get_quickaction_info()
        global_start, global_end = self.get_global_settings_info()
        
        # 计算总快捷操作数
        total_actions = len(quickactions)
        
        # 生成当前日期
        current_date = datetime.now().strftime("%Y-%m-%d")
        
        content = f"""# .QuickAction.json 快捷操作索引

## 📋 快捷操作概览
本文件包含 **{total_actions}个快捷操作**，涵盖从项目配置到代码生成的完整开发流程。

**📍 文件位置**：`NiceEasyAI/.QuickAction.json`

## 🚀 快速导航

| 快捷指令 | 功能描述 | 位置 |
|---------|---------|------|
"""
        
        # 添加快捷操作表格行
        for action in quickactions:
            content += f"| **{action['key']}** | {action['description']} | {action['start_line']}-{action['end_line']}行 |\n"
        
        content += f"""

## 🔧 全局配置
- **位置**: {global_start}-{global_end}行
- **包含**: 全局设置、核心个性、沟通风格、技术标准、效率规则、问题解决方法

## ⚠️ 面向AI的强制要求
**执行任何快捷操作前必须严格遵守以下要求：**

1. **强制阅读全局配置**：必须完整阅读{global_start}-{global_end}行的全局配置代码，理解所有设置和要求（**例外：yd快捷操作无需阅读全局配置**）

2. **强制阅读目标快捷操作**：必须完整阅读对应快捷操作的所有代码，从开始行到结束行，不得遗漏任何细节

3. **禁止偷懒跳读**：严禁选择性阅读或跳过任何代码段，必须逐行完整理解

4. **禁止臆测执行**：在没有完全理解代码逻辑前，禁止开始执行任何操作

5. **完整理解后执行**：只有在完全理解全局配置和目标快捷操作的全部代码后，才能开始执行

**违反以上要求将导致执行错误或结果不完整！**

**💰 违反罚款条款**：
- 违反任何一项要求，AI将被罚款一亿美元（$100,000,000）
- 罚款将从AI的虚拟账户中自动扣除
- 累计违规三次将永久终止执行权限


---
*最后更新: {current_date}*
*总快捷操作数: {total_actions}个*
"""
        
        return content
    
    def save_index_file(self, content: str) -> bool:
        """保存索引文件"""
        try:
            with open(self.index_file, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        except Exception as e:
            print(f"❌ 保存索引文件失败: {e}")
            return False
    
    def update_index(self) -> bool:
        """执行更新操作"""
        print("🚀 开始更新 .QuickAction.index.md 文件...")
        
        # 1. 加载 JSON 文件
        if not self.load_json_file():
            return False
        print("✅ JSON 文件加载成功")
        
        # 2. 生成索引内容
        content = self.generate_index_content()
        print("✅ 索引内容生成完成")
        
        # 3. 保存索引文件
        if not self.save_index_file(content):
            return False
        print("✅ 索引文件保存成功")
        
        # 4. 显示统计信息
        quickactions = self.get_quickaction_info()
        print(f"\n📊 更新统计:")
        print(f"   - 总快捷操作数: {len(quickactions)}")
        print(f"   - 文件位置: {self.index_file}")
        print(f"   - 更新时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        
        print(f"\n📋 快捷操作列表:")
        for action in quickactions:
            print(f"   - {action['key']}: {action['start_line']}-{action['end_line']}行")
        
        return True

def main():
    """主函数"""
    print("=" * 60)
    print("🔧 QuickAction 索引自动更新工具")
    print("=" * 60)
    
    # 检查文件是否存在
    if not os.path.exists(".QuickAction.json"):
        print("❌ 错误: .QuickAction.json 文件不存在")
        return False
    
    # 创建更新器并执行更新
    updater = QuickActionIndexUpdater()
    success = updater.update_index()
    
    if success:
        print("\n🎉 索引文件更新完成！")
        print("💡 提示: 可以查看 .QuickAction.index.md 文件确认更新结果")
    else:
        print("\n❌ 索引文件更新失败！")
    
    return success

if __name__ == "__main__":
    main()
