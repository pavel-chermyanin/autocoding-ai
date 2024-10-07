
export type Session = {
  file_id: string
  sessionStatus: SessionStatus,
  checkedSKU?: number,
  checkedBrands?: number,
  costCoding?: number,
}


export type SessionState = {
  currentSession: Session | null
  setSession: (session: Session | null) => void

}

export enum SessionStatus {
  FILE_UPLOADED = 'fileUploaded',
  CHECKED_COLS = 'checkedCols',
  COST_CALCULATED = 'costCalculated',
  AUTOCODING = 'autocoding',
  AUTOCODING_COMPLETED = 'autocodingCompleted',
}