Notes to Solidity Contracts

The contracts are stored here https://github.com/optimazme/Solidity-Contracts

The structure of the contracts is that the Lottery.sol file imports the VRF.sol file and the Lottery.sol contract is expected to interact with the NiftyKit contract.
However, we faced serious technical difficulties that are externally caused as below.

1, Chainlink VRF does not work on Optimism. And Portal VRF (https://portal-docs.readthedocs.io/en/latest/user-vrf-docs.html) only works on Optimism Goerli and did not
   seem suitable for our use since we intend on deploying our project to production. So VRF is something we will work on post hackthon.
   
2, NiftyKit contract security is not what is obvious to us yet. We are thinking of collecting gas fees from users and store the fees in the NiftyKit contract by adding      it as a hidden cost to each NFT price, and potentially distirbute it to other contracts like the Lottery.sol contract file. However, in this hackathon, we did not        have the time to check to see if there is an audit report or what might be written in it. Likewise, we were unclear about where the private key of the EOA address        that created the NiftyKit contract is stored.
   Due to these security issues or concerns, we were unable to fully create an inter-contracts logic within the duration of the hackathon, and this will also be worked
   on post hackathon.
   
In addition, we would like to design the contract in a way as such that pass purchasers are gathered in an array for each month for the lottery to run. And at the end of each month, we either manually or atuomatically call a delete an array function to delete, start anew for the following month.
Since we did not finish writing this part of the code, this is to be worked on post hackathon submission.

Tests will also be written when the contracts are fully available and ready for testing.
