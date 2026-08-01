import { readFileSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Read the PR/push commit's index.json (current working directory)
const index = JSON.parse(
  readFileSync(join(__dirname, '..', 'index.json'), 'utf-8'),
)

// Read the BASE commit's index.json to check existing ownership
const baseSha = process.env.BASE_SHA
let baseIndex = { skills: [] }
if (baseSha) {
  try {
    const raw = execSync(`git show ${baseSha}:index.json`, {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    })
    baseIndex = JSON.parse(raw)
  } catch {
    // If base index can't be read (e.g. first commit), treat as empty
    console.log('WARN: Could not read base index.json — treating as empty')
  }
}

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
  const baseSkill = baseIndex.skills.find((s) => s.slug === slug)
  const newSkill = index.skills.find((s) => s.slug === slug)

  if (baseSkill) {
    // Slug already exists — verify ownership hasn't changed
    if (baseSkill.author !== prAuthor) {
      console.error(
        `Owner mismatch: "${slug}" is owned by "${baseSkill.author}", but PR author is "${prAuthor}". Only the skill owner can modify existing entries.`,
      )
      hasError = true
    }
  } else {
    // New slug — verify the PR author matches the declared author
    if (newSkill && newSkill.author !== prAuthor) {
      console.error(
        `Author mismatch: new slug "${slug}" declares author "${newSkill.author}", but PR author is "${prAuthor}".`,
      )
      hasError = true
    }
  }
}

if (hasError) {
  process.exit(1)
}

console.log(`OK: all ${changedSlugs.length} slug(s) verified for @${prAuthor}`)
