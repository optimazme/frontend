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

### Post /updateGameTokenMetadata

Takes a token id and an ai air prompt posted in the body.  Hits the niftykit API to update the token's metadata to the supplied metadata. Returns 200 success or error message.

example:

```
{
    "prompt": "nothing to see here 3",
    "tokenId":"2"
}
```

### Post /updateAiTokenMetadata

Takes a token id and an image url posted in the body.  Hits the niftykit API to update the token's metadata to the supplied metadata. Returns 200 success or error message.

example:

```
{
    "prompt": "https://nftstorage.link/ipfs/bafybeia2slvha6qvdvbsd7k6hweu5vu6td3rkelrxdv6i4zkvq7ywgs3vq",
    "tokenId":"2"
}
```

### GET /getAiArtMetadata

returns an array of metadata for the whole ai art collection.

example return:

```
[
    {
        "data": {
            "name": "ai art 1",
            "description": "ai art 1 description",
            "image": "https://gateway.pinata.cloud/ipfs/QmQtRLmYZTshTQDxEQgaHwoP6zA57TZpAfLcReEzghK6qD"
        },
        "tokenId": "1",
        "id": "f45de310-4962-4b0e-add3-8a02483458cf"
    },
    {
        "data": {
            "name": "ai art 2",
            "description": "ai art 2 description",
            "image": "https://gateway.pinata.cloud/ipfs/QmQtRLmYZTshTQDxEQgaHwoP6zA57TZpAfLcReEzghK6qD"
        },
        "tokenId": "2",
        "id": "28a46344-9ce9-491b-9d2c-5fab52dc4aec"
    },
    {
        "data": {
            "name": "ai art 3",
            "description": "ai art 3 description",
            "image": "https://gateway.pinata.cloud/ipfs/QmQtRLmYZTshTQDxEQgaHwoP6zA57TZpAfLcReEzghK6qD"
        },
        "tokenId": "3",
        "id": "44d3064b-a8dc-4cd1-83cf-88841360815f"
    }
]
```

## GET /getNftUrl/:walletAddress

Takes a wallet address as a param and returns the nft image url if that wallet address holds an nft from the game pass collection and an error message if not.

error reponse:

```
either wallet address: 0xB1Bc409C15c19b70DC9dF761A7398386E01fC514 has no game pass nfts or there was an error: Error:
missing revert data in call exception; Transaction reverted without a reason string [ See:
https://links.ethers.org/v5-errors-CALL_EXCEPTION ]
(transaction={"to":"0xfa0a32DC5b43395752bEC3a955E16874E8a1e293","data":"0x2f745c59000000000000000000000000b1bc409c15c19b70dc9df761a7398386e01fc5140000000000000000000000000000000000000000000000000000000000000000","accessList":null},
code=CALL_EXCEPTION, version=providers/5.7.2)
```

success response:

```
"https://gateway.pinata.cloud/ipfs/QmQtRLmYZTshTQDxEQgaHwoP6zA57TZpAfLcReEzghK6qD"
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
