import React from "react";
import { Message } from "rsuite";
import { EncodeButton } from "@/fsd/features/encode-button";
import {useSessionActions} from "@/fsd/entities/session";


export const EncodeActionPanel = () => {
  const {currentSession} = useSessionActions()

  if(!currentSession?.costCoding) {
    return null
  }

  return (
    <div>
      <div className={'flex items-center gap-2'} style={{gap:'20px'}}>
        <Message>
          Стоимость<strong>{currentSession?.costCoding}$</strong>.
        </Message>
        <EncodeButton/>
      </div>
    </div>
  );
}
