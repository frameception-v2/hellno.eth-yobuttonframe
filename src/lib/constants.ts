export const PROJECT_ID = 'yobuttonframe';
export const PROJECT_TITLE = "Send me YO!";
export const PROJECT_DESCRIPTION = "A simple frame to send YO tokens";

// YO Token Contract Details
export const YO_CONTRACT_ADDRESS = "0x4c7E0cbb0276D1756534A49FEF1C2f8E4E732EB6"; // On Base
export const YO_CONTRACT_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "yo",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

// Your address to receive YO tokens
export const RECIPIENT_ADDRESS = "0x6d9fFaede2c6CD9bb48becE230ad589e0E0D981c"; // hellno.eth
export const RECIPIENT_ENS = "hellno.eth";
