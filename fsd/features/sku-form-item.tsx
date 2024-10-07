import {CustomSelect} from "@/fsd/shared/ui/customSelect/custom-select";
import {SessionStatus, useSessionActions} from "@/fsd/entities/session";

type SkuFormItemProps = {
  data: [string, string][]
  name: string
  label: string
  field: string
  // cb: (item:string) => void
}
export const SKUFormItem = ({data,name,label,field}: SkuFormItemProps) => {
  const {setSession,currentSession} = useSessionActions()
  const test = data.map(([key,value]) => ({label:value,value:key}));

  const handleChange = (value: string) => {
    if (currentSession?.file_id) {
      setSession({
        ...currentSession,
        [field]: value,
      });
    } else {
      console.error("file_id is missing");
    }
  };
  return (
    <div className={``}>
      <div className={''}>
        <label>{label}</label>
        <CustomSelect
          disabled={currentSession?.sessionStatus === SessionStatus.AUTOCODING || currentSession?.sessionStatus === SessionStatus.AUTOCODING_COMPLETED}
          onChangeOutside={handleChange}
          name={name}
          data={test}
        />
      </div>
    </div>
  )
}