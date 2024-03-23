# Few and Far - Marketplace Frontend

This repository contains the frontend code for the Few and Far Marketplace.

Below you'll find documentation on how to setup and run a local development server.

The marketplace uses Vue.js + Nuxt, we recommend you look at the [Nuxt docs here](https://v3.nuxtjs.org).

# Setup

## Environment Variables
You'll need the following environment variables configured to run the codebase.
Add the following environment variables to your .zshrc (.bashrc on Linux)
```
export FF_API_BASE=https://api.staging.fewfar.net
export FF_MARKET_CONTRACT=market.fewandfar.testnet
export FF_NEAR_NET=testnet
export FF_NEAR_RPC=https://rpc.testnet.near.org
export FF_NODE_ENV=development
export FF_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
export FF_WEBSITE_URL=http://localhost:3000
```

Once added if you have not restarted your terminal run the
following command
```bash
source ~/.zshrc
```

## Dependencies

Dependencies can be installed by running the following

```bash
yarn install
```

## Local Development Server

To start the local dev server run the following

```bash
yarn dev
```

# Deployments
The staging and production environments are automatically built and deployed using GitHub actions.

No direct action is required by the end-user to deploy code to either environment.

Code is packaged and uploaded to AWS S3 buckets and is then served via AWS Cloudfront.

Discord messages are sent to the Engineering and QA text channels when Github actions have finished deploying.

Staging messages include commits and files changed. Production is only an announcement.

## Development Demo Environment
Code committed/merged to the `dev` branch is automatically deployed to [https://dev.fewfar.com](https://dev.fewfar.com)

## Production Environment
Code committed/merged into the `main` branch is automatically deployed to [https://fewfar.com](https://fewfar.com)
