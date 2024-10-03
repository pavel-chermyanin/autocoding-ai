import React from "react";
import {Message} from "rsuite";
import {EncodeButton} from "@/fsd/features/encode-button";


export const EncodeActionPanel = () => {
  return (
    <div>
      <div className={'flex items-center gap-2'} style={{gap:'20px'}}>
        <Message>
          Стоимость<strong>20$</strong>.
        </Message>
        <EncodeButton/>
      </div>
    </div>
  )
}