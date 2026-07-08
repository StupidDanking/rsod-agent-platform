# rsod-agent-platform

基于 YOLOv11 的目标检测智能体平台。

本项目采用前后端分离架构：

- 后端：FastAPI + SQLAlchemy + Alembic + JWT
- 前端：Vue 3 + Vite + Element Plus + Pinia + Vue Router
- 基础设施：PostgreSQL + Redis + MinIO + Docker Compose
- 模型方向：YOLOv11 目标检测

---

## 项目结构

```text
rsod-agent-platform/
├── backend/              # 后端服务，FastAPI
│   ├── app/
│   │   ├── api/          # API 路由
│   │   ├── config/       # 全局配置
│   │   ├── core/         # 安全、JWT、密码加密等核心工具
│   │   ├── database/     # 数据库连接
│   │   ├── entity/       # SQLAlchemy 模型与 Pydantic Schema
│   │   ├── services/     # 业务逻辑
│   │   └── storage/      # MinIO 文件存储客户端
│   ├── alembic/          # 数据库迁移脚本
│   ├── main.py           # FastAPI 入口
│   └── requirements.txt  # Python 依赖
├── frontend/             # 前端服务，Vue3 + Vite
│   ├── src/
│   │   ├── api/          # 前端 API 封装
│   │   ├── assets/       # 静态资源与全局样式
│   │   ├── components/   # 公共组件
│   │   ├── router/       # Vue Router 路由
│   │   ├── stores/       # Pinia 状态管理
│   │   ├── utils/        # Axios、Markdown 等工具
│   │   └── views/        # 页面组件
│   ├── vite.config.js    # Vite 配置
│   └── package.json      # 前端依赖
├── models/               # YOLOv11 模型文件
├── datasets/             # 数据集目录
├── docs/                 # 项目文档
├── docker-compose.yml    # Docker Compose 基础设施编排
├── .env.example          # 环境变量示例
└── README.md             # 项目说明