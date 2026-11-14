# Next.js + Groq transcription integration

This is an integration guide; the Skill itself does not record audio, call Groq, or send data anywhere.

## Suggested request flow

1. In the browser, request microphone permission only after the user clicks Record.
2. Record with `MediaRecorder`, stop explicitly, and let the user review their notes before upload.
3. POST the audio and optional notes to an authenticated server-side Route Handler using `FormData`.
4. Enforce an upload limit below the provider's current maximum and accept only audio MIME types your application supports.
5. Transcribe server-side using the OpenAI SDK configured with the provider's OpenAI-compatible base URL and a separate STT key.
6. Pass the transcript and notes to the review prompt in `prompts/visit-review-system.md`.
7. Parse and validate the model response against `schemas/visit-review.schema.json`. Reject malformed output; do not fall back to unvalidated text.
8. Save the result under the authenticated tenant and customer. Never trust tenant or user IDs supplied by the browser.

## Environment variables

Set these only in the server environment or a local ignored `.env.local` file:

```env
STT_API_KEY=
STT_BASE_URL=https://api.groq.com/openai/v1
STT_MODEL=whisper-large-v3
```

Do not send the key to the browser, log it, or commit the populated environment file. Verify the current provider model availability and upload limit before deployment.

## Failure handling

Return clear errors for missing configuration, oversized or unsupported audio, transcription errors, and invalid model JSON. Avoid saving partial results. Do not automatically retry a request that may create duplicate charges unless the provider supports a safe idempotency mechanism.

