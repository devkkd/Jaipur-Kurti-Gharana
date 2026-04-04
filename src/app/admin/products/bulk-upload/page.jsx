'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import {
  Upload, FileSpreadsheet, ImageIcon, CheckCircle, XCircle,
  Download, AlertCircle, ChevronDown, ChevronUp, Copy, Check, Loader2
} from 'lucide-react';

export default function BulkUploadPage() {
  const [csvFile, setCsvFile] = useState(null);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [copiedName, setCopiedName] = useState(null);
  const [results, setResults] = useState(null);
  const [showGuide, setShowGuide] = useState(false);

  // Only images uploaded in this session
  const [sessionImages, setSessionImages] = useState([]); // [{ filename, url }]

  const copyFilename = (name) => {
    navigator.clipboard.writeText(name);
    setCopiedName(name);
    setTimeout(() => setCopiedName(null), 1500);
  };

  const handleCsvChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    if (!f.name.match(/\.(csv|xlsx|xls)$/i)) { toast.error('Please upload a CSV or Excel file'); return; }
    setCsvFile(f);
    setResults(null);
  };

  const handleImagesChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploadingImages(true);
    try {
      const formData = new FormData();
      files.forEach(f => formData.append('file', f));
      const res = await fetch('/api/admin/products/upload-image', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) {
        const newImages = Object.entries(data.data).map(([filename, url]) => ({ filename, url }));
        setSessionImages(prev => {
          // merge, avoid duplicates
          const existing = new Set(prev.map(i => i.filename));
          return [...prev, ...newImages.filter(i => !existing.has(i.filename))];
        });
        toast.success(`${newImages.length} image${newImages.length > 1 ? 's' : ''} uploaded!`);
      } else {
        toast.error(data.error || 'Upload failed');
      }
    } catch {
      toast.error('Failed to upload images');
    } finally {
      setUploadingImages(false);
    }
  };

  const handleUpload = async () => {
    if (!csvFile) { toast.error('Please select a CSV file first'); return; }
    setUploading(true);
    const formData = new FormData();
    formData.append('file', csvFile);
    try {
      const res = await fetch('/api/admin/products/bulk-upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) {
        toast.success('Upload complete!');
        setResults(data.results);
        setCsvFile(null);
      } else {
        toast.error(data.error || 'Upload failed');
      }
    } catch {
      toast.error('Something went wrong.');
    } finally {
      setUploading(false);
    }
  };

  const downloadTemplate = () => {
    const headers = 'name,description,categorySlug,subcategorySlug,mainImage,galleryImages,sizes,material,productCare,colorName,colorCode,sku,isActive,isFeatured,isNewArrival,tags,sortOrder';
    const row1 = '"Elegant Anarkali Suit","Beautiful embroidered anarkali suit perfect for weddings","anarkali-dupatta-sets","a-line-kalidar-suits","anarkali-red.jpg","anarkali-red-2.jpg,anarkali-red-3.jpg","M:10,L:15,XL:20,2XL:10,3XL:5","Georgette","Dry clean only","Red","#FF0000","AVT001-RED",TRUE,TRUE,TRUE,"wedding,festive,ethnic",1';
    const row2 = '"Designer Kurti Set","Stylish designer kurti for casual wear","anarkali-dupatta-sets","a-line-kalidar-suits","kurti-blue.jpg","","M:20,L:25,XL:15","Cotton blend","Machine wash cold","Blue","#0000FF","AVT002-BLU",TRUE,FALSE,TRUE,"casual,daily-wear",2';
    const csv = [headers, row1, row2].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'bulk-upload-template.csv';
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
    toast.success('Template downloaded!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-5">

        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bulk Product Upload</h1>
          <p className="text-sm text-gray-500 mt-1">Upload multiple products at once using a spreadsheet + images</p>
        </div>

        {/* Step 1 */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">1</div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Download the template</p>
              <p className="text-sm text-gray-500 mt-0.5">Fill in product details. Use just the image filename (e.g. <code className="bg-gray-100 px-1 rounded text-xs">product1.jpg</code>) in image columns.</p>
              <button onClick={downloadTemplate} className="mt-3 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
                <Download size={15} /> Download Template (.csv)
              </button>
            </div>
          </div>
        </div>

        {/* Step 2 — Upload Images */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">2</div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Upload product images to cloud</p>
              <p className="text-sm text-gray-500 mt-0.5">Upload once — reuse anytime. Just write the filename in CSV next time, no re-upload needed.</p>

              <label htmlFor="img-upload" className="mt-3 flex items-center gap-3 border-2 border-dashed border-gray-300 hover:border-purple-400 hover:bg-purple-50/30 rounded-xl px-4 py-3 cursor-pointer transition">
                {uploadingImages
                  ? <Loader2 size={20} className="text-purple-500 animate-spin shrink-0" />
                  : <ImageIcon size={20} className="text-gray-400 shrink-0" />}
                <span className="text-sm text-gray-500">
                  {uploadingImages ? 'Uploading to cloud...' : 'Click to select images (hold Ctrl for multiple)'}
                </span>
                <input id="img-upload" type="file" accept="image/*" multiple onChange={handleImagesChange} className="hidden" />
              </label>

              {/* Session uploaded images — filename copy list */}
              {sessionImages.length > 0 && (
                <div className="mt-3 space-y-1.5 max-h-64 overflow-y-auto pr-1">
                  <p className="text-xs text-gray-400 mb-2">
                    ✅ Uploaded — copy filename → paste in spreadsheet&apos;s <code className="bg-gray-100 px-1 rounded">mainImage</code> column:
                  </p>
                  {sessionImages.map(({ filename, url }) => (
                    <div key={filename} className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                      <img src={url} alt={filename} className="w-9 h-9 rounded-md object-cover shrink-0 border border-gray-200 bg-gray-100" />
                      <span className="text-xs font-mono text-gray-700 truncate flex-1">{filename}</span>
                      <button
                        type="button"
                        onClick={() => copyFilename(filename)}
                        className={`shrink-0 flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg transition font-medium ${copiedName === filename ? 'bg-green-100 text-green-700' : 'bg-white border border-gray-200 text-gray-500 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-300'}`}
                      >
                        {copiedName === filename ? <><Check size={11} /> Copied!</> : <><Copy size={11} /> Copy</>}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Step 3 — CSV */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">3</div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Select your filled spreadsheet</p>
              <p className="text-sm text-gray-500 mt-0.5">CSV or Excel file (.csv, .xlsx)</p>
              <label htmlFor="csv-upload" className={`mt-3 flex items-center gap-3 border-2 border-dashed rounded-xl px-4 py-4 cursor-pointer transition ${csvFile ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/30'}`}>
                <FileSpreadsheet size={22} className={csvFile ? 'text-green-500' : 'text-gray-400'} />
                <div className="flex-1 min-w-0">
                  {csvFile
                    ? <><p className="text-sm font-medium text-green-700 truncate">{csvFile.name}</p><p className="text-xs text-gray-400">{(csvFile.size / 1024).toFixed(1)} KB · Click to change</p></>
                    : <p className="text-sm text-gray-500">Click to select file</p>}
                </div>
                {csvFile && <CheckCircle size={18} className="text-green-500 shrink-0" />}
                <input id="csv-upload" type="file" accept=".csv,.xlsx,.xls" onChange={handleCsvChange} className="hidden" />
              </label>
            </div>
          </div>
        </div>

        {/* Step 4 — Upload */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-start gap-4">
            <div className={`w-9 h-9 rounded-full text-white flex items-center justify-center font-bold text-sm shrink-0 ${csvFile && !uploading ? 'bg-green-600' : 'bg-gray-300'}`}>4</div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Upload everything</p>
              <p className="text-sm text-gray-500 mt-0.5">Filenames in CSV are matched to cloud images automatically — no re-upload needed.</p>
              <button
                onClick={handleUpload}
                disabled={!csvFile || uploading}
                className="mt-3 w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition text-sm"
              >
                {uploading
                  ? <><Loader2 size={16} className="animate-spin" /> Uploading, please wait...</>
                  : <><Upload size={16} /> Start Upload</>}
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {results && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-4">
            <h2 className="font-bold text-gray-900 flex items-center gap-2"><CheckCircle size={18} className="text-green-500" /> Upload Results</h2>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Total', val: results.total, bg: 'bg-gray-50', color: 'text-gray-700' },
                { label: 'Successful', val: results.success, bg: 'bg-green-50', color: 'text-green-600' },
                { label: 'Failed', val: results.failed, bg: 'bg-red-50', color: 'text-red-500' },
              ].map(({ label, val, bg, color }) => (
                <div key={label} className={`text-center ${bg} rounded-xl py-4`}>
                  <p className={`text-2xl font-bold ${color}`}>{val}</p>
                  <p className="text-xs text-gray-400 mt-1">{label}</p>
                </div>
              ))}
            </div>
            {results.errors?.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-red-600 mb-2 flex items-center gap-1.5"><XCircle size={15} /> {results.errors.length} error{results.errors.length > 1 ? 's' : ''}</p>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {results.errors.map((err, i) => (
                    <div key={i} className="bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                      <p className="text-xs font-semibold text-gray-800">Row {err.row}: {err.data}</p>
                      <p className="text-xs text-red-600 mt-0.5">{err.error}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Guide */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <button onClick={() => setShowGuide(!showGuide)} className="w-full flex items-center justify-between px-5 py-4 text-left">
            <span className="font-semibold text-gray-700 flex items-center gap-2"><AlertCircle size={16} className="text-blue-500" /> How to fill the spreadsheet</span>
            {showGuide ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
          </button>
          {showGuide && (
            <div className="px-5 pb-5 border-t border-gray-100 pt-4 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  { col: 'name', req: true, desc: 'Product name' },
                  { col: 'description', req: true, desc: 'Product description' },
                  { col: 'categorySlug', req: true, desc: 'e.g. anarkali-dupatta-sets' },
                  { col: 'subcategorySlug', req: false, desc: 'Subcategory slug (optional)' },
                  { col: 'mainImage', req: false, desc: 'Filename e.g. product1.jpg' },
                  { col: 'galleryImages', req: false, desc: 'Extra images, comma separated' },
                  { col: 'sizes', req: false, desc: 'M:10,L:15,XL:20,2XL:10,3XL:5' },
                  { col: 'colorName', req: false, desc: 'e.g. Red, Blue' },
                  { col: 'sku', req: false, desc: 'Your product code (optional)' },
                  { col: 'isActive / isFeatured / isNewArrival', req: false, desc: 'TRUE or FALSE' },
                  { col: 'tags', req: false, desc: 'Comma separated: wedding,festive' },
                ].map(({ col, req, desc }) => (
                  <div key={col} className="flex gap-2 items-start">
                    <code className={`text-xs px-1.5 py-0.5 rounded shrink-0 ${req ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}`}>{col}</code>
                    <span className="text-xs text-gray-500">{desc}</span>
                  </div>
                ))}
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
                <strong>Tip:</strong> Upload images once in Step 2. Copy the filename. Next time just write the filename in CSV — system finds the image automatically from cloud.
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
