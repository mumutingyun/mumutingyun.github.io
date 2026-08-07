#!/bin/bash
set -e
echo "=== Git 当前分支 ==="
git branch --show-current
echo ""
echo "=== 未追踪/有改动的文件 ==="
git status --short
echo ""
echo "=== 切换到 source 分支 ==="
git checkout -b source 2>/dev/null || git checkout source
echo "=== 添加所有源码文件 ==="
git add -A
echo "=== 提交 ==="
git commit -m "备份源码：含 VS Code 配置、Obsidian 配置、部署脚本、README" || echo "(没有新的改动，跳过 commit)"
echo "=== 推送到远程 source 分支 ==="
git push origin source
echo "=== 切回 main 分支 ==="
git checkout main
echo ""
echo "完成！source 分支已推送，main 分支留给 hexo deploy。"