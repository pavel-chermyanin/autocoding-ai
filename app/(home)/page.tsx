'use client';
import React, {useEffect} from "react";
import '../globals.css';
import {UploadControl} from "@/fsd/widgets/upload-control";
import {Divider} from "rsuite";
import {FormProvider, useForm} from "react-hook-form";
import {EncodeActionPanel} from "@/fsd/widgets/encode-action-panel";
import {useCurrentFileSessionData} from "@/fsd/shared/hooks/use-current-file-session-data";
import {ModalClearSession} from "@/fsd/features/modal-clear-session";
import {ChangeHeightPreview} from "@/fsd/features/change-height-preview";
import {SkuForm} from "@/fsd/widgets/sku-form";
import {useProcessProgress} from "@/fsd/features/use-proccess-progress";
import {SessionStatus} from "@/fsd/widgets/session-status";
import {useSessionActions} from "@/fsd/entities/session";


export default function HomePage() {
  useProcessProgress()
  useCurrentFileSessionData()
  const {checkedSKU,checkedBrands} = useSessionActions()
  const methods = useForm()

  useEffect(() => {
      methods.reset({
        sku:  checkedSKU?.toString(),
        brands: checkedBrands?.toString()
      })


  }, [checkedBrands,checkedSKU]);

  return (
    <div className={'grow mb-10'}>
      <FormProvider {...methods}>
        <div className={'flex flex-col gap-8'}>
          <SessionStatus/>
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
