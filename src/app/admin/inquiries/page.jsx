"use client";

import React, { useState, useEffect } from "react";
import { 
  Search, 
  Filter, 
  Eye, 
  Trash2, 
  Mail, 
  Phone, 
  Calendar,
  Package,
  ChevronDown,
  X
} from "lucide-react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [counts, setCounts] = useState({
    all: 0,
    pending: 0,
    contacted: 0,
    quoted: 0,
    converted: 0,
    rejected: 0
  });
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch inquiries
  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (selectedStatus !== 'all') {
        params.append('status', selectedStatus);
      }
      
      if (searchQuery) {
        params.append('search', searchQuery);
      }

      const response = await fetch(`/api/admin/inquiries?${params}`);
      const result = await response.json();

      if (result.success) {
        setInquiries(result.data);
        setCounts(result.counts);
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      toast.error('Failed to fetch inquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [selectedStatus, searchQuery]);

  // Delete inquiry
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;

    try {
      const response = await fetch(`/api/admin/inquiries/${id}`, {
        method: 'DELETE'
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Inquiry deleted successfully');
        fetchInquiries();
      } else {
        toast.error(result.error || 'Failed to delete inquiry');
      }
    } catch (error) {
      console.error('Error deleting inquiry:', error);
      toast.error('Failed to delete inquiry');
    }
  };

  // View inquiry details
  const viewInquiry = async (id) => {
    try {
      const response = await fetch(`/api/admin/inquiries/${id}`);
      const result = await response.json();

      if (result.success) {
        setSelectedInquiry(result.data);
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error fetching inquiry:', error);
      toast.error('Failed to fetch inquiry details');
    }
  };

  // Update status
  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/admin/inquiries/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Status updated successfully');
        fetchInquiries();
        if (selectedInquiry && selectedInquiry._id === id) {
          setSelectedInquiry(result.data);
        }
        
        // Trigger notification refresh
        window.dispatchEvent(new CustomEvent('refreshNotifications'));
      } else {
        toast.error(result.error || 'Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  // Status badge color
  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      contacted: 'bg-blue-100 text-blue-800',
      quoted: 'bg-purple-100 text-purple-800',
      converted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <Toaster position="top-right" />
      
      <div className="p-6 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Inquiries</h1>
          <p className="text-gray-600">Manage customer inquiries and track their status</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {[
            { key: 'all', label: 'All', color: 'bg-gray-50 border-gray-200' },
            { key: 'pending', label: 'Pending', color: 'bg-yellow-50 border-yellow-200' },
            { key: 'contacted', label: 'Contacted', color: 'bg-blue-50 border-blue-200' },
            { key: 'quoted', label: 'Quoted', color: 'bg-purple-50 border-purple-200' },
            { key: 'converted', label: 'Converted', color: 'bg-green-50 border-green-200' },
            { key: 'rejected', label: 'Rejected', color: 'bg-red-50 border-red-200' }
          ].map((stat) => (
            <button
              key={stat.key}
              onClick={() => setSelectedStatus(stat.key)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedStatus === stat.key
                  ? 'border-[#1F1951] ' + stat.color
                  : 'border-gray-200 bg-white hover:' + stat.color
              }`}
            >
              <div className="text-2xl font-bold text-gray-900">{counts[stat.key]}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </button>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name, email, phone, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F1951]"
              />
            </div>
          </div>
        </div>

        {/* Inquiries Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1F1951] mx-auto"></div>
              <p className="text-gray-500 mt-4">Loading inquiries...</p>
            </div>
          ) : inquiries.length === 0 ? (
            <div className="p-12 text-center">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No inquiries found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Products
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {inquiries.map((inquiry) => (
                    <tr key={inquiry._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{inquiry.fullName}</div>
                          {inquiry.company && (
                            <div className="text-sm text-gray-500">{inquiry.company}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 flex items-center gap-1">
                          <Mail size={14} className="text-gray-400" />
                          {inquiry.email}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                          <Phone size={14} className="text-gray-400" />
                          {inquiry.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-medium">
                          {inquiry.products.length} {inquiry.products.length === 1 ? 'Product' : 'Products'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={inquiry.status}
                          onChange={(e) => updateStatus(inquiry._id, e.target.value)}
                          className={`text-xs font-medium px-3 py-1 rounded-full border-0 cursor-pointer ${getStatusColor(inquiry.status)}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="contacted">Contacted</option>
                          <option value="quoted">Quoted</option>
                          <option value="converted">Converted</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center gap-1">
                          <Calendar size={14} className="text-gray-400" />
                          {formatDate(inquiry.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => viewInquiry(inquiry._id)}
                          className="text-[#1F1951] hover:text-[#2a2466] mr-3"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(inquiry._id)}
                          className="text-red-600 hover:text-red-700"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal for Inquiry Details */}
      {showModal && selectedInquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Inquiry Details</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Customer Info */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">Full Name</label>
                    <p className="text-sm text-gray-900 mt-1">{selectedInquiry.fullName}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">Email</label>
                    <p className="text-sm text-gray-900 mt-1">{selectedInquiry.email}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">Phone</label>
                    <p className="text-sm text-gray-900 mt-1">{selectedInquiry.phone}</p>
                  </div>
                  {selectedInquiry.company && (
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase">Company</label>
                      <p className="text-sm text-gray-900 mt-1">{selectedInquiry.company}</p>
                    </div>
                  )}
                  {selectedInquiry.location && (
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase">Location</label>
                      <p className="text-sm text-gray-900 mt-1">{selectedInquiry.location}</p>
                    </div>
                  )}
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">Status</label>
                    <select
                      value={selectedInquiry.status}
                      onChange={(e) => updateStatus(selectedInquiry._id, e.target.value)}
                      className={`text-xs font-medium px-3 py-1 rounded-full mt-1 cursor-pointer ${getStatusColor(selectedInquiry.status)}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="contacted">Contacted</option>
                      <option value="quoted">Quoted</option>
                      <option value="converted">Converted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Products */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Products ({selectedInquiry.products.length})
                </h3>
                <div className="space-y-3">
                  {selectedInquiry.products.map((product, index) => (
                    <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{product.name}</h4>
                        <p className="text-sm text-gray-600">Style Code: {product.styleCode}</p>
                        <div className="flex gap-4 mt-2 text-xs text-gray-500">
                          <span>Material: {product.material}</span>
                          <span>Color: {product.color}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              {selectedInquiry.notes && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Notes</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">{selectedInquiry.notes}</p>
                  </div>
                </div>
              )}

              {/* Timestamps */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Created:</span>
                    <span className="text-gray-900">{formatDate(selectedInquiry.createdAt)}</span>
                  </div>
                  {selectedInquiry.contactedAt && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Contacted:</span>
                      <span className="text-gray-900">{formatDate(selectedInquiry.contactedAt)}</span>
                    </div>
                  )}
                  {selectedInquiry.quotedAt && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quoted:</span>
                      <span className="text-gray-900">{formatDate(selectedInquiry.quotedAt)}</span>
                    </div>
                  )}
                  {selectedInquiry.convertedAt && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Converted:</span>
                      <span className="text-gray-900">{formatDate(selectedInquiry.convertedAt)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
