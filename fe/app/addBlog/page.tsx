'use client'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import MDEditor from '@uiw/react-md-editor';
import { Camera } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { TagInput } from 'emblor';
import ImageUploading from 'react-images-uploading';
import { useAddBlogMutation } from '@/lib/store/blog/blogApi'
import { useToast } from '@/hooks/use-toast'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


export default function Page() {
    const { toast } = useToast()
    const [addBlog, responseAddBlog] = useAddBlogMutation()

    const [images, setImages] = useState<any>([]);
    const maxNumber = 1;
    const [blogText, setBlogText] = useState<any>("")
    const [selectCategory, setSelectCategory] = useState("")
    const [tags, setTags] = useState<any>([])
    const [title, setTitle] = useState("")
    const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

    const onChange = (imageList: any, addUpdateIndex: any) => {
        // data for submit
        console.log(imageList, addUpdateIndex)
        // console.log("RESİM BİLGİSİ:",);

        setImages(imageList);
    };

    async function AddBlogOnClick() {
        if (images.length == 0 || title == "" || blogText == "") {
            toast({
                title: "ERROR",
                description: "Please fill in all the entries.",
                variant: "destructive"
            })

        } else {
            const body = {
                title: title,
                image: images[0].data_url,
                tags: tags,
                blogText: blogText,
                category:selectCategory
            }

            const res = await addBlog(body)
            console.log("ADD RES :", res);
        }

    }

    return (<div className="max-w-7xl min-h-[85vh] mx-auto">
        <div className='mx-3 md:mx-0 flex flex-col md:flex-row gap-3'>

            <div className='flex md:w-1/4 flex-row gap-3 justify-center'>
                <div className='flex  w-full h-52 justify-center items-center border-2'>
                    <ImageUploading
                        multiple
                        value={images}
                        onChange={onChange}
                        maxNumber={maxNumber}
                        dataURLKey="data_url"
                    >
                        {({
                            imageList,
                            onImageUpload,
                            onImageRemoveAll,
                            onImageUpdate,
                            onImageRemove,
                            isDragging,
                            dragProps,
                        }) => (
                            // write your building UI
                            <div className="upload__image-wrapper flex justify-center items-center w-full h-full">
                                {images.length == 0 && <button
                                    style={isDragging ? { color: 'red' } : undefined}
                                    onClick={onImageUpload}
                                    {...dragProps}
                                >
                                    <Camera />
                                </button>}
                                &nbsp;
                                {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
                                {imageList.map((image, index) => (
                                    <div key={index} className="image-item w-full h-full">
                                        <img className='w-full h-[75%]' src={image['data_url']} alt="" width="100" />
                                        <div className="image-item__btn-wrapper flex justify-center items-center gap-2 mt-1">
                                            <button onClick={() => onImageUpdate(index)} className='text-sm border-2 border-blue-500 px-2 rounded-xl hover:shadow-xl transition-all' >Update</button>
                                            <button onClick={() => onImageRemove(index)} className='text-sm border-2 border-red-500 px-2 rounded-xl hover:shadow-xl transition-all'>Remove</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ImageUploading>
                </div>

            </div>

            <div className='md:w-2/3 flex flex-col gap-3 '>
                <div className=' flex flex-col gap-3 w-full '>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' className='!text-3xl' />
                    <div className='flex  gap-3'>
                        <TagInput
                            maxLength={5}
                            placeholder="Add Tags (4)"
                            tags={tags}
                            setTags={(newTags) => {
                                setTags(newTags);
                            }}
                            activeTagIndex={activeTagIndex}
                            setActiveTagIndex={setActiveTagIndex}
                        />
                        <Select onValueChange={(e) => setSelectCategory(e)}>

                            <SelectTrigger >
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent >
                                <SelectItem value="Category 1">Category 1</SelectItem>
                                <SelectItem value="Category 2">Category 2</SelectItem>
                                <SelectItem value="Category 3">Category 3</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <MDEditor
                    className='!min-h-[50vh]'
                    value={blogText}
                    onChange={setBlogText}
                />
            </div>
        </div>
        <div className='flex justify-end mt-3 w-full md:pe-32'>
            <Button onClick={AddBlogOnClick} className=''>ADD BLOG</Button>
        </div>
    </div>)
} 