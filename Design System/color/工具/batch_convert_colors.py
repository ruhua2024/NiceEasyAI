#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
批量改造色彩文件脚本
将简单的颜色代码文件转换为标准的 Markdown 格式
"""

import os
import re
import glob
from typing import List, Tuple, Dict

# 预定义的色彩主题和风格
COLOR_THEMES = {
    3: {
        "name": "温暖粉橘色彩体系",
        "style": "温暖舒适、浪漫优雅",
        "features": "以粉色到橘色的渐变色系为主导，搭配深紫灰色作为稳定基调",
        "scenes": "美妆时尚、生活方式、女性向应用、艺术创作平台",
        "concept": "营造温馨浪漫、优雅精致的用户体验",
        "colors": ["珊瑚粉", "蜜桃橘", "玫瑰粉", "紫灰色", "深紫灰"]
    },
    4: {
        "name": "大地暖色色彩体系", 
        "style": "自然温暖、现代复古",
        "features": "以深绿到暖橘的大地色系为主导，体现自然与温暖的完美结合",
        "scenes": "户外运动、旅行应用、美食餐饮、生活服务、环保主题",
        "concept": "营造自然亲和、温暖可靠的用户体验",
        "colors": ["深森绿", "翡翠绿", "金黄色", "暖橘色", "珊瑚橘"]
    },
    5: {
        "name": "紫色梦幻色彩体系",
        "style": "神秘优雅、现代时尚", 
        "features": "以紫色系为主导，从浅紫到深紫的渐变，体现神秘与优雅",
        "scenes": "创意设计、音乐娱乐、高端品牌、艺术平台、夜间模式",
        "concept": "营造神秘优雅、富有创意的用户体验",
        "colors": ["浅薰衣草", "中紫色", "深紫色", "紫灰色", "深紫灰"]
    },
    6: {
        "name": "活力橙色色彩体系",
        "style": "活力四射、青春动感",
        "features": "以橙色系为主导，从浅橙到深橙的活力配色",
        "scenes": "运动健身、青少年应用、游戏娱乐、社交平台、活动推广",
        "concept": "营造充满活力、积极向上的用户体验", 
        "colors": ["浅橙色", "亮橙色", "深橙色", "橙红色", "深红橙"]
    },
    7: {
        "name": "清新蓝绿色彩体系",
        "style": "清新自然、现代简约",
        "features": "以蓝绿色系为主导，体现清新与自然的和谐统一",
        "scenes": "健康医疗、环保科技、教育学习、办公效率、清新主题",
        "concept": "营造清新自然、专业可信的用户体验",
        "colors": ["天空蓝", "青绿色", "薄荷绿", "浅绿色", "深绿色"]
    },
    8: {
        "name": "经典蓝色色彩体系", 
        "style": "专业稳重、经典永恒",
        "features": "以蓝色系为主导，从浅蓝到深蓝的经典配色",
        "scenes": "商务办公、金融服务、企业应用、专业工具、正式场合",
        "concept": "营造专业可信、稳重大气的用户体验",
        "colors": ["浅天蓝", "标准蓝", "深蓝色", "海军蓝", "深海蓝"]
    },
    9: {
        "name": "森林绿色色彩体系",
        "style": "自然生态、健康环保", 
        "features": "以绿色系为主导，体现自然生态与健康环保理念",
        "scenes": "环保应用、健康生活、户外运动、农业科技、自然主题",
        "concept": "营造自然健康、生机勃勃的用户体验",
        "colors": ["浅绿色", "草绿色", "森林绿", "深绿色", "墨绿色"]
    },
    10: {
        "name": "暖色调色彩体系",
        "style": "温暖舒适、亲和友好",
        "features": "以暖色调为主导，营造温馨舒适的视觉感受",
        "scenes": "家居生活、亲子应用、社区服务、温馨主题、舒适体验",
        "concept": "营造温暖亲和、舒适宜人的用户体验",
        "colors": ["暖黄色", "橙黄色", "暖橘色", "浅棕色", "深棕色"]
    },
    11: {
        "name": "暖橘紫色彩体系",
        "style": "温暖神秘、时尚个性",
        "features": "以暖橘色到深紫色的渐变为主导，营造温暖中带有神秘感的独特氛围",
        "scenes": "时尚品牌、艺术设计、个性化应用、创意工作室、高端定制",
        "concept": "营造温暖而神秘、时尚且个性的用户体验",
        "colors": ["暖橘色", "珊瑚红", "深紫色", "深蓝紫", "紫灰色"]
    },
    12: {
        "name": "极简中性色彩体系",
        "style": "极简纯净、现代简约",
        "features": "以接近白色的极浅色调为主导，体现极简主义的纯净美学",
        "scenes": "极简设计、高端品牌、艺术展示、建筑设计、简约生活",
        "concept": "营造纯净简约、高雅脱俗的用户体验",
        "colors": ["象牙白", "浅灰白", "中性灰", "深灰色", "炭灰色"]
    },
    13: {
        "name": "深邃夜色色彩体系",
        "style": "深邃神秘、高端奢华",
        "features": "以深色调为主导，营造神秘高端的夜间氛围",
        "scenes": "夜间模式、高端应用、奢侈品牌、专业工具、暗色主题",
        "concept": "营造深邃神秘、高端专业的用户体验",
        "colors": ["深夜蓝", "暗紫色", "深灰色", "炭黑色", "纯黑色"]
    },
    14: {
        "name": "柔和粉彩色彩体系",
        "style": "柔和甜美、清新可爱",
        "features": "以柔和的粉彩色调为主导，营造甜美清新的视觉感受",
        "scenes": "儿童应用、女性产品、甜品美食、婚庆服务、温馨生活",
        "concept": "营造柔和甜美、清新可爱的用户体验",
        "colors": ["粉嫩色", "浅粉色", "柔和色", "淡彩色", "温柔色"]
    },
    15: {
        "name": "活力彩虹色彩体系",
        "style": "活力四射、多彩缤纷",
        "features": "以多彩明亮的色调组合为主导，展现活力与创意",
        "scenes": "儿童教育、创意设计、娱乐游戏、艺术创作、活动庆典",
        "concept": "营造活力四射、创意无限的用户体验",
        "colors": ["明亮色", "活力色", "彩虹色", "鲜艳色", "动感色"]
    },
    16: {
        "name": "商务专业色彩体系",
        "style": "商务专业、稳重可信",
        "features": "以商务色调为主导，体现专业性和可信度",
        "scenes": "商务办公、企业应用、金融服务、专业咨询、正式场合",
        "concept": "营造商务专业、稳重可信的用户体验",
        "colors": ["商务蓝", "专业灰", "稳重色", "正式色", "权威色"]
    },
    17: {
        "name": "自然大地色彩体系",
        "style": "自然朴实、大地气息",
        "features": "以大地色调为主导，体现自然朴实的生态美学",
        "scenes": "环保应用、自然主题、户外运动、农业科技、生态设计",
        "concept": "营造自然朴实、生态和谐的用户体验",
        "colors": ["大地色", "土壤色", "岩石色", "树木色", "自然色"]
    },
    18: {
        "name": "科技未来色彩体系",
        "style": "科技前卫、未来感强",
        "features": "以科技色调为主导，营造未来感和科技感",
        "scenes": "科技产品、AI应用、未来设计、数字化工具、创新科技",
        "concept": "营造科技前卫、充满未来感的用户体验",
        "colors": ["科技蓝", "电光色", "金属色", "未来色", "数字色"]
    },
    19: {
        "name": "复古怀旧色彩体系",
        "style": "复古怀旧、经典永恒",
        "features": "以复古色调为主导，营造怀旧经典的时代感",
        "scenes": "复古设计、怀旧主题、经典品牌、文化传承、时代回忆",
        "concept": "营造复古怀旧、经典永恒的用户体验",
        "colors": ["复古色", "怀旧色", "经典色", "时代色", "传统色"]
    },
    20: {
        "name": "奢华金属色彩体系",
        "style": "奢华高贵、金属质感",
        "features": "以金属色调为主导，营造奢华高贵的质感体验",
        "scenes": "奢侈品牌、高端产品、珠宝首饰、豪华服务、尊贵体验",
        "concept": "营造奢华高贵、金属质感的用户体验",
        "colors": ["金色", "银色", "铜色", "铂金色", "钛金色"]
    }
}

def parse_color_file(file_path: str) -> Tuple[List[str], List[str]]:
    """解析颜色文件，提取HEX和RGB值"""
    hex_colors = []
    rgb_colors = []
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 提取HEX颜色
    hex_pattern = r'#[A-Fa-f0-9]{6}'
    hex_matches = re.findall(hex_pattern, content)
    hex_colors = hex_matches[:5]  # 只取前5个
    
    # 提取RGB颜色
    rgb_pattern = r'rgb\(\s*(\d+),\s*(\d+),\s*(\d+)\s*\)'
    rgb_matches = re.findall(rgb_pattern, content)
    rgb_colors = [f"rgb({r}, {g}, {b})" for r, g, b in rgb_matches[:5]]
    
    return hex_colors, rgb_colors

def get_color_characteristics(hex_color: str, color_name: str) -> Dict[str, str]:
    """根据颜色生成特性描述"""
    # 简化的颜色特性映射
    color_traits = {
        "粉": {"traits": "温柔、浪漫、亲和", "emotion": "温馨、甜美、舒适"},
        "橘": {"traits": "活力、温暖、友好", "emotion": "热情、积极、愉悦"},
        "红": {"traits": "热情、醒目、强烈", "emotion": "激情、力量、重要"},
        "黄": {"traits": "明亮、活泼、温暖", "emotion": "快乐、希望、活力"},
        "绿": {"traits": "自然、平和、清新", "emotion": "安全、成长、和谐"},
        "蓝": {"traits": "冷静、专业、可信", "emotion": "安全、稳定、理性"},
        "紫": {"traits": "神秘、优雅、创意", "emotion": "高贵、想象、神秘"},
        "灰": {"traits": "中性、稳重、平衡", "emotion": "沉稳、专业、低调"},
        "棕": {"traits": "稳重、自然、温暖", "emotion": "可靠、舒适、传统"}
    }
    
    # 根据颜色名称匹配特性
    for key, traits in color_traits.items():
        if key in color_name:
            return traits
    
    # 默认特性
    return {"traits": "平衡、和谐、适中", "emotion": "舒适、自然、稳定"}

def generate_markdown_content(file_num: int, hex_colors: List[str], rgb_colors: List[str]) -> str:
    """生成Markdown内容"""
    
    if file_num not in COLOR_THEMES:
        # 生成默认主题
        theme = {
            "name": f"配色方案{file_num}",
            "style": "现代简约、平衡和谐",
            "features": "精心搭配的色彩组合，体现现代设计美学",
            "scenes": "通用应用、现代界面、简约设计",
            "concept": "营造和谐统一、现代简约的用户体验",
            "colors": [f"颜色{i+1}" for i in range(5)]
        }
    else:
        theme = COLOR_THEMES[file_num]
    
    # 确保有5个颜色
    while len(hex_colors) < 5:
        hex_colors.append("#CCCCCC")
    while len(rgb_colors) < 5:
        rgb_colors.append("rgb(204, 204, 204)")
    while len(theme["colors"]) < 5:
        theme["colors"].append(f"颜色{len(theme['colors'])+1}")
    
    markdown_content = f"""# {theme["name"]} - 核心5色配色方案

## 设计风格描述

- **整体风格**：{theme["style"]}
- **色彩特点**：{theme["features"]}
- **适用场景**：{theme["scenes"]}
- **设计理念**：{theme["concept"]}

## 核心色彩体系（5色）

### 1. 主色调（Primary Color）- {theme["colors"][0]}

- **说明**：应用中最核心、出现频率最高的颜色，代表品牌形象
- **HEX**：`{hex_colors[0]}`
- **RGB**：`{rgb_colors[0]}`
- **色彩特性**：{get_color_characteristics(hex_colors[0], theme["colors"][0])["traits"]}
- **情感表达**：{get_color_characteristics(hex_colors[0], theme["colors"][0])["emotion"]}
- **应用场景**：主导航栏、重要按钮、品牌标识、主标题

### 2. 辅助色（Secondary Color）- {theme["colors"][1]}

- **说明**：配合主色调使用，用于强调次要交互元素
- **HEX**：`{hex_colors[1]}`
- **RGB**：`{rgb_colors[1]}`
- **色彩特性**：{get_color_characteristics(hex_colors[1], theme["colors"][1])["traits"]}
- **情感表达**：{get_color_characteristics(hex_colors[1], theme["colors"][1])["emotion"]}
- **应用场景**：次要按钮、标签页、进度条、图标

### 3. 强调色（Accent Color）- {theme["colors"][2]}

- **说明**：用于突出关键信息或引导用户注意的颜色
- **HEX**：`{hex_colors[2]}`
- **RGB**：`{rgb_colors[2]}`
- **色彩特性**：{get_color_characteristics(hex_colors[2], theme["colors"][2])["traits"]}
- **情感表达**：{get_color_characteristics(hex_colors[2], theme["colors"][2])["emotion"]}
- **应用场景**：重要通知、状态提示、特殊按钮、强调元素

### 4. 中性色1（Neutral - Light）- {theme["colors"][3]}

- **说明**：偏浅的中性色，用于背景、分割线、次要文本等
- **HEX**：`{hex_colors[3]}`
- **RGB**：`{rgb_colors[3]}`
- **色彩特性**：{get_color_characteristics(hex_colors[3], theme["colors"][3])["traits"]}
- **情感表达**：{get_color_characteristics(hex_colors[3], theme["colors"][3])["emotion"]}
- **应用场景**：页面背景、卡片背景、输入框背景、浅色分割线

### 5. 中性色2（Neutral - Dark）- {theme["colors"][4]}

- **说明**：偏深的中性色，用于主要文本、图标、边框等
- **HEX**：`{hex_colors[4]}`
- **RGB**：`{rgb_colors[4]}`
- **色彩特性**：{get_color_characteristics(hex_colors[4], theme["colors"][4])["traits"]}
- **情感表达**：{get_color_characteristics(hex_colors[4], theme["colors"][4])["emotion"]}
- **应用场景**：主要文字、图标、边框、次要信息文本"""
    
    return markdown_content

def add_remaining_sections(content: str, hex_colors: List[str]) -> str:
    """添加剩余的标准章节"""
    
    remaining_sections = f"""
## 色彩搭配示例与应用场景

### 主要配色组合示例

#### 1. 主导配色（Primary Combination）
- **组合**：主色 + 辅助色：`{hex_colors[0]}` + `{hex_colors[1]}`
- **效果**：专业协调，层次分明，适合主要功能区域
- **示例**：导航栏、主要按钮组、标题区域

#### 2. 对比配色（Contrast Combination）
- **组合**：主色 + 强调色：`{hex_colors[0]}` + `{hex_colors[2]}`
- **效果**：强烈对比，突出重要信息，引导用户操作
- **示例**：重要通知、CTA按钮、状态提示

#### 3. 和谐配色（Harmonious Combination）
- **组合**：辅助色 + 中性色：`{hex_colors[1]}` + `{hex_colors[3]}`
- **效果**：柔和自然，舒适阅读，适合内容展示
- **示例**：内容区域、卡片设计、表单元素

#### 4. 平衡配色（Balanced Combination）
- **组合**：强调色 + 中性色：`{hex_colors[2]}` + `{hex_colors[4]}`
- **效果**：平衡稳定，既有重点又不失和谐
- **示例**：信息展示、数据可视化、状态指示

### 界面元素配色示例

#### 按钮设计
- **主要按钮**：背景 `{hex_colors[0]}`，文字 `#FFFFFF`
- **次要按钮**：背景 `{hex_colors[1]}`，文字 `#FFFFFF`
- **强调按钮**：背景 `{hex_colors[2]}`，文字 `#FFFFFF`
- **禁用按钮**：背景 `{hex_colors[4]}`，文字 `#FFFFFF`

#### 文字层级
- **主标题**：`{hex_colors[0]}`
- **副标题**：`{hex_colors[1]}`
- **正文**：`#666666`（深灰）
- **次要文字**：`{hex_colors[4]}`
- **提示文字**：`#999999`（浅灰）

#### 状态指示
- **成功状态**：`{hex_colors[1]}`
- **警告状态**：`#FFB800`（橙黄）
- **错误状态**：`#FF4757`（红色）
- **信息状态**：`{hex_colors[0]}`

## 原始颜色代码快速参考

### HEX 代码
```
{hex_colors[0]}  // 主色
{hex_colors[1]}  // 辅助色
{hex_colors[2]}  // 强调色
{hex_colors[3]}  // 中性浅色
{hex_colors[4]}  // 中性深色
```

### RGB 代码
```
{', '.join([f'rgb({hex_colors[i][1:3]}, {hex_colors[i][3:5]}, {hex_colors[i][5:7]})' if len(hex_colors[i]) == 7 else 'rgb(204, 204, 204)' for i in range(5)])}
```

## 无障碍设计与对比度指南

### 对比度检查（WCAG 2.1 标准）
- 主色 `{hex_colors[0]}` vs 白色：建议进行对比度测试
- 辅助色 `{hex_colors[1]}` vs 白色：建议进行对比度测试
- 强调色 `{hex_colors[2]}` vs 白色：建议进行对比度测试
- 中性色 `{hex_colors[4]}` vs 深色文字：建议进行对比度测试

### 建议文字搭配
- ✅ 白色背景 + `{hex_colors[0]}` 文字
- ✅ `{hex_colors[3]}` 背景 + `{hex_colors[0]}` 文字
- ✅ `{hex_colors[1]}` 背景 + 白色文字
- ✅ `{hex_colors[2]}` 背景 + 白色文字

## 使用指南与最佳实践

### 色彩使用原则

#### 1. 60-30-10 法则
- **60%**：中性色作为主要背景色（`{hex_colors[3]}`, 白色）
- **30%**：主色调作为次要色彩（`{hex_colors[0]}`）
- **10%**：强调色作为点缀色（`{hex_colors[2]}`, `{hex_colors[1]}`）

#### 2. 功能性用色
- **导航**：主色 `{hex_colors[0]}`
- **交互**：辅助色 `{hex_colors[1]}`
- **强调**：强调色 `{hex_colors[2]}`
- **背景**：中性色 `{hex_colors[3]}`

#### 3. 情感化设计
- **主要情感**：通过主色 `{hex_colors[0]}` 传达
- **辅助情感**：通过辅助色 `{hex_colors[1]}` 支撑
- **重点强调**：适度使用强调色 `{hex_colors[2]}`

### 避免事项
- ❌ 不要在小面积使用过多强调色
- ❌ 避免相似颜色在相邻元素中使用
- ❌ 不要忽视色盲用户的使用体验
- ❌ 避免纯色大面积使用，建议加入透明度

## 扩展色彩（可选补充色）

### 基于主色系的扩展色
- **主色变体**：在 `{hex_colors[0]}` 基础上调整明度和饱和度
- **辅助色变体**：在 `{hex_colors[1]}` 基础上创建深浅变化
- **强调色变体**：在 `{hex_colors[2]}` 基础上生成相近色调

### 灰度系统（用于文字和边框）
- `#333333`（主要文字）
- `#666666`（次要文字）
- `#999999`（辅助文字）
- `#CCCCCC`（边框线）
- `#F5F5F5`（浅色背景）

## CSS 变量定义示例

```css
:root {{
  /* 主色系 */
  --primary-color: {hex_colors[0]};
  --secondary-color: {hex_colors[1]};
  --accent-color: {hex_colors[2]};
  --neutral-light: {hex_colors[3]};
  --neutral-dark: {hex_colors[4]};

  /* 功能色 */
  --success-color: var(--secondary-color);
  --warning-color: #FFB800;
  --error-color: #FF4757;
  --info-color: var(--primary-color);

  /* 文字色 */
  --text-primary: #333333;
  --text-secondary: #666666;
  --text-tertiary: #999999;
  --text-disabled: #CCCCCC;

  /* 背景色 */
  --bg-primary: #FFFFFF;
  --bg-secondary: var(--neutral-light);
  --bg-tertiary: #F5F5F5;
}}
```"""
    
    return content + remaining_sections

def convert_color_file(input_file: str, output_file: str, file_num: int):
    """转换单个颜色文件"""
    try:
        # 解析原始文件
        hex_colors, rgb_colors = parse_color_file(input_file)
        
        if not hex_colors:
            print(f"警告: {input_file} 中未找到有效的颜色代码")
            return False
        
        # 生成Markdown内容
        content = generate_markdown_content(file_num, hex_colors, rgb_colors)
        content = add_remaining_sections(content, hex_colors)
        
        # 写入输出文件
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✅ 成功转换: {input_file} -> {output_file}")
        return True
        
    except Exception as e:
        print(f"❌ 转换失败 {input_file}: {str(e)}")
        return False

def main():
    """主函数"""
    print("🎨 开始批量转换色彩文件...")

    # 获取所有需要转换的txt文件
    txt_files = glob.glob("搭配色颜色代码*.txt")
    txt_files.sort()
    
    success_count = 0
    total_count = len(txt_files)
    
    for txt_file in txt_files:
        # 提取文件编号
        match = re.search(r'搭配色颜色代码(\d+)\.txt', txt_file)
        if not match:
            continue
            
        file_num = int(match.group(1))
        
        # 生成输出文件名
        output_file = txt_file.replace('.txt', '.md')
        
        # 转换文件
        if convert_color_file(txt_file, output_file, file_num):
            success_count += 1
            # 删除原始txt文件
            try:
                os.remove(txt_file)
                print(f"🗑️  删除原文件: {txt_file}")
            except:
                print(f"⚠️  无法删除原文件: {txt_file}")
    
    print(f"\n🎉 批量转换完成!")
    print(f"📊 成功转换: {success_count}/{total_count} 个文件")
    print(f"📁 输出目录: color/")

if __name__ == "__main__":
    main()
