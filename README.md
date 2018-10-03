Whack-a-Mole
===========
This project was bootstrapped with [Webpack 4 Boilerplate](https://github.com/cvgellhorn/webpack-boilerplate).

## Demo
http://rleafey-whack-a-mole.s3-website-us-east-1.amazonaws.com/

## Setup
Install dependencies
```sh
npm install
```
## Development
Run the local webpack-dev-server with livereload and autocompile on [http://localhost:8080/](http://localhost:8080/)
```sh
npm run dev
```
## Deployment
Build the game
```sh
npm run build
```
## Game Play
Click on a mole to "whack" it. Points will be awarded on the first whack of a visible mole.
Subsequent whacks on a visible mole will not result in extra points.

## Code Considerations
- Used a class for code organization and readability
- Added polyfills for IE 11
- Tried to limit querying the DOM by passing selected elements into the class.
If one was feeling crazy, this also allows multiple instances of the game to coexist on the same page.
- Not much effort was made in the way of design or styling.
