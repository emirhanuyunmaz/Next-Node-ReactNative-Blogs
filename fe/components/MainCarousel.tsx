'use client'
import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import Image from "next/image"
import { useHomeCarouselGetImageQuery } from "@/lib/store/admin/adminApi"

export function MainCarousel() {
  const getCarouselImages = useHomeCarouselGetImageQuery("")

  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const [data,setData] = React.useState([])

  React.useEffect(() => {
    if(getCarouselImages.isSuccess){
      console.log(getCarouselImages.data);
      if(getCarouselImages.data.data){
        setData(getCarouselImages.data.data)
      }
    }
  },[getCarouselImages.isFetching])

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div className="max-w-7xl mx-auto">
      <Carousel setApi={setApi} className="w-full mx-auto  ">
        <CarouselContent>
          {data.map((item:any) => (
            <CarouselItem key={item._id}>
              <Card>
                <CardContent className="relative flex h-[80vh] items-center justify-center p-6">
                  {/* <div className="border-2 border-black w-full h-full"> */}
                  {/* `${process.env.NEXT_PUBLIC_BASE_URL}/${image}` */}
                    <img src={`${process.env.NEXT_PUBLIC_BASE_URL}/${item.imageName}`} className="w-full h-full absolute"  alt="" />
                  {/* </div> */}
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-3" />
        <CarouselNext className="absolute right-3" />
      </Carousel>
      {/* <div className="py-2 text-center text-sm text-muted-foreground">
        Slide {current} of {count}
      </div> */}
    </div>
  )
}
