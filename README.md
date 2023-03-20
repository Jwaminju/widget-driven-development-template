This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Widget Driven Development
A template that makes it easy to do [WDD](https://alexei.me/blog/widget-driven-development/) at the front end.

## Tech stack
- nextjs
- typescript
- storybook
- hygen

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/get_game_data.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## generate files

### component
```bash
hygen new component <name>
```

### widget

```bash
hygen new widget <name>
```

then, you can see generated files that are container, container.test, error, loading, presenter, presenter.stories.


### page

```bash
hygen new page <name>
```

## Commit Convention
- feat (new feature for the user, not a new feature for build script)
- fix (bug fix for the user, not a fix to a build script)
- docs (changes to the documentation)
- style (formatting, missing semi colons, etc; no production code change)
- refactor (refactoring production code, eg. renaming a variable)
- test (adding missing tests, refactoring tests; no production code change)
- chore (updating grunt tasks etc; no production code change)

 ```text
example)
fix(middleware): ensure Range headers adhere more closely to RFC 2616
```