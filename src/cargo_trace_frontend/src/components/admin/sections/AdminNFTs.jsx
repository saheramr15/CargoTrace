import React, { useState } from 'react';
import {
  Zap,
  Eye,
  ExternalLink,
  Download,
  RefreshCw,
  Search,
  Filter,
  CheckCircle,
  Clock,
  AlertTriangle,
  BarChart3,
  Settings
} from 'lucide-react';

const AdminNfts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const nfts = [
    {
      id: 'NFT-001',
      tokenId: '0x1234...5678',
      documentId: 'BL-2024-001',
      status: 'minted',
      owner: 'ABC Trading Co.',
      value: '$45,000',
      mintedAt: '2024-01-15T10:35:00Z',
      blockchain: 'ICP',
      metadata: {
        name: 'Bill of Lading NFT',
        description: 'Digital representation of shipping document',
        image: 'https://example.com/nft-image.png'
      }
    }
  ];

  return (
    <div className="admin-nfts">
      <div className="admin-nfts-header">
        <div className="admin-nfts-title">
          <h2>NFT Management</h2>
          <p>Manage digital tokens and blockchain representations</p>
        </div>
        <div className="admin-nfts-actions">
          <button className="admin-nfts-action-btn">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>
      <div className="admin-nfts-content">
        <p>NFT management interface coming soon...</p>
      </div>
    </div>
  );
};

export default AdminNfts;
