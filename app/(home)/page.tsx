'use client';
import React, { useState, useEffect, useRef } from "react";
import '../globals.css';
import {UploadControl} from "@/fsd/widgets/upload-control";



export default function HomePage() {


  return (
    <div >
      <UploadControl/>
      Главная
    </div>
  );
}
