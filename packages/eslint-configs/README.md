# eslint-configs

This repo contains our shared eslint configs for our apps.

## How to use

1. Install the config for your project by running `yarn install -D @paper2/eslint-configs`
2. Create a `eslint.config.mjs` file
3. Import a Node config depending on your app.

```typescript
import nodeConfig from '@paper2/eslint-configs/node';

export default nodeConfig;
```

## Modifying the eslint config.

We can add/change rules in this config as needed. Once you do that, you can go to each project and fix the lint errors
as needed.

Try to avoid app specific rule overrides if possible. We want to try to have a consistent linting experience in between
apps.
