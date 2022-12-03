Notes to Solidity Contracts

The contracts are stored here https://github.com/optimazme/Solidity-Contracts

The structure of the contracts is that the Lottery.sol file imports the VRF.sol file and that the Lottery.sol contract will interact with the NiftyKit contract.
However, we faced serious technical difficulties that are externally caused as below.

1, Chainlink VRF does not work on Optimism. And Portal VRF (https://portal-docs.readthedocs.io/en/latest/user-vrf-docs.html) only works on Optimism Goerli and did not
   seem suitable for our use since we intend on deploying our project to production. So VRF is something we will work on post hackthon.
   
2, NiftKit contract security is not what is obvious to us yet. We are thinking of collecting gas fees from users and store the fees in the NiftyKit contract and 
   potentially distirbute it to other contracts like the Lottery.sol contract file. However, in this hackathon, we did not have the time to check to see if there is an 
   audit report or what might be written in it. Likewise, we were unclear about where the private key of the EOA address that created the NiftyKit contract is stored.
   Due to these security issues or concerns, we were unable to fully create an inter-contracts logic within the duration of the hackathon, and this will also be worked
   on post hackathon.
   
