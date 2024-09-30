import {Header as HeaderRsuite} from "rsuite";
import {Logo} from "@/fsd/shared/ui/logo/Logo";
import {Navbar} from "./nav";
import styles from './header.module.scss'


export const Header = () => {
  return (
    <HeaderRsuite className={`${styles.header} h-16 flex items-center gap-4`}>
      <div className={'flex items-center gap-4'}>
        <Logo/>
        <p className={styles.logo_text}>AUTOCODING AI</p>
      </div>
      <Navbar/>

    </HeaderRsuite>
  )
}