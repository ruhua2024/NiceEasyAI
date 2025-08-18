#!/bin/bash

# NiceEasyAI 快捷操作卸载脚本

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== NiceEasyAI 快捷操作卸载程序 ===${NC}"
echo ""

# 检测 shell 类型
detect_shell() {
    if [[ -n "$ZSH_VERSION" ]]; then
        echo "zsh"
    elif [[ -n "$BASH_VERSION" ]]; then
        echo "bash"
    else
        echo "unknown"
    fi
}

# 获取配置文件路径
get_config_file() {
    local shell_type="$1"
    
    case "$shell_type" in
        "zsh")
            if [[ -f "$HOME/.zshrc" ]]; then
                echo "$HOME/.zshrc"
            fi
            ;;
        "bash")
            if [[ -f "$HOME/.bashrc" ]]; then
                echo "$HOME/.bashrc"
            elif [[ -f "$HOME/.bash_profile" ]]; then
                echo "$HOME/.bash_profile"
            fi
            ;;
        *)
            echo ""
            ;;
    esac
}

# 检查是否已安装
check_installation() {
    local config_file="$1"
    
    if [[ -f "$config_file" ]] && grep -q "# NiceEasyAI Quick Actions" "$config_file"; then
        return 0  # 已安装
    else
        return 1  # 未安装
    fi
}

# 移除配置
remove_configuration() {
    local config_file="$1"
    
    if [[ ! -f "$config_file" ]]; then
        echo -e "${RED}错误: 配置文件不存在: $config_file${NC}"
        return 1
    fi
    
    # 创建备份
    local backup_file="${config_file}.backup.$(date +%Y%m%d_%H%M%S)"
    cp "$config_file" "$backup_file"
    echo -e "${YELLOW}已创建备份: $backup_file${NC}"
    
    # 移除 NiceEasyAI 相关配置
    # 从 "# NiceEasyAI Quick Actions" 开始到下一个非空行之前的所有内容
    sed -i.tmp '/# NiceEasyAI Quick Actions/,/^$/d' "$config_file"
    rm -f "${config_file}.tmp"
    
    echo -e "${GREEN}✓ 已从配置文件中移除 NiceEasyAI 快捷操作${NC}"
}

# 主卸载函数
main() {
    echo -e "${YELLOW}正在检测安装状态...${NC}"
    
    # 检测 shell
    local shell_type=$(detect_shell)
    echo "检测到 Shell: $shell_type"
    
    if [[ "$shell_type" == "unknown" ]]; then
        echo -e "${RED}错误: 无法检测 Shell 类型${NC}"
        exit 1
    fi
    
    # 获取配置文件
    local config_file=$(get_config_file "$shell_type")
    
    if [[ -z "$config_file" ]]; then
        echo -e "${RED}错误: 找不到配置文件${NC}"
        exit 1
    fi
    
    echo "配置文件: $config_file"
    
    # 检查是否已安装
    if ! check_installation "$config_file"; then
        echo -e "${YELLOW}未检测到 NiceEasyAI 快捷操作安装${NC}"
        echo "可能已经卸载或从未安装"
        exit 0
    fi
    
    # 确认卸载
    echo -e "${YELLOW}确定要卸载 NiceEasyAI 快捷操作吗? (y/N)${NC}"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        echo "卸载已取消"
        exit 0
    fi
    
    # 执行卸载
    echo -e "${YELLOW}正在卸载...${NC}"
    remove_configuration "$config_file"
    
    echo -e "${GREEN}✓ 卸载完成！${NC}"
    echo ""
    echo -e "${YELLOW}注意事项:${NC}"
    echo "1. 配置文件备份已保存"
    echo "2. 需要重新加载配置或重新打开终端使更改生效"
    echo "3. 脚本文件仍保留在 scripts/ 目录中"
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

# 运行主函数
main "$@"
