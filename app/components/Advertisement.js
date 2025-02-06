import { useAdvertisement } from "../context/AdvertisementContext";

export default function Advertisement() {
  const { advertisement, loading } = useAdvertisement();

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>Loading...</div>
    );
  }

  if (!advertisement) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px", color: "gray" }}>
        No active advertisement at the moment.
      </div>
    );
  }

  return (
    <div className="advertisement-container pb-4">
      <div className="announcement-bar">
        dexcheck.fun token will be live soon
      </div>
      <a
        href={advertisement.linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="advertisement-link"
      >
        <div className="image-container">
          <img
            src={advertisement.imageUrl}
            alt="Advertisement"
            className="advertisement-image"
          />
          <div className="ads-label">
            <span>Ads</span>
          </div>
        </div>
      </a>

      <style jsx>{`
        .advertisement-container {
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .announcement-bar {
          background-color: rgba(0, 0, 0, 0.9);
          color: white;
          font-size: 0.8rem;
          font-weight: bold;
          text-align: center;
          width: 100%;
          padding: 0.5rem 0.7rem;
          border-radius: 0.5rem;
          margin-bottom: 1rem;
        }

        .image-container {
          position: relative;
          width: 100%;
        }

        .advertisement-image {
          max-height: 200px;
          object-fit: cover;
          border-radius: 0.5rem;
          width: 100%;
        }

        .ads-label {
          position: absolute;
          top: 8px;
          right: 8px;
          background-color: rgba(0, 0, 0, 0.8);
          color: white;
          font-size: 0.6rem;
          padding: 0.2rem 0.4rem;
          border-radius: 0.3rem;
          display: flex;
          align-items: center;
        }
      `}</style>
    </div>
  );
}
