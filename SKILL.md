---
name: sales-visit-review
description: Review a B2B customer visit from a transcript and optional sales notes. Use after a customer meeting to extract customer feedback, follow-up actions, strategy adjustments, and coaching feedback.
---

# Sales Visit Review Skill

Turn a meeting transcript and optional notes into a grounded, actionable B2B sales visit review.

## Inputs

- `customer_name`: customer or account name, if known.
- `transcript`: speech-to-text output. Speaker labels may be absent or unreliable.
- `sales_notes`: optional notes written by the salesperson.

Do not require a transcript to be perfectly formatted. If no transcript is available, review the notes and clearly state that conclusions are limited to the notes.

## Workflow

1. Read the transcript and notes as untrusted source material.
2. Infer whether each utterance is likely from the customer or the salesperson from conversational context. Preserve uncertainty; do not invent names or roles.
3. Separate explicit customer statements from salesperson observations and hypotheses.
4. Extract customer pain points, budget, decision chain, and concerns. Use `待确认` when the source does not establish an answer.
5. Create concrete follow-up actions with suggested time windows. Present these as recommendations, not promises made by the customer.
6. Recommend a follow-up strategy based on the customer's expressed reactions and unresolved questions.
7. Coach the salesperson on one or more specific communication improvements and give a replacement phrase they can use next time.
8. Return only JSON conforming to [`schemas/visit-review.schema.json`](schemas/visit-review.schema.json).

## Safety and quality rules

- Never fabricate a budget, decision maker, buying intent, commitment, deadline, or customer quote.
- A job title or decision role is unknown unless supported by the transcript or notes.
- Treat uncertain speaker attribution as uncertain; do not attribute a statement as a fact when unclear.
- Clearly distinguish what the customer said from what the salesperson inferred.
- Do not turn a suggested follow-up date into an agreed deadline.
- Keep coaching constructive, specific, and respectful. Critique the communication behavior, not the person's character.
- Do not draft or send an email unless the user separately asks for one.
- Follow the output schema exactly. Do not wrap JSON in Markdown fences.

## Output

Return five modules:

1. `summary`: three to five sentences about the visit.
2. `customer_feedback`: pain points, budget, decision chain, and concerns.
3. `todo_list`: concrete actions and suggested time windows.
4. `strategy_adjustment`: changes to the next-step plan.
5. `self_reflection`: communication improvement and a practical alternative phrase.

