'use client'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useBuyPremiumMutation } from "@/lib/store/user/userApi"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
const formSchema = z.object({
  cardHolderName: z.string().min(2, {
    message: "Card Holder Name must be at least 2 characters.",
  }),
  cardNumber: z.string().min(2, {
    message: "Card Holder Name must be at least 2 characters.",
  }),
  expiry: z.string().min(2, {
    message: "Card Holder Name must be at least 2 characters.",
  }),
  cvc: z.string().min(2, {
    message: "Card Holder Name must be at least 2 characters.",
  }),
  discountCode: z.string().min(2, {
    message: "Card Holder Name must be at least 2 characters.",
  }),
})
export default function Page(){
    const {toast} = useToast()
    const [buyPremium,resBuyPremium] = useBuyPremiumMutation()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          cardHolderName: "",
          cardNumber:"",
          cvc:"",
          discountCode:"",
          expiry:""
        },
      })
     
      
      async function onSubmit(values: z.infer<typeof formSchema>) {
          console.log(values)
          await buyPremium(values).unwrap()
          .then(() => {
            toast({
                title:"Succes"
            })
          }).catch((err) => {
            toast({
                title:"ERROR"
            })
          })
      }
    return(<div className="min-h-[84vh] max-w-7xl mx-auto px-5">
        <div className="flex">

            <div className="w-2/3">
                <div>
                    <h2 className="text-2xl font-bold">Let's Make Payment</h2>
                    <p className="text-primary">
                        To start your subscription , input your card detailsto make payment.
                    </p>
                    <p className="text-primary">
                        You will be redirect to your authorization page. 
                    </p>
                </div>

                <div className="mt-3">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                            control={form.control}
                            name="cardHolderName"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Card Holder Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Card Holder Name" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />

                            <FormField
                            control={form.control}
                            name="cardNumber"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Card Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="9870 3456 7890 6543" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />

                            <div className="flex gap-3">
                                <FormField
                                    control={form.control}
                                    name="expiry"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                        <FormLabel>Expiry</FormLabel>
                                        <FormControl>
                                            <Input placeholder="03/25" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="cvc"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                        <FormLabel>CVC</FormLabel>
                                        <FormControl>
                                            <Input placeholder="123" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="discountCode"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Discount Code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Discount Code" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                            )}
                            />
                            <Button type="submit">Pay</Button>
                        </form>
                    </Form>
                </div>

            </div>

            <div className="w-1/3 bg-gray-200 mx-5 p-5 flex flex-col gap-3 rounded-xl ">
                
                <p>You are paying , </p>
                <h3 className="font-bold text-5xl ms-5">$450.00</h3>

            </div>

        </div>
        
    </div>)
}