'use client';

import { Nav, Sidenav } from "rsuite";
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Routing } from "@/fsd/shared/config/routing";
import styles from './sidebar.module.scss'

export const Sidebar = () => {
  const pathname = usePathname(); // Получаем текущий путь
  const { push } = useRouter();
  const [active, setActive] = useState<string>(pathname); // Инициализация активного элемента

  // Устанавливаем активный элемент при монтировании компонента
  useEffect(() => {
    setActive(pathname);
  }, [pathname]);

  // Функция для обработки выбора элемента
  const handleSelect = (eventKey: string) => {
    setActive(eventKey); // Обновление активного элемента
    push(eventKey); // Изменение URL
  };

  return (
    <div style={{ width: 240 }}>
      <Sidenav defaultOpenKeys={['3', '4']} className={styles.sidenav}>
        <Sidenav.Body>
          <Nav activeKey={active} onSelect={handleSelect}>
            <Nav.Item eventKey={Routing.HOME} icon={<DashboardIcon />}>
              Бренды
            </Nav.Item>
            <Nav.Item eventKey={Routing.PROCESSES} icon={<GroupIcon />}>
              Процессы
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};
