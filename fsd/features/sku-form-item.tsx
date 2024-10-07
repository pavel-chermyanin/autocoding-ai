
import {CustomSelect} from "@/fsd/shared/ui/customSelect/custom-select";

type SkuFormItemProps = {
  data: [string, string][]
  name: string
  label: string
  cb: (item:string) => void
}
export const SKUFormItem = ({data,name,label,cb}: SkuFormItemProps) => {

  const test = data.map(([key,value]) => ({label:value,value:key}));

  return (
    <div className={``}>
      <div className={''}>
        <label>{label}</label>
        <CustomSelect
          onChangeOutside={(value) => {
            cb(value)
          }}
          name={name}
          data={test}
        />
      </div>
    </div>
  )
}