<p align="center">
  <img src="https://github.com/rolecraft-sh/rolecraft/raw/main/assets/rolecraft_logo.png" width="120" height="120" alt="RoleCraft">
</p>

<h1 align="center">rolecraft Registry</h1>

<p align="center">
  <a href="https://github.com/rolecraft-sh/registry/actions/workflows/validate.yml"><img src="https://github.com/rolecraft-sh/registry/actions/workflows/validate.yml/badge.svg" alt="Validate"></a>
  <a href="https://github.com/rolecraft-sh/rolecraft"><img src="https://img.shields.io/badge/powered%20by-rolecraft-2ea44f" alt="Powered by rolecraft"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-green" alt="MIT"></a>
</p>

<p align="center">
  Central skill registry for <a href="https://github.com/rolecraft-sh/rolecraft">rolecraft</a> — discover, publish, and share AI agent skills.
</p>

---

## What is this?

The rolecraft Registry is a community-curated index of AI agent skills. Each entry is just **metadata** (slug, name, repo URL). The actual skill code stays in the author's own repository.

Skills are added via PR. Validation and auto-merge are fully automated — no manual review needed.

## Quick start

### Search the registry

```bash
npx rolecraft search react --registry
```

### Install from registry

```bash
npx rolecraft install coverage-guard
```

### Publish your own skill

```bash
# Set your GitHub token (scope: repo)
export GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx

# Publish from your skill directory
npx rolecraft publish ./my-skill/
```

## How to add a skill (manual PR)

Don't use the CLI? You can add your skill by editing `index.json` directly:

1. **Fork** this repo
2. **Edit** [`index.json`](./index.json) — add your entry to the `skills` array
3. **Commit** and **create a PR**

Example entry:

```json
{
  "slug": "my-skill",
  "name": "My Skill",
  "description": "What this skill does",
  "repo": "your-username/your-skill-repo",
  "author": "your-username",
  "versions": ["v1.0.0"],
  "latest": "v1.0.0"
}
```

## Constraints

| Rule | Details |
|------|---------|
| **Slug format** | kebab-case only: `^[a-z0-9]+(-[a-z0-9]+)*$`. Example: `my-skill`, `react-rules` |
| **Slug uniqueness** | Every slug must be unique across the entire registry. Check `index.json` first |
| **Author match** | The `author` field must match your GitHub username (PR author) |
| **Repo must exist** | The `repo` must be a valid GitHub repo containing a `SKILL.md` |
| **Schema validation** | Your entry must validate against [`schema.json`](./schema.json) |
| **No code upload** | Only metadata goes in `index.json`. The actual skill stays in your repo |

## Validation checks

Every PR runs these automated checks:

1. **JSON syntax** — `index.json` must be valid JSON
2. **Schema validation** — Each entry must match [`schema.json`](./schema.json)
3. **Duplicate slugs** — No two skills with the same slug
4. **Owner verification** — The `author` field must match the PR creator's GitHub username

If all checks pass, the PR is **auto-merged**. If any fail, check the Action logs for details.

## Schema reference

Full schema at [`schema.json`](./schema.json). Required fields:

| Field | Type | Required | Example |
|-------|------|----------|---------|
| `slug` | string | yes | `my-skill` |
| `name` | string | yes | `My Skill` |
| `description` | string | no | `Does something useful` |
| `repo` | string | yes | `user/my-skill` |
| `author` | string | yes | `user` |
| `versions` | array | yes | `["v1.0.0"]` |
| `latest` | string | yes | `v1.0.0` |
| `installs` | number | no | `0` |
| `stars` | number | no | `0` |

## Currently listed skills

| Slug | Name | Author | Stars |
|------|------|--------|-------|
| `task-decomposer` | [Task Decomposer](https://github.com/sametcelikbicak/task-decomposer) | sametcelikbicak | 3 |
| `coverage-guard` | [Coverage Guard](https://github.com/sametcelikbicak/coverage-guard) | sametcelikbicak | 3 |

Want to see yours here? [Publish your skill](#how-to-add-a-skill-manual-pr).

## Related

- [rolecraft](https://github.com/rolecraft-sh/rolecraft) — the CLI that uses this registry
- [rolecraft-action](https://github.com/rolecraft-sh/rolecraft-action) — GitHub Action for CI/CD

## License

MIT
