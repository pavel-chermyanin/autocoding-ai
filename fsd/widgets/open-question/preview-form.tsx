'use client'

import {useOpenQuestionSessionStore} from "@/fsd/entities/open-question/open-question.store";
import {CustomSelect} from "@/fsd/shared/ui/customSelect/custom-select";
import {FormProvider, useForm} from "react-hook-form";
import {Cell, Column, HeaderCell, Table} from "rsuite-table";
import {Button, List, Loader, Message} from "rsuite";
import {getPrice, OpenQuestionPaths} from "@/fsd/entities/open-question";
import {OPEN_QUESTION_BASE_URL} from "@/fsd/core/global.constants";
import {useEffect, useState} from "react";
import {CustomInput} from "@/fsd/shared/ui";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {Input} from "@/fsd/shared/ui/input/input";
import {OpenQuestionSessionStatus, OpenQuestionSessionStorage} from "@/fsd/entities/open-question/open-question.types";

export const loginSchema = yup.object().shape({
  // system_prompt: yup.string().required("Промпт обязателен"),
  sheet: yup.string(), // Add the password field
  codes_sheet: yup.string(), // Add the password field
});


export const PreviewForm = () => {
  const {setOpenQuestionSessionStatus, openQuestionSessionStatus} = useOpenQuestionSessionStore()
  const methods = useForm({
    resolver: yupResolver(loginSchema),
  })
  const {preview, openQuestionFileId} = useOpenQuestionSessionStore()
  const [price, setPrice] = useState('')


  const questionIndex = methods.watch('sheet')
  // const systemPrompt = methods.watch('system_prompt')
  const listIndex = methods.watch('codes_sheet')
  const selectData = preview?.headers.slice(1).map((item, index) => ({label: item, value: index})) ?? []

  const calculatePrice = async (data: any) => {
    const res = await fetch(`${OPEN_QUESTION_BASE_URL}${OpenQuestionPaths.GET_PRICE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({session_id: openQuestionFileId, list_name: preview?.sheets?.[+data.sheet]})
    })
    const price = await res.json()
    setPrice(price)
  }
  const submitAutocoding = async (data: any) => {
    const keys = preview?.codes && Object.keys(preview?.codes)
    console.log(data, preview?.sheets?.[+data.sheet], keys?.[+data.codes_sheet])
    const res = await fetch(`${OPEN_QUESTION_BASE_URL}${OpenQuestionPaths.POST_CODING_JOB}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session_id: openQuestionFileId,
        sheet: preview?.sheets?.[+data.sheet],
        codes_sheet: keys?.[+data.codes_sheet]
      })
    })

    const response = await res.json()
    setOpenQuestionSessionStatus(OpenQuestionSessionStatus.AUTOCODING)
    sessionStorage.setItem(OpenQuestionSessionStorage.SESSION_STATUS, OpenQuestionSessionStatus.AUTOCODING);
    console.log(response)
  }
  // const keys = preview?.codes && Object.keys(preview?.codes)
  // const values = preview?.codes && Object.values(preview?.codes)
  // console.log(values?.[listIndex] && Object.entries(values?.[listIndex]))

  if (!preview?.codes) {
    return null
  }
  // console.log(preview?.preview?.slice(1)?.[questionIndex]?.map(item => ({'ответ' : item})))
  return (
    <FormProvider {...methods}>
      <div className={'grid grid-cols-2 gap-4 mt-5'}>
        <div>
          <Table
            bordered
            height={200}
            data={(preview?.codes && (listIndex || listIndex === 0)) ? Object.entries(Object.values(preview?.codes)?.[listIndex]).map(([code, answer]) => ({
              'код': code,
              'ответ': answer
            })) : []}
            onRowClick={(rowData) => {
              console.log(rowData);
            }}
          >
            <Column key={'код'} width={100}>
              <HeaderCell>{'код'}</HeaderCell>
              <Cell dataKey={'код'}/>
            </Column>
            <Column key={'ответ'} width={'100%'}>
              <HeaderCell>{'ответ'}</HeaderCell>
              <Cell dataKey={'ответ'}/>
            </Column>

          </Table>
          {/*<List className={'max-h-80 mb-4'}>*/}
          {/*  {preview?.headers.slice(1).map((item, index) => {*/}

          {/*    return (*/}

          {/*      <List.Item>{item}</List.Item>*/}
          {/*    )*/}
          {/*  })}*/}

          {/*</List>*/}
          <label className={''}>Листы</label>
          <CustomSelect onChangeOutside={(value) => setPrice('')} name={'codes_sheet'}
                        data={preview?.codes ? Object.keys(preview?.codes).map((item, index) => ({
                          label: item,
                          value: index
                        })) : []}/>

        </div>
        <div>

          <Table
            bordered
            height={200}
            data={preview?.preview?.slice(1)?.[questionIndex]?.map(item => ({'ответ': item})) ?? []}
            // onRowClick={(rowData) => {
            //   console.log(rowData);
            // }}
          >
            {/*{preview?.preview?.slice(1)?.[questionIndex]?.map((colKey, index) => (*/}
            <Column key={'ответ'} width={'100%'}>
              <HeaderCell>{'ответ'}</HeaderCell>
              <Cell dataKey={'ответ'}/>
            </Column>
            {/*// ))}*/}

          </Table>
          {/*<List className={'max-h-80'}>*/}
          {/*  {preview?.preview?.slice(1)?.[questionIndex]?.map((item, index) => {*/}

          {/*    return (*/}

          {/*      <List.Item>{item}</List.Item>*/}
          {/*    )*/}
          {/*  })}*/}

          {/*</List>*/}
          <label className={''}>Ответы</label>
          <CustomSelect onChangeOutside={(value) => setPrice('')} name={'sheet'} data={selectData ?? []}/>
        </div>
      </div>
      {(!!questionIndex || questionIndex === 0) && (!!listIndex || listIndex === 0) &&
        <Button className={'mt-4'} onClick={methods.handleSubmit(calculatePrice)}>Рассчитать стоимость</Button>}
      {!!price && (
        <div className={'grid gap-5'}>
          <Message className={'mt-4'}>
            <strong>Цена!</strong> {price}
          </Message>
          {/*<Input name={'system_prompt'} as={'textarea'} placeholder={'Введите промпт'}/>*/}
          <Button
            // disabled={openQuestionSessionStatus === OpenQuestionSessionStatus.AUTOCODING}
            className={'mt-4'}
                  onClick={methods.handleSubmit(submitAutocoding)}>Запустить кодировку</Button>
        </div>

      )}
    </FormProvider>

  )
}