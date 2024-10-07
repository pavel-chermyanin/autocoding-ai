import {Table, Column, HeaderCell, Cell} from 'rsuite-table';
import {useSessionActions} from "@/fsd/entities/session";
// import {useGetColumnMutation, useTableActions} from "@/fsd/entities/table";
import {useEffect} from "react";
import {useGetColumnMutation} from "../api/table.mutations";
import {useTableActions} from "../model/table.selectors";
import {useFormContext} from "react-hook-form";

export const TablePreview = ({currentColumn, sheet}: {
  currentColumn: number | null,
  sheet: string
}) => {
  const {currentSession} = useSessionActions()
  const {heightPreview} = useTableActions()
  const {mutate, data,status} = useGetColumnMutation()
  const {getValues} = useFormContext()

  useEffect(() => {
    if (currentSession && currentColumn && Object.keys(getValues()).length) {
      console.log(111)
      mutate({
        sheet,
        fileId: currentSession?.file_id!,
        columnId: currentColumn.toString()!
      })
    }

  }, [currentColumn]);

  // Получаем ключи из первого элемента данных для динамической генерации столбцов
  const columns = data && data?.length > 0 ? Object.keys(data?.[0]) : [];
  return (
    <Table
      bordered
      height={heightPreview || 200}
      data={currentSession ? data : []}
      onRowClick={(rowData) => {
        console.log(rowData);
      }}
    >
      {columns.map((colKey, index) => (
        <Column key={colKey} width={!!index ? 350 : 100}>
          <HeaderCell>{colKey}</HeaderCell>
          <Cell dataKey={colKey}/>
        </Column>
      ))}

    </Table>
  );
};
