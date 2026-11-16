# Sales Visit Review Skill｜拜访复盘

这是一个可复用的 B2B 销售复盘 Skill：把客户会议转写和销售笔记整理成拜访摘要、客户反馈、待办、策略调整和沟通改进建议。

## 解决什么问题

拜访后需要人工复盘客户提到的痛点、预算、决策链和顾虑，并整理下一步动作。这个 Skill 把这个过程结构化，输出可用于复盘、跟进和教练反馈的 JSON。

## 输入

- `customer_name`：客户名称，可选
- `transcript`：会议转写文本
- `sales_notes`：销售笔记，可选

## 输出

返回五个模块：

1. `summary`：拜访摘要
2. `customer_feedback`：痛点、预算、决策链和顾虑
3. `todo_list`：后续行动和建议时间窗
4. `strategy_adjustment`：下一步策略调整
5. `self_reflection`：沟通改进点和替换话术

输出结构见 [`schemas/visit-review.schema.json`](schemas/visit-review.schema.json)。

## 使用方式

1. 把 [`SKILL.md`](SKILL.md) 和 schema 加入到助手或应用的技能目录。
2. 提供客户名称、转写文本和可选销售笔记。
3. 调用 `sales-visit-review` Skill。
4. 使用 schema 校验返回 JSON。

示例：

```sh
node tests/validate-example.mjs
```

## 边界与约束

- 不编造预算、决策人、购买意向、承诺或客户引述。
- 说话人身份由上下文推断，可能出错。
- 不能从建议跟进时间推成客户已确认的截止时间。
- 不负责发送邮件或验证客户陈述。
- 转写或笔记缺失时，结论会明确标注为有限推断。
