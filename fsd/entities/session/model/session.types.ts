
export type Session = {
  fileId: string | null
  sessionStatus: SessionStatus | null,
  checkedSKU: number | null,
  checkedBrands: number | null,
  costCoding: number | null,
}


export type SessionActions = {
  setFileId: (fileId: string | null) => void
  setSessionStatus: (sessionStatus: SessionStatus) => void,
  setCheckedSKU: (checkedSKU: number | null) => void,
  setCheckedBrands: (checkedBrands: number | null) => void,
  setCostCoding: (costCoding: number | null) => void,
  clearStore: () => void
}


export enum SessionStatus {
  FILE_UPLOADED = 'fileUploaded',
  CHECKED_COLS = 'checkedCols',
  COST_CALCULATED = 'costCalculated',
  AUTOCODING = 'autocoding',
  AUTOCODING_COMPLETED = 'autocodingCompleted',
}

export enum SessionStorage {
  FILE_ID = 'fileId',
  SESSION_STATUS = 'sessionStatus',
  CHECKED_SKU = 'checkedSKU',
  CHECHED_BRANDS = 'checkedBrands',
  COST_AUTOCODING = 'costAutocoding',
}