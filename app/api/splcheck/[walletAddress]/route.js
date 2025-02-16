import { Connection, PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { NextResponse } from 'next/server';

const connection = new Connection(
  "https://api.mainnet-beta.solana.com",
  "confirmed"
);

const DEXC_MINT_ADDRESS = "B88rK4Y1o3yqRfhWevNRcLDbSTRaXgkHdsZe39Gfpump";

// Update the function to use dynamic route parameters
export async function GET(request, { params }) {
  // Get walletAddress from route parameters
  const { walletAddress } = params;

  if (!walletAddress) {
    return NextResponse.json(
      { error: "Wallet address is required" },
      { status: 400 }
    );
  }

  try {
    // Validate the wallet address format
    if (!PublicKey.isOnCurve(new PublicKey(walletAddress))) {
      return NextResponse.json(
        { error: "Invalid wallet address" },
        { status: 400 }
      );
    }

    const tokenAccounts = await connection.getTokenAccountsByOwner(
      new PublicKey(walletAddress),
      {
        mint: new PublicKey(DEXC_MINT_ADDRESS),
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

    return NextResponse.json({ 
      walletAddress, 
      totalBalance,
      success: true
    });
  } catch (error) {
    console.error("Error fetching token balance:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch token balance",
        message: error.message 
      },
      { status: 500 }
    );
  }
}