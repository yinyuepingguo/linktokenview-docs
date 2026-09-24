# 命令行工具 接入（Claude Code、Codex CLI、Gemini CLI）

这三个命令行工具都通过 [CC Switch 接入指南](/agents/cc-switch)配置供应商。步骤完全一样，区别只在 CC Switch 里选哪个工具分组。

## 配置前

- 已完成[注册与登录](/getting-started)。
- 已创建 LinkTokenView API 密钥，详见[创建 API 密钥](/api-keys)。
- 已安装并能正常启动要配置的命令行工具。
- 已在[模型广场](/model-plaza)确认要使用的模型。

各工具的官方文档：

| 工具 | 官方文档 |
|------|------|
| Claude Code | [https://code.claude.com/docs/en/overview](https://code.claude.com/docs/en/overview) |
| Codex CLI | [https://openai.com/zh-Hans-CN/codex/](https://openai.com/zh-Hans-CN/codex/) |
| Gemini CLI | [https://geminicli.com](https://geminicli.com) |

## 选对 CC Switch 分组

| 要配置的工具 | CC Switch 顶部选择 | 供应商类型 |
|------|------|------|
| Claude Code | **Claude** | Claude 供应商 |
| Codex CLI | **Codex** | Codex 供应商 |
| Gemini CLI | **Gemini** | Gemini 供应商 |

## 填写配置

1. 启动 CC Switch，按上表选择对应的工具分组。
2. 点击 **+** 按钮，选择对应的供应商类型，再选择 **自定义配置**。
3. 填写以下内容：
   - **供应商名称**：自定义名称，例如「LinkTokenView」
   - **API Key**：你的 LinkTokenView API 密钥
   - **请求地址**：`https://linktokenview.com`（不要以斜杠结尾）
4. 点击 **+ 添加**，然后切换到该配置。
5. 在终端中启动对应的命令行工具，发起一次实际请求，确认返回正常结果。

> 请求地址因工具而异。命令行工具经 CC Switch 配置时使用根地址 `https://linktokenview.com`，**不要添加 `/v1` 后缀**；桌面版预填的地址不同，见 [LinkTokenView 桌面版 接入](/agents/linktokenview-desktop)。

## 出错时

- 检查 API 密钥是否填写正确。
- 确认命令行工具使用的是刚保存的配置。
- 重新打开工具后再次发起请求。
- 在[模型广场](/model-plaza)确认模型仍可用。
- 仍无法解决时，整理错误信息后[联系客服](/support)。
