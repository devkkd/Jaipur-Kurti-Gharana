# 🚀 Render Deployment Guide - Memory Optimization

## Problem
Render free tier has 512MB memory limit. Next.js apps can exceed this during build/runtime.

## Solutions Implemented

### 1. ✅ Package.json Optimizations
```json
{
  "scripts": {
    "build": "NODE_OPTIONS='--max-old-space-size=512' next build",
    "start": "NODE_OPTIONS='--max-old-space-size=512' node server.js"
  }
}
```

### 2. ✅ Next.js Config Optimizations
- **Output**: `standalone` - Reduces deployment size
- **Images**: `unoptimized: true` - Saves memory
- **Compression**: Enabled
- **Code Splitting**: Aggressive chunking (244KB max)
- **Tree Shaking**: Optimized imports

### 3. ✅ Custom Server (server.js)
- Memory-optimized Node.js server
- Graceful shutdown handling
- Better error handling
- Production-ready configuration

### 4. ✅ Render Configuration (render.yaml)
```yaml
services:
  - type: web
    env: node
    plan: free
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_OPTIONS
        value: --max-old-space-size=512
```

## Deployment Steps

### Step 1: Push Code to GitHub
```bash
git add .
git commit -m "Memory optimizations for Render"
git push origin main
```

### Step 2: Render Dashboard Settings
1. Go to Render Dashboard
2. Select your service
3. Go to "Environment" tab
4. Add these variables:
   ```
   NODE_ENV=production
   NODE_OPTIONS=--max-old-space-size=512
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=https://your-app.onrender.com
   ```

### Step 3: Build Settings
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Node Version**: 18.x or higher

### Step 4: Deploy
Click "Manual Deploy" or push to trigger auto-deploy.

## Memory Optimization Techniques

### 1. Code Splitting
```javascript
// next.config.mjs
splitChunks: {
  chunks: 'all',
  maxSize: 244000, // 244KB chunks
}
```

### 2. Dynamic Imports
```javascript
// Use dynamic imports for heavy components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false
});
```

### 3. Image Optimization
```javascript
// Disable Next.js image optimization
images: {
  unoptimized: true
}
```

### 4. Remove Unused Dependencies
```bash
npm prune --production
```

### 5. Optimize Package Imports
```javascript
// Instead of
import { Button, Card, Modal } from 'heavy-ui-library';

// Use
import Button from 'heavy-ui-library/Button';
import Card from 'heavy-ui-library/Card';
```

## Monitoring Memory Usage

### Check Logs in Render
```bash
# Memory usage will be logged
> Memory limit: --max-old-space-size=512
```

### If Still Failing
1. **Reduce Dependencies**: Remove unused packages
2. **Lazy Load**: Use dynamic imports more
3. **Static Generation**: Use `generateStaticParams` where possible
4. **API Routes**: Optimize database queries
5. **Upgrade Plan**: Consider Render paid plan ($7/month for 512MB+)

## Common Issues & Fixes

### Issue 1: Build Fails with OOM
**Solution**: Reduce build memory
```json
"build": "NODE_OPTIONS='--max-old-space-size=384' next build"
```

### Issue 2: Runtime Crashes
**Solution**: Optimize runtime memory
```javascript
// Use streaming for large responses
export async function GET() {
  const stream = new ReadableStream({
    async start(controller) {
      // Stream data in chunks
    }
  });
  return new Response(stream);
}
```

### Issue 3: Slow Cold Starts
**Solution**: Keep instance warm
```javascript
// Add a health check endpoint
export async function GET() {
  return Response.json({ status: 'ok' });
}
```

## Performance Tips

### 1. Database Connection Pooling
```javascript
// Use connection pooling
const client = await MongoClient.connect(uri, {
  maxPoolSize: 10,
  minPoolSize: 2
});
```

### 2. Caching
```javascript
// Cache API responses
export const revalidate = 3600; // 1 hour
```

### 3. Reduce Bundle Size
```bash
# Analyze bundle
npm run build
# Check .next/analyze/
```

### 4. Use CDN for Static Assets
- Upload images to Cloudinary/S3
- Use external CDN for fonts
- Serve videos from external sources

## Alternative Solutions

### If Memory Issues Persist:

1. **Vercel** (Recommended)
   - Better Next.js support
   - Automatic optimizations
   - Free tier: 100GB bandwidth

2. **Railway**
   - $5/month for 512MB
   - Better memory handling

3. **Fly.io**
   - Free tier: 256MB (3 instances)
   - Good for Next.js

4. **Render Paid Plan**
   - $7/month for 512MB guaranteed
   - No cold starts

## Files Modified/Created

### Modified
1. `package.json` - Memory-optimized scripts
2. `next.config.mjs` - Production optimizations

### Created
1. `server.js` - Custom Node.js server
2. `render.yaml` - Render configuration
3. `.dockerignore` - Exclude unnecessary files
4. `RENDER_DEPLOYMENT.md` - This guide

## Testing Locally

### Test Production Build
```bash
npm run build
npm start
```

### Monitor Memory
```bash
# Windows
tasklist | findstr node

# Linux/Mac
ps aux | grep node
```

## Success Checklist

- [ ] Code pushed to GitHub
- [ ] Environment variables set in Render
- [ ] Build command: `npm install && npm run build`
- [ ] Start command: `npm start`
- [ ] NODE_OPTIONS set to `--max-old-space-size=512`
- [ ] Health check endpoint working
- [ ] No memory errors in logs
- [ ] App loads successfully

## Support

If issues persist:
1. Check Render logs
2. Reduce dependencies
3. Optimize images
4. Consider paid plan
5. Contact Render support

## Estimated Memory Usage

- **Build**: ~400-500MB
- **Runtime**: ~300-400MB
- **Peak**: ~450-512MB

With optimizations, should stay under 512MB limit! 🎉

---

**Note**: Free tier has limitations. For production apps with high traffic, consider upgrading to paid plan.
