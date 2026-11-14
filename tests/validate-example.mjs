import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const schema = JSON.parse(await readFile(new URL('../schemas/visit-review.schema.json', import.meta.url), 'utf8'));
const example = JSON.parse(await readFile(new URL('../examples/synthetic-review.json', import.meta.url), 'utf8'));
const expected = schema.required;
assert.deepEqual(Object.keys(example).sort(), [...expected].sort());
assert.deepEqual(Object.keys(example.customer_feedback).sort(), ['budget', 'concerns', 'decision_chain', 'pain_points']);
assert.ok(Array.isArray(example.todo_list));
for (const todo of example.todo_list) {
  assert.equal(typeof todo.action, 'string');
  assert.equal(typeof todo.suggested_time, 'string');
}
console.log('PASS: synthetic example matches the visit review output contract');
