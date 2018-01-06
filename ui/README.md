# seval-ui

## Some title
Some content describing various aspects of the purpose and behavior of the software in this folder.

## Building
The building process picks the relevant stuff from /src and makes it appropriate for client distribution (bundling, transpiling, ending up in /dist and so on). The process consists of running webpack configured with what's in `webpack.config.js`.

To build, run
`npm run build`


## Developing
To shorten iterations while developing, let webpack watch your source and rebuild on change.

To build and watch, run
`npm run watch`
