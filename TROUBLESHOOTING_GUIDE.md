# Matalino AI Website - Deployment Troubleshooting Guide

## 🔍 Diagnostic Commands

### Quick Health Check
```bash
# Navigate to project directory
cd /home/ubuntu/matalino-ai-website/app

# Check git status and recent commits
git status
git log -5 --oneline

# Verify environment variables
echo "NEXTAUTH_URL: $NEXTAUTH_URL"
echo "DATABASE_URL: $DATABASE_URL"

# Test database connection
npx prisma db pull

# Check build status
yarn build

# Verify server is running
ps aux | grep -E "(next|node)" | grep -v grep
```

## 🚨 Common Issues & Solutions

### 1. "Freemium Features Not Appearing"

**Symptoms:**
- Pricing page shows old content
- Authentication not working
- Dashboard not accessible

**Diagnosis Steps:**
```bash
# Check if latest code is deployed
git log -1 --oneline

# Verify build includes latest changes
ls -la .next/server/app/pricing/
cat .next/server/app/pricing/page.js | grep -i "pro\|free"

# Check if environment variables are loaded
node -e "console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL)"
```

**Solutions:**
1. **Force rebuild and restart:**
   ```bash
   # Kill existing processes
   pkill -f "next\|node"
   
   # Clear cache and rebuild
   rm -rf .next .build
   yarn install
   yarn build
   
   # Restart development server
   yarn dev
   ```

2. **Check database migrations:**
   ```bash
   npx prisma migrate status
   npx prisma migrate deploy
   npx prisma generate
   ```

### 2. "Authentication System Not Working"

**Symptoms:**
- Sign-in page not loading
- Users can't register
- Session not persisting

**Diagnosis:**
```bash
# Check NextAuth configuration
cat app/api/auth/[...nextauth]/route.ts

# Verify database tables exist
npx prisma studio
# Or check via SQL
npx prisma db execute --stdin <<< "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';"
```

**Solutions:**
1. **Fix environment variables:**
   ```bash
   # Update .env file
   cat > app/.env << EOF
   DATABASE_URL="postgresql://role_83eb1ba10:YoJDXEs0ssIU3Q05kvU9HDQ3sehkBsBD@db-83eb1ba10.db001.hosteddb.reai.io:5432/83eb1ba10"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="$(openssl rand -base64 32)"
   STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key_here"
   STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key_here"
   STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret_here"
   STRIPE_PRICE_ID="price_your_price_id_here"
   EOF
   ```

2. **Reset and recreate database:**
   ```bash
   npx prisma migrate reset --force
   npx prisma migrate dev --name init
   npx prisma generate
   ```

### 3. "Stripe Integration Not Working"

**Symptoms:**
- Payment buttons not working
- Webhook errors
- Subscription status not updating

**Diagnosis:**
```bash
# Check Stripe configuration
grep -r "STRIPE" app/.env
grep -r "stripe" app/lib/

# Test webhook endpoint
curl -X POST http://localhost:3000/api/webhooks/stripe \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

**Solutions:**
1. **Update Stripe configuration:**
   ```bash
   # Verify Stripe keys are correct format
   echo "Secret key should start with: sk_test_ or sk_live_"
   echo "Publishable key should start with: pk_test_ or pk_live_"
   ```

2. **Test Stripe webhook locally:**
   ```bash
   # Install Stripe CLI
   curl -s https://packages.stripe.com/api/security/keypair/stripe-cli-gpg/public | gpg --dearmor | sudo tee /usr/share/keyrings/stripe.gpg
   echo "deb [signed-by=/usr/share/keyrings/stripe.gpg] https://packages.stripe.com/stripe-cli-debian-local stable main" | sudo tee -a /etc/apt/sources.list.d/stripe.list
   sudo apt update
   sudo apt install stripe
   
   # Forward webhooks to local server
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

### 4. "Build Failures"

**Symptoms:**
- `yarn build` fails
- TypeScript errors
- Missing dependencies

**Diagnosis:**
```bash
# Check for TypeScript errors
npx tsc --noEmit

# Verify dependencies
yarn install --check-files

# Check for missing files
find app -name "*.tsx" -o -name "*.ts" | xargs grep -l "import.*from.*\.\/" | head -5
```

**Solutions:**
1. **Fix dependency issues:**
   ```bash
   # Clean install
   rm -rf node_modules yarn.lock
   yarn install
   
   # Fix peer dependency warnings
   yarn add prettier@latest
   yarn add eslint@^8.57.0
   ```

2. **Fix TypeScript errors:**
   ```bash
   # Check specific errors
   npx tsc --noEmit --pretty
   
   # Update TypeScript configuration if needed
   cat > app/tsconfig.json << 'EOF'
   {
     "compilerOptions": {
       "lib": ["dom", "dom.iterable", "es6"],
       "allowJs": true,
       "skipLibCheck": true,
       "strict": true,
       "noEmit": true,
       "esModuleInterop": true,
       "module": "esnext",
       "moduleResolution": "bundler",
       "resolveJsonModule": true,
       "isolatedModules": true,
       "jsx": "preserve",
       "incremental": true,
       "plugins": [
         {
           "name": "next"
         }
       ],
       "baseUrl": ".",
       "paths": {
         "@/*": ["./*"]
       }
     },
     "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
     "exclude": ["node_modules"]
   }
   EOF
   ```

### 5. "Database Connection Issues"

**Symptoms:**
- Prisma commands fail
- Database queries timeout
- Migration errors

**Diagnosis:**
```bash
# Test database connection
npx prisma db pull

# Check database URL format
echo $DATABASE_URL | grep -E "postgresql://.*:.*@.*:.*/"

# Verify database exists
npx prisma db execute --stdin <<< "SELECT version();"
```

**Solutions:**
1. **Fix database connection:**
   ```bash
   # Test connection with psql
   psql "postgresql://role_83eb1ba10:YoJDXEs0ssIU3Q05kvU9HDQ3sehkBsBD@db-83eb1ba10.db001.hosteddb.reai.io:5432/83eb1ba10" -c "SELECT version();"
   
   # If connection fails, check network/firewall
   telnet db-83eb1ba10.db001.hosteddb.reai.io 5432
   ```

2. **Reset database schema:**
   ```bash
   # Backup current data (if needed)
   npx prisma db execute --stdin <<< "CREATE TABLE backup_users AS SELECT * FROM \"User\";" || true
   
   # Reset and recreate
   npx prisma migrate reset --force
   npx prisma migrate dev --name init
   ```

## 🔧 Advanced Troubleshooting

### Performance Issues
```bash
# Check memory usage
free -h
ps aux --sort=-%mem | head -10

# Monitor Next.js performance
yarn build --debug
```

### Network Issues
```bash
# Check port availability
netstat -tulpn | grep :3000

# Test external connectivity
curl -I http://localhost:3000
```

### File Permission Issues
```bash
# Fix permissions
sudo chown -R ubuntu:ubuntu /home/ubuntu/matalino-ai-website
chmod -R 755 /home/ubuntu/matalino-ai-website
```

## 📋 Deployment Verification Script

Create and run this verification script:

```bash
#!/bin/bash
# Save as verify-deployment.sh

echo "🔍 Matalino AI Deployment Verification"
echo "======================================"

cd /home/ubuntu/matalino-ai-website/app

# Check environment
echo "✅ Checking environment variables..."
if [ -z "$NEXTAUTH_URL" ]; then echo "❌ NEXTAUTH_URL not set"; else echo "✅ NEXTAUTH_URL: $NEXTAUTH_URL"; fi
if [ -z "$DATABASE_URL" ]; then echo "❌ DATABASE_URL not set"; else echo "✅ DATABASE_URL configured"; fi

# Check database
echo "✅ Testing database connection..."
if npx prisma db pull > /dev/null 2>&1; then
    echo "✅ Database connection successful"
else
    echo "❌ Database connection failed"
fi

# Check build
echo "✅ Testing build..."
if yarn build > /dev/null 2>&1; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
fi

# Check server
echo "✅ Checking server status..."
if pgrep -f "next" > /dev/null; then
    echo "✅ Next.js server running"
else
    echo "❌ Next.js server not running"
fi

echo "======================================"
echo "🎉 Verification complete!"
```

Run with:
```bash
chmod +x verify-deployment.sh
./verify-deployment.sh
```

## 🆘 Emergency Recovery

### Complete Reset (Last Resort)
```bash
# Stop all processes
pkill -f "next\|node"

# Clean everything
rm -rf .next .build node_modules

# Reinstall and rebuild
yarn install
npx prisma generate
npx prisma migrate deploy
yarn build

# Restart
yarn dev
```

### Rollback to Working State
```bash
# If you have git history
git log --oneline -10
git checkout <working-commit-hash>
yarn install && yarn build && yarn dev
```

## 📞 Getting Help

1. **Check logs:** Always check the latest log files in `.logs/` directory
2. **Browser console:** Check for JavaScript errors in browser dev tools
3. **Network tab:** Verify API calls are working
4. **Database logs:** Check database server logs if available

---

**Remember:** Always backup your database before making major changes!
