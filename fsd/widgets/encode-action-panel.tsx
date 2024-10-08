import React from "react";
import { Message } from "rsuite";
import { EncodeButton } from "@/fsd/features/encode-button";
import {useSessionActions} from "@/fsd/entities/session";


export const EncodeActionPanel = () => {
  const {costCoding} = useSessionActions()

  if(!costCoding) {
    return null
  }

  return (
    <div>
      <div className={'flex items-center gap-2'} style={{gap:'20px'}}>
        <Message>
          Стоимость<strong>{costCoding}$</strong>.
        </Message>
        <EncodeButton/>
      </div>
    </div>
  );
}
