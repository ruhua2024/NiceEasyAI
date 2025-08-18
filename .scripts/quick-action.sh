#!/bin/bash

# NiceEasyAI 快捷操作脚本
# 使用方法: /// <action> [options]

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# 查找配置文件
find_config_file() {
    local current_dir="$PWD"
    local config_file=""
    
    # 在当前目录及其父目录中查找 NiceEasyAI/.QuickAction.json
    while [[ "$current_dir" != "/" ]]; do
        if [[ -f "$current_dir/NiceEasyAI/.QuickAction.json" ]]; then
            config_file="$current_dir/NiceEasyAI/.QuickAction.json"
            break
        elif [[ -f "$current_dir/.QuickAction.json" ]]; then
            config_file="$current_dir/.QuickAction.json"
            break
        fi
        current_dir="$(dirname "$current_dir")"
    done
    
    echo "$config_file"
}

# 检查依赖
check_dependencies() {
    if ! command -v jq &> /dev/null; then
        echo -e "${YELLOW}警告: 未找到 jq 工具，将使用 Python 解析 JSON${NC}"
        if ! command -v python3 &> /dev/null && ! command -v python &> /dev/null; then
            echo -e "${RED}错误: 需要安装 jq 或 Python 来解析 JSON 文件${NC}"
            echo "安装 jq: brew install jq (macOS) 或 apt-get install jq (Ubuntu)"
            exit 1
        fi
    fi
}

# 使用 Python 解析 JSON（备选方案）
parse_json_with_python() {
    local json_file="$1"
    local query="$2"
    
    python3 -c "
import json
import sys

try:
    with open('$json_file', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    if '$query' == 'list_actions':
        actions = data.get('QuickAction', {})
        for action in actions.keys():
            print(action)
    elif '$query' == 'get_description':
        action = sys.argv[1] if len(sys.argv) > 1 else ''
        actions = data.get('QuickAction', {})
        if action in actions:
            desc = actions[action].get('description', '无描述')
            print(desc)
        else:
            print('未找到该快捷操作')
    elif '$query' == 'check_action':
        action = sys.argv[1] if len(sys.argv) > 1 else ''
        actions = data.get('QuickAction', {})
        if action in actions:
            print('exists')
        else:
            print('not_found')
except Exception as e:
    print(f'解析错误: {e}', file=sys.stderr)
    sys.exit(1)
" "$3" 2>/dev/null
}

# 获取快捷操作列表
get_action_list() {
    local config_file="$1"
    
    if command -v jq &> /dev/null; then
        jq -r '.QuickAction | keys[]' "$config_file" 2>/dev/null
    else
        parse_json_with_python "$config_file" "list_actions"
    fi
}

# 获取快捷操作描述
get_action_description() {
    local config_file="$1"
    local action="$2"
    
    if command -v jq &> /dev/null; then
        jq -r ".QuickAction.\"$action\".description // \"未找到该快捷操作\"" "$config_file" 2>/dev/null
    else
        parse_json_with_python "$config_file" "get_description" "$action"
    fi
}

# 检查快捷操作是否存在
check_action_exists() {
    local config_file="$1"
    local action="$2"
    
    if command -v jq &> /dev/null; then
        local result=$(jq -r ".QuickAction.\"$action\" // empty" "$config_file" 2>/dev/null)
        [[ -n "$result" ]] && echo "exists" || echo "not_found"
    else
        parse_json_with_python "$config_file" "check_action" "$action"
    fi
}

# 复制到剪贴板
copy_to_clipboard() {
    local text="$1"
    
    if command -v pbcopy &> /dev/null; then
        # macOS
        echo "$text" | pbcopy
        echo -e "${GREEN}✓ 已复制到剪贴板${NC}"
    elif command -v xclip &> /dev/null; then
        # Linux with xclip
        echo "$text" | xclip -selection clipboard
        echo -e "${GREEN}✓ 已复制到剪贴板${NC}"
    elif command -v xsel &> /dev/null; then
        # Linux with xsel
        echo "$text" | xsel --clipboard --input
        echo -e "${GREEN}✓ 已复制到剪贴板${NC}"
    else
        echo -e "${YELLOW}警告: 无法复制到剪贴板，请手动复制以下内容:${NC}"
        echo -e "${CYAN}$text${NC}"
    fi
}

# 显示帮助信息
show_help() {
    echo -e "${BLUE}=== NiceEasyAI 快捷操作工具 ===${NC}"
    echo ""
    echo -e "${YELLOW}使用方法:${NC}"
    echo "  /// <action>           执行快捷操作"
    echo "  /// copy <action>      复制快捷操作命令到剪贴板"
    echo "  /// list               显示所有可用的快捷操作"
    echo "  /// help               显示此帮助信息"
    echo ""
    echo -e "${YELLOW}示例:${NC}"
    echo "  /// pbase              输出 pbase 快捷操作命令"
    echo "  /// copy pbase         复制 pbase 命令到剪贴板"
    echo "  /// list               列出所有快捷操作"
    echo ""
    echo -e "${YELLOW}支持的快捷操作:${NC}"
    
    local config_file=$(find_config_file)
    if [[ -n "$config_file" ]]; then
        local actions=$(get_action_list "$config_file")
        while IFS= read -r action; do
            if [[ -n "$action" ]]; then
                local desc=$(get_action_description "$config_file" "$action")
                echo -e "  ${GREEN}$action${NC} - $desc"
            fi
        done <<< "$actions"
    else
        echo -e "${RED}  错误: 找不到配置文件${NC}"
    fi
}

# 显示快捷操作列表
show_action_list() {
    local config_file="$1"
    
    echo -e "${BLUE}=== 可用的快捷操作 ===${NC}"
    echo ""
    
    local actions=$(get_action_list "$config_file")
    local count=0
    
    while IFS= read -r action; do
        if [[ -n "$action" ]]; then
            local desc=$(get_action_description "$config_file" "$action")
            echo -e "${GREEN}$action${NC}"
            echo -e "  描述: $desc"
            echo -e "  命令: ${CYAN}/// $action${NC}"
            echo -e "  复制: ${CYAN}/// copy $action${NC}"
            echo ""
            ((count++))
        fi
    done <<< "$actions"
    
    echo -e "${PURPLE}总共 $count 个快捷操作${NC}"
}

# 生成快捷操作命令
generate_action_command() {
    local action="$1"
    echo "阅读NiceEasyAI/.QuickAction.index.md，执行${action}快捷操作"
}

# 主函数
main() {
    check_dependencies
    
    local config_file=$(find_config_file)
    
    if [[ -z "$config_file" ]]; then
        echo -e "${RED}错误: 找不到 .QuickAction.json 配置文件${NC}"
        echo "请确保在包含 NiceEasyAI 目录的项目中运行此命令"
        exit 1
    fi
    
    if [[ $# -eq 0 ]]; then
        show_help
        exit 0
    fi
    
    local command="$1"
    
    case "$command" in
        "help"|"-h"|"--help")
            show_help
            ;;
        "list"|"-l"|"--list")
            show_action_list "$config_file"
            ;;
        "copy")
            if [[ $# -lt 2 ]]; then
                echo -e "${RED}错误: copy 命令需要指定快捷操作名称${NC}"
                echo "使用方法: /// copy <action>"
                exit 1
            fi
            
            local action="$2"
            local exists=$(check_action_exists "$config_file" "$action")
            
            if [[ "$exists" == "exists" ]]; then
                local cmd=$(generate_action_command "$action")
                copy_to_clipboard "$cmd"
            else
                echo -e "${RED}错误: 快捷操作 '$action' 不存在${NC}"
                echo "使用 '/// list' 查看所有可用的快捷操作"
                exit 1
            fi
            ;;
        *)
            local action="$command"
            local exists=$(check_action_exists "$config_file" "$action")

            if [[ "$exists" == "exists" ]]; then
                local cmd=$(generate_action_command "$action")
                # 直接复制到剪贴板，提供更好的用户体验
                copy_to_clipboard "$cmd"
                echo -e "${BLUE}快捷操作: ${GREEN}$action${NC}"
                echo -e "${CYAN}$cmd${NC}"
            else
                echo -e "${RED}错误: 快捷操作 '$action' 不存在${NC}"
                echo ""
                echo -e "${YELLOW}可用的快捷操作:${NC}"
                local actions=$(get_action_list "$config_file")
                while IFS= read -r available_action; do
                    if [[ -n "$available_action" ]]; then
                        echo -e "  ${GREEN}$available_action${NC}"
                    fi
                done <<< "$actions"
                echo ""
                echo "使用 '/// list' 查看详细信息"
                exit 1
            fi
            ;;
    esac
}

# 运行主函数
main "$@"
