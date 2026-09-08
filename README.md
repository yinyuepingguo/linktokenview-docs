# LinkTokenView 联视未来 · 国产大模型 API 聚合平台

![国产大模型](https://img.shields.io/badge/国产大模型-DeepSeek%20·%20Qwen%20·%20Kimi%20·%20豆包-14b8a6?style=flat-square)
![接口](https://img.shields.io/badge/接口-OpenAI%20兼容-0d9488?style=flat-square)
![计费](https://img.shields.io/badge/计费-按量计费%20·%20Token%20Plan-134e4a?style=flat-square)

**LinkTokenView（联视未来）是一个国产大模型 API 聚合平台。** 一个 OpenAI 兼容接口即可调用 DeepSeek、通义千问、Kimi、豆包、智谱 GLM、百川、讯飞星火、MiMo、阶跃星辰等国产大模型，一个 API Key 跨模型通用，Token 余额统一调度，按实际用量计费。

官网：<https://linktokenview.com>　·　帮助文档：<https://linktokenview.com/docs>

---

## 目录

- [为什么用 LinkTokenView](#为什么用-linktokenview)
- [支持的模型](#支持的模型)
- [快速开始](#快速开始)
- [计费方式](#计费方式)
- [完整文档](#完整文档)
- [常见问题](#常见问题)
- [相关链接](#相关链接)

---

## 为什么用 LinkTokenView

- **一个接口，多种模型**：统一 OpenAI 兼容接口，新增模型无需改动业务代码，现有项目替换 Base URL 即可接入。
- **打破 Token 孤岛**：一个 API Key 跨模型通用，余额在多模型间自由调度，切换模型不必重复注册、重复充值或改写鉴权。
- **按量计费，清晰可查**：Token 实时扣费，用多少付多少，无订阅费与最低消费，调用量与消费明细实时可查。
- **稳定可靠**：多渠道按优先级调度，单渠道限流或异常时自动降级到备用渠道，异常渠道自动摘除、恢复后自动回池。

---

## 支持的模型

| 模型 | 厂商 | 典型场景 | 状态 |
|------|------|----------|------|
| DeepSeek | 深度求索 | 对话、推理、代码 | 已支持 |
| 通义千问 Qwen | 阿里云 | 对话、长文本 | 已支持 |
| Kimi | 月之暗面 | 长文本 | 已支持 |
| 豆包 | 字节跳动 | 对话、多模态 | 已支持 |
| 智谱 GLM | 智谱 AI | 对话、推理 | 已支持 |
| 百川 | 百川智能 | 对话 | 已支持 |
| 讯飞星火 | 科大讯飞 | 对话、语音 | 已支持 |
| MiMo | 小米 | 推理 | 已支持 |
| 阶跃星辰 | 阶跃星辰 | 多模态 | 已支持 |

模型清单与实时价格以 [模型广场](https://linktokenview.com/model-plaza) 为准，平台仅接入国产大模型。

---

## 快速开始

### 1. 获取 API Key

打开 <https://linktokenview.com> 注册账号（支持 GitHub 账号登录），在控制台创建 API Key。

### 2. 替换 Base URL 直接调用

Base URL：`https://linktokenview.com/v1`

**curl**

```bash
curl https://linktokenview.com/v1/chat/completions \
  -H "Authorization: Bearer $LINKTOKENVIEW_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek-chat",
    "messages": [{"role": "user", "content": "用一句话介绍你自己"}]
  }'
```

**Python（openai SDK）**

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://linktokenview.com/v1",
    api_key="你的 API Key",
)

resp = client.chat.completions.create(
    model="deepseek-chat",
    messages=[{"role": "user", "content": "用一句话介绍你自己"}],
)
print(resp.choices[0].message.content)
```

**Node.js**

```javascript
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://linktokenview.com/v1",
  apiKey: process.env.LINKTOKENVIEW_API_KEY,
});

const resp = await client.chat.completions.create({
  model: "deepseek-chat",
  messages: [{ role: "user", content: "用一句话介绍你自己" }],
});
console.log(resp.choices[0].message.content);
```

### 3. 接入 Agent 工具

Claude Code、Codex、CC Switch、WorkBuddy 等工具的配置步骤见 [Agent 工具接入概览](https://linktokenview.com/docs)。

---

## 计费方式

| 方式 | 说明 |
|------|------|
| 按量计费 | Token 实时扣费，用多少付多少，无订阅费与最低消费 |
| Token Plan | 多档位 Token 预付包，量大价优 |
| Coding Plan | 面向代码开发场景 |
| 企业专线 | 独占通道、高并发保障、SLA 保障，支持定制化对接 |

最新套餐与价格见 [定价与订阅](https://linktokenview.com/pricing)。

---

## 完整文档

| 主题 | 链接 |
|------|------|
| 注册与登录 | <https://linktokenview.com/docs/getting-started> |
| 创建 API 密钥 | <https://linktokenview.com/docs/api-keys> |
| 模型广场 | <https://linktokenview.com/model-plaza> |
| 定价与订阅 | <https://linktokenview.com/pricing> |
| 余额与用量 | <https://linktokenview.com/usage> |
| Agent 工具接入 | <https://linktokenview.com/docs/agents/overview> |
| 常见问题 | <https://linktokenview.com/docs/faq> |

本仓库的 `public/` 目录是上述帮助文档的源文件（Docsify）。

---

## 常见问题

**和直接调用各家官方 API 有什么区别？**
不用为每个模型分别注册、分别充值、分别对接。一个 Key、一套代码、一份余额，即可在多家国产模型间自由切换。

**现有项目改动大吗？**
不大。接口 OpenAI 兼容，通常只需把 Base URL 和 API Key 换成 LinkTokenView 的即可，业务逻辑无需重写。

**支持哪些编程语言？**
只要能用 HTTP 请求就能调用；Python、Node.js、Go、Java 等主流语言的 OpenAI SDK 均可直接使用。

**余额可以跨模型使用吗？**
可以。Token 跨模型通用，可在多模型间自由调度。

**数据存储在哪里，会被用于训练吗？**
请求会转发给对应的上游模型厂商以生成响应。完整说明见平台 [隐私政策](https://linktokenview.com/privacy)。

---

## 相关链接

- 官网：<https://linktokenview.com>
- 帮助文档：<https://linktokenview.com/docs>
- 模型广场：<https://linktokenview.com/model-plaza>
- 服务条款：<https://linktokenview.com/terms>
- 隐私政策：<https://linktokenview.com/privacy>

> LinkTokenView（联视未来）仅接入国产大模型，不提供境外模型服务。模型能力以上游厂商实际提供为准。
