import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const index = JSON.parse(
  readFileSync(join(__dirname, '..', 'index.json'), 'utf-8'),
)

const slugs = new Map()
let hasError = false

for (const skill of index.skills) {
  if (slugs.has(skill.slug)) {
    console.error(`Duplicate slug: ${skill.slug} (${skill.repo})`)
    hasError = true
  }
  slugs.set(skill.slug, skill.repo)
}

if (hasError) {
  process.exit(1)
}

console.log(`OK: ${index.skills.length} skills, no duplicates`)
