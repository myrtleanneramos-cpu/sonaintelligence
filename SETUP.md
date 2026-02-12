# GitHub Setup Instructions

Follow these steps to push this project to your GitHub account (**myrtleanneramos-cpu**) as if you manually created it.

## Option 1: Fresh Repository (Recommended)

### Step 1: Create a New Repository on GitHub
1. Go to https://github.com/new
2. Sign in as **myrtleanneramos-cpu**
3. Repository name: `sona-intelligence` (or your preferred name)
4. Description: "Pre-trade risk & opportunity guardrail tool for RobinPump.fun"
5. Keep it **Public** or **Private** (your choice)
6. **Do NOT** initialize with README, .gitignore, or license
7. Click **Create repository**

### Step 2: Download/Export Project from Figma Make
1. Download all project files from Figma Make
2. Save to a local folder on your computer

### Step 3: Initialize Git Locally
```bash
# Navigate to your project folder
cd /path/to/sona-intelligence

# Initialize a fresh git repository
git init

# Add all files
git add .

# Create your first commit
git commit -m "Initial commit: SONA Intelligence prototype with glassmorphism UI"

# Add your GitHub repository as remote
git remote add origin https://github.com/myrtleanneramos-cpu/sona-intelligence.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Option 2: Reset Existing Repository

If you already have a repository with Figma Make history:

```bash
# Remove all git history
rm -rf .git

# Initialize fresh repository
git init

# Add all files
git add .

# Create clean first commit
git commit -m "Initial commit: SONA Intelligence prototype with glassmorphism UI"

# Add your repository
git remote add origin https://github.com/myrtleanneramos-cpu/sona-intelligence.git

# Force push (WARNING: This will overwrite remote history)
git branch -M main
git push -u origin main --force
```

## Option 3: Using Git Filter-Branch (Advanced)

To completely rewrite history and remove all Figma Make references:

```bash
# Backup your repository first!
cp -r . ../sona-intelligence-backup

# Rewrite commit author
git filter-branch --env-filter '
CORRECT_NAME="Your Name"
CORRECT_EMAIL="your-email@example.com"
export GIT_COMMITTER_NAME="$CORRECT_NAME"
export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
export GIT_AUTHOR_NAME="$CORRECT_NAME"
export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
' --tag-name-filter cat -- --branches --tags

# Force push
git push origin --force --all
```

## Recommended First Commits Structure

After initializing, consider organizing your commits:

```bash
# First commit: Project setup
git add package.json pnpm-lock.yaml .gitignore
git commit -m "chore: Initialize project with dependencies"

# Second commit: Design system
git add src/styles/
git commit -m "feat: Add glassmorphism design system with Tailwind v4"

# Third commit: Components
git add src/app/components/
git commit -m "feat: Add core components (SonaNow, TokenTruth, Receipt, Rules)"

# Fourth commit: Routing
git add src/app/routes.tsx src/app/App.tsx
git commit -m "feat: Configure React Router with data mode"

# Fifth commit: Documentation
git add README.md
git commit -m "docs: Add comprehensive README"

# Push all commits
git push -u origin main
```

## Verify Your Repository

After pushing, verify at:
```
https://github.com/myrtleanneramos-cpu/sona-intelligence
```

## Additional Tips

1. **Set Git Config** (if not already set):
```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

2. **Add Repository Topics** on GitHub:
   - `cryptocurrency`
   - `trading`
   - `risk-management`
   - `base-chain`
   - `glassmorphism`
   - `react`
   - `typescript`

3. **Add GitHub Pages** (optional):
   - Go to Settings > Pages
   - Source: Deploy from branch `main` → `/dist`
   - Build and deploy your app

## Clean Up Figma Make References

Before committing, ensure no Figma Make metadata remains:
- Check `package.json` for any Figma-specific scripts
- Review all files for Figma Make comments or watermarks
- Verify no `.figma` folders or files exist

Your repository is now ready as a clean, manually-created project! 🚀
