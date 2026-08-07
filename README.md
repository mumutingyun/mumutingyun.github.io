# 陈牧图的个人博客（mumutingyun.site）

> 本文档记录项目的完整技术细节，方便在任意聊天窗口快速恢复上下文。

---

## 一、技术概览

| 项目        | 详情 |
|-----------|------|
| **框架** | [Hexo](https://hexo.io/) v8.1.2 |
| **主题** | Landscape（Hexo 默认主题） |
| **代码托管** | GitHub: `mumutingyun/mumutingyun.github.io`，分支 `main` |
| **域名** | `mumutingyun.site`（Cloudflare Pages，自动从 GitHub main 分支构建） |
| **本地路径** | `/home/wsluser/blog`（WSL Ubuntu） |
| **写作语言** | 中文 (zh-CN) |

---

## 二、Hexo 核心配置 (`_config.yml`)

### 站点信息
- **站点 URL**: `https://mumutingyun.site`
- **永久链接格式**: `:year/:month/:day/:title/`

### 关键开关
- **`post_asset_folder: false`** — 图片统一放在 `source/images/`
- **`skip_render: "admin/*"`** — Decap CMS 入口保护

### 部署
博客由 **Cloudflare Pages** 自动构建：
1. `git push origin main` → GitHub
2. Cloudflare Pages 检测变更 → 自动 `hexo generate` → 部署上线
3. 1-2 分钟后生效

⚠️ 不要执行 `hexo deploy`，已被弃用。

---

## 三、已安装的插件

| 插件 | 用途 |
|-----|------|
| `hexo-deployer-git` | （已弃用，但保留） |
| `hexo-admin` | 本地 Web 管理后台 |
| `hexo-generator-searchdb` | 站内全文搜索 |
| `hexo-generator-feed` | RSS/Atom 订阅 |
| `hexo-generator-sitemap` | sitemap.xml |
| `hexo-filter-mathjax` | LaTeX 数学公式 |
| `hexo-filter-mermaid-diagrams` | Mermaid 图表 |
| `hexo-renderer-ejs` | EJS 模板 |
| `hexo-renderer-marked` | Markdown 渲染 |
| `hexo-renderer-stylus` | Stylus CSS |

---

## 五、目录结构

```
blog/
├── _config.yml              # Hexo 主配置
├── package.json
├── .vscode/
│   └── settings.json        # VS Code Paste Image 插件配置
├── deploy.bat               # Windows 一键发布脚本
├── sync-obsidian.bat        # Obsidian 镜像同步脚本
├── source/
│   ├── .obsidian/           # Obsidian Vault 配置
│   ├── _posts/              # 所有文章（Markdown）
│   ├── images/              # 共用图片目录
│   ├── updates/             # Decap CMS 配置页面
│   └── admin/               # Decap CMS 入口
├── themes/landscape/        # 主题文件
└── node_modules/
```

---

## 六、现有文章

1. `hello-world.md`
2. `操作指南.md`
3. `示波器学习笔记1.md`
4. `示波器学习笔记2.md`
5. `示波器学习笔记3.md`

---

## 七、图片管理 ✅

### VS Code：Ctrl+Alt+V 粘贴图片
- 插件：`mushan.vscode-paste-image` v1.0.4
- 图片自动存到 `source/images/`，引用 `/images/xxx.png`

### Obsidian：Ctrl+V 粘贴图片
- 通过镜像目录方案（`sync-obsidian.bat`）

---

## 八、Obsidian 编辑集成 ✅

### 首次设置
1. 双击 `sync-obsidian.bat pull` → 初始化 `D:\obsidian\obsidian-vault\`
2. Obsidian → Open folder as vault → 选择 `D:\obsidian\obsidian-vault`

### 日常写作
```
Obsidian 写笔记（Ctrl+V 贴图）
    ↓
双击 sync-obsidian.bat push
    ↓
自动同步到 WSL → git push → Cloudflare 构建
    ↓
1-2 分钟后网站更新
```

---

## 九、发布方式

| 方式 | 操作 |
|------|------|
| VS Code + Git | `git add -A && git commit -m "更新" && git push origin main` |
| 双击 bat | 双击 `deploy.bat` 或 `sync-obsidian.bat push` |
| 手机 CMS | 浏览器打开 `https://mumutingyun.site/admin/` |

---

## 十、常用命令

```bash
cd /home/wsluser/blog
hexo new "文章标题"                # 新文章
hexo server                        # 本地预览 http://localhost:4000
git add -A && git commit -m "x" && git push origin main   # 发布
```

---

## 十一、环境信息

- **OS**: Windows 10 + WSL (Ubuntu)
- **WSL 路径**: `\\wsl.localhost\Ubuntu\home\wsluser\blog`
- **Windows 参考路径**: `d:\WSL\`

---

## 十二、新电脑部署指南 🆕

### 1. 安装 WSL + Ubuntu
```powershell
wsl --install -d Ubuntu
```

### 2. 安装 Node.js（WSL 内）
```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 3. 克隆博客源码
```bash
sudo apt-get install -y git
ssh-keygen -t ed25519 -C "your_email@example.com"
cat ~/.ssh/id_ed25519.pub   # 添加到 GitHub SSH keys
ssh -T git@github.com
cd ~ && git clone git@github.com:mumutingyun/mumutingyun.github.io.git blog
cd ~/blog && npm install
git config user.name "mumutingyun"
git config user.email "3194491988@qq.com"
```

### 4. 验证
```bash
git add -A && git commit -m "测试" && git push origin main
# 1-2 分钟后访问 https://mumutingyun.site
```

### 5. VS Code（Windows 端）
- Open Folder → `\\wsl.localhost\Ubuntu\home\$USER\blog`
- 安装 `mushan.vscode-paste-image`（配置已自带）

### 6. Obsidian（可选）
- 双击 `sync-obsidian.bat pull`
- Open vault → `D:\obsidian\obsidian-vault`

---

## 十三、待解决问题

1. [x] ~~图片粘贴~~ → VS Code Paste Image + Obsidian
2. [x] ~~Obsidian 集成~~ → 镜像目录方案
3. [ ] Cloudflare 缓存/SSL 配置确认
4. [ ] 主题功能增强
5. [ ] 移动端响应式优化