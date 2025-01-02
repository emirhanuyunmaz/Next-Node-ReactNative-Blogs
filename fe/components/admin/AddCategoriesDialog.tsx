'use client'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
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
import { useEffect, useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  category: z.string().min(2, {
    message: "Category must be at least 2 characters.",
  }),
})

export function AddCategoriesDialog({isUpdate=false,data=undefined}:{isUpdate:boolean,data:any}) {
  const [control,setControl] = useState(false)
  const [addCategory,resAddCategory] = useAddCategoryMutation()
  const [updateCategory,setUpdateCategory] = useUpdateCategoryMutation()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category:isUpdate ? data.name : "",
    },
  })
  // console.log(data ? data : isUpdate);
    
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("::UPDATE CATE::");
    console.log(values)

    if(!isUpdate){
      await addCategory(values).unwrap().then(() => {
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
      console.log("::UPDATE CATE::");
      
      const body = {
        id:data._id,
        ...values
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
        <Button variant={`${isUpdate ? "secondary" :"default"}`} className={`${isUpdate && "px-2 py-2"}`} onClick={() => setControl(true)}>{!isUpdate ? "Add Category" : "Update"}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{!isUpdate ? "Add Category" : "Update Category"}</DialogTitle>
          
        </DialogHeader>
        <div className="w-full">
          <div className="">
          <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Category" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button  type="submit">{isUpdate ? "Update" : "Save"}</Button>
          </form>
        </Form>
          </div>
          
        </div>
        <DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
