import React from 'react';
import * as Lucide from 'lucide-react';

const ToolCard = ({ icon: Icon, title, description, link, tags }) => (
  <div className="bg-white rounded-xl border border-gray-100 p-6 hover:border-green-200 hover:shadow-lg transition-all">
    <div className="flex items-start gap-4 mb-4">
      <div className="p-3 bg-green-50 rounded-lg">
        <Icon className="w-6 h-6 text-green-600" />
      </div>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
    </div>
    <p className="text-gray-600 text-sm mb-4">{description}</p>
    <div className="flex flex-wrap gap-2 mb-4">
      {tags.map((tag, index) => (
        <span key={index} className={`px-2.5 py-1 rounded-full text-xs font-medium ${
          tag === 'Security' ? 'bg-red-100 text-red-700' :
          tag === 'DeFi' ? 'bg-green-100 text-green-700' :
          'bg-gray-100 text-gray-600'
        }`}>
          {tag}
        </span>
      ))}
    </div>
    <a 
      href={link} 
      className="inline-flex items-center text-green-700 hover:text-green-900 font-semibold text-sm"
    >
      Access Tool
      <Lucide.ArrowUpRight className="w-4 h-4 ml-2" />
    </a>
  </div>
);

const CryptoToolsDashboard = () => {
  const tools = [
    {
      icon: Lucide.Search,
      title: "Bundle Detector",
      description: "Spot manipulative token pool transactions instantly",
      link: "/bundle-detector",
      tags: ["Security", "DeFi"]
    },
    {
      icon: Lucide.Ship,
      title: "Whale Tracker",
      description: "Monitor large wallet movements in real-time",
      link: "/whale-tracker",
      tags: ["Monitoring", "Alerts"]
    },
    {
      icon: Lucide.LineChart,
      title: "Token Analytics",
      description: "Comprehensive market charts & metrics",
      link: "/token-analytics",
      tags: ["Analytics", "Metrics"]
    },
    {
      icon: Lucide.Shield,
      title: "Security Scanner",
      description: "Smart contract vulnerability detection",
      link: "/security-scanner",
      tags: ["Security", "Audit"]
    },
    {
      icon: Lucide.Eye,
      title: "Honeypot Check",
      description: "Detect non-sellable token scams",
      link: "/honeypot-detector",
      tags: ["Security", "Trading"]
    },
    {
      icon: Lucide.Terminal,
      title: "DEX Bot",
      description: "Automated trading strategies",
      link: "/dex-bot",
      tags: ["Trading", "DeFi"]
    },
    {
      icon: Lucide.Radio,
      title: "Mempool Explorer",
      description: "Track pending blockchain transactions",
      link: "/mempool-explorer",
      tags: ["Monitoring", "MEV"]
    },
    {
      icon: Lucide.Wallet,
      title: "Portfolio Tracker",
      description: "Cross-chain asset monitoring",
      link: "/portfolio-tracker",
      tags: ["Analytics", "Multi-chain"]
    },
  ];

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Warning Header */}
        <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-8 flex items-center gap-3">
          <Lucide.AlertTriangle className="w-5 h-5 text-green-600" />
          <span className="text-green-700 font-medium text-sm">
            DEXC token holding required for tool access
          </span>
          <button className="ml-auto bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white font-semibold text-sm flex items-center gap-2">
            <Lucide.Wallet className="w-4 h-4" /> Connect Wallet
          </button>
        </div>

        {/* Main Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            <span className="text-green-600">DEX</span> Analytics Suite
          </h1>
          <p className="text-gray-600 text-lg">
            Professional-grade trading tools for decentralized markets
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <ToolCard key={index} {...tool} />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center border-t border-gray-100 pt-8">
          <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
            <Lucide.Sparkle className="w-4 h-4 text-green-600" />
            New tools added weekly
          </p>
        </div>
      </div>
    </div>
  );
};

export default CryptoToolsDashboard;