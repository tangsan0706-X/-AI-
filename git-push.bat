@echo off
chcp 65001 >nul
echo ================================
echo   先筹AI - Git 快速提交工具
echo ================================
echo.

REM 显示修改的文件
echo [1/4] 检查修改的文件...
git status -s
echo.

REM 添加所有修改
echo [2/4] 添加修改到暂存区...
git add .
echo.

REM 输入提交信息
set /p message="[3/4] 请输入提交描述: "
if "%message%"=="" (
    echo 错误: 提交描述不能为空！
    pause
    exit /b 1
)

REM 提交
git commit -m "%message%"
echo.

REM 推送到 GitHub
echo [4/4] 推送到 GitHub...
git push
echo.

if %errorlevel%==0 (
    echo ✅ 成功推送到 GitHub！
) else (
    echo ❌ 推送失败，请检查网络或权限
)

echo.
pause
