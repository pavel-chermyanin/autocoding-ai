'use client';
import React, {useState, useEffect, useRef} from "react";
import '../globals.css';
import {UploadControl} from "@/fsd/widgets/upload-control";
import {Divider} from "rsuite";
import {SKUTable} from "@/fsd/widgets/sku-table";
import {SKUForm} from "@/fsd/features/sku-form";
import {FormProvider, useForm} from "react-hook-form";
import {BrandPreview} from "@/fsd/widgets/brand-preview";
import {EncodeActionPanel} from "@/fsd/widgets/encode-action-panel";
import {useCurrentFileSessionData} from "@/fsd/shared/hooks/use-current-file-session-data";


export default function HomePage() {
  const data = useCurrentFileSessionData()
  const methods = useForm()
  const salesData = [
    {region: 'North', product: 'Laptop', sales: 1500, quantity: 5, date: '2024-01-10'},
    {region: 'North', product: 'Phone', sales: 800, quantity: 2, date: '2024-01-15'},
    {region: 'South', product: 'Laptop', sales: 2000, quantity: 6, date: '2024-02-10'},

  ];

  return (
    <div className={'grow mb-10'}>
      <FormProvider {...methods}>
        <div className={'flex flex-col gap-8'}>
          <UploadControl/>
          <SKUTable data={salesData}/>
          <div className={'flex gap-20'}>
            <SKUForm/>
            <BrandPreview/>
          </div>
          <Divider/>
          <EncodeActionPanel/>
        </div>

      </FormProvider>
    </div>
  );
}
