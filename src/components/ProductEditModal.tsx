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

const inputClass =
  'w-full border border-bone rounded-[2px] bg-paper text-ink px-3 py-2 text-sm font-sans outline-none focus:outline focus:outline-1 focus:outline-shu focus:outline-offset-2 box-border'

const labelClass =
  'block text-[11px] text-ink-3 tracking-[0.16em] uppercase font-sans font-medium mb-[6px]'

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-6"
      onClick={onClose}
    >
      <div
        className="bg-paper border border-bone rounded-lg shadow-[0_24px_60px_rgba(27,26,23,0.16)] w-full max-w-[540px] flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-bone">
          <h2 className="m-0 font-display text-2xl font-normal text-ink tracking-[-0.01em]">
            編輯商品
          </h2>
          <button
            onClick={onClose}
            aria-label="關閉"
            className="w-8 h-8 flex items-center justify-center text-ink-3 hover:text-ink text-lg transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto px-6 py-5 flex flex-col gap-4">
          <div>
            <label className={labelClass}>商品名稱</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>價格（NT$）</label>
              <input
                type="number"
                min={0}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>庫存數量</label>
              <input
                type="number"
                min={0}
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className={inputClass}
              />
            </div>
          </div>

          {/* Active toggle */}
          <div className="flex items-center gap-3">
            <span className={labelClass}>上架狀態</span>
            <button
              type="button"
              onClick={() => setIsActive((v) => !v)}
              className={`relative inline-flex items-center h-[22px] w-[42px] rounded-full transition-colors p-0 border-none cursor-pointer mb-[6px] ${
                isActive ? 'bg-shu' : 'bg-bone'
              }`}
            >
              <span
                className={`inline-block w-4 h-4 rounded-full bg-paper shadow transition-transform ${
                  isActive ? 'translate-x-[23px]' : 'translate-x-[3px]'
                }`}
              />
            </button>
            <span
              className={`text-[13px] font-sans mb-[6px] ${
                isActive ? 'text-shu' : 'text-ink-3'
              }`}
            >
              {isActive ? '上架中' : '已下架'}
            </span>
          </div>

          <div>
            <label className={labelClass}>詳細敘述</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Images */}
          <div className="border-t border-bone pt-4">
            <p className={`${labelClass} mb-[10px]`}>商品圖片</p>
            {images.length === 0 ? (
              <p className="text-[13px] text-ink-3 m-0 mb-3">尚無圖片</p>
            ) : (
              <div className="grid grid-cols-3 gap-2 mb-3">
                {images.map((img) => (
                  <div key={img.id} className="relative">
                    <img
                      src={img.imageUrl}
                      alt="商品圖片"
                      className="w-full h-24 object-cover block border border-bone rounded-[2px]"
                    />
                    {img.isCover && (
                      <span className="absolute bottom-1 left-1 bg-shu text-paper text-[10px] px-[6px] py-[2px] rounded-[2px] tracking-[0.08em] font-sans">
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
              className="block w-full text-[13px] text-ink-3 font-sans"
            />
            {uploadError && <p className="mt-2 text-[13px] text-shu m-0">{uploadError}</p>}
            <div className="mt-[10px] flex justify-end">
              <button
                onClick={handleUpload}
                disabled={!selectedFile || uploading}
                className="bg-shu hover:bg-shu-dark text-paper rounded-[2px] py-[6px] px-4 font-sans text-xs tracking-[0.1em] transition-colors disabled:bg-bone disabled:text-ink-3 disabled:cursor-not-allowed disabled:hover:bg-bone"
              >
                {uploading ? '上傳中...' : '上傳圖片'}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-bone flex items-center justify-between gap-3">
          {saveError ? (
            <p className="m-0 text-[13px] text-shu">{saveError}</p>
          ) : (
            <span />
          )}
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="bg-transparent border border-bone rounded-[2px] py-2 px-[18px] font-sans text-[13px] text-ink-2 hover:text-ink tracking-[0.1em] transition-colors"
            >
              取消
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-shu hover:bg-shu-dark text-paper rounded-[2px] py-2 px-[18px] font-sans text-[13px] tracking-[0.1em] transition-colors disabled:bg-bone disabled:text-ink-3 disabled:cursor-not-allowed disabled:hover:bg-bone"
            >
              {saving ? '儲存中...' : '儲存'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
