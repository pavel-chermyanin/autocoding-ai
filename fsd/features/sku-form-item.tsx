import {CustomSelect} from "@/fsd/shared/ui/customSelect/custom-select";
import {SessionStatus, SessionStorage, useSessionActions} from "@/fsd/entities/session";

type SkuFormItemProps = {
  data: [string, string][]
  name: string
  label: string
}
export const SKUFormItem = ({data, name, label}: SkuFormItemProps) => {
  const {checkedSKU, checkedBrands, sessionStatus, setCheckedSKU, setCheckedBrands} = useSessionActions()
  const test = data.map(([key, value]) => ({label: value, value: key}));

  const handleChange = (value: string) => {
    if (name === 'sku') {
      setCheckedSKU(+value || null)
      value
        ? sessionStorage.setItem(SessionStorage.CHECKED_SKU, value)
        : sessionStorage.removeItem(SessionStorage.CHECKED_SKU)
    } else {
      setCheckedBrands(+value || null)
      value
        ? sessionStorage.setItem(SessionStorage.CHECHED_BRANDS, value)
        : sessionStorage.removeItem(SessionStorage.CHECHED_BRANDS)
    }
  };
  return (
    <div className={``}>
      <div className={''}>
        <label>{label}</label>
        <CustomSelect
          disabled={sessionStatus === SessionStatus.AUTOCODING || sessionStatus === SessionStatus.AUTOCODING_COMPLETED}
          onChangeOutside={handleChange}
          name={name}
          data={test}
        />
      </div>
    </div>
  )
}