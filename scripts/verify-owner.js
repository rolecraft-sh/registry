import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const index = JSON.parse(
  readFileSync(join(__dirname, '..', 'index.json'), 'utf-8'),
)

const prAuthor = process.env.GH_PR_AUTHOR
const changedSlugs = (process.env.CHANGED_SLUGS || '').split(',').filter(Boolean)

if (!prAuthor) {
  console.log('SKIP: GH_PR_AUTHOR not set')
  process.exit(0)
}

if (changedSlugs.length === 0) {
  console.log('OK: no slug changes to verify')
  process.exit(0)
}

let hasError = false

for (const slug of changedSlugs) {
  const skill = index.skills.find((s) => s.slug === slug)
  if (skill && skill.author !== prAuthor) {
    console.error(
      `Owner mismatch: "${slug}" author is "${skill.author}", PR author is "${prAuthor}"`,
    )
    hasError = true
  }
}

if (hasError) {
  process.exit(1)
}

console.log(`OK: all ${changedSlugs.length} slug(s) owned by @${prAuthor}`)
