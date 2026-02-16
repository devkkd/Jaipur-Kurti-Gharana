'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Edit, Package, IndianRupee, Tag, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function ViewProductPage({ params }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [productId, setProductId] = useState(null);

  // Get product ID from params
  useEffect(() => {
    const getProductId = async () => {
      const resolvedParams = await params;
      setProductId(resolvedParams.id);
    };
    getProductId();
  }, [params]);

  // Fetch product data
  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`);
        const data = await response.json();
console.log('Fetched product data:', data);
        if (data.success) {
          setProduct(data.data);
        } else {
          alert('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        alert('Error loading product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // Calculate total stock
  const getTotalStock = (sizes) => {
    if (!sizes || !Array.isArray(sizes)) return 0;
    return sizes.reduce((total, size) => total + (size.stock || 0), 0);
  };

  // Get category name
  const getCategoryName = (categoryId) => {
    if (typeof categoryId === 'object' && categoryId.name) {
      return categoryId.name;
    }
    return 'Unknown';
  };

  // Get subcategory name
  const getSubcategoryName = (subcategoryId) => {
    if (typeof subcategoryId === 'object' && subcategoryId.name) {
      return subcategoryId.name;
    }
    return 'Unknown';
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 rounded"></div>
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto text-center py-12">
        <Package className="mx-auto text-gray-400 mb-4" size={64} />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Product Not Found</h2>
        <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
        <Link
          href="/admin/products"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/products"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
            Back to Products
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-gray-600">{product.styleCode}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Status Badge */}
          <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
            product.isActive 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {product.isActive ? 'Active' : 'Inactive'}
          </span>
          
          {product.isFeatured && (
            <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-yellow-100 text-yellow-800">
              Featured
            </span>
          )}
          
          <Link
            href={`/admin/products/edit/${product._id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <Edit size={16} />
            Edit Product
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            {product.images && product.images.main ? (
              <img
                src={product.images.main}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package className="text-gray-400" size={64} />
              </div>
            )}
          </div>

          {/* Gallery Images */}
          {product.images && product.images.gallery && product.images.gallery.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.gallery.map((image, index) => (
                <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
            
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-500">Product Name:</span>
                <p className="text-gray-900">{product.name}</p>
              </div>
              
              <div>
                <span className="text-sm font-medium text-gray-500">Style Code:</span>
                <p className="text-gray-900">{product.styleCode}</p>
              </div>
              
              <div>
                <span className="text-sm font-medium text-gray-500">SKU:</span>
                <p className="text-gray-900">{product.sku}</p>
              </div>
              
              <div>
                <span className="text-sm font-medium text-gray-500">Description:</span>
                <p className="text-gray-900">{product.description}</p>
              </div>
            </div>
          </div>

          {/* Price Range */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Price Range</h2>
            
            <div className="flex items-center gap-2">
              <IndianRupee size={20} className="text-gray-600" />
              <span className="text-2xl font-bold text-gray-900">
                {product.priceRange?.min} - {product.priceRange?.max}
              </span>
            </div>
          </div>

          {/* Color */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Color</h2>
            
            <div className="flex items-center gap-4">
              <div>
                <span className="text-sm font-medium text-gray-500">Color Name:</span>
                <p className="text-gray-900">{product.color?.name}</p>
              </div>
              
              {product.color?.code && (
                <div>
                  <span className="text-sm font-medium text-gray-500">Color Code:</span>
                  <p className="text-gray-900">{product.color.code}</p>
                </div>
              )}
            </div>
          </div>

          {/* Category & Classification */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Category & Classification</h2>
            
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-500">Category:</span>
                <p className="text-gray-900">{getCategoryName(product.categoryId)}</p>
              </div>
              
              {product.subcategoryId && (
                <div>
                  <span className="text-sm font-medium text-gray-500">Subcategory:</span>
                  <p className="text-gray-900">{getSubcategoryName(product.subcategoryId)}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sizes & Stock */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Sizes & Stock</h2>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-500">Total Stock:</span>
              <span className="text-lg font-bold text-gray-900">{getTotalStock(product.sizes)}</span>
            </div>
            
            {product.sizes && product.sizes.length > 0 ? (
              <div className="space-y-2">
                {product.sizes.map((sizeData, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-gray-900">{sizeData.size}</span>
                      {sizeData.available ? (
                        <Eye className="text-green-600" size={16} />
                      ) : (
                        <EyeOff className="text-red-600" size={16} />
                      )}
                    </div>
                    <span className="text-gray-600">Stock: {sizeData.stock}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No sizes configured</p>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h2>
          
          <div className="space-y-4">
            <div>
              <span className="text-sm font-medium text-gray-500">Material:</span>
              <p className="text-gray-900">{product.productDetails?.material}</p>
            </div>
            
            <div>
              <span className="text-sm font-medium text-gray-500">Product Care:</span>
              <p className="text-gray-900">{product.productDetails?.productCare}</p>
            </div>
            
            {product.productDetails?.additionalInfo && (
              <div>
                <span className="text-sm font-medium text-gray-500">Additional Information:</span>
                <p className="text-gray-900">{product.productDetails.additionalInfo}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tags */}
      {product.tags && product.tags.length > 0 && (
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Tags</h2>
          
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                <Tag size={14} />
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Metadata */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Metadata</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <span className="text-sm font-medium text-gray-500">Sort Order:</span>
            <p className="text-gray-900">{product.sortOrder || 0}</p>
          </div>
          
          <div>
            <span className="text-sm font-medium text-gray-500">Created:</span>
            <p className="text-gray-900">
              {product.createdAt ? new Date(product.createdAt).toLocaleDateString() : 'Unknown'}
            </p>
          </div>
          
          <div>
            <span className="text-sm font-medium text-gray-500">Last Updated:</span>
            <p className="text-gray-900">
              {product.updatedAt ? new Date(product.updatedAt).toLocaleDateString() : 'Unknown'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}