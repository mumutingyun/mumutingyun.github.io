@echo off
echo ============================================
echo   Hexo 博客部署脚本
echo   正在生成并部署到 GitHub Pages...
echo ============================================
wsl -d Ubuntu -- bash -c "cd /home/wsluser/blog && hexo clean && hexo generate && hexo deploy"
if %errorlevel% equ 0 (
    echo ============================================
    echo   部署成功！访问 https://mumutingyun.site
    echo ============================================
) else (
    echo ============================================
    echo   部署失败，请检查错误信息
    echo ============================================
)
pause