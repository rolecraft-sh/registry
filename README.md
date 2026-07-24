# rolecraft Registry

Central skill registry for [rolecraft](https://github.com/rolecraft-sh/rolecraft).

Skills are added via PR. Validation and auto-merge are fully automated — no manual review needed.

## Quick start (CLI)

```bash
# Search
rolecraft search react --registry

# Install from registry
rolecraft install react-rules

# Publish your skill
# You need your own GitHub token: https://github.com/settings/tokens (scope: repo)
export GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
rolecraft publish ./my-skill/
```

## Quick start (manual PR)

Don't use rolecraft CLI? You can add your skill by editing `index.json` directly:

1. **Fork** this repo
2. **Edit** `index.json` — add your skill entry to the `skills` array
3. **Commit** and **create a PR**

Example entry to add:

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
| **Repo must exist** | The `repo` field must be a valid GitHub repo containing a `SKILL.md` |
| **JSON Schema** | Your entry must validate against `schema.json` in this repo |
| **No code upload** | Only metadata goes in `index.json`. The actual skill stays in your repo |

## Validation checks

Every PR runs these automated checks:

1. **JSON syntax** — `index.json` must be valid JSON
2. **Schema validation** — Each entry must match `schema.json`
3. **Duplicate slugs** — No two skills with the same slug
4. **Owner verification** — The `author` field must match the PR creator's GitHub username

If all checks pass, the PR is auto-merged. If any fail, check the Action logs for details.

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

## Using with rolecraft

See the [rolecraft docs](https://github.com/rolecraft-sh/rolecraft) for full CLI usage.
