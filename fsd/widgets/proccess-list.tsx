'use client';
import { List, Panel, Button } from 'rsuite';
import {DownloadXlsxButton} from "@/fsd/features/download-xlsx-button";
import {ProgressItem} from "@/fsd/entities/model";
import {useProcessesProgress} from "@/fsd/features/use-proccesses-progress";

export const ProccessList = () => {
  useProcessesProgress()
  const data = [
    { id: 1, name: 'aaa' },
    { id: 2, name: 'ббб' }
  ];

  // Пример функции, которую будем пробрасывать в ProgressItem
  const handleProcessClick = (id: number) => {
    alert(`Запущен процесс с ID: ${id}`);
  };

  return (
    <Panel header="Текущие процессы" bordered>
      <List size="lg">
        {data.map((item, index) => (
          <List.Item key={index} index={index}>
            <ProgressItem
              percent={index * 50}  // Пример значения для процента
              processId={item.id}    // Прокидываем ID процесса
              renderActionButton={() => (
                <DownloadXlsxButton progressId={item.id}/>
              )}
            />
          </List.Item>
        ))}
      </List>
    </Panel>
  );
};
