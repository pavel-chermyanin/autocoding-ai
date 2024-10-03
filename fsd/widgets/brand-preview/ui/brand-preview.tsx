import {CustomHeading} from "@/fsd/shared/ui/CustomHeading";
import {List, Panel} from "rsuite";
import styles from './brand-preview.module.scss'

export const BrandPreview = () => {
  const data = ['Roses are red', 'Violets are blue', 'Sugar is sweet', 'And so are you'];
  return (
    <div className={styles.wrapper}>
      <Panel header="Бренд превью" bordered >
        <List size="md">
          {data.map((item, index) => (
            <List.Item key={index} index={index}>
              {item}
            </List.Item>
          ))}
        </List>
      </Panel>

    </div>
  )
}