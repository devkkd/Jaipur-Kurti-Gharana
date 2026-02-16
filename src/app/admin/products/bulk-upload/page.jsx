'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Upload, FileText, Image, Info, CheckCircle, XCircle, AlertCircle, Download, Zap, Clock, TrendingUp } from 'lucide-react';

export default function BulkUploadPage() {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState(null);
  const [activeTab, setActiveTab] = useState('upload');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const validTypes = [
        'text/csv',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ];
      
      if (!validTypes.includes(selectedFile.type) && 
          !selectedFile.name.endsWith('.csv') && 
          !selectedFile.name.endsWith('.xlsx') && 
          !selectedFile.name.endsWith('.xls')) {
        toast.error('Please upload a CSV or Excel file');
        return;
      }
      
      setFile(selectedFile);
      setResults(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file first');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/admin/products/bulk-upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        setResults(data.results);
        setFile(null);
      } else {
        toast.error(data.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const downloadTemplate = () => {
    const csvContent = `name,description,categorySlug,subcategorySlug,priceMin,priceMax,mainImage,galleryImages,sizes,material,productCare,additionalInfo,colorName,colorCode,styleCode,sku,slug,isActive,isFeatured,isNewArrival,tags,sortOrder
"Elegant Anarkali Suit","Beautiful embroidered anarkali suit perfect for weddings","anarkali-suit","embroidered-anarkali",2500,3500,"C:\\Users\\Admin\\Pictures\\images\\anarkali-red-main.jpg","C:\\Users\\Admin\\Pictures\\images\\anarkali-red-1.jpg,C:\\Users\\Admin\\Pictures\\images\\anarkali-red-2.jpg","S:10,M:15,L:20,XL:10","Georgette with embroidery","Dry clean only","Model height: 5'8"", wearing size M","Red","#FF0000","AVT001","AVT001-RED","elegant-anarkali-suit-red",TRUE,TRUE,TRUE,"wedding,festive,ethnic",1
"Designer Kurti Set","Stylish designer kurti for casual wear","suits-set","designer-kurti",800,1200,"./images/kurti-blue-main.jpg","./images/kurti-blue-1.jpg","M:20,L:25,XL:15","Cotton blend","Machine wash cold","Length: 42 inches","Blue","#0000FF","AVT002","AVT002-BLU","designer-kurti-set-blue",TRUE,FALSE,TRUE,"casual,daily-wear",2
"Pink Party Gown","Elegant floor-length gown","gown","party-gown",4500,6500,"./images/gown-pink.jpg","","S:5,M:10,L:8","Net with sequin","Dry clean recommended","Includes dupatta","Pink","#FFC0CB","AVT003","AVT003-PIN","",TRUE,TRUE,FALSE,"party,gown",3`;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'product-bulk-upload-complete-template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    toast.success('Template downloaded with all fields');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Upload className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Bulk Product Upload</h1>
              <p className="text-gray-600 mt-1">Upload multiple products with automatic image processing</p>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Zap className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-sm text-blue-600 font-medium">Auto Upload</p>
                  <p className="text-xs text-blue-500">Images from local paths</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-sm text-green-600 font-medium">Fast Processing</p>
                  <p className="text-xs text-green-500">500+ products/batch</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                  <Clock className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-sm text-purple-600 font-medium">Time Saving</p>
                  <p className="text-xs text-purple-500">90% faster than manual</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="bg-white rounded-xl shadow-md p-2 inline-flex gap-2">
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                activeTab === 'upload'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Upload size={18} />
              Upload Products
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                activeTab === 'guide'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Info size={18} />
              How It Works
            </button>
          </div>
        </div>

        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <div className="space-y-6">
            {/* Instructions */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Info size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-3">🚀 Advanced Auto-Upload Feature</h2>
                  <ul className="space-y-2 text-sm text-white/90">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-300">✓</span>
                      <span>CSV mein local image paths do (e.g., ./images/product.jpg)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-300">✓</span>
                      <span>System automatically images ko R2 mein upload karega</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-300">✓</span>
                      <span>Products create honge with R2 URLs - sab automatic!</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-300">✓</span>
                      <span>Supports: Relative paths (./images/), Absolute paths (D:\images\)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Template Download */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Download size={28} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Step 1: Download Template</h3>
                    <p className="text-sm text-gray-600 mt-1">CSV template with local path examples</p>
                  </div>
                </div>
                <button
                  onClick={downloadTemplate}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition shadow-lg flex items-center gap-2 font-medium"
                >
                  <Download size={18} />
                  Download Template
                </button>
              </div>
            </div>

            {/* File Upload */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Upload size={28} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Step 2: Upload Your File</h3>
                  <p className="text-sm text-gray-600 mt-1">CSV or Excel with product data and image paths</p>
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-all">
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                      <Upload className="text-blue-600" size={40} />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-gray-900 mb-1">Click to upload file</p>
                      <p className="text-sm text-gray-500">CSV, XLSX, or XLS (Max 10MB)</p>
                    </div>
                    <button
                      type="button"
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition shadow-lg font-medium"
                    >
                      Choose File
                    </button>
                  </div>
                </label>
                
                {file && (
                  <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-300 rounded-xl">
                    <div className="flex items-center justify-center gap-3">
                      <CheckCircle className="text-green-600" size={24} />
                      <div className="text-left">
                        <p className="text-sm text-gray-600 font-medium">Selected file:</p>
                        <p className="font-bold text-gray-900 text-lg">{file.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{(file.size / 1024).toFixed(2)} KB</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Upload Button */}
            {file && (
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Zap size={28} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Step 3: Start Processing</h3>
                    <p className="text-sm text-gray-600 mt-1">Upload images and create products automatically</p>
                  </div>
                </div>
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-4 rounded-xl hover:from-purple-600 hover:to-pink-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg flex items-center justify-center gap-3"
                >
                  {uploading ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      Processing... Please wait
                    </>
                  ) : (
                    <>
                      <Zap size={24} />
                      Start Auto Upload
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Results */}
            {results && (
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle className="text-green-600" size={32} />
                  <h2 className="text-2xl font-bold text-gray-900">Upload Results</h2>
                </div>
                
                {/* Product Stats */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-3">Products:</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-center border-2 border-blue-200">
                      <p className="text-4xl font-bold text-blue-600">{results.total}</p>
                      <p className="text-sm text-gray-600 mt-2 font-medium">Total Rows</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl text-center border-2 border-green-200">
                      <p className="text-4xl font-bold text-green-600">{results.success}</p>
                      <p className="text-sm text-gray-600 mt-2 font-medium">Successful</p>
                    </div>
                    <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl text-center border-2 border-red-200">
                      <p className="text-4xl font-bold text-red-600">{results.failed}</p>
                      <p className="text-sm text-gray-600 mt-2 font-medium">Failed</p>
                    </div>
                  </div>
                </div>

                {/* Image Upload Stats */}
                {results.imageUploads && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-700 mb-3">Images Uploaded:</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl text-center border-2 border-purple-200">
                        <p className="text-4xl font-bold text-purple-600">{results.imageUploads.total}</p>
                        <p className="text-sm text-gray-600 mt-2 font-medium">Total Images</p>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl text-center border-2 border-green-200">
                        <p className="text-4xl font-bold text-green-600">{results.imageUploads.success}</p>
                        <p className="text-sm text-gray-600 mt-2 font-medium">Uploaded</p>
                      </div>
                      <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl text-center border-2 border-orange-200">
                        <p className="text-4xl font-bold text-orange-600">{results.imageUploads.failed}</p>
                        <p className="text-sm text-gray-600 mt-2 font-medium">Failed</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Errors */}
                {results.errors && results.errors.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-red-600 mb-4 flex items-center gap-2 text-lg">
                      <XCircle size={24} />
                      Errors Found ({results.errors.length})
                    </h3>
                    <div className="max-h-96 overflow-y-auto space-y-3">
                      {results.errors.map((error, index) => (
                        <div key={index} className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
                          <p className="font-semibold text-gray-900">Row {error.row}: {error.data}</p>
                          <p className="text-red-700 mt-1 text-sm">{error.error}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* How It Works Tab */}
        {activeTab === 'guide' && (
          <div className="space-y-6">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-2xl shadow-xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">🎯 How Auto-Upload Works</h2>
              <p className="text-lg text-white/90">Complete automation - CSV se directly products create karo with automatic image upload!</p>
            </div>

            {/* Flow Diagram */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">📊 Processing Flow</h3>
              
              <div className="space-y-4">
                {[
                  {
                    step: 1,
                    title: 'CSV Upload',
                    desc: 'User CSV file upload karta hai with local image paths',
                    color: 'blue',
                    icon: Upload
                  },
                  {
                    step: 2,
                    title: 'Path Detection',
                    desc: 'System automatically detect karta hai ki kaunse fields mein local paths hain',
                    color: 'purple',
                    icon: AlertCircle
                  },
                  {
                    step: 3,
                    title: 'Image Upload',
                    desc: 'Sab local images automatically Cloudflare R2 mein upload hoti hain',
                    color: 'green',
                    icon: Image
                  },
                  {
                    step: 4,
                    title: 'URL Generation',
                    desc: 'R2 public URLs automatically generate hote hain',
                    color: 'yellow',
                    icon: Zap
                  },
                  {
                    step: 5,
                    title: 'Product Creation',
                    desc: 'Products database mein create hote hain with R2 URLs',
                    color: 'pink',
                    icon: CheckCircle
                  }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.step} className={`flex items-start gap-4 p-5 bg-gradient-to-r from-${item.color}-50 to-${item.color}-100 rounded-xl border-2 border-${item.color}-200`}>
                      <div className={`w-12 h-12 bg-${item.color}-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                        <Icon className="text-white" size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className={`text-sm font-bold text-${item.color}-600`}>STEP {item.step}</span>
                          <h4 className="font-bold text-gray-900 text-lg">{item.title}</h4>
                        </div>
                        <p className="text-gray-700">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CSV Format Example */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">📝 CSV Format with Local Paths</h3>
              <div className="bg-gray-900 text-gray-100 rounded-xl p-6 overflow-x-auto">
                <pre className="text-sm">
{`name,mainImage,galleryImages
"Red Anarkali","./images/anarkali-red-main.jpg","./images/anarkali-red-1.jpg,./images/anarkali-red-2.jpg"
"Blue Kurti","D:\\Images\\kurti-blue.jpg","D:\\Images\\kurti-blue-1.jpg"
"Pink Gown","../products/gown-pink.jpg","../products/gown-pink-1.jpg"`}
                </pre>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <h4 className="font-bold text-green-900 mb-2">✅ Supported Path Formats:</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• <code>./images/product.jpg</code> (relative)</li>
                    <li>• <code>../images/product.jpg</code> (parent dir)</li>
                    <li>• <code>D:\Images\product.jpg</code> (Windows absolute)</li>
                    <li>• <code>/images/product.jpg</code> (Unix absolute)</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <h4 className="font-bold text-blue-900 mb-2">💡 Smart Detection:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Already uploaded URLs ko skip karta hai</li>
                    <li>• Sirf local paths ko upload karta hai</li>
                    <li>• Multiple images parallel mein process</li>
                    <li>• Error handling with detailed logs</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg p-8 border-2 border-green-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">🌟 Key Benefits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: '⚡', title: 'Super Fast', desc: '500+ products in minutes' },
                  { icon: '🤖', title: 'Fully Automated', desc: 'No manual image upload needed' },
                  { icon: '🎯', title: 'Error Handling', desc: 'Detailed error reports' },
                  { icon: '📊', title: 'Progress Tracking', desc: 'Real-time upload status' },
                  { icon: '🔄', title: 'Batch Processing', desc: 'Multiple images at once' },
                  { icon: '✅', title: 'Smart Detection', desc: 'Auto-detects local paths' }
                ].map((benefit, index) => (
                  <div key={index} className="bg-white rounded-xl p-5 border border-green-200 shadow-sm">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{benefit.icon}</span>
                      <div>
                        <h4 className="font-bold text-gray-900">{benefit.title}</h4>
                        <p className="text-sm text-gray-600">{benefit.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Flow Explanation */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">💻 Technical Flow</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-2">1. Path Detection Logic:</h4>
                  <code className="text-sm text-gray-700 block bg-white p-3 rounded border">
                    isLocalPath() checks for: ./, ../, C:\, /path patterns
                  </code>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-2">2. Image Processing:</h4>
                  <code className="text-sm text-gray-700 block bg-white p-3 rounded border">
                    processImageField() → Read file → Upload to R2 → Return URL
                  </code>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-2">3. Product Creation:</h4>
                  <code className="text-sm text-gray-700 block bg-white p-3 rounded border">
                    Replace local paths with R2 URLs → Create product in DB
                  </code>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
