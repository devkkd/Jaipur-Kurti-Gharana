'use client';
import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import CloudinaryUpload from '@/components/admin/CloudinaryUpload';
import MultipleImageUpload from '@/components/admin/MultipleImageUpload';

const AVAILABLE_SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'];

export default function EditProductPage() {
  const router = useRouter();
  const { id: productId } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [formData, setFormData] = useState({
    name: '', description: '',
    images: { main: '', gallery: [] },
    sizes: [],
    productDetails: { material: '', productCare: '', additionalInfo: '' },
    color: { name: '', code: '' },
    categoryId: '', subcategoryId: '',
    tags: [], isFeatured: false, isNewArrival: false, sortOrder: 0, isActive: true
  });

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [catRes, subRes, prodRes] = await Promise.all([
          fetch('/api/admin/categories'),
          fetch('/api/admin/subcategories'),
          fetch(`/api/products/${productId}`)
        ]);
        const catData = await catRes.json();
        const subData = await subRes.json();
        const prodData = await prodRes.json();
        if (catData.success) setCategories(catData.data);
        if (subData.success) setSubcategories(subData.data);
        if (prodData.success) {
          const p = prodData.data;
          setFormData({
            name: p.name || '', description: p.description || '',
            images: { main: p.images?.main || '', gallery: p.images?.gallery || [] },
            sizes: p.sizes || [],
            productDetails: { material: p.productDetails?.material || '', productCare: p.productDetails?.productCare || '', additionalInfo: p.productDetails?.additionalInfo || '' },
            color: { name: p.color?.name || '', code: p.color?.code || '' },
            categoryId: typeof p.categoryId === 'object' ? p.categoryId._id : p.categoryId || '',
            subcategoryId: typeof p.subcategoryId === 'object' ? p.subcategoryId?._id : p.subcategoryId || '',
            tags: p.tags || [], isFeatured: p.isFeatured || false,
            isNewArrival: p.isNewArrival || false, sortOrder: p.sortOrder || 0, isActive: p.isActive !== false
          });
        }
      } catch (e) { console.error(e); }
      finally { setFetching(false); }
    };
    if (productId) fetchAll();
  }, [productId]);

  useEffect(() => {
    if (formData.categoryId) {
      setFilteredSubcategories(subcategories.filter(s =>
        (typeof s.categoryId === 'object' ? s.categoryId._id : s.categoryId) === formData.categoryId
      ));
    } else setFilteredSubcategories([]);
  }, [formData.categoryId, subcategories]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!formData.name.trim()) { alert('Product name is required'); return; }
      if (!formData.categoryId) { alert('Category is required'); return; }
      if (!formData.images.main) { alert('Main product image is required'); return; }
      if (!formData.color.name.trim()) { alert('Color name is required'); return; }
      const res = await fetch(`/api/products/${productId}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) { alert('Product updated successfully!'); router.push('/admin/products'); }
      else alert(data.error || 'Failed to update product');
    } catch (e) { alert('Error updating product'); }
    finally { setLoading(false); }
  };

  const handleSizeChange = (i, field, value) => {
    const s = [...formData.sizes]; s[i] = { ...s[i], [field]: value };
    setFormData({ ...formData, sizes: s });
  };
  const addSize = (size) => {
    if (!formData.sizes.find(s => s.size === size))
      setFormData({ ...formData, sizes: [...formData.sizes, { size, available: true, stock: 0 }] });
  };
  const removeSize = (i) => setFormData({ ...formData, sizes: formData.sizes.filter((_, idx) => idx !== i) });
  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, newTag.trim()] }); setNewTag('');
    }
  };

  if (fetching) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/products" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft size={20} /> Back to Products
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
          <p className="text-gray-600 mt-1">Update product details</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
              <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} rows="4" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Product Images</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Main Image *</label>
              <CloudinaryUpload value={formData.images.main} onChange={url => setFormData({ ...formData, images: { ...formData.images, main: url } })} folder="avanta/products" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gallery Images</label>
              <MultipleImageUpload images={formData.images.gallery} onChange={imgs => setFormData({ ...formData, images: { ...formData.images, gallery: imgs } })} folder="avanta/products" maxImages={8} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Sizes & Stock</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {AVAILABLE_SIZES.map(size => (
              <button key={size} type="button" onClick={() => addSize(size)} disabled={!!formData.sizes.find(s => s.size === size)}
                className={`px-3 py-1 text-sm rounded-lg border ${formData.sizes.find(s => s.size === size) ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}>
                {size}
              </button>
            ))}
          </div>
          <div className="space-y-3">
            {formData.sizes.map((s, i) => (
              <div key={i} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg">
                <div className="w-12 text-center font-medium">{s.size}</div>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={s.available} onChange={e => handleSizeChange(i, 'available', e.target.checked)} /> Available</label>
                <label className="flex items-center gap-2 text-sm">Stock: <input type="number" value={s.stock} onChange={e => handleSizeChange(i, 'stock', parseInt(e.target.value) || 0)} className="w-20 border border-gray-300 rounded px-2 py-1 text-sm" min="0" /></label>
                <button type="button" onClick={() => removeSize(i)} className="text-red-600 ml-auto"><X size={16} /></button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Product Details</h2>
          <div className="space-y-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-2">Material</label><input type="text" value={formData.productDetails.material} onChange={e => setFormData({ ...formData, productDetails: { ...formData.productDetails, material: e.target.value } })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Georgette (optional)" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-2">Product Care</label><input type="text" value={formData.productDetails.productCare} onChange={e => setFormData({ ...formData, productDetails: { ...formData.productDetails, productCare: e.target.value } })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Dry clean only (optional)" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-2">Additional Info</label><textarea value={formData.productDetails.additionalInfo} onChange={e => setFormData({ ...formData, productDetails: { ...formData.productDetails, additionalInfo: e.target.value } })} rows="3" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Color & Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-2">Color Name *</label><input type="text" value={formData.color.name} onChange={e => setFormData({ ...formData, color: { ...formData.color, name: e.target.value } })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-2">Color Code</label><input type="text" value={formData.color.code} onChange={e => setFormData({ ...formData, color: { ...formData.color, code: e.target.value } })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <select value={formData.categoryId} onChange={e => setFormData({ ...formData, categoryId: e.target.value, subcategoryId: '' })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                <option value="">Select Category</option>
                {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory</label>
              <select value={formData.subcategoryId} onChange={e => setFormData({ ...formData, subcategoryId: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" disabled={!formData.categoryId}>
                <option value="">Select Subcategory</option>
                {filteredSubcategories.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Tags & Settings</h2>
          <div className="flex gap-2 mb-3">
            <input type="text" value={newTag} onChange={e => setNewTag(e.target.value)} onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addTag())} className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Add a tag" />
            <button type="button" onClick={addTag} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"><Plus size={16} /></button>
          </div>
          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {formData.tags.map((tag, i) => (
                <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  {tag}<button type="button" onClick={() => setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) })} className="text-blue-600"><X size={14} /></button>
                </span>
              ))}
            </div>
          )}
          <div className="flex items-center gap-6 mt-4">
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={formData.isFeatured} onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })} /> Featured</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={formData.isNewArrival} onChange={e => setFormData({ ...formData, isNewArrival: e.target.checked })} /> New Arrival</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={formData.isActive} onChange={e => setFormData({ ...formData, isActive: e.target.checked })} /> Active</label>
          </div>
        </div>

        <div className="flex gap-4">
          <button type="submit" disabled={loading} className="flex-1 bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 disabled:opacity-50 font-semibold text-lg">
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          <Link href="/admin/products" className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl hover:bg-gray-200 text-center font-semibold text-lg">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
