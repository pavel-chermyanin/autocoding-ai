

export type GetFileSpendings = {
  sheets: string
  id:string
  column_id_brands: number
  column_id_sku: number
}

export enum ModelQueryKeys {
  GET_FILE_SPENDINGS = 'getFileSpendings'
}