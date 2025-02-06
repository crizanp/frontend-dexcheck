"use client";

import { useState } from "react";
import { encryptSeed, decryptSeed } from "../utils/encryption";

export default function Home() {
  const [encryptSeedPhrase, setEncryptSeedPhrase] = useState("");
  const [encryptPassword, setEncryptPassword] = useState("");
  const [encryptedSeed, setEncryptedSeed] = useState("");

  const [decryptEncryptedSeed, setDecryptEncryptedSeed] = useState("");
  const [decryptPassword, setDecryptPassword] = useState("");
  const [decryptedSeed, setDecryptedSeed] = useState("");
  const [error, setError] = useState("");

  const [showEncryptPassword, setShowEncryptPassword] = useState(false);
  const [showDecryptPassword, setShowDecryptPassword] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEncrypt = () => {
    if (encryptSeedPhrase && encryptPassword) {
      const encrypted = encryptSeed(encryptSeedPhrase, encryptPassword);
      setEncryptedSeed(encrypted);
      setEncryptSeedPhrase("");
      setEncryptPassword("");
      setError("");
    } else {
      setError("Please enter both the seed phrase and password to encrypt.");
    }
  };

  const handleDecrypt = () => {
    if (decryptEncryptedSeed && decryptPassword) {
      const decrypted = decryptSeed(decryptEncryptedSeed, decryptPassword);
      if (decrypted) {
        setDecryptedSeed(decrypted);
        setError("");
      } else {
        setError("Incorrect password or invalid encrypted seed.");
      }
    } else {
      setError("Please enter both the encrypted seed and password to decrypt.");
    }
  };

  const handleRefresh = () => {
    setEncryptSeedPhrase("");
    setEncryptPassword("");
    setEncryptedSeed("");
    setDecryptEncryptedSeed("");
    setDecryptPassword("");
    setDecryptedSeed("");
    setError("");
    setIsModalOpen(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#121212", // Dark theme background
        color: "#e0e0e0",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        border: "10px solid white", // White border for contrast
      }}
    >
      {/* Refresh Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          backgroundColor: "#3498db",
          border: "none",
          padding: "10px",
          color: "#ffffff",
          fontSize: "14px",
          borderRadius: "5px",
          cursor: "pointer",
          transition: "background 0.3s ease",
        }}
        onMouseEnter={(e) =>
          ((e.target as HTMLButtonElement).style.backgroundColor = "#2980b9")
        }
        onMouseLeave={(e) =>
          ((e.target as HTMLButtonElement).style.backgroundColor = "#3498db")
        }
      >
        Refresh
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#1e1e1e",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          }}
        >
          <p style={{ color: "#ffffff", marginBottom: "20px" }}>
            Have you saved your key and remembered your password? Once
            refreshed, everything will be cleared.
          </p>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              onClick={handleRefresh}
              style={{
                backgroundColor: "#1abc9c",
                border: "none",
                padding: "10px 20px",
                color: "#ffffff",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "background 0.3s ease",
              }}
            >
              Yes, Refresh
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                backgroundColor: "#e74c3c",
                border: "none",
                padding: "10px 20px",
                color: "#ffffff",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "background 0.3s ease",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div
        style={{
          maxWidth: "600px",
          width: "100%",
          backgroundColor: "#1e1e1e", // Slightly lighter dark background for the container
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.5)",
          marginTop: "50px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#ffffff",
          }}
        >
          🌙 Seed Phrase Protector
        </h1>
        <p style={{ color: "#d3d3d3", fontSize: "14px", marginBottom: "20px" }}>
          <strong>Note:</strong> Nothing processes from the backend; it’s all in
          your browser. You’re the boss. Keep your private key safe, and don’t
          forget your password! P.S. If someone finds the key, they won’t know
          what it means—haha, that’s the beauty of encryption!
        </p>

        {/* Encrypt Section */}
        <div style={{ marginBottom: "30px" }}>
          <h2 style={{ color: "#f5f5f5" }}>🔒 Encrypt Seed Phrase</h2>
          <textarea
            placeholder="Enter your seed phrase"
            value={encryptSeedPhrase}
            onChange={(e) => setEncryptSeedPhrase(e.target.value)}
            rows={3}
            style={{
              width: "100%",
              marginBottom: "10px",
              borderRadius: "5px",
              padding: "10px",
              border: "1px solid #444",
              backgroundColor: "#2c2c2c",
              color: "#e0e0e0",
            }}
          />
          <div style={{ position: "relative", marginBottom: "10px" }}>
            <input
              type={showEncryptPassword ? "text" : "password"}
              placeholder="Enter a password"
              value={encryptPassword}
              onChange={(e) => setEncryptPassword(e.target.value)}
              style={{
                width: "100%",
                borderRadius: "5px",
                padding: "10px",
                border: "1px solid #444",
                backgroundColor: "#2c2c2c",
                color: "#e0e0e0",
              }}
            />
            <span
              onClick={() => setShowEncryptPassword(!showEncryptPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#ffffff",
              }}
            >
              {showEncryptPassword ? "🙈" : "👁️"}
            </span>
          </div>
          <button
            onClick={handleEncrypt}
            style={{
              backgroundColor: "#1abc9c",
              border: "none",
              padding: "10px 20px",
              color: "#ffffff",
              fontSize: "16px",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background 0.3s ease",
            }}
          >
            Encrypt
          </button>
          {encryptedSeed && (
            <div style={{ marginTop: "20px" }}>
              <h3 style={{ color: "#f5f5f5" }}>🔐 Encrypted Seed Phrase:</h3>
              <textarea
                readOnly
                value={encryptedSeed}
                rows={3}
                style={{
                  width: "100%",
                  borderRadius: "5px",
                  padding: "10px",
                  border: "1px solid #444",
                  backgroundColor: "#2c2c2c",
                  color: "#e0e0e0",
                }}
              />
            </div>
          )}
        </div>

        {/* Decrypt Section */}
        <div>
          <h2 style={{ color: "#f5f5f5" }}>🔓 Decrypt Seed Phrase</h2>
          <textarea
            placeholder="Paste your encrypted seed phrase here"
            value={decryptEncryptedSeed}
            onChange={(e) => setDecryptEncryptedSeed(e.target.value)}
            rows={3}
            style={{
              width: "100%",
              marginBottom: "10px",
              borderRadius: "5px",
              padding: "10px",
              border: "1px solid #444",
              backgroundColor: "#2c2c2c",
              color: "#e0e0e0",
            }}
          />
          <div style={{ position: "relative", marginBottom: "10px" }}>
            <input
              type={showDecryptPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={decryptPassword}
              onChange={(e) => setDecryptPassword(e.target.value)}
              style={{
                width: "100%",
                borderRadius: "5px",
                padding: "10px",
                border: "1px solid #444",
                backgroundColor: "#2c2c2c",
                color: "#e0e0e0",
              }}
            />
            <span
              onClick={() => setShowDecryptPassword(!showDecryptPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#ffffff",
              }}
            >
              {showDecryptPassword ? "🙈" : "👁️"}
            </span>
          </div>
          <button
            onClick={handleDecrypt}
            style={{
              backgroundColor: "#3498db",
              border: "none",
              padding: "10px 20px",
              color: "#ffffff",
              fontSize: "16px",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background 0.3s ease",
            }}
          >
            Decrypt
          </button>
          {decryptedSeed && (
            <div style={{ marginTop: "20px" }}>
              <h3 style={{ color: "#f5f5f5" }}>🔓 Decrypted Seed Phrase:</h3>
              <textarea
                readOnly
                value={decryptedSeed}
                rows={3}
                style={{
                  width: "100%",
                  borderRadius: "5px",
                  padding: "10px",
                  border: "1px solid #444",
                  backgroundColor: "#2c2c2c",
                  color: "#e0e0e0",
                }}
              />
            </div>
          )}
        </div>

        {error && (
          <p
            style={{
              color: "#e74c3c",
              marginTop: "20px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
