import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const index = JSON.parse(
  readFileSync(join(__dirname, '..', 'index.json'), 'utf-8'),
)

const changedSlugs = (process.env.CHANGED_SLUGS || '').split(',').filter(Boolean)
const token = process.env.GITHUB_TOKEN

if (changedSlugs.length === 0) {
  console.log('OK: no slug changes to verify')
  process.exit(0)
}

let hasError = false

for (const slug of changedSlugs) {
  const skill = index.skills.find((s) => s.slug === slug)
  if (!skill) continue

  const repo = skill.repo
  if (!repo) {
    console.error(`"${slug}" has no repo field`)
    hasError = true
    continue
  }

  const headers = token ? { Authorization: `Bearer ${token}` } : {}
  const url = `https://api.github.com/repos/${repo}/contents/SKILL.md`
  const res = await fetch(url, { headers })
  if (!res.ok && res.status !== 403) {
    console.error(
      `Source repo "${repo}" does not exist or has no SKILL.md for slug "${slug}" (HTTP ${res.status})`,
    )
    hasError = true
  } else if (res.status === 403) {
    console.log(`⚠ Rate limited checking "${repo}" — skipping`)
  } else {
    console.log(`✓ "${repo}" confirmed (SKILL.md found)`)
  }
}

if (hasError) {
  process.exit(1)
}

console.log(`OK: all ${changedSlugs.length} source repo(s) verified`)
