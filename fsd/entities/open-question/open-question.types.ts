

export type OpenQuestionSession = {
  openQuestionFileId: string | null
  openQuestionSessionStatus: OpenQuestionSessionStatus | null,
  preview:OpenQuestionPreview | null
}


export type OpenQuestionSessionActions = {
  setOpenQuestionFileId: (fileId: string | null) => void
  setOpenQuestionSessionStatus: (sessionStatus: OpenQuestionSessionStatus) => void,
  setPreview: (preview: OpenQuestionPreview) => void,
  clearStore: () => void
}

export enum OpenQuestionSessionStatus {
  FILE_UPLOADED = 'fileUploaded',
  CHECKED_COLS = 'checkedCols',
  COST_CALCULATED = 'costCalculated',
  AUTOCODING = 'autocoding',
  AUTOCODING_COMPLETED = 'autocodingCompleted',
}

export enum OpenQuestionSessionStorage {
  FILE_ID = 'openQuestionFileId',
  SESSION_STATUS = 'openQuestionSessionStatus',
  CHECKED_SKU = 'checkedSKU',
  CHECHED_BRANDS = 'checkedBrands',
  COST_AUTOCODING = 'costAutocoding',
}

export type OpenQuestionPreview = {
  codes:Codes
  sheets: string[]
  headers:string[]
  preview: (string|number)[][]
}

export type Codes = Record<string, Record<string, string>>