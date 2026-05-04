import { useRef, useState } from 'react'
import { updateProduct, createProductImage, fetchProductById } from '../api/product'

interface ProductImageDto {
  id: string
  imageUrl: string
  isCover: boolean
  sortOrder: number
  createAt: string
}

interface Props {
  productId: string
  name: string
  price: number
  stock: number
  isActive: boolean
  description: string
  images: ProductImageDto[]
  onClose: () => void
  onSaved: () => void
}

export default function ProductEditModal({
  productId,
  name: initName,
  price: initPrice,
  stock: initStock,
  isActive: initIsActive,
  description: initDescription,
  images: initImages,
  onClose,
  onSaved,
}: Props) {
  const [name, setName] = useState(initName)
  const [price, setPrice] = useState(initPrice)
  const [stock, setStock] = useState(initStock)
  const [isActive, setIsActive] = useState(initIsActive)
  const [description, setDescription] = useState(initDescription)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  const [images, setImages] = useState<ProductImageDto[]>(initImages)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSave = async () => {
    setSaving(true)
    setSaveError(null)
    try {
      await updateProduct(productId, { name, price, stock, isActive, description })
      onSaved()
    } catch {
      setSaveError('儲存失敗，請稍後再試')
    } finally {
      setSaving(false)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return
    setUploading(true)
    setUploadError(null)
    try {
      await createProductImage(productId, selectedFile)
      setSelectedFile(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
      const updated = await fetchProductById(productId)
      setImages(updated.images ?? [])
    } catch {
      setUploadError('上傳失敗，請稍後再試')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">編輯商品</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto px-6 py-5 space-y-4">
          {/* 商品名稱 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">商品名稱</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* 價格 / 庫存 */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">價格（NT$）</label>
              <input
                type="number"
                min={0}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">庫存數量</label>
              <input
                type="number"
                min={0}
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>

          {/* 上下架狀態 */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">上架狀態</span>
            <button
              type="button"
              onClick={() => setIsActive((v) => !v)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isActive ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                  isActive ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
              {isActive ? '上架中' : '已下架'}
            </span>
          </div>

          {/* 詳細敘述 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">詳細敘述</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
            />
          </div>

          {/* 圖片管理 */}
          <div className="border-t border-gray-100 pt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">商品圖片</p>
            {images.length === 0 ? (
              <p className="text-sm text-gray-400 mb-3">尚無圖片</p>
            ) : (
              <div className="grid grid-cols-3 gap-2 mb-3">
                {images.map((img) => (
                  <div key={img.id} className="relative">
                    <img
                      src={img.imageUrl}
                      alt="商品圖片"
                      className="w-full h-24 object-cover rounded-lg border border-gray-200"
                    />
                    {img.isCover && (
                      <span className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded">
                        封面
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
              className="block w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {uploadError && <p className="mt-1 text-sm text-red-500">{uploadError}</p>}
            <div className="mt-2 flex justify-end">
              <button
                onClick={handleUpload}
                disabled={!selectedFile || uploading}
                className="px-3 py-1.5 text-sm rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? '上傳中...' : '上傳圖片'}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          {saveError && <p className="text-sm text-red-500">{saveError}</p>}
          {!saveError && <span />}
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              取消
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? '儲存中...' : '儲存'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
