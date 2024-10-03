import styles from './progress-item.module.scss';
import { CustomHeading } from '@/fsd/shared/ui/CustomHeading';
import { CustomText } from '@/fsd/shared/ui/CustomText';
import { Progress } from 'rsuite';
import { useMemo } from 'react';

interface ProgressItemProps {
  percent: number;
  processId: number;
  renderActionButton: () => React.ReactNode; // Render props для кнопки
}

export const ProgressItem = ({ percent, processId, renderActionButton }: ProgressItemProps) => {
  // Определение цвета прогресса в зависимости от значения percent
  const progressStatus = useMemo(() => {
    if (percent < 100) return 'active'; // Синий цвет до 100%
    return 'success'; // Зеленый, если 100%
  }, [percent]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.info}>
          <CustomHeading>Название процесса {processId}</CustomHeading>
          <CustomText>Количество СКЮ: 1000</CustomText>
        </div>

        <div className={styles.status}>
          Статус процесса
        </div>
      </div>
      <Progress.Line percent={percent} status={progressStatus} />

      {/* Используем render props для кнопки */}
      <div className={styles.actionButton}>
        {renderActionButton()}
      </div>
    </div>
  );
};
