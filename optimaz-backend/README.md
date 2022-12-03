<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app in development

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev
```

Listens on port 3001.

## Endpoints

### Post /getAiImage

Takes a prompt as json in the body, generates an ai image through stability ai and uploads said image to ipfs via the pinata api.  Returns the pinata response data.

example:

```
{
    "prompt": "Pekingese, on a great neoclassical square, james jean, triadic color scheme, mark brooks, open ceiling"
}
```

Returns

```
{
    "IpfsHash": "QmaVCN5zxT4CpLxSFC8eAFR8sKFXsVTtiGf71qogqTJb5R",
    "PinSize": 65837,
    "Timestamp": "2022-12-03T16:15:45.109Z"
}
```

### Post /updateToken

Takes a Token object as defined by the niftykit api as json in the body of the request.  Hits the niftykit API to update the token's metadata to the supplied metadata. Returns 200 success or error message.

example:

```
{
    "data": {
        "name": "lower",
        "description": "experiment telephone",
        "image": "https://gateway.pinata.cloud/ipfs/QmQySWkLUSuZLpC9mZPKmJfEPtRyN1RnGH4zx1fg5kRuda",
        "maze-words": "new maze words"
    },
    "tokenId": "5",
    "id": "00ba0230-f662-4852-8e44-15b660643550"
}
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
