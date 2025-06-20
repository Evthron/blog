---
title: "Git"
description: 
date: 2025-03-06T05:39:19+08:00
lastmod: 2025-03-06T05:39:19+08:00
image: 
categories: 
tags: 
math: true
license: 
hidden: false
comments: true
---

## How to Upload Local Repo to GitHub

1. Create Local Git Repo:
```bash
git init
```

2. Create an Empty Repo on GitHub

3. Link the Local Repo to the Remote GitHub Repo:
- Make sure you use the SSH link (not HTTPS) for your own repo for better authentication security.
```bash
git remote add origin git@github.com:username/reponame.git
```

- If you used the HTTPS URL, change it using `set-url`:
```bash
git remote set-url origin git@github.com:username/reponame.git
```

- `origin` is the default name that prefixes all upstream branches. All upstream branches are referred to as `origin/branch` when viewed in the local repo.

- You can check the remote URL to confirm the change:
```bash
git remote -v
```

4. Push Local `main` Branch to the `origin/main` Branch:
```bash
git push origin main
```

- If your default local branch name is `master`, you may encounter an error like:
```bash
error: src refspec main does not match any
error: failed to push some refs to 'github.com...'
```

- Normally, the remote branch and the local branch should have the same name. Change the local branch name by:
```bash
git branch -m main
```

- Now, `git push origin main` should work.

5. Set Upstream Tracking: To make the branch remember its upstream branch, use the `--set-upstream` or `-u` flag once:
```bash
git push --set-upstream origin main
```
or equivalently:
```bash
git push -u origin main
```

- Next time, you can simply push the branch by using:
```bash
git push
```



## Contribute by Forking

1. Fork the Repo on GitHub: Click the "Fork" button on the top right of the repository page to create a copy under your account.

2. Clone the Forked Repo to Local:
```bash
git clone git@github.com:username/reponame.git
```

3. Add the Original Repository as Upstream: This time use the HTTPS URL.
```bash
git remote add upstream <ORIGINAL_REPO_URL>
```

4. Fetch the Latest Changes from Upstream:
```bash
git fetch upstream
```

5. Merge Changes into Your Local Branch: If you want to merge changes from the upstream branch (usually `main`) into your local `main` branch:
```bash
git checkout main
git merge upstream/main
```

6. Push to Your Forked Repo: After merging, push the updated local branch to your forked repo on GitHub:
```bash
git push origin main
```

7. Create a Pull Request: If you want to propose changes back to the original repo, go to the original repo on GitHub and create a pull request from your forked repo. This allows the maintainers of the original repo to review and merge your changes.

## submodule
make a repo as a node inside another repo, treating the whole folder as one file.
need to make seperate commits.

## CI/CD Pipeline (Github Action)
Continuous Integration, Continuous Delivery

## When will automerge fail?
- You pushed some mistake to the remote branch and you want to undo it, so you go back a few commits and branch off to work on new features.
- However, if the mistake does not conflict with the new feature, the mistake will be reintroduced to the code when automerging.
- Solution: Be careful when you merge, or use `push --force` if the branch is your private branch.
