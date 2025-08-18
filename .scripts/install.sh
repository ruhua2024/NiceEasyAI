#!/bin/bash

# NiceEasyAI 快捷操作安装脚本

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 获取脚本所在目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo -e "${BLUE}=== NiceEasyAI 快捷操作安装程序 ===${NC}"
echo ""

# 检测 shell 类型
detect_shell() {
    # 优先检测用户的默认 shell
    local user_shell=$(basename "$SHELL")

    case "$user_shell" in
        "zsh")
            echo "zsh"
            ;;
        "bash")
            echo "bash"
            ;;
        *)
            # 如果无法从 $SHELL 确定，则检测当前环境
            if [[ -n "$ZSH_VERSION" ]]; then
                echo "zsh"
            elif [[ -n "$BASH_VERSION" ]]; then
                echo "bash"
            else
                echo "unknown"
            fi
            ;;
    esac
}

# 获取配置文件路径
get_config_file() {
    local shell_type="$1"
    
    case "$shell_type" in
        "zsh")
            if [[ -f "$HOME/.zshrc" ]]; then
                echo "$HOME/.zshrc"
            else
                echo "$HOME/.zshrc"
            fi
            ;;
        "bash")
            if [[ -f "$HOME/.bashrc" ]]; then
                echo "$HOME/.bashrc"
            elif [[ -f "$HOME/.bash_profile" ]]; then
                echo "$HOME/.bash_profile"
            else
                echo "$HOME/.bashrc"
            fi
            ;;
        *)
            echo ""
            ;;
    esac
}

# 检查是否已安装
check_existing_installation() {
    local config_file="$1"
    
    if [[ -f "$config_file" ]] && grep -q "# NiceEasyAI Quick Actions" "$config_file"; then
        return 0  # 已安装
    else
        return 1  # 未安装
    fi
}

# 生成 shell 函数
generate_shell_function() {
    local script_path="$1"
    
    cat << EOF

# NiceEasyAI Quick Actions
# 自动生成于 $(date)
function ///() {
    local script_path="$script_path"
    if [[ -f "\$script_path" ]]; then
        bash "\$script_path" "\$@"
    else
        echo "错误: 找不到 NiceEasyAI 快捷操作脚本"
        echo "脚本路径: \$script_path"
        echo "请重新运行安装程序"
    fi
}

# 命令补全
if [[ -n "\$ZSH_VERSION" ]]; then
    # Zsh 补全
    _quick_action_completion() {
        local -a actions
        local config_file=\$(find . -name ".QuickAction.json" -path "*/NiceEasyAI/*" -o -name ".QuickAction.json" -maxdepth 1 | head -1)
        
        if [[ -n "\$config_file" ]] && command -v jq &> /dev/null; then
            actions=(\$(jq -r '.QuickAction | keys[]' "\$config_file" 2>/dev/null))
            actions+=(help list copy)
            _describe 'quick actions' actions
        fi
    }
    compdef _quick_action_completion ///
elif [[ -n "\$BASH_VERSION" ]]; then
    # Bash 补全
    _quick_action_completion() {
        local cur="\${COMP_WORDS[COMP_CWORD]}"
        local config_file=\$(find . -name ".QuickAction.json" -path "*/NiceEasyAI/*" -o -name ".QuickAction.json" -maxdepth 1 | head -1)
        
        if [[ -n "\$config_file" ]] && command -v jq &> /dev/null; then
            local actions=\$(jq -r '.QuickAction | keys[]' "\$config_file" 2>/dev/null)
            actions="\$actions help list copy"
            COMPREPLY=(\$(compgen -W "\$actions" -- "\$cur"))
        fi
    }
    complete -F _quick_action_completion ///
fi

EOF
}

# 主安装函数
main() {
    echo -e "${YELLOW}正在检测系统环境...${NC}"
    
    # 检测 shell
    local shell_type=$(detect_shell)
    echo "检测到 Shell: $shell_type"
    
    if [[ "$shell_type" == "unknown" ]]; then
        echo -e "${RED}错误: 无法检测 Shell 类型${NC}"
        echo "请手动配置或联系技术支持"
        exit 1
    fi
    
    # 获取配置文件
    local config_file=$(get_config_file "$shell_type")
    echo "配置文件: $config_file"
    
    # 检查是否已安装
    if check_existing_installation "$config_file"; then
        echo -e "${YELLOW}检测到已有安装，是否重新安装? (y/N)${NC}"
        read -r response
        if [[ ! "$response" =~ ^[Yy]$ ]]; then
            echo "安装已取消"
            exit 0
        fi
        
        # 移除旧的安装
        echo -e "${YELLOW}正在移除旧的配置...${NC}"
        if [[ -f "$config_file" ]]; then
            # 创建备份
            cp "$config_file" "${config_file}.backup.$(date +%Y%m%d_%H%M%S)"
            
            # 移除旧的配置（从 # NiceEasyAI Quick Actions 到下一个空行或文件结尾）
            sed -i.tmp '/# NiceEasyAI Quick Actions/,/^$/d' "$config_file"
            rm -f "${config_file}.tmp"
        fi
    fi
    
    # 设置脚本执行权限
    echo -e "${YELLOW}正在设置脚本权限...${NC}"
    chmod +x "$SCRIPT_DIR/quick-action.sh"
    
    # 生成并添加 shell 函数
    echo -e "${YELLOW}正在添加 shell 函数...${NC}"
    local script_path="$SCRIPT_DIR/quick-action.sh"
    local shell_function=$(generate_shell_function "$script_path")
    
    echo "$shell_function" >> "$config_file"
    
    echo -e "${GREEN}✓ 安装完成！${NC}"
    echo ""
    echo -e "${YELLOW}使用方法:${NC}"
    echo "1. 重新加载配置: source $config_file"
    echo "2. 或者重新打开终端"
    echo "3. 使用命令: /// help"
    echo ""
    echo -e "${YELLOW}示例命令:${NC}"
    echo "  /// list          # 显示所有快捷操作"
    echo "  /// pbase         # 执行 pbase 快捷操作"
    echo "  /// copy pbase    # 复制 pbase 命令到剪贴板"
    echo ""
    
    # 询问是否立即重新加载配置
    echo -e "${YELLOW}是否立即重新加载配置? (Y/n)${NC}"
    read -r response
    if [[ "$response" =~ ^[Nn]$ ]]; then
        echo "请手动运行: source $config_file"
    else
        echo -e "${YELLOW}正在重新加载配置...${NC}"
        if [[ "$shell_type" == "zsh" ]]; then
            exec zsh
        elif [[ "$shell_type" == "bash" ]]; then
            exec bash
        fi
    fi
}

# 检查是否在正确的目录中运行
if [[ ! -f "$PROJECT_DIR/.QuickAction.json" ]]; then
    echo -e "${RED}错误: 请在 NiceEasyAI 项目根目录中运行此脚本${NC}"
    echo "当前目录: $PWD"
    echo "项目目录: $PROJECT_DIR"
    exit 1
fi

# 运行主函数
main "$@"
