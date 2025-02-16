import Image from "next/image";
import { useState } from "react";
import { FaHandshake, FaBullhorn, FaInfoCircle, FaTelegramPlane, FaTwitter } from "react-icons/fa";

export default function Footer() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");

    const openModal = (content: string) => {
        setModalContent(content);
        setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <footer className="footer sm:mb-0 mb-4 mt-4">
            <div className="footer-content">
                <div className="footer-logo">
                    <a href="https://dexcheck.fun">
<Image
              src="/images/DEX.png"
              alt="DexCheck Logo"
              width={180}
              height={80}
            />                    </a>
                </div>
                <div className="footer-center">
                    <div className="footer-links">
                        <button onClick={() => openModal("partnership")} className="footer-link">
                            <FaHandshake /> Partnership
                        </button>
                        <button onClick={() => openModal("advertisement")} className="footer-link">
                            <FaBullhorn /> Advertising
                        </button>
                        <button onClick={() => openModal("about")} className="footer-link">
                            <FaInfoCircle /> About Us
                        </button>
                    </div>
                    <div className="footer-copy">
                        <span>© {new Date().getFullYear()} </span>
                        <a href="https://dexcheck.fun" target="_blank" rel="noopener noreferrer" className="footer-link">Dexcheck.Fun</a>
                        <span>. All rights reserved.</span>
                    </div>
                    {/* Social Media Links */}
            
                </div>
                <div className="mt-auto flex justify-center space-x-4 my-auto sm:hidden">
                <a
                    href="https://t.me/dexcheckdotfun"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:text-green-600"
                >
                    <FaTelegramPlane className="text-2xl" />
                </a>
                <a
                    href="https://x.com/dexcheckdotfun"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:text-green-600"
                >
                    <FaTwitter className="text-2xl" />
                </a>
            </div>
            </div>
            <style jsx>{`
                .footer {
                    width: 100%;
                    background:rgb(255, 255, 255);
                    color: #333;
                    padding: 1rem;
                    text-align: center;
                    border-radius: 0.5rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
                }
                .footer-content {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    max-width: 1200px;
                }
                .footer-logo {
                    display: flex;
                    align-items: center;
                }
                .logo {
                    width: 120px;
                    height: auto;
                }
                .footer-center {
                    flex: 2;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                }
                .footer-links {
                    display: flex;
                    gap: 2rem;
                    flex-wrap: wrap;
                    justify-content: center;
                    font-size: 1rem;
                }
                .footer-link {
                    color: #333;
                    text-decoration: none;
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    gap: 0.3rem;
                    transition: color 0.3s, transform 0.3s;
                    background: none;
                    border: none;
                    cursor: pointer;
                }
                .footer-link:hover {
                    color:rgb(9, 184, 67);
                    transform: scale(1.05);
                }
                .footer-copy {
                    font-size: 0.9rem;
                    color: #555;
                    display: flex;
                    gap: 0.3rem;
                    flex-wrap: nowrap;
                    justify-content: center;
                    margin-top: 0.5rem;
                }
                @media (max-width: 600px) {
                    .footer-content {
                        flex-direction: column;
                        align-items: center;
                        gap: 1rem;
                    }
                    .footer-logo {
                        margin-bottom: 1rem;
                        justify-content: center;
                    }
                    .footer-links {
                        gap: 1rem;
                        font-size: 0.9rem;
                    }
                    .footer-copy {
                        font-size: 0.8rem;
                    }
                }
            `}</style>
            </footer>


            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        {modalContent === "partnership" && (
                            <>
                                <h2>🤝 Partner with Us</h2>
                                <p>
                                    Join our ecosystem to grow together! We collaborate with investors, project owners, and service providers to enhance the crypto landscape.
                                </p>
                                <p>
                                    Explore partnership opportunities with our ecosystem's tools for token research and tracking. Let’s create success together!
                                </p>
                            </>
                        )}
                        {modalContent === "advertisement" && (
                            <>
                                <h2>📈 Advertising Packages</h2>
                                <pre>
                                    {`
╔═════════════════════════════════════════════╗
║           PROMOTIONAL PACKAGES              ║
╠═════════════════╦═══════════════════════════╣
║ #1 Pinned List  ║ 0.2 SOL / 6 Hours         ║
║ #2 Pinned List  ║ 0.3 SOL / 10 Hours        ║
║ Normal Listing  ║ 0.1 SOL Sorted by MC      ║
║ Banner Ads      ║ 1 SOL (All Pages, 8hr)    ║
║ Text Banner Ads ║ 0.3 SOL (8hr)             ║
║ Spotlight List  ║ 0.3 SOL Sorted by MC (6hr)║
║ Popular Search  ║ 0.3 SOL Force List        ║
╠═════════════════╬═══════════════════════════╣
║ COMBO DEAL      ║ 2 SOL /24 hours           ║
║ Includes:       ║                           ║
║ - #1 Pinned List║                           ║
║ - Banner Ads    ║                           ║
║ - Spotlight #1  ║                           ║
╚═════════════════╩═══════════════════════════╝
`}
                                </pre>
                                <p className="py-4">
                                    Secure your spot today and maximize visibility for your project! Contact us on Telegram: <a href="https://t.me/Edward_Listing" className="contact_tg" target="_blank" rel="noopener noreferrer">Edward_Listing</a>.
                                </p>
                            </>
                        )}
                       {modalContent === "about" && (
    <>
        <h2>About Us</h2>
        <p>
            We make it easy for investors to research meme tokens and stay updated on the latest trends, especially on platforms like Pump.fun and Moonshot. Our goal is to simplify the process, giving you real-time insights to spot potential opportunities.
        </p>
        <p>
            Our token unlocks premium features like in-depth market analytics, early alerts on trending tokens, and community-driven governance. This ensures every investor has the best tools for making informed decisions.
        </p>
        <p>
            We generate revenue through premium memberships, token promotions, and exclusive research reports. This keeps our platform growing, improving, and delivering top-tier insights for the meme token space.
        </p>
    </>
)}

                        <div className="modal-buttons">
                            <button onClick={closeModal} className="modal-button close-button">Close</button>
                            {modalContent !== "about" && (
                                <a href="https://t.me/Edward_Listing" target="_blank" rel="noopener noreferrer" className="modal-button chat-button">Let's Chat</a>
                            )}
                        </div>
                    </div>

                    <style jsx>{`
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }

   .modal-content {
    background: #222;
    padding: 1.5rem;
    max-width: 420px;
    width: 90%;
    max-height: 70vh; /* Limits height to 70% of the viewport height */
    border-radius: 0.5rem;
    border: 1px solid white;
    color: #ddd;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    overflow-y: auto; /* Enables vertical scrolling for overflow content */
    scrollbar-width: none; /* For Firefox */
    -ms-overflow-style: none; /* For IE and Edge */
}

.modal-content::-webkit-scrollbar {
    display: none; /* For Chrome, Safari, and Opera */
}

    .modal-content h2 {
        color: white;
        margin-bottom: 1rem;
    }

    .modal-content p {
        margin-bottom: 1rem;
        line-height: 1.4;
    }

    .modal-content pre {
        background-color: #ffffff;
        color: #ba4000;
        padding: 1rem;
        border-radius: 0.5rem;
        overflow-x: auto;
        font-family: monospace;
        text-align: left;
    }

    .modal-content .contact_tg {
        color: #6c63ff;
        transition: color 0.3s;
    }

    .modal-content .contact_tg:hover {
        color: #5a55cc;
    }

    .modal-buttons {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-top: 1.5rem;
    }

    .modal-button {
        background-color: #333;
        color: white;
        padding: 0.5rem 1.5rem;
        border: 1px solid white;
        border-radius: 0.3rem;
        cursor: pointer;
        font-weight: bold;
        text-decoration: none;
        transition: background 0.3s, color 0.3s;
    }

    .modal-button:hover {
        background-color: #6c63ff;
        color: white;
    }

    .chat-button {
        background-color: #444;
        color: white;
        text-decoration: none;
    }

    .chat-button:hover {
        background-color: #6c63ff;
        color: #fff;
    }

    .close-button {
        background-color: #333;
    }

    .close-button:hover {
        background-color: #dd3737d4;
        color: white;
    }

    @media (max-width: 400px) {
        .modal-content {
            padding: 1rem;
            max-height: 80vh; /* Slightly higher height for smaller screens */
        }

        .modal-buttons {
            flex-direction: column;
            gap: 0.5rem;
        }
    }
`}</style>

                </div>
            )}
        </>
    );
}
