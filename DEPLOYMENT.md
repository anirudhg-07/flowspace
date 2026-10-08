# Deploying Flowspace to Vercel (Monorepo)

Vercel allows us to deploy both the **Web Frontend (React/Vite)** and the **Backend (Express)** in a single project. The web app will be served statically, and the backend will run on Vercel's serverless edge network via API rewrites. 

Follow these steps carefully:

## Step 1: Ensure GitHub is Up To Date
1. Open your terminal in the root directory.
2. Run `git add .`, then `git commit -m "Prepare for Vercel deploy"`, then `git push` to make sure your repository is fully updated.

## Step 2: Import Project to Vercel
1. Go to [vercel.com](https://vercel.com/) and click **Add New...** -> **Project**.
2. Select your `flowspace` repository from GitHub.
3. In the **Configure Project** screen:
   - **Framework Preset**: Leave as `Other` (our custom `vercel.json` will handle the build logic).
   - **Root Directory**: Leave it as the default (the root of the repo).
   - **Build Command**: Type `cd web && npm install && npm run build`
   - **Output Directory**: Type `web/dist`
   - **Install Command**: Leave empty or `npm install`.

## Step 3: Add Environment Variables
Before clicking "Deploy", expand the **Environment Variables** section and add the following keys exactly:

| Name | Value |
| ---- | ----- |
| `DATABASE_URL` | *(Paste your Supabase Connection URL here)* |
| `JWT_SECRET` | *(Type a secure random string, e.g. `my_super_secret_key_123`)* |
| `VITE_API_URL` | `/api` |

*(Note: Setting `VITE_API_URL` to `/api` ensures the React app automatically sends backend requests to the serverless Vercel endpoints on the same domain).*

## Step 4: Deploy
1. Click the **Deploy** button.
2. Vercel will install the dependencies for both the frontend (web) and backend (automatically via the serverless function builder). 
3. Wait for the build to complete. Your Express API and React Web App are now live on a single domain!

## Step 5: Update the Mobile App
Now that the backend is live, you can disconnect the local Cloudflare tunnel and point the mobile app to the real production server!

1. Go to Vercel and copy your new production domain URL (e.g., `https://flowspace.vercel.app`).
2. Open `/mobile/src/api/client.ts` in your code editor.
3. Change the `baseURL` to point to your new domain's API path:
   ```typescript
   baseURL: 'https://YOUR_VERCEL_DOMAIN.vercel.app/api'
   ```
4. Restart your Expo app, and the mobile app will now communicate directly with your production backend!
