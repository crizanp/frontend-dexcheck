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
    <div className="advertisement-container flex flex-col items-center pb-4">
      <div className="announcement-bar text-center p-2 rounded-md font-semibold">
        CA: $DEXC Launching soon on pump.fun
      </div>
      <a
        href={advertisement.linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex justify-center w-full mt-2"
      >
        <div className="relative inline-block">
          <img
            src={advertisement.imageUrl}
            alt="Advertisement"
            className="advertisement-image rounded-lg shadow-lg"
          />
          <div className="ads-label absolute top-2 right-2 bg-white text-green-700 text-xs font-bold px-2  rounded border border-green-300">
            Ads
          </div>
        </div>
      </a>

      <style jsx>{`
        .announcement-bar {
          background-color: #f0fdf4;
          color: #14532d;
          border: 1px solid #bbf7d0;
          width: max-content;
        }

        .advertisement-image {
          border: 1px solid #e5e7eb;
          max-width: 100%;
          display: block;
        }
      `}</style>
    </div>
  );
}
