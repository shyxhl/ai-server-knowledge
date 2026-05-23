# 智算中心服务器全栈知识体系 — 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 生成 13 篇 HTML 格式的智算中心服务器知识文档，含导航、样式、品牌对比。

**Architecture:** 纯静态 HTML + CSS + 少量 JS。所有页面共享同一套 CSS 和左侧导航栏。每篇文档按统一结构编写（场景导入 → 核心概念 → 技术要点 → 品牌 → 总结）。

**Tech Stack:** HTML5, CSS3, Vanilla JS (ES6)

---

## 文件结构

```
科普类/
├── index.html                      # 入口：学习路线总览
├── css/
│   └── style.css                   # 全局样式
├── js/
│   └── nav.js                      # 导航栏激活状态
├── stages/
│   ├── 01-overview.html            # 阶段1：什么是智算中心
│   ├── 02-1-gpu-chips.html         # 阶段2.1：GPU芯片
│   ├── 02-2-memory.html            # 阶段2.2：内存系统
│   ├── 02-3-gpu-servers.html       # 阶段2.3：GPU服务器整机
│   ├── 03-network.html             # 阶段3：网络互联
│   ├── 04-storage.html             # 阶段4：存储系统
│   ├── 05-cooling-power.html       # 阶段5：散热与供电
│   ├── 06-1-drivers.html           # 阶段6.1：驱动与加速层
│   ├── 06-2-containers.html        # 阶段6.2：容器与资源调度
│   ├── 06-3-training.html          # 阶段6.3：分布式训练框架
│   ├── 06-4-inference.html         # 阶段6.4：推理引擎
│   ├── 06-5-monitoring.html        # 阶段6.5：集群管理与监控
│   └── 07-summary.html             # 总结：完整参考架构
└── docs/                           # 项目文档（已有）
```

## 内容编写原则

每篇文档必须：
- 从场景切入（"为什么需要它"），不说教
- 每个专业名词首次出现给白话注释（用 `<abbr>` 或括号说明）
- 品牌对比用 `<table>` 呈现（厂商 | 产品 | 定位 | 特点）
- 控制深度：不讲数学公式，不讲代码实现（阶段6除外）
- 结尾一句话总结 + 核心要点回顾

---

### Task 1: 项目骨架

**Files:**
- Create: `css/style.css`
- Create: `js/nav.js`

- [ ] **Step 1: 创建全局样式文件**

```css
/* css/style.css */
:root {
  --sidebar-width: 260px;
  --color-bg: #f8f9fa;
  --color-sidebar: #1a1a2e;
  --color-primary: #2563eb;
  --color-text: #1e293b;
  --color-muted: #64748b;
  --color-border: #e2e8f0;
  --color-code-bg: #f1f5f9;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", sans-serif;
  color: var(--color-text);
  background: var(--color-bg);
  line-height: 1.8;
  display: flex;
}

/* 左侧导航 */
.sidebar {
  width: var(--sidebar-width);
  height: 100vh;
  position: fixed;
  background: var(--color-sidebar);
  color: #cbd5e1;
  overflow-y: auto;
  padding: 24px 0;
  z-index: 10;
}

.sidebar h2 {
  color: #fff;
  font-size: 18px;
  padding: 0 20px 16px;
  border-bottom: 1px solid #334155;
  margin-bottom: 8px;
}

.sidebar .stage-title {
  padding: 8px 20px;
  font-size: 13px;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 16px;
}

.sidebar a {
  display: block;
  padding: 6px 20px 6px 28px;
  color: #cbd5e1;
  text-decoration: none;
  font-size: 14px;
  border-left: 3px solid transparent;
  transition: all 0.15s;
}

.sidebar a:hover { color: #fff; background: rgba(255,255,255,0.05); }
.sidebar a.active { color: #fff; border-left-color: var(--color-primary); background: rgba(37,99,235,0.15); }

/* 主内容区 */
.main {
  margin-left: var(--sidebar-width);
  max-width: 860px;
  padding: 40px 48px;
  width: 100%;
}

.main h1 { font-size: 28px; margin-bottom: 8px; }
.main h2 { font-size: 22px; margin-top: 36px; margin-bottom: 12px; padding-bottom: 6px; border-bottom: 2px solid var(--color-border); }
.main h3 { font-size: 18px; margin-top: 28px; margin-bottom: 8px; }
.main p { margin-bottom: 14px; }
.main ul, .main ol { margin: 0 0 14px 20px; }
.main li { margin-bottom: 4px; }

.main table {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
  font-size: 14px;
}

.main th {
  background: var(--color-code-bg);
  text-align: left;
  padding: 10px 12px;
  font-weight: 600;
  border-bottom: 2px solid var(--color-border);
}

.main td {
  padding: 10px 12px;
  border-bottom: 1px solid var(--color-border);
}

.main tr:hover td { background: #f8fafc; }

/* 概念卡片 */
.concept-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
  margin: 20px 0;
}

.concept-card {
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 20px;
}

.concept-card h4 { font-size: 16px; margin-bottom: 6px; color: var(--color-primary); }
.concept-card p { font-size: 14px; color: var(--color-muted); margin: 0; }

/* 提示框 */
.callout {
  border-left: 4px solid var(--color-primary);
  background: #eff6ff;
  padding: 14px 18px;
  margin: 16px 0;
  border-radius: 0 6px 6px 0;
  font-size: 14px;
}

.callout.warn {
  border-left-color: #f59e0b;
  background: #fffbeb;
}

/* 总结区 */
.summary-box {
  background: linear-gradient(135deg, #1e293b, #334155);
  color: #f1f5f9;
  padding: 24px;
  border-radius: 10px;
  margin: 32px 0;
}

.summary-box h3 { color: #fff; margin-top: 0; }
.summary-box ul { margin-bottom: 0; }

/* 响应式 */
@media (max-width: 768px) {
  .sidebar { display: none; }
  .main { margin-left: 0; padding: 20px; }
}
```

- [ ] **Step 2: 创建导航脚本**

```js
// js/nav.js
document.addEventListener('DOMContentLoaded', () => {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.sidebar a').forEach(link => {
    if (link.getAttribute('href') === current) {
      link.classList.add('active');
    }
  });
});
```

- [ ] **Step 3: 验证骨架**

在浏览器打开任意页面，确认样式加载、导航高亮正常。

---

### Task 2: 入口页 + 通用导航 HTML 片段

**Files:**
- Create: `index.html`

每篇文档都包含相同的 `<nav class="sidebar">...</nav>`。后续任务直接复用。

- [ ] **Step 1: 编写入口页**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>智算中心服务器全栈知识</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>

<nav class="sidebar">
  <h2>智算中心服务器<br>全栈知识</h2>

  <div class="stage-title">阶段 1</div>
  <a href="stages/01-overview.html">全景图：什么是智算中心</a>

  <div class="stage-title">阶段 2 · 算力</div>
  <a href="stages/02-1-gpu-chips.html">GPU 芯片</a>
  <a href="stages/02-2-memory.html">内存系统</a>
  <a href="stages/02-3-gpu-servers.html">GPU 服务器整机</a>

  <div class="stage-title">阶段 3 · 网络</div>
  <a href="stages/03-network.html">网络互联</a>

  <div class="stage-title">阶段 4 · 存储</div>
  <a href="stages/04-storage.html">存储系统</a>

  <div class="stage-title">阶段 5 · 基础设施</div>
  <a href="stages/05-cooling-power.html">散热与供电</a>

  <div class="stage-title">阶段 6 · 软件栈</div>
  <a href="stages/06-1-drivers.html">驱动与加速层</a>
  <a href="stages/06-2-containers.html">容器与资源调度</a>
  <a href="stages/06-3-training.html">分布式训练框架</a>
  <a href="stages/06-4-inference.html">推理引擎</a>
  <a href="stages/06-5-monitoring.html">集群管理与监控</a>

  <div class="stage-title">总结</div>
  <a href="stages/07-summary.html">完整参考架构</a>
</nav>

<main class="main">
  <h1>智算中心服务器：从零到全栈</h1>
  <p>一份为初学者准备的知识体系。从"训练一个大模型到底需要什么"出发，逐层深入。</p>

  <h2>学习路线</h2>
  <div class="concept-cards">
    <div class="concept-card">
      <h4>阶段 1 · 全景图</h4>
      <p>智算中心是什么？为什么大模型需要专门的数据中心？</p>
    </div>
    <div class="concept-card">
      <h4>阶段 2 · 算力</h4>
      <p>GPU 芯片、显存、内存、整机——AI 服务器的"肌肉"。</p>
    </div>
    <div class="concept-card">
      <h4>阶段 3 · 网络</h4>
      <p>几千张 GPU 怎么连在一起？InfiniBand、RoCE、光模块。</p>
    </div>
    <div class="concept-card">
      <h4>阶段 4 · 存储</h4>
      <p>PB 级训练数据怎么存、怎么高速读取？</p>
    </div>
    <div class="concept-card">
      <h4>阶段 5 · 基础设施</h4>
      <p>一张卡 700W，一万张卡怎么散热和供电？</p>
    </div>
    <div class="concept-card">
      <h4>阶段 6 · 软件栈</h4>
      <p>CUDA → 容器 → 训练框架 → 推理引擎 → 监控，全链路。</p>
    </div>
  </div>

  <h2>怎么看这份文档？</h2>
  <p>按左侧导航从上到下阅读，每一篇都从"为什么需要它"开始。每个专业名词首次出现时都有白话解释。</p>
  <p>如果你是销售或非技术岗位，重点关注<b>阶段 1-5</b>（硬件与基础设施），这是客户最常问的部分。</p>

  <h2>品牌速查</h2>
  <table>
    <tr><th>领域</th><th>主要品牌</th></tr>
    <tr><td>GPU 芯片</td><td>NVIDIA、AMD、华为昇腾、Intel</td></tr>
    <tr><td>显存 (HBM)</td><td>SK 海力士、三星、美光</td></tr>
    <tr><td>GPU 服务器</td><td>Dell、HPE、联想、浪潮、超微、华为</td></tr>
    <tr><td>网络交换机</td><td>NVIDIA/Mellanox、Broadcom、华为、Cisco</td></tr>
    <tr><td>光模块</td><td>中际旭创、Finisar、Coherent</td></tr>
    <tr><td>存储</td><td>Dell、HPE、华为、Pure Storage、NetApp</td></tr>
    <tr><td>液冷</td><td>CoolIT、台达、曙光数创、Vertiv</td></tr>
  </table>
</main>

<script src="js/nav.js"></script>
</body>
</html>
```

- [ ] **Step 2: 验证**

在浏览器打开 `index.html`，确认导航栏、样式、卡片布局正常。

---

### Task 3: 阶段 1 — 全景图

**Files:**
- Create: `stages/01-overview.html`

内容要点（每篇文档结构：场景导入 → 核心概念 → 技术要点 → 品牌/产品 → 总结）：

- **场景导入**：从"ChatGPT 是怎么训练出来的"引入，说明为什么普通服务器集群做不了这件事
- **核心概念**：智算中心 vs 传统数据中心、训练 vs 推理、通算 vs 智算
- **技术要点**：典型智算中心规模（千卡→万卡）、算力密度差异
- **品牌/产品**：国内外主要智算中心运营商（运营商、云厂商、第三方）
- **总结**

根据每篇 5-8 页阅读量生成完整 HTML，复用导航片段。专业名词（TFLOPS、训练、推理、集群等）首次出现加白话解释。

---

### Task 4: 阶段 2.1 — GPU 芯片

**Files:**
- Create: `stages/02-1-gpu-chips.html`

内容要点：
- **场景导入**：训练千亿参数模型，为什么 CPU 不行？
- **核心概念**：并行计算、Tensor Core、TFLOPS、CUDA 生态
- **技术要点**：GPU 架构演进（Volta→Ampere→Hopper→Blackwell）、制程、显存带宽
- **品牌对比**（重点）：

| 厂商 | 主力产品 | 定位 |
|------|---------|------|
| NVIDIA | H100, H200, B200 | 绝对主力，CUDA 生态 |
| AMD | MI300X | 性价比挑战者 |
| 华为 | 昇腾 910B | 国产替代 |
| Intel | Gaudi 3 | 差异化架构 |

---

### Task 5: 阶段 2.2 — 内存系统

**Files:**
- Create: `stages/02-2-memory.html`

内容要点：
- **场景导入**：70B 参数模型为什么一张 H100 跑不动？引出显存概念
- **核心概念**：HBM 堆叠、显存带宽 vs 容量、Memory Wall
- **技术要点**：HBM2e→HBM3→HBM3e、DDR5 vs HBM、CXL 内存池化
- **品牌对比**：SK 海力士（HBM 领先）、三星、美光
- **关键公式**：模型参数 × 2 字节（FP16）≈ 最低显存需求，直观展示 70B/175B 模型需要多少显存

---

### Task 6: 阶段 2.3 — GPU 服务器整机

**Files:**
- Create: `stages/02-3-gpu-servers.html`

内容要点：
- **场景导入**：有了 GPU 芯片，怎么装进服务器？
- **核心概念**：DGX vs HGX vs MGX、NVLink 拓扑、风道设计
- **技术要点**：8-GPU 节点内部拓扑（NVSwitch 全互联）、PCIe Gen5 对 GPU 的限制
- **品牌对比**（重点）：Dell PowerEdge XE9680、HPE ProLiant DL380a、联想 SR780a、浪潮 NF5688M6、超微 SYS-821GE-TNHR、华为 Atlas 900 系列

---

### Task 7: 阶段 3 — 网络互联

**Files:**
- Create: `stages/03-network.html`

内容要点：
- **场景导入**：1000 张 GPU 一起训练，它们之间怎么"聊天"？
- **核心概念**：RDMA、All-Reduce 通信、带宽与延迟
- **技术要点**：InfiniBand (NDR/XDR) vs RoCE v2、Leaf-Spine vs DragonFly 拓扑、光模块（400G/800G）
- **品牌对比**：NVIDIA/Mellanox (Quantum/Spectrum)、Broadcom (Tomahawk)、华为 (CloudEngine)、Cisco (Nexus)

---

### Task 8: 阶段 4 — 存储系统

**Files:**
- Create: `stages/04-storage.html`

内容要点：
- **场景导入**：训练 GPT-4 级别的模型需要多少数据？数据存在哪？
- **核心概念**：并行文件系统 vs NFS、IOPS vs 吞吐、分层存储
- **技术要点**：Lustre/GPFS/WekaFS、NVMe SSD → HDD 分层、GPU Direct Storage
- **品牌对比**：DDN (AI 存储市占率高)、Pure Storage、NetApp、Dell PowerScale、华为 OceanStor

---

### Task 9: 阶段 5 — 散热与供电

**Files:**
- Create: `stages/05-cooling-power.html`

内容要点：
- **场景导入**：一台 8×H100 服务器满载 10kW，一千台需要多少电？
- **核心概念**：PUE、TDP、冷板 vs 浸没式液冷
- **技术要点**：风冷极限（约 30kW/机柜）、冷板液冷（CDU 循环）、浸没式液冷（单相/两相）
- **品牌对比**：CoolIT (冷板)、台达 (电源+液冷)、曙光数创 (浸没式)、Vertiv (配电+制冷)

---

### Task 10: 阶段 6.1 — 驱动与加速层

**Files:**
- Create: `stages/06-1-drivers.html`

内容要点：
- **场景导入**：买了 GPU 插上就能用吗？不行，得有驱动和 CUDA
- **核心概念**：CUDA 并行编程模型、cuDNN 算子库、NCCL 集合通信
- **品牌**：NVIDIA 全家桶（没有替代品），AMD ROCm（追赶中）

---

### Task 11: 阶段 6.2 — 容器与资源调度

**Files:**
- Create: `stages/06-2-containers.html`

内容要点：
- **场景导入**：100 个算法工程师共享 1000 张 GPU，怎么分配不掉链子？
- **核心概念**：Docker/Containerd 隔离环境、Kubernetes 容器编排、Slurm 作业调度
- **技术要点**：GPU 虚拟化（MIG、vGPU）、优先级队列、抢占式调度
- **品牌**：NVIDIA GPU Operator、Run:ai、Kubernetes + NVIDIA Device Plugin

---

### Task 12: 阶段 6.3 — 分布式训练框架

**Files:**
- Create: `stages/06-3-training.html`

内容要点：
- **场景导入**：千亿参数模型，一张 GPU 显存放不下，怎么办？
- **核心概念**：数据并行、张量并行、流水线并行、3D 并行、ZeRO 优化
- **技术要点**：PyTorch FSDP、DeepSpeed ZeRO（1/2/3）、Megatron-LM、NVIDIA NeMo
- **品牌**：Meta (PyTorch)、Microsoft (DeepSpeed)、NVIDIA (Megatron/NeMo)

---

### Task 13: 阶段 6.4 — 推理引擎

**Files:**
- Create: `stages/06-4-inference.html`

内容要点：
- **场景导入**：模型训完了，要怎么高效地"用"它？
- **核心概念**：KV Cache、批处理（Continuous Batching）、量化（FP16→INT8→INT4）
- **技术要点**：TensorRT-LLM、vLLM、Triton Inference Server
- **品牌**：NVIDIA (TensorRT-LLM, Triton)、开源 (vLLM, SGLang)

---

### Task 14: 阶段 6.5 — 集群管理与监控

**Files:**
- Create: `stages/06-5-monitoring.html`

内容要点：
- **场景导入**：集群里有一张 GPU 挂了，怎么立刻发现？
- **核心概念**：Prometheus + Grafana 监控体系、NVIDIA DCGM 指标、BMC/Redfish 带外管理
- **技术要点**：关键监控指标（功耗、温度、显存使用率、NVLink 错误）、告警规则

---

### Task 15: 总结篇 — 完整参考架构

**Files:**
- Create: `stages/07-summary.html`

内容要点：
- 把所有阶段串回一起：从 GPU 芯片到训练平台的全链路回顾
- 给出一个**千卡集群参考配置清单**（多少台 GPU 服务器、什么型号交换机、什么存储、用多大电力）
- 用一张架构总图总结（HTML/CSS 自绘或 Mermaid 流程图）
- 列出关键趋势：液冷普及、800G 网络、CXL 内存池化、国产化替代

---

### Task 16: 收尾检查

- [ ] **Step 1: 链接检查** — 遍历所有 HTML，确认导航链接、CSS/JS 引用路径正确
- [ ] **Step 2: 品牌覆盖检查** — 对照设计文档，确认每个硬件阶段都有品牌对比表
- [ ] **Step 3: 术语注释检查** — 抽查 3 篇文档，确认专业名词首次出现时有白话解释
- [ ] **Step 4: 在浏览器打开 index.html，走一遍完整导航**
