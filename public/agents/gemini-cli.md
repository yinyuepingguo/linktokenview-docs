# Gemini CLI 接入

## 配置前

- 已完成[注册与登录](/getting-started)。
- 已创建 LinkTokenView API 密钥，详见[创建 API 密钥](/api-keys)。
- 已安装并能正常启动当前版本的 Gemini CLI。
- 已在[模型广场](/model-plaza)确认要使用的模型。
- **官方主页**：[https://geminicli.com](https://geminicli.com)

## 配置

Gemini CLI 通过 [CC Switch 接入指南](/agents/cc-switch)配置供应商：

1. 启动 CC Switch，选择 **Gemini**。
2. 点击 **+**，进入「Gemini 供应商」并选择 **自定义配置**。
3. 填写以下内容：
   - **供应商名称**：自定义名称，例如「LinkTokenView」
   - **API Key**：你的 LinkTokenView API 密钥
   - **请求地址**：`https://linktokenview.com`（不要以斜杠结尾）
4. 点击 **+ 添加**，然后切换到该配置。
5. 在终端中启动 Gemini CLI，发起一次实际请求。

## 出错时

- 检查 API 密钥是否填写正确。
- 确认 Gemini CLI 使用的是刚保存的配置。
- 重新打开工具后再次发起请求。
- 在[模型广场](/model-plaza)确认模型仍可用。
- 仍无法解决时，整理错误信息后[联系客服](/support)。
