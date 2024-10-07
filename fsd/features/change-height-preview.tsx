import {Slider} from "rsuite";
import React from "react";
import {useTableActions} from "@/fsd/entities/table";
import {CustomText} from "@/fsd/shared/ui/CustomText";


export const ChangeHeightPreview = () => {
  const {heightPreview,setHeightPreview} = useTableActions()
  return (
    <div className={'flex flex-col gap-2'}>
      <CustomText>Высота превью</CustomText>
      <Slider
        style={{
          width:300
        }}
        min={200}
        max={700}
        progress={true}
        value={heightPreview}
        onChange={value => {
          setHeightPreview(value)
        }}
      />
    </div>
  )
}