# 智算中心服务器全栈知识库

## 项目用途
静态 HTML 知识站点，面向初学者的智算中心服务器全栈科普。
场景驱动：从"训练一个大模型需要什么"出发，覆盖芯片→服务器→网络→存储→散热→软件栈。

在线地址：`https://shyxhl.github.io/ai-server-knowledge/`

## 目录结构
```
├── index.html              # 入口：学习路线总览 + 品牌速查
├── css/style.css           # 全局样式（三栏布局 + 响应式）
├── js/nav.js               # 左侧导航高亮 + 右侧目录生成 + 进度条 + 移动端菜单
├── stages/                 # 13 篇知识文档
│   ├── 01-overview.html    # 全景图
│   ├── 02-1-gpu-chips.html # GPU 芯片 + 品牌对比
│   ├── 02-2-memory.html    # 内存系统（HBM/DRAM/CXL）
│   ├── 02-3-gpu-servers.html # GPU 服务器整机（DGX/HGX/MGX）
│   ├── 03-network.html     # 网络互联（InfiniBand/RoCE）
│   ├── 04-storage.html     # 存储系统（并行文件系统）
│   ├── 05-cooling-power.html # 散热与供电（液冷/风冷）
│   ├── 06-1-drivers.html   # 驱动与加速层（CUDA/cuDNN/NCCL）
│   ├── 06-2-containers.html # 容器与资源调度（K8s/Slurm）
│   ├── 06-3-training.html  # 分布式训练框架（DP/TP/PP/ZeRO）
│   ├── 06-4-inference.html # 推理引擎（vLLM/TensorRT-LLM）
│   ├── 06-5-monitoring.html # 集群监控（Prometheus/DCGM）
│   └── 07-summary.html     # 完整参考架构 + 千卡集群配置
└── docs/superpowers/       # 项目文档（设计稿 + 实施计划）
```

## 内容规范
- 每篇结构：场景导入 → 核心概念 → 技术要点 → 品牌产品 → 一张图总结 → 延伸阅读
- 专业术语首次出现时括注白话解释
- 中文撰写，对话语气，面向小白
- 品牌对比用 `<table>`，概念卡片用 `.concept-cards`，提示用 `.callout`

## 发布流程
修改 → `git commit` → `git push origin main` → GitHub Pages 自动部署（约 1-2 分钟生效）

## 移动端
- 768px 以下切换为单栏布局，表格可左右滑动
- 不要加 `word-break: break-word`（会导致中文乱码）
