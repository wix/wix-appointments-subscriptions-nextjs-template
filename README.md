### A Wix Bookings based "Coacher" template.
![](docs/template-showcase.gif)


A [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Obtaining a Wix Bookings Client ID
In order to be able to integrate with the Wix Bookings system (with paid plans support), you should first define a business in Wix.
1. [Create a site in Wix](https://www.wix.com/blog/2016/06/how-to-create-website-step-by-step-guide/)
2. [Add "Wix Bookings" to your business](https://support.wix.com/en/wix-bookings/setting-up-wix-bookings) (And set it up)
3. [Add "Wix Pricing Plans" to your business](https://support.wix.com/en/pricing-plans/setting-up-pricing-plans) (And set it up)
4. [Create a Client ID](https://manage.wix.com/account/site-selector?title=Select+a+Wix+business+which+includes+Wix+Bookings+and+Wix+Pricing+Plans&actionUrl=https%3A%2F%2Fwww.wix.com%2F_serverless%2Fserverless-create-client-id-alpha%2Fclient-id%3FmsId%3D%7BmetaSiteId%7D&tpaIdFilter=13d21c63-b5ec-5912-8397-c3a5ddb27a97%2C1522827f-c56c-a5c9-2ac9-00f9e6ae12d3)
5. Create an environment variable (locally - `.env.local` and production deployment)
```dotenv
NEXT_PUBLIC_WIX_CLIENT_ID=<Client ID>
```

### Local Development
First, make sure `.env.local` contains a valid client ID (`NEXT_PUBLIC_WIX_CLIENT_ID`).<br>
You can just run 
```shell
cp .env.template .env.local
```
and update the Client ID value.<br>

*Note*: client ID should not be pushed to your source control 


Then, run the development server:

```bash
npm i
npm run dev
# or
yarn
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the template home page.

You can start editing the Home page by modifying `app/page.tsx`. The page auto-updates as you edit the file.<br>
Similarly you can edit any other page - `app/<route>/page.tsx`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Next.js app directory](https://beta.nextjs.org/docs/app-directory-roadmap)

## Deployment
You can deploy this repo using any platform which supports `Next.js` 13 (And app directory roadmap)

The repository only require a single environment variable to be defined `NEXT_PUBLIC_WIX_CLIENT_ID` which points to the client ID which provides the access to the business assets in Wix
