# 陈牧图的个人博客（mumutingyun.site）

> 本文档记录项目的完整技术细节，方便在任意聊天窗口快速恢复上下文。

---

## 一、技术概览

| 项目        | 详情 |
|-----------|------|
| **框架** | [Hexo](https://hexo.io/) v8.1.2 |
| **主题** | Landscape（Hexo 默认主题） |
| **代码托管** | GitHub: `mumutingyun/mumutingyun.github.io`，分支 `main` |
| **域名** | `mumutingyun.site`（通过 Cloudflare 绑定到 GitHub Pages） |
| **本地路径** | `/home/wsluser/blog`（WSL Ubuntu） |
| **写作语言** | 中文 (zh-CN) |

---

## 二、Hexo 核心配置 (`_config.yml`)

### 站点信息
- **站点 URL**: `https://mumutingyun.site`
- **永久链接格式**: `:year/:month/:day/:title/`（如 `2026/07/24/示波器学习笔记2/`）

### 关键开关
- **`post_asset_folder: false`** — 没有为每篇文章自动创建同名资源目录，图片统一放在 `source/images/`
- **`relative_link: false`** — 使用绝对路径
- **`skip_render: "admin/*"`** — `source/admin/` 目录下的文件不做渲染（为 Decap CMS 预留）

### 部署
```
deploy:
  type: git
  repo: https://github.com/mumutingyun/mumutingyun.github.io.git
  branch: main
```
执行 `hexo deploy` 会将 `public/` 推送到 GitHub Pages 仓库。

---

## 三、已安装的插件

| 插件 | 用途 |
|-----|------|
| `hexo-deployer-git` | 部署到 GitHub Pages |
| `hexo-admin` | 自带的本地 Web 管理后台（启动 `hexo server` 后访问） |
| `hexo-generator-searchdb` | 生成 `search.json`，支持站内全文搜索 |
| `hexo-generator-feed` | 生成 RSS/Atom 订阅 |
| `hexo-generator-sitemap` | 生成 sitemap.xml |
| `hexo-filter-mathjax` | LaTeX 数学公式渲染 |
| `hexo-filter-mermaid-diagrams` | Mermaid 流程图/时序图渲染 |
| `hexo-renderer-ejs` | EJS 模板引擎 |
| `hexo-renderer-marked` | Markdown 渲染 |
| `hexo-renderer-stylus` | Stylus CSS 预处理器 |

---

## 四、主题 Landscape

**配置文件**: `themes/landscape/_config.yml`

- 导航菜单：Home、Archives、Updates
- 侧边栏：右侧，包含分类/标签/归档/最近文章
- fancybox 灯箱已启用

---

## 五、目录结构

```
blog/
├── _config.yml              # Hexo 主配置
├── package.json
├── .vscode/
│   └── settings.json        # VS Code Paste Image 插件配置
├── deploy.bat               # Windows 一键部署脚本
├── source/
│   ├── .obsidian/           # Obsidian Vault 配置
│   │   ├── app.json
│   │   └── appearance.json
│   ├── _posts/              # 所有文章（Markdown）
│   │   ├── hello-world.md
│   │   ├── 操作指南.md
│   │   ├── 示波器学习笔记1.md
│   │   ├── 示波器学习笔记2.md
│   │   └── 示波器学习笔记3.md
│   ├── images/              # 共用图片目录
│   ├── updates/             # 自定义页面 /updates
│   │   ├── index.html
│   │   └── config.yml       # Decap CMS 配置文件
│   └── admin/               # Decap CMS 入口（跳过渲染）
│       └── index.html
├── themes/landscape/        # 主题文件
├── public/                  # `hexo generate` 生成（deploy 时推送）
└── node_modules/
```

---

## 六、现有文章列表

1. `hello-world.md` — 默认欢迎文章
2. `操作指南.md` — 操作指南
3. `示波器学习笔记1.md` — 采集板与触发机制
4. `示波器学习笔记2.md` — 处理板多板汇聚与传输链路
5. `示波器学习笔记3.md`

所有文章 Front-matter 格式：
```yaml
---
title: 标题
date: YYYY-MM-DD HH:mm:ss
tags: [标签1, 标签2]
---
```

---

## 七、图片管理 ✅（已配置 VS Code Paste Image）

### 当前方案：VS Code Paste Image 插件
- 插件：`mushan.vscode-paste-image` v1.0.4（已安装）
- 配置文件：`.vscode/settings.json`
- 图片保存路径：`source/images/`（自动）
- 图片命名规则：`{当前文件名}_{序号}.png`（如 `示波器学习笔记2_1.png`）
- Markdown 引用格式：`![image](/images/示波器学习笔记2_1.png)`（自动插入）

### 使用方法
1. 在 VS Code 中打开 Markdown 文章，截好图或复制图片到剪贴板
2. 按 **Ctrl+Alt+V**，图片自动保存到 `source/images/`，Markdown 引用自动插入光标位置
3. 照常 `hexo generate && hexo deploy` 发布，图片随文章一起上线

### 插件配置详情
```json
// .vscode/settings.json
{
  "pasteImage.path": "${projectRoot}/source/images",      // 图片保存到 source/images/
  "pasteImage.basePath": "${projectRoot}/source",          // 基础路径
  "pasteImage.prefix": "/images/",                         // 生成引用时使用 /images/ 前缀
  "pasteImage.namePrefix": "${currentFileNameWithoutExt}_",// 文件名前缀=当前文章名
  "pasteImage.insertPattern": "![${imageFileNameWithoutExt}](${imageFilePath})"
}
```

### 图片在网站上的访问路径
图片存在 `source/images/` → `hexo generate` 后复制到 `public/images/` → 部署后可通过 `https://mumutingyun.site/images/xxx.png` 访问，**完全能正常显示**。

---

## 八、Obsidian 编辑集成 ✅

### 概述
Obsidian（Windows 客户端）可直接将 `source/` 目录作为 Vault 打开，编辑体验优于 VS Code。

### 打开方式
1. 打开 Obsidian → 点击左下角 "Open folder as vault" → Open
2. 在地址栏输入：`\\wsl.localhost\Ubuntu\home\wsluser\blog\source`
3. 点击 "Open" 即可看到所有文章

### 已预配置项（`.obsidian/app.json`）
- **链接格式**：标准 Markdown 链接（`[text](path)`），不使用 `[[wikilinks]]`，Hexo 完全兼容
- **图片路径**：粘贴图片自动保存到 `source/images/`，引用路径为 `/images/xxx.png`
- **默认编辑模式**：源码模式（兼容 Front-matter）

### 粘贴图片
Obsidian 里截图/复制图片 → **Ctrl+V** 粘贴，图片自动进入 `source/images/`，引用格式与 Hexo 一致。

### 一键部署
项目根目录下有 `deploy.bat` 脚本，Obsidian 里写完笔记后，两种方式部署：

**方式 A：双击运行**
- 在文件资源管理器中进入 `\\wsl.localhost\Ubuntu\home\wsluser\blog\`
- 双击 `deploy.bat`

**方式 B：Obsidian 内一键部署（推荐）**
1. 在 Obsidian 设置 → Community plugins → 关闭 Safe mode
2. 搜索并安装 **Shell Commands** 插件
3. 插件设置 → New command → Shell command
4. 填入：`cmd.exe /c "\\wsl.localhost\Ubuntu\home\wsluser\blog\deploy.bat"`
5. 勾选 "Show output" 和 "Open output in new tab"
6. 可绑定快捷键（如 Ctrl+Shift+D），或在命令面板中运行

---

## 九、管理后台（Decap CMS / hexo-admin）【备用】

### 方案一：hexo-admin（本地）
- 插件已安装：`hexo-admin`
- 启动 `hexo server` 后，访问 `http://localhost:4000/admin` 即可使用
- 支持在线编辑文章、管理 Front-matter
- 图片上传：需要额外配置（目前未配置）

### 方案二：Decap CMS（线上 Git-based）
- **入口文件**: `source/admin/index.html`（由 `skip_render: "admin/*"` 保护）
- **配置文件**: `source/updates/config.yml`（内容同 `d:\WSL\admin-config.yml`）
- **配置要点**:
  - 后端：GitHub 仓库 `mumutingyun/mumutingyun.github.io`，分支 `main`
  - 媒体文件路径：`source/images`，公开路径 `/images`
  - 集合：`posts`（文章），新建文件命名格式 `YYYY-MM-DD-slug.md`
- Decap CMS 的图片上传功能依赖 GitHub 后端——上传图片直接在浏览器中提交到 GitHub 仓库，无需本地操作

---

## 十、常用命令

```bash
cd /home/wsluser/blog

# 创建新文章
hexo new "文章标题"           # 在 source/_posts/ 生成新 .md 文件

# 本地预览 (http://localhost:4000)
hexo server
hexo server --drafts          # 包含草稿

# 清理 + 生成
hexo clean && hexo generate

# 部署到 GitHub Pages
hexo deploy

# 一条龙
hexo clean && hexo generate && hexo deploy
```

---

## 十一、环境信息

- **操作系统**: Windows 10 + WSL (Ubuntu)
- **WSL 路径**: `\\wsl.localhost\Ubuntu\home\wsluser\blog`
- **Windows 可访问路径**: `d:\WSL\` 下有部分辅助文件（admin-config.yml、admin-index.html 等）
- **Node.js / npm**: 已安装于 WSL 内

---

## 十二、新电脑部署指南 🆕

> 当你换电脑后，按以下步骤 30 分钟内恢复整个写作+发布系统。

### 前置条件
- Windows 10/11 系统
- 网络能访问 GitHub

### 步骤一：安装 WSL + Ubuntu
```powershell
# 在 PowerShell（管理员）中运行：
wsl --install -d Ubuntu
```
安装完成后重启电脑，首次启动 Ubuntu 时会提示创建用户名和密码。

### 步骤二：安装 Node.js（在 WSL Ubuntu 中）
```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v   # 确认版本 >= 18
```

### 步骤三：安装 Git 并克隆博客源码
```bash
# 在 WSL Ubuntu 中：
sudo apt-get install -y git

# 配置 GitHub SSH（必须，否则无法 push）
ssh-keygen -t ed25519 -C "your_email@example.com"
cat ~/.ssh/id_ed25519.pub
# ↑ 复制输出内容，添加到 GitHub → Settings → SSH and GPG keys → New SSH key

# 验证 SSH
ssh -T git@github.com    # 看到 "Hi mumutingyun!" 即成功

# 克隆博客源码
cd ~
git clone git@github.com:mumutingyun/mumutingyun.github.io.git blog
cd ~/blog
npm install
```

### 步骤四：配置 Git 部署权限
`_config.yml` 中的部署仓库使用 HTTPS + Token，需要更新 Token（旧的已失效）：

```bash
# 在 GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
# 生成新 Token，勾选 "repo" 权限，复制 Token 值

# 更新 _config.yml 中的 deploy.repo：
# 将 https://...github.com/... 改为 https://<你的用户名>:<新Token>@github.com/mumutingyun/mumutingyun.github.io.git
```

### 步骤五：验证部署
```bash
cd ~/blog
hexo clean && hexo generate && hexo deploy
```
访问 `https://mumutingyun.site` 确认更新成功。

### 步骤六：安装 VS Code（Windows 端）
1. 下载安装 [VS Code](https://code.visualstudio.com/)
2. 打开 VS Code → File → Open Folder → 输入 `\\wsl.localhost\Ubuntu\home\$USER\blog`
3. 安装 Paste Image 插件：`Ctrl+Shift+X` → 搜索 `mushan.vscode-paste-image` → Install
   - 配置已在 `.vscode/settings.json` 中（克隆时自带），无需手动配置

### 步骤七（可选）：安装 Obsidian
1. 下载安装 [Obsidian](https://obsidian.md/)（Windows 版）
2. 打开 Obsidian → Open folder as vault → 输入 `\\wsl.localhost\Ubuntu\home\$USER\blog\source`
3. 配置已在 `source/.obsidian/` 中（克隆时自带），无需手动配置
4. 安装 Shell Commands 插件并配置一键部署（详见第八章）

### 补充：部署脚本
项目根目录下的 `deploy.bat` 可在 Windows 资源管理器中双击运行，自动通过 WSL 执行部署。新电脑上路径不变则无需修改。

---

## 十三、待解决问题 / TODO

1. [x] ~~图片粘贴~~ → **已通过 VS Code Paste Image 插件解决**，Ctrl+Alt+V 直接粘贴截图
2. [x] ~~Obsidian 集成~~ → 已配置，详见第八章
3. [ ] Cloudflare 缓存/SSL 配置确认
4. [ ] 主题功能增强（评论系统、暗色模式等）
5. [ ] 移动端响应式优化