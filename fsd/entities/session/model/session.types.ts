
export type Session = {
  file_id: string
}


export type SessionState = {
  currentSession: Session | null
  setSession: (session: Session | null) => void
}