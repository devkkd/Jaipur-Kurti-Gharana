# 🔧 Render Deployment Troubleshooting

## Common Deploy Errors & Solutions

### Error 1: "Exited with status 1"
This is a generic error. Check specific logs for details.

**Solutions:**
1. Check Render dashboard logs
2. Look for specific error messages
3. Common causes below

---

### Error 2: Out of Memory (OOM)
```
Ran out of memory (used over 512MB)
```

**Solutions:**
```bash
# In Render Dashboard > Environment
NODE_OPTIONS=--max-old-space-size=460
```

**Why 460 instead of 512?**
- Render needs ~50MB for system overhead
- 460MB is safe limit for free tier

---

### Error 3: Build Timeout
```
Build exceeded 15 minutes
```

**Solutions:**
1. Use `npm ci` instead of `npm install`
2. Remove unused dependencies
3. Simplify next.config.mjs

---

### Error 4: Module Not Found
```
Cannot find module 'xyz'
```

**Solutions:**
```bash
# Ensure all dependencies in package.json
npm install xyz --save

# Commit and push
git add package.json package-lock.json
git commit -m "Add missing dependency"
git push
```

---

### Error 5: Environment Variables Missing
```
MONGODB_URI is not defined
```

**Solutions:**
1. Go to Render Dashboard
2. Click your service
3. Go to "Environment" tab
4. Add all required variables:
   - MONGODB_URI
   - JWT_SECRET
   - NEXTAUTH_SECRET
   - NEXTAUTH_URL
   - NODE_ENV=production
   - NODE_OPTIONS=--max-old-space-size=460

---

## Step-by-Step Deployment

### 1. Clean Build Locally
```bash
# Remove old builds
rm -rf .next node_modules

# Fresh install
npm install

# Test build
npm run build

# Test start
npm start
```

### 2. Commit Changes
```bash
git add .
git commit -m "Render deployment fixes"
git push origin main
```

### 3. Render Dashboard Setup

#### Build Settings:
- **Build Command**: `npm ci && npm run build`
- **Start Command**: `npm start`
- **Node Version**: 18.x or 20.x

#### Environment Variables:
```
NODE_ENV=production
NODE_OPTIONS=--max-old-space-size=460
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=https://your-app.onrender.com
```

### 4. Deploy
- Click "Manual Deploy" > "Clear build cache & deploy"
- Wait 5-10 minutes
- Check logs for errors

---

## Checking Logs

### In Render Dashboard:
1. Click your service
2. Click "Logs" tab
3. Look for errors in:
   - Build logs
   - Deploy logs
   - Runtime logs

### Common Log Patterns:

**Success:**
```
✓ Compiled successfully
✓ Collecting page data
✓ Generating static pages
> Ready on http://0.0.0.0:3000
```

**Memory Error:**
```
FATAL ERROR: Reached heap limit
JavaScript heap out of memory
```

**Module Error:**
```
Module not found: Can't resolve 'xyz'
```

---

## Quick Fixes

### Fix 1: Reduce Memory Usage
```javascript
// next.config.mjs - Keep it simple
const nextConfig = {
  output: 'standalone',
  images: { unoptimized: true },
  compress: true,
};
```

### Fix 2: Optimize Package.json
```json
{
  "scripts": {
    "build": "next build",
    "start": "node server.js"
  }
}
```

### Fix 3: Clean Dependencies
```bash
# Remove unused packages
npm prune

# Update package-lock.json
npm install

# Commit
git add package.json package-lock.json
git commit -m "Clean dependencies"
git push
```

---

## Alternative: Vercel (Recommended for Next.js)

If Render continues to fail:

### Why Vercel?
- Built specifically for Next.js
- Better memory management
- Automatic optimizations
- Free tier: 100GB bandwidth
- No cold starts

### Deploy to Vercel:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts
```

---

## Memory Optimization Checklist

- [ ] NODE_OPTIONS set to 460MB
- [ ] output: 'standalone' in next.config
- [ ] images.unoptimized: true
- [ ] No heavy webpack customizations
- [ ] npm ci instead of npm install
- [ ] .next folder in .gitignore
- [ ] node_modules in .gitignore

---

## Build Command Options

### Option 1: Standard (Recommended)
```bash
npm ci && npm run build
```

### Option 2: With Cache Clear
```bash
npm ci && rm -rf .next && npm run build
```

### Option 3: Minimal
```bash
npm install --production=false && npm run build
```

---

## If All Else Fails

### 1. Simplify Everything
- Remove all webpack customizations
- Use minimal next.config.mjs
- Remove unused dependencies

### 2. Check These Files
```
✓ package.json - correct scripts
✓ next.config.mjs - minimal config
✓ server.js - exists and correct
✓ .gitignore - excludes .next
✓ .npmrc - correct settings
```

### 3. Try Different Region
- Change region in render.yaml
- Options: oregon, frankfurt, singapore

### 4. Upgrade Render Plan
- $7/month for 512MB guaranteed
- No memory issues
- Faster builds

### 5. Switch Platform
- **Vercel**: Best for Next.js (Free)
- **Railway**: $5/month
- **Fly.io**: Free tier available
- **Netlify**: Good for static sites

---

## Contact Support

### Render Support:
- Dashboard > Help > Contact Support
- Include: Service name, deploy ID, error logs

### Community Help:
- Render Community Forum
- Next.js Discord
- Stack Overflow

---

## Success Indicators

✅ Build completes in < 10 minutes
✅ No memory errors in logs
✅ App starts successfully
✅ Health check passes
✅ No 502/503 errors

---

## Final Checklist

Before deploying:
- [ ] Local build works: `npm run build`
- [ ] Local start works: `npm start`
- [ ] All env vars set in Render
- [ ] .gitignore excludes build files
- [ ] package.json has correct scripts
- [ ] next.config.mjs is minimal
- [ ] No syntax errors in code
- [ ] Dependencies are up to date

---

**Remember**: Render free tier has limitations. For production apps, consider:
- Render paid plan ($7/month)
- Vercel (free, better for Next.js)
- Railway ($5/month)

Good luck! 🚀
