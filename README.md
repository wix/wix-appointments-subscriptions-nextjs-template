# Wix Bookings Template: A Next.js Coaching Professional Site

![](docs/media/template-showcase.gif)

This template is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It uses [Wix Headless](https://dev.wix.com/api/sdk/about-wix-headless/overview) to leverage the Wix Bookings business solution for managing appointments.

## Part I: Get started

To integrate the Wix Bookings business solution with the template, first create a project or site on Wix:

### Step 1: Create a project on Wix

> ***Note:*** Currently, to create a new project on Wix, it's necessary to [create a new site](http://wix.com/intro/main). It will soon be possible to create a project without creating a site.

When prompted to add functionalities to your new project, select Bookings and Pricing Plans:

![Apps Menu - select Bookings and Pricing Plans](docs/media/business-first-funnel.png)

You can also add these business solutions to your project later, as follows:

1. Open the [Wix App Market](https://www.wix.com/my-account/site-selector/?buttonText=Select%20Site&title=Select%20a%20Site&autoSelectOnSingleSite=true&actionUrl=https:%2F%2Fwww.wix.com%2Fdashboard%2F%7B%7BmetaSiteId%7D%7D%2Fapp-market) in your project dashboard.
2. Search for **Wix Bookings**, then click **Wix Bookings**. On the [Wix Bookings](https://www.wix.com/my-account/site-selector/?buttonText=Select%20Site&title=Select%20a%20Site&autoSelectOnSingleSite=true&actionUrl=https:%2F%2Fwww.wix.com%2Fdashboard%2F%7B%7BmetaSiteId%7D%7D%2Fapp-market/web-solution/wix-bookings) page, click **Add to Site**.
2. Search for **Wix Pricing Plans**, then click **Wix Pricing Plans**. On the [Wix Pricing Plans](https://www.wix.com/my-account/site-selector/?buttonText=Select%20Site&title=Select%20a%20Site&autoSelectOnSingleSite=true&actionUrl=https:%2F%2Fwww.wix.com%2Fdashboard%2F%7B%7BmetaSiteId%7D%7D%2Fapp-market/web-solution/paid-plans) page, click **Add to Site**.

### Step 2: Set up the Wix business solutions you need

See the [Wix Bookings Essential Checklist](https://support.wix.com/en/article/wix-bookings-the-essential-checklist-for-professional-bookings-site-owners) for information on configuring the services and plans your business needs.

> ***Note:*** You can add Wix Bookings functionality to your project for free, but you must [upgrade to a Business Premium Plan](https://support.wix.com/en/article/wix-bookings-upgrading-wix-bookings-to-a-business-premium-plan) to accept bookings.

### Step 3: Authorize the template

There are 2 ways to authorize the template to access your Wix project:

+ [Option A: Quick start deployment](#option-a-quick-start-deployment).
+ [Option B: Create an OAuth client ID in the Wix dashboard](#option-b-create-an-oauth-client-id-in-the-wix-dashboard).

#### Option A: Quick start deployment

Click the quick start deployment link below to automatically authorize your template and configure your project. You'll be prompted to log in to your Wix account and to authorize the platform to access your project or site.

Authentication credentials are automatically incorporated into the template, making it easy to get started coding and customizing.

##### Netlify
[![Netlify Status](https://api.netlify.com/api/v1/badges/5c157945-33fe-469c-b694-961db274a9bd/deploy-status)](https://app.netlify.com/sites/wix-appointments-subscriptions-nextjs/deploys)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://manage.wix.com/headless-funnel-nextjs/netlify?repository=https://github.com/wix/wix-appointments-subscriptions-nextjs-template)

For more information, see [How to Deploy Next.js Sites to Netlify](https://www.netlify.com/blog/2020/11/30/how-to-deploy-next.js-sites-to-netlify/) or view the demo [here](https://netlify.bookings-appointments-demo.wix.dev/).

**Note** - In order to view the full flow in the demo site, use the coupon code `FREE` to book appointments or `FREEPLAN` to purchase paid plans

#### Option B: Create an OAuth client ID in the Wix dashboard

Read [Set Up Authorization](https://dev.wix.com/api/sdk/sdk-setup:-wix-headless/authorization) in the Wix SDK documentation for instructions on how to manually create an OAuth app and generate a client ID in the [Headless Settings](https://www.wix.com/my-account/site-selector/?buttonText=Select%20Site&title=Select%20a%20Site&autoSelectOnSingleSite=true&actionUrl=https:%2F%2Fwww.wix.com%2Fdashboard%2F%7B%7BmetaSiteId%7D%7D%2Foauth-apps-settings) menu of the Wix dashboard.

After creating an OAuth app, store the Client ID in a secure location.

> **Note:** Do not push the client ID to your source control.

To set up environment variables for consuming Wix Headless APIs, follow these steps:

##### Local development environment

1. At the terminal, in the template's root folder, type `cp .env.template .env.local`.
2. In the new `.env.local` file, paste the client ID after `NEXT_PUBLIC_WIX_CLIENT_ID=`.

##### Production environment

In your deployment provider, add an environment variable called `NEXT_PUBLIC_WIX_CLIENT_ID` containing the client ID.

## Part II: Local Development

Once you’ve [authorized and configured](#part-i-get-started) your client, run the development server:

```shell
yarn
yarn dev
```

or

```shell
npm i
npm run dev
```

Open http://localhost:3000 with your browser to see the template home page.

You can start editing the homepage by modifying `app/page.tsx`. The page auto-updates as you edit the file.

Similarly, you can edit any other page on the pattern `app/<route>/page.tsx`. For more information, see [Defining Routes](https://beta.nextjs.org/docs/routing/defining-routes) in the Next.js documentation.

## Part III: Checkout and payments

The template implements checkout by redirecting visitors to a Wix-managed page. You can configure your business's checkout in the [eCommerce Settings](https://www.wix.com/my-account/site-selector/?buttonText=Select%20Site&title=Select%20a%20Site&autoSelectOnSingleSite=true&actionUrl=https:%2F%2Fwww.wix.com%2Fdashboard%2F%7B%7BmetaSiteId%7D%7D%2Fstore/settings) menu in the Wix dashboard.

To enable online checkout for the template, follow these steps:

### Step 1: Publish the Wix site

> ***Note:*** Currently, in order to create a new project on Wix, it's necessary to [create a new site](http://wix.com/intro/main) and publish it. You don't need to use this site, but publishing it enables the checkout page to go live on the web. It will soon be possible to create a project without creating a site.

To publish a 'dummy' site, follow these steps:


1. In your project [dashboard](https://www.wix.com/my-account/site-selector/?buttonText=Select%20Site&title=Select%20a%20Site&autoSelectOnSingleSite=true&actionUrl=https:%2F%2Fwww.wix.com%2Fdashboard%2F%7B%7BmetaSiteId%7D%7D%2F) click **Design Site**.
2. Select **Let Wix create a site for you**.
3. Select any template.
4. Click **Edit My Site Design**.
5. Click **Publish**.
6. In the **Publish** popup you can set the site’s address or connect a domain. This is the URL that appears as your checkout redirect base URL. If you don't change the base URL now, you can change it later.

### Step 2: Upgrade to a Business Premium Plan

To enable the checkout page and accept payments using Wix business solutions, you need to [upgrade to a Business Premium Plan](https://support.wix.com/en/article/wix-bookings-upgrading-wix-bookings-to-a-business-premium-plan).

### Step 3: Change the checkout redirect base URL (optional)

To change the redirect base URL, follow these steps in the project [dashboard](https://www.wix.com/my-account/site-selector/?buttonText=Select%20Site&title=Select%20a%20Site&autoSelectOnSingleSite=true&actionUrl=https:%2F%2Fwww.wix.com%2Fdashboard%2F%7B%7BmetaSiteId%7D%7D%2F):
1. Click **Site Actions** (the ellipsis next to **Edit Site**).
2. Click **Rename Site**.
3. Change the editable part of the URL in **Site Address (URL)** and click **Save**.

Alternatively, you can [connect a custom domain](https://support.wix.com/en/article/about-domains).

## Part IV: Learn more about the tech stack

To learn how to customize the template and add more functionality using Wix APIs, see the [Wix JavaScript SDK reference documentation](https://dev.wix.com/api/sdk).

This template is written in [Next.js](https://nextjs.org/docs) 13 using [Next.js app directory](https://beta.nextjs.org/docs/app-directory-roadmap). To learn more about `Next.js`, see the following resources:

+ [Next.js documentation](https://nextjs.org/docs): Learn about Next.js features and APIs.
+ [Learn Next.js](https://nextjs.org/learn): An interactive Next.js tutorial.
+ [Next.js app directory](https://beta.nextjs.org/docs/app-directory-roadmap): Information on the Next.js App Router Roadmap.

Additionally, this template uses the following libraries and features:
+ [React Server Components](https://nextjs.org/docs/advanced-features/react-18/server-components)
+ [TypeScript](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html)
+ [TanStack Query <sup>v4</sup>](https://tanstack.com/query/latest)
+ [Tailwind CSS](https://tailwindcss.com/)
+ [Flowbite](https://flowbite.com/)
+ [Wix client SDK](https://dev.wix.com/api/sdk/introduction)

## Part V: Deployment

You can deploy this repository using any platform which supports Next.js Version 13 and the [App Router Roadmap](https://beta.nextjs.org/docs/app-directory-roadmap).

The repository only requires a single environment variable: `NEXT_PUBLIC_WIX_CLIENT_ID`, which should contain a client ID authorizing access to a Wix project's data.
