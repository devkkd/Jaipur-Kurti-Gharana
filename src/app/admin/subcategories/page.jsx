'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import CloudinaryUpload from '@/components/admin/CloudinaryUpload';

export default function SubcategoriesPage() {
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSubcategory, setEditingSubcategory] = useState(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    categoryId: '',
    image: ''
  });

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/categories');
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
        // console.log('Fetched categories:', data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fetch subcategories
  const fetchSubcategories = async (categoryId = '') => {
    try {
      const url = categoryId 
        ? `/api/admin/subcategories?categoryId=${categoryId}`
        : '/api/admin/subcategories';
      
      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        // Exclude subcategories whose parent category is inactive
        const filtered = data.data.filter(sub => !(sub.categoryId && sub.categoryId.isActive === false));
        setSubcategories(filtered);
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
  }, []);

  // Handle category filter change
  const handleCategoryFilterChange = (categoryId) => {
    setSelectedCategoryFilter(categoryId);
    setLoading(true);
    fetchSubcategories(categoryId);
  };

  // Get category name by ID or object
  const getCategoryName = (categoryId) => {
    // If categoryId is already an object with name, return it directly
    if (categoryId && typeof categoryId === 'object' && categoryId.name) {
      return categoryId.name;
    }
    
    // If categoryId is a string, find the category
    if (typeof categoryId === 'string') {
      const category = categories.find(cat => cat._id === categoryId);
      return category ? category.name : 'Unknown';
    }
    
    return 'Unknown';
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingSubcategory 
        ? `/api/admin/subcategories/${editingSubcategory._id}`
        : '/api/admin/subcategories';
      
      const method = editingSubcategory ? 'PUT' : 'POST';

      // Normalize categoryId to string id if needed
      const payload = {
        ...formData,
        categoryId: formData.categoryId && formData.categoryId._id ? formData.categoryId._id : formData.categoryId
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
        setFormData({ name: '', description: '', categoryId: '', image: '' });

      const data = await response.json();

      if (data.success) {
        await fetchSubcategories(selectedCategoryFilter);
        setShowForm(false);
        setEditingSubcategory(null);
        setFormData({ name: '', description: '', categoryId: '' });
        alert(data.message);
      } else {
        alert(data.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error saving subcategory:', error);
      alert('Error saving subcategory');
    } finally {
      setLoading(false);
    }
  };

  // Handle edit
  const handleEdit = (subcategory) => {
    setEditingSubcategory(subcategory);
    setFormData({
      name: subcategory.name,
      description: subcategory.description,
      categoryId: subcategory.categoryId && subcategory.categoryId._id ? subcategory.categoryId._id : subcategory.categoryId,
      image: subcategory.image || ''
    });
    setShowForm(true);
  };

  // Handle delete
  const handleDelete = async (subcategoryId) => {
    if (!confirm('Are you sure you want to delete this subcategory?')) return;

    try {
      const response = await fetch(`/api/admin/subcategories/${subcategoryId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        await fetchSubcategories(selectedCategoryFilter);
        alert(data.message);
      } else {
        alert(data.error || 'Failed to delete subcategory');
      }
    } catch (error) {
      console.error('Error deleting subcategory:', error);
      alert('Error deleting subcategory');
    }
  };

  // Handle toggle active status
  const handleToggleActive = async (subcategory) => {
    try {
      const response = await fetch(`/api/admin/subcategories/${subcategory._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !subcategory.isActive }),
      });

      const data = await response.json();

      if (data.success) {
        await fetchSubcategories(selectedCategoryFilter);
      } else {
        alert(data.error || 'Failed to update subcategory');
      }
    } catch (error) {
      console.error('Error updating subcategory:', error);
      alert('Error updating subcategory');
    }
  };

  if (loading && subcategories.length === 0) {
    return (
      <div>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Subcategories</h1>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingSubcategory(null);
            setFormData({ name: '', description: '', categoryId: '' });
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus size={20} />
          Add Subcategory
        </button>
      </div>

      {/* Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Category
        </label>
        <select
          value={selectedCategoryFilter}
          onChange={(e) => handleCategoryFilterChange(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingSubcategory ? 'Edit Subcategory' : 'Add New Subcategory'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subcategory Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="Enter subcategory name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image
                </label>
                <CloudinaryUpload
                  value={formData.image}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                  folder="avanta/subcategories"
                  placeholder="Upload subcategory image"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Enter description (optional)"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : (editingSubcategory ? 'Update' : 'Create')}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingSubcategory(null);
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Subcategories Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subcategory
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {subcategories.map((subcategory) => (
              <tr key={subcategory._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  {subcategory.image ? (
                    <img src={subcategory.image} alt={subcategory.name} className="w-16 h-10 object-cover rounded" />
                  ) : (
                    <div className="w-16 h-10 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">No Image</div>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {subcategory.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {subcategory.slug}
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {subcategory.categoryId && typeof subcategory.categoryId === 'object' 
                      ? subcategory.categoryId.name 
                      : getCategoryName(subcategory.categoryId)
                    }
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-xs truncate">
                    {subcategory.description || '-'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    subcategory.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {subcategory.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleActive(subcategory)}
                      className="text-gray-600 hover:text-gray-900"
                      title={subcategory.isActive ? 'Deactivate' : 'Activate'}
                    >
                      {subcategory.isActive ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <button
                      onClick={() => handleEdit(subcategory)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(subcategory._id)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {subcategories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500">
              {selectedCategoryFilter ? 'No subcategories found for selected category' : 'No subcategories found'}
            </div>
            <button
              onClick={() => {
                setShowForm(true);
                setEditingSubcategory(null);
                setFormData({ name: '', description: '', categoryId: '' });
              }}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Add First Subcategory
            </button>
          </div>
        )}
      </div>
    </div>
  );
}