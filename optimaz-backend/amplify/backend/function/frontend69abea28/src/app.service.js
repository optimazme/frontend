"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const banana = require("@banana-dev/banana-dev");
const dotenv = require("dotenv");
const ethers_1 = require("ethers");
const generativeNFT = [
    { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" },
    { "inputs": [], "name": "NewOwnerIsZeroAddress", "type": "error" },
    { "inputs": [], "name": "NoHandoverRequest", "type": "error" },
    { "inputs": [], "name": "Unauthorized", "type": "error" },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "approved",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "ApprovalForAll",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint8",
                "name": "version",
                "type": "uint8"
            }
        ],
        "name": "Initialized",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "operator",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "allowed",
                "type": "bool"
            }
        ],
        "name": "OperatorAllowed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "operator",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "blocked",
                "type": "bool"
            }
        ],
        "name": "OperatorBlocked",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "pendingOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipHandoverCanceled",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "pendingOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipHandoverRequested",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "oldOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "roles",
                "type": "uint256"
            }
        ],
        "name": "RolesUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "ADMIN_ROLE",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "BURNER_ROLE",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "MANAGER_ROLE",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "to", "type": "address" },
            { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
        ],
        "name": "approve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "owner", "type": "address" }
        ],
        "name": "balanceOf",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint64[]", "name": "quantities", "type": "uint64[]" },
            { "internalType": "address[]", "name": "recipients", "type": "address[]" }
        ],
        "name": "batchAirdrop",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
        ],
        "name": "burn",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "cancelOwnershipHandover",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "pendingOwner", "type": "address" }
        ],
        "name": "completeOwnershipHandover",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
        ],
        "name": "getApproved",
        "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "user", "type": "address" },
            { "internalType": "uint256", "name": "roles", "type": "uint256" }
        ],
        "name": "grantRoles",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "user", "type": "address" },
            { "internalType": "uint256", "name": "roles", "type": "uint256" }
        ],
        "name": "hasAllRoles",
        "outputs": [{ "internalType": "bool", "name": "result", "type": "bool" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "user", "type": "address" },
            { "internalType": "uint256", "name": "roles", "type": "uint256" }
        ],
        "name": "hasAnyRole",
        "outputs": [{ "internalType": "bool", "name": "result", "type": "bool" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "owner_", "type": "address" },
            { "internalType": "string", "name": "name_", "type": "string" },
            { "internalType": "string", "name": "symbol_", "type": "string" },
            { "internalType": "address", "name": "treasury_", "type": "address" },
            { "internalType": "address", "name": "royalty_", "type": "address" },
            { "internalType": "uint96", "name": "royaltyFee_", "type": "uint96" }
        ],
        "name": "initialize",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "owner", "type": "address" },
            { "internalType": "address", "name": "operator", "type": "address" }
        ],
        "name": "isApprovedForAll",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "maxAmount",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "maxPerMint",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "maxPerWallet",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint64", "name": "quantity", "type": "uint64" }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "recipient", "type": "address" },
            { "internalType": "uint64", "name": "quantity", "type": "uint64" }
        ],
        "name": "mintTo",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "roles", "type": "uint256" }
        ],
        "name": "ordinalsFromRoles",
        "outputs": [
            { "internalType": "uint8[]", "name": "ordinals", "type": "uint8[]" }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            { "internalType": "address", "name": "result", "type": "address" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
        ],
        "name": "ownerOf",
        "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "pendingOwner", "type": "address" }
        ],
        "name": "ownershipHandoverExpiresAt",
        "outputs": [
            { "internalType": "uint256", "name": "result", "type": "uint256" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "ownershipHandoverValidFor",
        "outputs": [{ "internalType": "uint64", "name": "", "type": "uint64" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "presaleActive",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint64", "name": "quantity", "type": "uint64" },
            { "internalType": "uint256", "name": "allowed", "type": "uint256" },
            { "internalType": "bytes32[]", "name": "proof", "type": "bytes32[]" }
        ],
        "name": "presaleMint",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "recipient", "type": "address" },
            { "internalType": "uint64", "name": "quantity", "type": "uint64" },
            { "internalType": "uint256", "name": "allowed", "type": "uint256" },
            { "internalType": "bytes32[]", "name": "proof", "type": "bytes32[]" }
        ],
        "name": "presaleMintTo",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "price",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "roles", "type": "uint256" }
        ],
        "name": "renounceRoles",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "requestOwnershipHandover",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "user", "type": "address" },
            { "internalType": "uint256", "name": "roles", "type": "uint256" }
        ],
        "name": "revokeRoles",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint8[]", "name": "ordinals", "type": "uint8[]" }
        ],
        "name": "rolesFromOrdinals",
        "outputs": [
            { "internalType": "uint256", "name": "roles", "type": "uint256" }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "user", "type": "address" }
        ],
        "name": "rolesOf",
        "outputs": [
            { "internalType": "uint256", "name": "roles", "type": "uint256" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "_tokenId", "type": "uint256" },
            { "internalType": "uint256", "name": "_salePrice", "type": "uint256" }
        ],
        "name": "royaltyInfo",
        "outputs": [
            { "internalType": "address", "name": "", "type": "address" },
            { "internalType": "uint256", "name": "", "type": "uint256" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "from", "type": "address" },
            { "internalType": "address", "name": "to", "type": "address" },
            { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "from", "type": "address" },
            { "internalType": "address", "name": "to", "type": "address" },
            { "internalType": "uint256", "name": "tokenId", "type": "uint256" },
            { "internalType": "bytes", "name": "data", "type": "bytes" }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "saleActive",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "operator", "type": "address" },
            { "internalType": "bool", "name": "approved", "type": "bool" }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "string", "name": "newBaseURI", "type": "string" }
        ],
        "name": "setBaseURI",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "receiver", "type": "address" },
            { "internalType": "uint96", "name": "feeNumerator", "type": "uint96" }
        ],
        "name": "setDefaultRoyalty",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "bytes32", "name": "newRoot", "type": "bytes32" }
        ],
        "name": "setMerkleRoot",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "bool", "name": "value", "type": "bool" }],
        "name": "setOperatorFilteringEnabled",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "tokenId", "type": "uint256" },
            { "internalType": "address", "name": "receiver", "type": "address" },
            { "internalType": "uint96", "name": "feeNumerator", "type": "uint96" }
        ],
        "name": "setTokenRoyalty",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "newTreasury", "type": "address" }
        ],
        "name": "setTreasury",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "newMaxAmount", "type": "uint256" },
            { "internalType": "uint256", "name": "newMaxPerMint", "type": "uint256" },
            {
                "internalType": "uint256",
                "name": "newMaxPerWallet",
                "type": "uint256"
            },
            { "internalType": "uint256", "name": "newPrice", "type": "uint256" },
            { "internalType": "bool", "name": "presale", "type": "bool" }
        ],
        "name": "startSale",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "stopSale",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }
        ],
        "name": "supportsInterface",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "index", "type": "uint256" }
        ],
        "name": "tokenByIndex",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "owner", "type": "address" },
            { "internalType": "uint256", "name": "index", "type": "uint256" }
        ],
        "name": "tokenOfOwnerByIndex",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
        ],
        "name": "tokenURI",
        "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalRevenue",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "from", "type": "address" },
            { "internalType": "address", "name": "to", "type": "address" },
            { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
        ],
        "name": "transferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "newOwner", "type": "address" }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "treasury",
        "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
dotenv.config();
const FormData = require('form-data');
const { Readable } = require("stream");
const dogAiArtAddress = "0xE693b5107B4Bf5222d72852f080a2cd54035E4C3";
const gamePassAddress = "0xfa0a32DC5b43395752bEC3a955E16874E8a1e293";
let AppService = class AppService {
    getHello() {
        return 'Hello World!';
    }
    async updateAiTokenMetadata(id, image) {
        const tokensArray = await this.getAiPassMetadata();
        const tokenToUpdate = tokensArray.filter((token) => {
            return token.tokenId == id;
        });
        if (tokenToUpdate.length == 1) {
            const idForUrl = tokenToUpdate[0].id;
            const endpointString = `https://api.niftykit.com/drops/tokens/${idForUrl}`;
            tokenToUpdate[0].data.image = image;
            try {
                const { data } = await axios_1.default.put(endpointString, tokenToUpdate[0].data, {
                    headers: {
                        'x-api-key': process.env.AI_ART_API_KEY,
                    },
                });
            }
            catch (err) {
                console.log(err);
            }
            ;
            return tokenToUpdate[0];
        }
        else {
            return "no nft matching that id";
        }
    }
    async updateGameTokenMetadata(id, prompt) {
        const tokensArray = await this.getGamePassMetadata();
        const tokenToUpdate = tokensArray.filter((token) => {
            return token.tokenId == id;
        });
        if (tokenToUpdate.length == 1) {
            const idForUrl = tokenToUpdate[0].id;
            const endpointString = `https://api.niftykit.com/drops/tokens/${idForUrl}`;
            tokenToUpdate[0].data.mazeWords = prompt;
            try {
                const { data } = await axios_1.default.put(endpointString, tokenToUpdate[0].data, {
                    headers: {
                        'x-api-key': process.env.GAME_PASS_API_KEY,
                    },
                });
            }
            catch (err) {
                console.log(err);
            }
            ;
            return tokenToUpdate[0];
        }
        else {
            return "no nft matching that id";
        }
    }
    async getGamePassMetadata() {
        const results = [];
        let hasNextPage = true;
        let page = 1;
        while (hasNextPage) {
            const response = await axios_1.default.get(`https://api.niftykit.com/drops/tokens`, {
                headers: {
                    'x-api-key': process.env.GAME_PASS_API_KEY,
                },
                params: {
                    page,
                },
            });
            const { data } = response;
            results.push(...data.data);
            hasNextPage = data.hasNextPage;
            page++;
        }
        return results;
    }
    async getAiPassMetadata() {
        const results = [];
        let hasNextPage = true;
        let page = 1;
        while (hasNextPage) {
            const response = await axios_1.default.get(`https://api.niftykit.com/drops/tokens`, {
                headers: {
                    'x-api-key': process.env.AI_ART_API_KEY,
                },
                params: {
                    page,
                },
            });
            const { data } = response;
            results.push(...data.data);
            hasNextPage = data.hasNextPage;
            page++;
        }
        return results;
    }
    async getAiImage(prompt) {
        const apiKey = process.env.BANANA_API_KEY;
        const modelKey = process.env.STABILITY_AI_MODEL;
        const modelParameters = {
            "prompt": prompt,
            "num_inference_steps": 50,
            "guidance_scale": 9,
            "height": 512,
            "width": 512,
            "seed": 3242
        };
        try {
            console.log(`attempting to get image for prompt ${prompt}`);
            const bananRes = await banana.run(apiKey, modelKey, modelParameters);
            const imageByteString = bananRes.modelOutputs[0].image_base64;
            const imageBytes = Buffer.from(imageByteString, 'base64');
            console.log("uploading image to pinata");
            const pinataRes = await this.pinFileToIPFS(imageBytes);
            return (pinataRes.data);
        }
        catch (err) {
            console.log(err);
        }
        return "failed to upload ai image :(";
    }
    async pinFileToIPFS(bytes) {
        const JWT = process.env.PINATA_JWT;
        const formData = new FormData();
        const stream = Readable.from(bytes);
        formData.append('file', stream, {
            filepath: 'FILENAME.png'
        });
        const metadata = JSON.stringify({
            name: 'File name',
        });
        formData.append('pinataMetadata', metadata);
        const options = JSON.stringify({
            cidVersion: 0,
        });
        formData.append('pinataOptions', options);
        try {
            const res = await axios_1.default.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
                maxBodyLength: 1000000000,
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                    Authorization: JWT
                }
            });
            console.log(res.data);
            return res;
        }
        catch (error) {
            console.log(error);
        }
    }
    async checkForGamePassOwner(walletAddress) {
        const options = {
            alchemy: process.env.ALCHEMY_API_KEY
        };
        const provider = ethers_1.ethers.getDefaultProvider("optimism", options);
        const contract = new ethers_1.ethers.Contract(gamePassAddress, generativeNFT, provider);
        try {
            console.log("attempting to find token of owner by index");
            const nftId = await contract.tokenOfOwnerByIndex(walletAddress, 0);
            console.log(ethers_1.ethers.utils.formatUnits(nftId, 0));
            const nftUrl = await contract.tokenURI(nftId);
            console.log(nftUrl);
            return nftUrl;
        }
        catch (err) {
            console.log(err);
            return `either wallet address: ${walletAddress} has no game pass nfts or there was an error: ${err}`;
        }
    }
    async checkForAiOwner(walletAddress) {
        const options = {
            alchemy: process.env.ALCHEMY_API_KEY
        };
        const provider = ethers_1.ethers.getDefaultProvider("optimism", options);
        const contract = new ethers_1.ethers.Contract(dogAiArtAddress, generativeNFT, provider);
        try {
            console.log("attempting to find token of owner by index");
            const nftId = await contract.tokenOfOwnerByIndex(walletAddress, 0);
            console.log(ethers_1.ethers.utils.formatUnits(nftId, 0));
            return ethers_1.ethers.utils.formatUnits(nftId, 0);
        }
        catch (err) {
            console.log(err);
            return `either wallet address: ${walletAddress} has no game pass nfts or there was an error: ${err}`;
        }
    }
};
AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;
