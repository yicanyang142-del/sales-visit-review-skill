# Sales Visit Review Skill

A reusable Skill for turning a B2B customer meeting transcript and salesperson notes into a grounded visit review and follow-up coaching plan.

## What it returns

- A concise visit summary.
- Customer feedback grouped into pain points, budget, decision chain, and concerns.
- Follow-up actions with suggested time windows.
- A strategy adjustment for the next customer interaction.
- Sales communication reflection with a concrete replacement phrase.

The output is JSON defined by [`schemas/visit-review.schema.json`](schemas/visit-review.schema.json). The Skill explicitly distinguishes evidence from inference and uses `待确认` when a detail is not supported by the input.

## Use with an AI assistant

1. Add [`SKILL.md`](SKILL.md) and the schema to the assistant's skill or instruction directory.
2. Provide the customer name (optional), transcript, and optional sales notes.
3. Ask the assistant to run the `sales-visit-review` Skill.
4. Validate the returned JSON against the schema before saving or displaying it.

See [`prompts/visit-review-system.md`](prompts/visit-review-system.md) for a standalone system prompt and [`examples/synthetic-review.json`](examples/synthetic-review.json) for a fictional example.

## Optional audio integration

This repository handles the review instructions and output contract. An application may separately record audio in the browser and transcribe it before invoking the Skill. For a Next.js application using an OpenAI-compatible STT provider, see [`integrations/nextjs-groq.md`](integrations/nextjs-groq.md). Keep credentials server-side in environment variables; never commit `.env` files or API keys.

## Validate the example

Requires Node.js 20 or newer. No dependencies are needed:

```sh
node tests/validate-example.mjs
```

## Limitations

Speaker attribution is inferred from context and can be wrong, especially when several participants speak or the transcript has recognition errors. Treat inferred roles and coaching suggestions as drafts for salesperson review. This Skill does not verify customer statements independently or send messages.

