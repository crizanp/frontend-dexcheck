import { Connection, PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

const connection = new Connection(
  "https://api.mainnet-beta.solana.com",
  "confirmed"
);

const QUANTA_MINT_ADDRESS = "G4YyirkFcHU4Xn6jJ5GyTLv291n3Sxtv8vzJnBM2pump";

export default async function handler(req, res) {
  const { walletAddress } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!walletAddress) {
    return res.status(400).json({ error: "Wallet address is required" });
  }

  try {
    const tokenAccounts = await connection.getTokenAccountsByOwner(
      new PublicKey(walletAddress),
      {
        mint: new PublicKey(QUANTA_MINT_ADDRESS),
        programId: TOKEN_PROGRAM_ID,
      }
    );

    let totalBalance = 0;

    for (const account of tokenAccounts.value) {
      const accountInfo = await connection.getTokenAccountBalance(
        account.pubkey
      );
      const balance = accountInfo.value.uiAmount;
      totalBalance += balance;
    }

    res.status(200).json({ walletAddress, totalBalance });
  } catch (error) {
    console.error("Error fetching token balance:", error);
    res.status(500).json({ error: "Failed to fetch token balance" });
  }
}
