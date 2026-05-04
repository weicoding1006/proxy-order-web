import { useRef, useState } from 'react'
import { createProductImage } from '../api/product'

interface ProductImageDto {
  id: string
  imageUrl: string
  isCover: boolean
  sortOrder: number
  createAt: string
}

interface Props {
  productId: string
  productName: string
  images: ProductImageDto[]
  onClose: () => void
  onUploaded: () => void
}

export default function ProductImageUploadModal({ productId, productName, images, onClose, onUploaded }: Props) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async () => {
    if (!selectedFile) return
    setUploading(true)
    setError(null)
    try {
      await createProductImage(productId, selectedFile)
      setSelectedFile(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
      onUploaded()
    } catch {
      setError('上傳失敗，請稍後再試')
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
        className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">編輯圖片 — {productName}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* 現有圖片 */}
        <div className="mb-5">
          <p className="text-sm font-medium text-gray-600 mb-2">現有圖片</p>
          {images.length === 0 ? (
            <p className="text-sm text-gray-400">尚無圖片</p>
          ) : (
            <div className="grid grid-cols-3 gap-2">
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
        </div>

        {/* 上傳新圖片 */}
        <div className="border-t border-gray-100 pt-4">
          <p className="text-sm font-medium text-gray-600 mb-2">上傳新圖片</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
            className="block w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          <div className="mt-3 flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              關閉
            </button>
            <button
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
              className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? '上傳中...' : '上傳'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
