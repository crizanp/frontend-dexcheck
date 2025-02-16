import { Connection, PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { NextResponse } from 'next/server';

// Initialize connection outside the handler to reuse it
const connection = new Connection(
  "https://api.mainnet-beta.solana.com",
  "confirmed"
);

const DEXC_MINT_ADDRESS = "B88rK4Y1o3yqRfhWevNRcLDbSTRaXgkHdsZe39Gfpump";

export async function GET(request, { params }) {
  const { walletAddress } = params;

  if (!walletAddress) {
    return NextResponse.json(
      { error: "Wallet address is required" },
      { status: 400 }
    );
  }

  try {
    // Validate wallet address
    let publicKey;
    try {
      publicKey = new PublicKey(walletAddress);
      // Note: isOnCurve is removed as it's not a reliable way to validate addresses
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid wallet address format" },
        { status: 400 }
      );
    }

    // Fetch token accounts with error handling
    let tokenAccounts;
    try {
      tokenAccounts = await connection.getTokenAccountsByOwner(
        publicKey,
        {
          mint: new PublicKey(DEXC_MINT_ADDRESS),
          programId: TOKEN_PROGRAM_ID,
        }
      );
    } catch (error) {
      console.error("Error fetching token accounts:", error);
      return NextResponse.json(
        { 
          error: "Failed to fetch token accounts",
          message: "Network error or invalid address"
        },
        { status: 500 }
      );
    }

    // Calculate total balance with better error handling
    let totalBalance = 0;
    for (const account of tokenAccounts.value) {
      try {
        const accountInfo = await connection.getTokenAccountBalance(
          account.pubkey
        );
        totalBalance += accountInfo.value.uiAmount || 0;
      } catch (error) {
        console.error("Error fetching individual account balance:", error);
        // Continue with other accounts if one fails
        continue;
      }
    }

    return NextResponse.json({
      walletAddress,
      totalBalance,
      success: true
    });

  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      {
        error: "Unexpected error occurred",
        message: error.message
      },
      { status: 500 }
    );
  }
}