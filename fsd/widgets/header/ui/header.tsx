import {Header as HeaderRsuite} from "rsuite";
import {Logo} from "@/fsd/shared/ui/logo/Logo";
import {Navbar} from "./nav";
import styles from './header.module.scss'


export const Header = () => {
  return (
    <HeaderRsuite className={`${styles.header}`}>
      <div className={styles.logo_wrapper}>
        <Logo/>
        <p className={styles.logo_text}>AUTOCODING AI</p>
      </div>
      <Navbar/>

    </HeaderRsuite>
  )
}