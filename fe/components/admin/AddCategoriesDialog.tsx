'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { useAddCategoryMutation, useUpdateCategoryMutation } from "@/lib/store/admin/adminApi"
import { useState } from "react"

export function AddCategoriesDialog({isUpdate=false,data=undefined}:{isUpdate:boolean,data:any}) {
  const [control,setControl] = useState(false)
  const [addCategory,resAddCategory] = useAddCategoryMutation()
  const [updateCategory,setUpdateCategory] = useUpdateCategoryMutation()
  const [categoryText,setCategoryText] = useState(data ? data.name : "")

  async function addCategoryHandleClick(e:any){
    // e.preventDefault()
    if(!isUpdate){
      const body = {
        category:categoryText
      }
      await addCategory(body).unwrap().then(() => {
        toast({
          title:"Succes add category"
        })
        setControl(false)
      }).catch((Err) => {
        toast({
          title:"Error"
        })
        setControl(false)
      })
    }else{
      const body = {
        id:data._id,
        category:categoryText
      }
      await updateCategory(body).unwrap().then(() => {
        toast({
          title:"Succes update category"
        })
        setControl(false)
      }).catch((Err) => {
        toast({
          title:"Error"
        })
        setControl(false)
      })
    }
  }
  

  return (
    <Dialog open={control} onOpenChange={setControl} >
      <DialogTrigger asChild>
        <Button variant={`${isUpdate ? "secondary" :"default"}`} className={`${isUpdate && "px-0 py-0"}`} onClick={() => setControl(true)}>{!isUpdate ? "Add Category" : "Update"}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{!isUpdate ? "Add Category" : "Update Category"}</DialogTitle>
          
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Category
            </Label>
            <Input
              id="name"
              placeholder="Category Name"
              value={categoryText}
              onChange={(e) => setCategoryText(e.target.value)}
              className="col-span-3"
            />
          </div>
          
        </div>
        <DialogFooter>
          <Button onClick={(e) => addCategoryHandleClick(e)}>{!isUpdate ? "Save" : "Update"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
