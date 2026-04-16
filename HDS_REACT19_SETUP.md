# HDS React 19 Setup Instructions

These instructions guide you through installing React 19 version from the Helsinki Design System (HDS) packages using the local development setup with yalc.

## Prerequisites

- Local clone of the `react-19-update` branch in the `helsinki-design-system` repository
- `yalc` installed globally (`npm install -g yalc`)

## Installation Steps

### 1. Install hds-core

1. In the `helsinki-design-system` repository:
   ```bash
   yarn build:core
   ```

2. Publish locally with yalc in the `packages/core` folder:
   ```bash
   cd packages/core
   npx yalc publish
   ```

3. Add to palvelutarjotin-admin:
   ```bash
   npx yalc add hds-core
   ```

### 2. Install hds-design-tokens

1. In the `helsinki-design-system` repository:
   ```bash
   yarn build:tokens
   ```

2. Publish locally with yalc in the `packages/design-tokens` folder:
   ```bash
   cd packages/design-tokens
   npx yalc publish
   ```

3. Add to palvelutarjotin-admin:
   ```bash
   npx yalc add hds-design-tokens
   ```

### 3. Install hds-react

1. In the `helsinki-design-system` repository:
   ```bash
   yarn build:react
   ```

2. Publish locally with yalc in the `packages/react` folder:
   ```bash
   cd packages/react
   npx yalc publish
   ```

3. Add to palvelutarjotin-admin:
   ```bash
   npx yalc add hds-react
   ```

## Summary

After completing all three steps, your palvelutarjotin-admin project will be using the React 19 versions of:
- `hds-core`
- `hds-design-tokens`
- `hds-react`

These packages will be linked via yalc for local development and testing.