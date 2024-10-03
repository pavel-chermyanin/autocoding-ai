

import styles from './sku-form.module.scss'
import {CustomSelect} from "@/fsd/shared/ui/customSelect/custom-select";

export const SKUForm = () => {

  const test = ['111','222','333'].map(item => ({label:item,value:item}));

  return (
    <div className={`${styles.wrapper}`}>

      <div className={styles.input_wrapper}>
        <label>Выберите СКЮ столбец</label>
        <CustomSelect name={'sku-col'} data={test}/>
      </div>
      <div className={styles.input_wrapper}>
        <label>Выберите бренд</label>
        <CustomSelect name={'brand'} data={test}/>
      </div>
    </div>
  )
}