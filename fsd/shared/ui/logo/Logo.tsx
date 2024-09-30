import Image from "next/image";
import logo from "./logo-white.png";

export const Logo = () => {
  return (
    <Image src={logo} alt={'Логотип'} width={70} height={30}/>
  )
}