@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

set WIN_VAULT=D:\obsidian\obsidian-vault
set WSL_SOURCE=\\wsl.localhost\Ubuntu\home\wsluser\blog\source

:: 如果是命令行传参（带 pull 或直接 push），跳过菜单
if /I "%1"=="pull" goto :pull
if /I "%1"=="push" goto :push_default
if not "%1"=="" (
    set "COMMIT_MSG=%~1"
    goto :push
)

:: 无参数双击 → 显示菜单
:menu
echo.
echo ============================================
echo   Obsidian 同步脚本
echo ============================================
echo   [1] push - 同步到 WSL 并发布到网站
echo   [2] pull - 从 WSL 拉取最新内容到 Obsidian
echo ============================================
set /p CHOICE="请输入选项 (1 或 2，直接回车默认 push)："
if "%CHOICE%"=="2" goto :pull
if "%CHOICE%"=="1" goto :push_default
if "%CHOICE%"=="" goto :push_default
echo 无效选项，请重新输入。
goto :menu

:push_default
set COMMIT_MSG=更新笔记
echo.
set /p COMMIT_MSG="请输入 commit 信息（直接回车则使用默认"更新笔记"）："
if "!COMMIT_MSG!"=="" set COMMIT_MSG=更新笔记
goto :push

:push
echo ============================================
echo   推送：Windows Obsidian Vault → WSL source/
echo ============================================
robocopy "%WIN_VAULT%" "%WSL_SOURCE%" /E /XO /XD ".obsidian" /NJH /NJS /NP
echo 同步完成。
echo.
echo ============================================
echo   正在发布到网站（git push → Cloudflare 自动构建）...
echo   Commit: "!COMMIT_MSG!"
echo ============================================
wsl -d Ubuntu -- bash -c "cd /home/wsluser/blog && git add -A && git commit -m \"!COMMIT_MSG!\" && git push origin main"
if !errorlevel! equ 0 (
    echo ============================================
    echo   发布成功！Cloudflare 正在构建，1-2 分钟后生效
    echo   访问 https://mumutingyun.site
    echo ============================================
) else (
    echo ============================================
    echo   发布失败，请检查 Git 是否配置正确
    echo   提示：在 WSL 终端运行 git push origin main 看错误详情
    echo ============================================
)
goto :end

:pull
echo ============================================
echo   拉取：WSL source/ → Windows Obsidian Vault
echo ============================================
robocopy "%WSL_SOURCE%" "%WIN_VAULT%" /E /XO /XD ".obsidian" /NJH /NJS /NP
echo 同步完成。请在 Obsidian 中刷新。
goto :end

:end
pause