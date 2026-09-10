# LinkTokenView 联视未来 · 国产大模型 API 聚合平台

![内测中](https://img.shields.io/badge/状态-内测中-orange?style=flat-square)
![国产大模型](https://img.shields.io/badge/国产大模型-DeepSeek%20·%20Qwen%20·%20Kimi%20·%20豆包-14b8a6?style=flat-square)
![接口](https://img.shields.io/badge/接口-OpenAI%20兼容-0d9488?style=flat-square)
![计费](https://img.shields.io/badge/计费-按量计费%20·%20Token%20Plan-134e4a?style=flat-square)

**LinkTokenView（联视未来）是一个国产大模型 API 聚合平台，现已正式开启内测。** 一个 OpenAI 兼容接口即可调用 DeepSeek、通义千问、Kimi、豆包、智谱 GLM、百川、讯飞星火、MiMo、阶跃星辰等国产大模型，一个 API Key 跨模型通用，Token 余额统一调度，按实际用量计费。

官网：<https://linktokenview.com>　·　帮助文档：<https://linktokenview.com/docs>

---

## 内测进行中

首批国产大模型已接入，更多模型将陆续上线。内测期间开放以下福利：

| 福利 | 说明                                  |
|------|-------------------------------------|
| 注册即送 Lite 套餐 | 新用户注册即自动赠送 Lite 订阅套餐（价值20元），有效期 7 天 |
| 邀请返利 10% | 邀请好友注册，好友充值即可获得 10% 返利              |
| 内测版订阅套餐 1.9 折 | 限时开放，可体验全平台国产大模型；属内测期压测补贴价，非正式定价，名额有限 |

> 以上福利仅在**内测期间**有效，名额、折扣与有效期以 LinkTokenView 平台当前页面说明为准。

内测期间遇到问题或有建议，欢迎通过平台**客服**或帮助中心的**问题排查**入口反馈，我们会尽快响应。

---

## 目录

- [内测进行中](#内测进行中)
- [为什么用 LinkTokenView](#为什么用-linktokenview)
- [支持的模型](#支持的模型)
- [快速开始](#快速开始)
- [计费方式](#计费方式)
- [内测期反馈有奖](#内测期反馈有奖)
- [完整文档](#完整文档)
- [常见问题](#常见问题)
- [相关链接](#相关链接)

---

## 为什么用 LinkTokenView

- **一个接口，多种模型**：统一 OpenAI 兼容接口，新增模型无需改动业务代码，现有项目替换 Base URL 即可接入。
- **打破 Token 孤岛**：一个 API Key 跨模型通用，余额在多模型间自由调度，切换模型不必重复注册、重复充值或改写鉴权。
- **按量计费，清晰可查**：Token 实时扣费，用多少付多少，调用量与消费明细实时可查。
- **稳定可靠**：多渠道按优先级调度，单渠道限流或异常时自动降级到备用渠道，异常渠道自动摘除、恢复后自动回池。

---

## 支持的模型

| 模型 | 厂商 | 典型场景 | 状态 |
|------|------|----------|------|
| DeepSeek | 深度求索 | 对话、推理、代码 | 首批接入 |
| 通义千问 Qwen | 阿里云 | 对话、长文本 | 首批接入 |
| Kimi | 月之暗面 | 长文本 | 首批接入 |
| 豆包 | 字节跳动 | 对话、多模态 | 首批接入 |
| 智谱 GLM | 智谱 AI | 对话、推理 | 首批接入 |
| 百川 | 百川智能 | 对话 | 首批接入 |
| 讯飞星火 | 科大讯飞 | 对话、语音 | 首批接入 |
| MiMo | 小米 | 推理 | 首批接入 |
| 阶跃星辰 | 阶跃星辰 | 多模态 | 首批接入 |

内测期间将陆续上线更多国产大模型。完整模型清单、模型 ID、价格与可用范围以 [模型广场](https://linktokenview.com/model-plaza) 为准，平台仅接入国产大模型。

---

## 快速开始

### 1. 获取 API Key

打开 <https://linktokenview.com> 注册账号（内测期注册即送 Lite 套餐），在控制台创建 API Key。

### 2. 替换 Base URL 直接调用

Base URL：`https://linktokenview.com/v1`

> 不同 Agent 工具要求的请求地址不同，部分工具需要填写根地址 `https://linktokenview.com`（不要以斜杠结尾）。接入前请对照帮助中心对应工具的接入页面填写。

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
| 按量计费 | Token 实时扣费，用多少付多少 |
| Token Plan | 多档位 Token 预付包，量大价优 |
| 企业专线 | 独占通道、高并发保障、SLA 保障，支持定制化对接 |

最新套餐、价格与订阅入口见 [定价与订阅](https://linktokenview.com/pricing)。

---

## 内测期反馈有奖

内测期间，LinkTokenView 的每一步成长都离不开使用者的参与。无论是体验优化、功能需求，还是希望接入更多国产大模型，都欢迎提出。

- **建议被采纳即送 Token 额度或订阅套餐奖励**
- 每一条建议都可能影响 LinkTokenView 的下一次更新
- 反馈入口：平台**客服**、帮助中心 **[常见问题](https://linktokenview.com/docs/faq)**

奖励规则以平台当前活动说明为准。

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

**内测套餐和正式定价是什么关系？**
内测版订阅套餐是内测期间的压测补贴价，不是正式定价，名额有限。正式定价与套餐档位以 [定价与订阅](https://linktokenview.com/pricing) 页面当前说明为准。

**内测赠送的 Lite 套餐到期后怎么办？**
Lite 体验套餐有效期 7 天，到期后按 [定价与订阅](https://linktokenview.com/pricing) 页面的当前方式充值或订阅即可继续使用。

**邀请返利如何到账？**
邀请好友注册并完成充值后，返利按平台当前规则发放。具体比例与到账方式以控制台邀请页面说明为准。

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
