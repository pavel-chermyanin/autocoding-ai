// import React from 'react';
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
// import 'rsuite-table/dist/css/rsuite-table.css';
//
import styles from './sku-table.module.scss';
import {Button} from "rsuite"; // Подключение стилей

export const SKUTable = ({ data }: {data:any}) => {
  // Получаем ключи из первого элемента данных для динамической генерации столбцов
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <Table
      bordered
      // height={400}
      data={data}
      onRowClick={(rowData) => {
        console.log(rowData);
      }}
    >
      {columns.map((colKey) => (
        <Column key={colKey} width={150}>
          <HeaderCell>{colKey}</HeaderCell>
          <Cell dataKey={colKey} />
        </Column>
      ))}
      <Column width={80} fixed="right">
        <HeaderCell>...</HeaderCell>
        <Cell style={{ padding: '6px' }}>
          {(rowData) => (
            <Button appearance="link" onClick={() => alert(`id: ${rowData.id}`)}>
              Edit
            </Button>
          )}
        </Cell>
      </Column>
    </Table>
  );
};
