# rolecraft Registry

Central skill registry for [rolecraft](https://github.com/rolecraft-sh/rolecraft).

Skills are published via PR — see `index.json`. Validation and auto-merge are fully automated via GitHub Actions.

## Usage

```bash
# Search
rolecraft search --registry <query>

# Install from registry
rolecraft install <slug>

# Publish your skill
rolecraft publish ./my-skill/
```
