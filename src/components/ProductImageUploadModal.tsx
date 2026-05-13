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

const labelClass =
  'block text-[11px] text-ink-3 tracking-[0.16em] uppercase font-sans font-medium mb-[10px]'

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-6"
      onClick={onClose}
    >
      <div
        className="bg-paper border border-bone rounded-lg shadow-[0_24px_60px_rgba(27,26,23,0.16)] w-full max-w-[540px] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="m-0 font-display text-[22px] font-normal text-ink tracking-[-0.01em]">
            上傳商品圖片
            <span className="block text-xs text-ink-3 font-sans tracking-[0.08em] mt-1">
              {productName}
            </span>
          </h2>
          <button
            onClick={onClose}
            aria-label="關閉"
            className="w-8 h-8 flex items-center justify-center text-ink-3 hover:text-ink text-lg transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Existing */}
        <div className="mb-5">
          <p className={labelClass}>現有圖片</p>
          {images.length === 0 ? (
            <p className="m-0 text-[13px] text-ink-3">尚無圖片</p>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {images.map((img) => (
                <div key={img.id} className="relative">
                  <img
                    src={img.imageUrl}
                    alt="商品圖片"
                    className="w-full h-24 object-cover block border border-bone rounded-[2px]"
                  />
                  {img.isCover && (
                    <span className="absolute bottom-1 left-1 bg-shu text-paper text-[10px] px-[6px] py-[2px] rounded-[2px] tracking-[0.08em]">
                      封面
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upload */}
        <div className="border-t border-bone pt-4">
          <p className={labelClass}>上傳新圖片</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
            className="block w-full text-[13px] text-ink-3 font-sans"
          />
          {error && <p className="mt-2 text-[13px] text-shu m-0">{error}</p>}
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={onClose}
              className="bg-transparent border border-bone rounded-[2px] py-2 px-[18px] font-sans text-[13px] text-ink-2 hover:text-ink tracking-[0.1em] transition-colors"
            >
              關閉
            </button>
            <button
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
              className="bg-shu hover:bg-shu-dark text-paper rounded-[2px] py-2 px-[18px] font-sans text-[13px] tracking-[0.1em] transition-colors disabled:bg-bone disabled:text-ink-3 disabled:cursor-not-allowed disabled:hover:bg-bone"
            >
              {uploading ? '上傳中...' : '上傳'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
