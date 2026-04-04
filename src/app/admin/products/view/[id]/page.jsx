'use client';
import { useState, useEffect } from 'react';
import { ArrowLeft, Package } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ViewProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/products/${id}`)
      .then(r => r.json())
      .then(d => { if (d.success) setProduct(d.data); })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>;
  if (!product) return <div className="text-center py-16 text-gray-500">Product not found</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/products" className="flex items-center gap-2 text-gray-600 hover:text-gray-900"><ArrowLeft size={20} /> Back</Link>
        <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
        <Link href={`/admin/products/edit/${id}`} className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">Edit Product</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {product.images?.main ? <img src={product.images.main} alt={product.name} className="w-full rounded-xl object-cover aspect-square" /> : <div className="w-full aspect-square bg-gray-100 rounded-xl flex items-center justify-center"><Package size={48} className="text-gray-400" /></div>}
          {product.images?.gallery?.length > 0 && (
            <div className="grid grid-cols-4 gap-2 mt-3">
              {product.images.gallery.map((img, i) => <img key={i} src={img} alt="" className="w-full aspect-square rounded-lg object-cover" />)}
            </div>
          )}
        </div>
        <div className="space-y-4">
          <div><p className="text-sm text-gray-500">Category</p><p className="font-medium">{typeof product.categoryId === 'object' ? product.categoryId?.name : product.categoryId}</p></div>
          {product.subcategoryId && <div><p className="text-sm text-gray-500">Subcategory</p><p className="font-medium">{typeof product.subcategoryId === 'object' ? product.subcategoryId?.name : product.subcategoryId}</p></div>}
          <div><p className="text-sm text-gray-500">Color</p><p className="font-medium">{product.color?.name} {product.color?.code && <span className="text-gray-400">({product.color.code})</span>}</p></div>
          <div><p className="text-sm text-gray-500">Description</p><p className="text-sm">{product.description}</p></div>
          {product.productDetails?.material && <div><p className="text-sm text-gray-500">Material</p><p className="text-sm">{product.productDetails.material}</p></div>}
          {product.productDetails?.productCare && <div><p className="text-sm text-gray-500">Product Care</p><p className="text-sm">{product.productDetails.productCare}</p></div>}
          <div>
            <p className="text-sm text-gray-500 mb-2">Sizes & Stock</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes?.map((s, i) => <span key={i} className="px-3 py-1 bg-gray-100 rounded-lg text-sm">{s.size}: {s.stock}</span>)}
            </div>
          </div>
          <div className="flex gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{product.isActive ? 'Active' : 'Inactive'}</span>
            {product.isFeatured && <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Featured</span>}
            {product.isNewArrival && <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">New Arrival</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
