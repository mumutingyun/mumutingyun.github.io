@echo off
echo ============================================
echo   博客发布脚本
echo   推送源码到 GitHub → Cloudflare 自动构建
echo ============================================
wsl -d Ubuntu -- bash -c "cd /home/wsluser/blog && git add -A && git commit -m '更新' && git push origin main"
if %errorlevel% equ 0 (
    echo ============================================
    echo   发布成功！Cloudflare 正在构建，1-2 分钟后生效
    echo   访问 https://mumutingyun.site
    echo ============================================
) else (
    echo ============================================
    echo   发布失败，请检查错误信息
    echo ============================================
)
pause