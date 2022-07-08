# Cluedle

This started out as an attempt to re-create [Wordle](https://www.nytimes.com/games/wordle/index.html) as a way to improve my full-stack skills. I then had an idea for a fun type of twist -- trading guesses for clues. I present to you, Cluedle.

# Notable Versions

- [MVP of original Wordle](https://github.com/OmerBaddour/cluedledoodledoo/tree/071dbf9854fef81398e113a8976cfed806084efd)

# Data

The full list of legal answers is all five character words in [this list of common nouns](http://www.desiquintans.com/downloads/nounlist/nounlist.txt).

The full list of legal guesses is equivalent to that of wordle, and can be found [here](https://github.com/tabatkins/wordle-list/blob/main/words).

# Useful Commands

## Development

1. Start the server:

```
$ cd server
$ npm start
```

2. In **another terminal instance**, start the client:

```
$ cd client
$ npm start
```

The client contains the app. All saved changes made to the client will be reflected [here](http://localhost:3000/)

## [Local Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs#run-the-app-locally)

After feeling confident with development, sanity check that deploying to Heroku should work by hosting the Heroku app locally.

1. Create the optimized build for the app:

```
$ cd client
$ npm run build
```

2. Host the Heroku app locally:

```
$ cd ..
$ heroku local web
```

The app will be hosted [here](http://localhost:5000/)

## Update Remote Heroku

Merge changes with `main`. Automatic updating has been setup [here](https://dashboard.heroku.com/apps/cluedledoodledoo/deploy/github), though manual re-deployment is also possible at the same link.
