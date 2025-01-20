'use client'

import { useRef } from "react"
import jsPDF from 'jspdf';
import { Button } from "./ui/button";
import parse from 'html-react-parser'


export default function DownloadPdfBlog({data}:{data:any}){
    const ref = useRef(null)
    
    
    async function pdfDownload(){
        const doc = new jsPDF({
            format:'a4',
            unit:'px'
        }) 

        doc.setFont('Inter-Regular', 'normal');

        doc.html(ref.current!,{
            async callback(doc){
                await doc.save("document")
            }
        })
    }

    return (<div className="mt-10">
        <Button  onClick={pdfDownload} >Download PDF</Button>
        <div  className="hidden ">
            <div ref={ref} className="mx-3">
                <h1>{data.title }</h1>
                {parse(data.blogText as string)}

            </div>
        </div>
    </div>)
}