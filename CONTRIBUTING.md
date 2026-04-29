# Contributing to ExplainIt

Thank you for your interest in contributing to ExplainIt. This document provides guidelines and
instructions for contributing to this project.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment
for everyone. We expect all contributors to:

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Accept constructive criticism gracefully
- Focus on what is best for the community and the project

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue using the
[Bug Report template](https://github.com/StellarStacker/Explain-it/issues/new?labels=bug&template=bug_report.md).

Before submitting:
1. Search existing issues to check if it has already been reported
2. Reproduce the issue and document the steps clearly
3. Include your environment details (OS, browser, Node.js version)

### Suggesting Features

Feature suggestions are welcome. Please use the
[Feature Request template](https://github.com/StellarStacker/Explain-it/issues/new?labels=enhancement&template=feature_request.md).

### Submitting Code

1. **Fork** the repository and clone it locally
2. **Create a branch** from `main` for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Install dependencies** and verify the project builds:
   ```bash
   npm install
   npm run build
   ```
4. **Make your changes** following the code standards outlined below
5. **Test locally** to confirm everything works:
   ```bash
   npm run dev
   ```
6. **Commit** using Conventional Commit messages:
   ```
   feat: add new feature description
   fix: resolve issue with component
   docs: update README section
   refactor: restructure module
   ```
7. **Push** to your fork and open a Pull Request against `main`

## Code Standards

- **Components**: One component per file. Keep components focused and reusable.
- **Naming**: Use descriptive names for variables, functions, and files.
- **Styling**: Use Tailwind CSS utilities. For custom tokens, extend `tailwind.config.js`.
- **State**: Use Zustand stores for global state; React state for local component state.
- **Comments**: Document complex logic. Avoid commenting the obvious.
- **Formatting**: Consistent indentation (2 spaces). Clean import ordering.

## Pull Request Process

1. Ensure your PR description clearly explains the change and its motivation
2. Reference any related issues using `Closes #issue-number`
3. Verify that the build passes (`npm run build`)
4. Keep PRs focused -- one feature or fix per PR when possible
5. Be responsive to review feedback

## Questions?

If you have questions about contributing, open a
[Discussion](https://github.com/StellarStacker/Explain-it/discussions) or
reach out through an issue.

Thank you for helping make ExplainIt better.
