'use client';
import React from "react";
import '../globals.css';
import {UploadControl} from "@/fsd/widgets/upload-control";
import {Divider} from "rsuite";
import {FormProvider, useForm} from "react-hook-form";
import {EncodeActionPanel} from "@/fsd/widgets/encode-action-panel";
import {useCurrentFileSessionData} from "@/fsd/shared/hooks/use-current-file-session-data";
import {ModalClearSession} from "@/fsd/features/modal-clear-session";
import {ChangeHeightPreview} from "@/fsd/features/change-height-preview";
import {SkuForm} from "@/fsd/widgets/sku-form";
import {useTableActions} from "@/fsd/entities/table";


export default function HomePage() {
  useCurrentFileSessionData()
  const {currentSKU,currentBrand} = useTableActions()
  const methods = useForm({
    defaultValues: {
      sku: currentSKU,
      brands: currentBrand
    }
  })



  return (
    <div className={'grow mb-10'}>
      <FormProvider {...methods}>
        <div className={'flex flex-col gap-8'}>
          <UploadControl/>
          <Divider/>
          <ChangeHeightPreview/>
          <SkuForm/>

          <Divider/>
          <EncodeActionPanel/>
        </div>

        <ModalClearSession/>
      </FormProvider>
    </div>
  );
}
