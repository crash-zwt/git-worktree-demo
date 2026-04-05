---
name: skill-creator
description: This skill should be used when users want to create a new skill (or update an existing skill) that extends Claude's capabilities with specialized knowledge, workflows, or tool integrations.
license: Complete terms in LICENSE.txt
---

# Skill Creator

本 skill 提供创建有效 skills 的指导。

## 关于 Skills

Skills 是模块化、自包含的包，通过提供专业领域知识、工作流程和工具来扩展 Claude 的能力。可以将它们视为特定领域或任务的"入职指南"——它们将 Claude 从通用 agent 转变为配备程序性知识的专业 agent，这是模型无法完全拥有的。

### Skills 提供什么

1. **专业工作流程** - 特定领域的多步骤流程
2. **工具集成** - 处理特定文件格式或 API 的说明
3. **领域专业知识** - 公司特定知识、schemas、业务逻辑
4. **捆绑资源** - 复杂和重复性任务的脚本、参考和资产

### Skill 的结构

每个 skill 由一个必需的 SKILL.md 文件和可选的捆绑资源组成：

```
skill-name/
├── SKILL.md (必需)
│   ├── YAML frontmatter 元数据 (必需)
│   │   ├── name: (必需)
│   │   └── description: (必需)
│   └── Markdown 说明 (必需)
└── 捆绑资源 (可选)
    ├── scripts/          - 可执行代码 (Python/Bash/等)
    ├── references/       - 按需加载到上下文中的文档
    └── assets/          - 输出中使用的文件 (模板、图标、字体等)
```

#### SKILL.md (必需)

**元数据质量：** YAML frontmatter 中的 `name` 和 `description` 决定 Claude 何时使用该 skill。需具体说明 skill 做什么以及何时使用。使用第三人称（例如"This skill should be used when..."而不是"Use this skill when..."）。

#### 捆绑资源 (可选)

##### Scripts (`scripts/`)

用于需要确定性可靠性或被重复重写的任务的可执行代码 (Python/Bash/等)。

- **何时包含**：当相同的代码被重复重写或需要确定性可靠性时
- **范例**：`scripts/rotate_pdf.py` 用于 PDF 旋转任务
- **优势**：Token 高效、确定性、可在不加载到上下文的情况下执行
- **注意**：Claude 可能仍需读取脚本进行修补或环境特定调整

##### References (`references/`)

旨在按需加载到上下文中的文档和参考资料，以指导 Claude 的流程和思考。

- **何时包含**：对于 Claude 在工作时应参考的文档
- **范例**：`references/finance.md` 用于财务 schema、`references/mnda.md` 用于公司 NDA 模板、`references/policies.md` 用于公司政策、`references/api_docs.md` 用于 API 规范
- **用例**：数据库 schemas、API 文档、领域知识、公司政策、详细工作流程指南
- **优势**：保持 SKILL.md 精简，仅在 Claude 确定需要时加载
- **最佳实践**：如果文件很大（>10k 字），在 SKILL.md 中包含 grep 搜索模式
- **避免重复**：信息应存在于 SKILL.md 或 references 文件中，而非两者皆存。优先将详细信息放在 references 文件中，除非确实是 skill 的核心——这保持 SKILL.md 精简，同时使信息可被发现而不占用上下文窗口。只将必要的程序性说明和工作流程指导放在 SKILL.md 中；将详细的参考资料、schemas 和范例移到 references 文件。

##### Assets (`assets/`)

不打算加载到上下文中，而是在 Claude 生成的输出中使用的文件。

- **何时包含**：当 skill 需要在最终输出中使用的文件时
- **范例**：`assets/logo.png` 用于品牌资产、`assets/slides.pptx` 用于 PowerPoint 模板、`assets/frontend-template/` 用于 HTML/React 样板、`assets/font.ttf` 用于字体
- **用例**：模板、图片、图标、样板代码、字体、会被复制或修改的范例文档
- **优势**：将输出资源与文档分离，使 Claude 能在不将文件加载到上下文的情况下使用文件

### 渐进式披露设计原则

Skills 使用三级加载系统来高效管理上下文：

1. **元数据 (name + description)** - 始终在上下文中（约 100 字）
2. **SKILL.md 正文** - 当 skill 触发时（<5k 字）
3. **捆绑资源** - 按 Claude 需要（无限*）

*无限，因为脚本可以在不读取到上下文窗口的情况下执行。

## Skill 创建流程

创建 skill 时，按"Skill 创建流程"顺序进行，除非有明确原因跳过某步骤。

### 步骤 1：用具体范例理解 Skill

只有在 skill 的使用模式已被清楚理解时才跳过此步骤。即使在处理现有 skill 时，它仍然有价值。

要创建有效的 skill，需清楚理解 skill 将如何使用的具体范例。这种理解可以来自直接的用户范例或经用户反馈验证的生成范例。

例如，在构建图像编辑器 skill 时，相关问题包括：

- "图像编辑器 skill 应该支持哪些功能？编辑、旋转、还有什么？"
- "能举一些这个 skill 如何使用的范例吗？"
- "我能想象用户会要求'去除这张照片的红眼'或'旋转这张图片'。还能想到其他使用方式吗？"
- "用户说什么应该触发这个 skill？"

为避免让用户不知所措，避免在单条消息中问太多问题。从最重要的问题开始，根据需要跟进以提高效率。

当对 skill 应支持的功能有清晰认识时结束此步骤。

### 步骤 2：规划可复用的 Skill 内容

要将具体范例转化为有效的 skill，通过以下方式分析每个范例：

1. 考虑如何从头开始执行范例
2. 识别执行这些工作流程时会有帮助的脚本、参考资料和资产

范例：构建一个 `pdf-editor` skill 来处理"帮我旋转这个 PDF"等查询，分析显示：

1. 旋转 PDF 每次需要重写相同的代码
2. 一个 `scripts/rotate_pdf.py` 脚本将有助于存储在 skill 中

范例：设计一个 `frontend-webapp-builder` skill 用于"帮我构建一个待办事项应用"或"帮我构建一个步数追踪仪表板"等查询，分析显示：

1. 编写前端 Web 应用每次需要相同的 HTML/React 样板
2. 一个包含样板 HTML/React 项目文件的 `assets/hello-world/` 模板将有助于存储在 skill 中

范例：构建一个 `big-query` skill 来处理"今天有多少用户登录？"等查询，分析显示：

1. 查询 BigQuery 每次需要重新发现表 schemas 和关系
2. 一个记录表 schemas 的 `references/schema.md` 文件将有助于存储在 skill 中

要确定 skill 的内容，分析每个具体范例以创建要包含的可复用资源列表：脚本、参考资料和资产。

### 步骤 3：初始化 Skill

现在是时候实际创建 skill 了。

只有当要开发的 skill 已存在且需要迭代或打包时才跳过此步骤。在这种情况下，继续下一步。

从头开始创建新 skill 时，始终运行 `init_skill.py` 脚本。该脚本方便地生成一个新的模板 skill 目录，自动包含 skill 所需的一切，使 skill 创建过程更加高效和可靠。

用法：

```bash
scripts/init_skill.py <skill-name> --path <output-directory>
```

该脚本：

- 在指定路径创建 skill 目录
- 生成带正确 frontmatter 和 TODO 占位符的 SKILL.md 模板
- 创建范例资源目录：`scripts/`、`references/` 和 `assets/`
- 在每个目录中添加可在之后自定义或删除的范例文件

初始化后，根据需要自定义或删除生成的 SKILL.md 和范例文件。

### 步骤 4：编辑 Skill

在编辑（新创建或现有）skill 时，记住该 skill 是为另一个 Claude 实例使用的。专注于包含对 Claude 有益且不显而易见的信息。考虑什么样的程序性知识、特定领域的细节或可复用资产能帮助另一个 Claude 实例更有效地执行这些任务。

#### 从可复用 Skill 内容开始

要开始实现，从上面识别的可复用资源开始：`scripts/`、`references/` 和 `assets/` 文件。注意此步骤可能需要用户输入。例如，在实现 `brand-guidelines` skill 时，用户可能需要提供品牌资产或模板存储在 `assets/` 中，或文档存储在 `references/` 中。

同时，删除 skill 不需要的范例文件和目录。初始化脚本在 `scripts/`、`references/` 和 `assets/` 中创建范例文件以演示结构，但大多数 skills 不需要所有这些。

#### 更新 SKILL.md

**写作风格：** 使用**祈使句/不定式形式**（动词优先指令）编写整个 skill，而不是第二人称。使用客观的、教学性的语言（例如"要完成 X，做 Y"而不是"你应该做 X"或"如果你需要做 X"）。这保持 AI 消费的一致性和清晰度。

要完成 SKILL.md，回答以下问题：

1. 这个 skill 的目的是什么，用几句话说明？
2. 何时应使用这个 skill？
3. 在实践中，Claude 应如何使用这个 skill？所有上面开发的可复用 skill 内容都应被引用，以便 Claude 知道如何使用它们。

### 步骤 5：打包 Skill

一旦 skill 准备就绪，应将其打包成可分发的 zip 文件，与用户共享。打包过程会自动验证 skill 以确保满足所有要求：

```bash
scripts/package_skill.py <path/to/skill-folder>
```

可选输出目录规范：

```bash
scripts/package_skill.py <path/to/skill-folder> ./dist
```

打包脚本将：

1. **自动验证** skill，检查：
   - YAML frontmatter 格式和必需字段
   - Skill 命名规范和目录结构
   - Description 完整性和质量
   - 文件组织和资源引用

2. **打包** skill（如果验证通过），创建一个以 skill 命名的 zip 文件（例如 `my-skill.zip`），包含所有文件并保持正确的目录结构以便分发。

如果验证失败，脚本将报告错误并退出，不创建包。修复任何验证错误并再次运行打包命令。

### 步骤 6：迭代

测试 skill 后，用户可能请求改进。通常在刚使用 skill 后发生，带着 skill 表现的新鲜上下文。

**迭代工作流程：**
1. 在实际任务上使用 skill
2. 注意困难或低效之处
3. 确定 SKILL.md 或捆绑资源应如何更新
4. 实现更改并再次测试
