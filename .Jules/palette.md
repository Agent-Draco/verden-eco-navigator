## 2024-05-06 - Safe Validation of UI Components

**Learning:** When making simple style changes to generic UI components, it's very easy to accidentally leave temporary test scripts (`playwright-test.ts`), execution artifacts (`patch.diff`), or accidentally modify global lock files during development. Code review failures often stem from untracked or unwanted files rather than the core code changes themselves.
**Action:** Always run `git status` explicitly before committing or requesting a code review to verify that *only* the targeted component files are staged, and manually remove or revert any temporary scripts or lockfile changes to ensure a pristine commit history.
