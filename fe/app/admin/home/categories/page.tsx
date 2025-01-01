'use client'
import { AddCategoriesDialog } from "@/components/admin/AddCategoriesDialog";
import { CategoryTable } from "@/components/admin/CategoryTable";
import { useGetCategoryQuery } from "@/lib/store/admin/adminApi";
import { useEffect, useState } from "react";


export default function Page(){
    const getCategories = useGetCategoryQuery("")
    const [data,setData] = useState<any>([])
    // console.log("DATA CATE::",getCategories.data);
    
    useEffect(() => {
        console.log("YENİDEN ÇEKME İŞLEMİ");
        
        if(getCategories.isSuccess){
            setData(getCategories.data.data)
        }
        
    },[getCategories])

    

    return (<div>
        <div className="w-[91%] mx-10 flex justify-between">
            <h1 className="text-xl font-bold ">
                Categories
            </h1>
            <AddCategoriesDialog isUpdate={false} data={undefined} />
            {/* <Button onClick={() => setCategoryDialogControl(true)} >Add Category</Button> */}

        </div>
        <div className="w-[91%] px-10">
            <CategoryTable data={data} />
        </div>
    </div>)
}