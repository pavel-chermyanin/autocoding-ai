
export type GetNavigationForFileIdResponse = {
  sku: Record<string, string>
  brands: Record<string, string>
}

export type GetColumnProps = {
  sheet:string
  fileId:string
  columnId:string
}

export type TableState = {
  currentSKU:string | null
  setSKU: (sku: string | null) => void

  currentBrand: string | null
  setBrand: (brand: string | null) => void

  isOpenClearModal: boolean
  setIsOpenClearModal: (bool: boolean) => void

  heightPreview: number
  setHeightPreview: (num: number) => void
}


