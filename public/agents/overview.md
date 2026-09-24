# Agent 工具接入概览

## 推荐：LinkTokenView 桌面版

[LinkTokenView 桌面版](/agents/linktokenview-desktop) 是平台提供的 Windows 桌面客户端，内置编码 Agent。装好后填入平台 API 密钥即可使用，不需要另外安装和配置第三方工具。

- 下载地址：[https://linktokenview.com/download/](https://linktokenview.com/download/)
- 配置步骤：[LinkTokenView 桌面版 接入](/agents/linktokenview-desktop)

## 第三方工具

以下工具由第三方提供，需要自行下载安装，再按对应页面完成配置。

| 你的目标 | 先看哪一页 |
|------|------|
| 想用图形界面完成配置 | [CC Switch 接入](/agents/cc-switch) |
| 想配置 DeepSeek Harness | [DeepSeek Harness 接入](/agents/dsh-desktop) |
| 想配置 WorkBuddy 桌面版 | [WorkBuddy 接入](/agents/workbuddy) |
| 想配置 Claude 桌面版 | [Claude 桌面版接入](/agents/claude-desktop) |
| 想配置 Codex 桌面版 | [Codex 桌面版接入](/agents/codex-desktop) |
| 想配置命令行工具 | [命令行工具 接入](/agents/cli) |

## 配置前

先完成以下准备：

1. [注册与登录](/getting-started)。
2. [创建 API 密钥](/api-keys)。
3. 在[模型广场](/model-plaza)确认要使用的模型信息。

## 第三方工具的配置路径

**DeepSeek Harness（DSH Desktop）** 和 **WorkBuddy** 使用自带的自定义模型功能，可在工具设置中直接填写 LinkTokenView 的 API 地址和密钥，无需经过 CC Switch：

- [DeepSeek Harness 接入](/agents/dsh-desktop)
- [WorkBuddy 接入](/agents/workbuddy)

> DeepSeek Harness 官方框架与 DSH Desktop 桌面端分属不同网站，下载地址不同，详见 [DeepSeek Harness 接入](/agents/dsh-desktop) 开头的说明。

**其他工具**（Claude Code、Claude 桌面版、Codex 桌面版、Codex CLI、Gemini CLI）通过 CC Switch 统一配置；三个命令行工具的步骤相同，见 [命令行工具 接入](/agents/cli)：

1. 打开 [CC Switch 接入](/agents/cc-switch)，选择目标工具。
2. 按对应工具页面填写配置。
3. 重新打开目标工具。
4. 发起一次实际请求。

## 没有对应配置

不要直接复制其他工具的环境变量、配置文件、模型 ID 或 API 路由。记录工具版本和错误提示，再参阅[配置失败排查](/troubleshooting/configuration)。
