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
  const {fileId} = useSessionActions()
  const {heightPreview} = useTableActions()
  const {mutate, data,status,isSuccess} = useGetColumnMutation()

  useEffect(() => {
    if (currentColumn) {
      mutate({
        sheet,
        fileId:fileId!,
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
      data={isSuccess ? data : []}
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
