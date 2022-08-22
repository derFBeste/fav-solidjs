# fav-solidjs

A simple SPA to demo [Solid.js](https://www.solidjs.com/guides/getting-started).

This app was built to compare Solidjs to React. The React app's repo can be found [here](https://github.com/derFBeste/fav-react).

It was also built to try out [Vercel](https://vercel.com/). Live versions of the app can be found here:

- [Solidjs](https://fav-solidjs.vercel.app/)
- [React](https://fav-react.vercel.app/)

## scripts
### running the app locally

`npm run dev`

## loading data

The url takes one query parameter `recordCount` to update the amount of records that are loaded. By default it loads 1000.

To load more or less records use the query parameter. For example loading 5000 records would be: `https://fav-solidjs.vercel.app/?recordCount=5000`

## tech stack
- [Solidjs](https://www.solidjs.com/guides/getting-started)
- [Vercel](https://vercel.com/)
- [Supabase](https://supabase.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Tachyons](https://tachyons.io/)