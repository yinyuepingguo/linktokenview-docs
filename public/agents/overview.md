# Agent 工具接入概览

按你正在使用的工具选择对应页面。

| 你的目标 | 先看哪一页 |
|------|------|
| 想配置 WorkBuddy 桌面版 | [WorkBuddy 接入](/agents/workbuddy) |
| 想用图形界面完成配置 | [CC Switch 接入](/agents/cc-switch) |
| 想配置 Claude Code | [Claude Code 接入](/agents/claude-code) |
| 想配置 Claude 桌面版 | [Claude 桌面版接入](/agents/claude-desktop) |
| 想配置 Codex 桌面版 | [Codex 桌面版接入](/agents/codex-desktop) |
| 想配置 Codex CLI | [Codex CLI 接入](/agents/codex) |
| 想配置 Gemini CLI | [Gemini CLI 接入](/agents/gemini-cli) |

## 配置前

先完成以下准备：

1. [注册与登录](/getting-started)。
2. [创建 API 密钥](/api-keys)。
3. 在[模型广场](/model-plaza)确认要使用的模型信息。

## 配置路径

**WorkBuddy** 使用自带的自定义模型功能，请直接查看 [WorkBuddy 接入](/agents/workbuddy)。

**其他工具**（Claude Code、Claude Desktop、Codex CLI、Codex Desktop、Gemini CLI）通过 CC Switch 统一配置：

1. 打开 [CC Switch 接入](/agents/cc-switch)，选择目标工具。
2. 按对应工具页面填写配置。
3. 重新打开目标工具。
4. 发起一次实际请求。

## 没有对应配置

不要直接复制其他工具的环境变量、配置文件、模型 ID 或 API 路由。记录工具版本和错误提示，再参阅[配置失败排查](/troubleshooting/configuration)。
