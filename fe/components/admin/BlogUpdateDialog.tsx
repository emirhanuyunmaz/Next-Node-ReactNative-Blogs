import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import MDEditor from "@uiw/react-md-editor"

export function BlogUpdateDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>Update</button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Edit Blog</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 w-full">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input
              id="name"
              placeholder="Title"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Category
            </Label>
            <Input
              id="username"
              placeholder="Category"
              className="col-span-3"
            />
          </div>

          <div className=" items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Category
            </Label>
            <MDEditor
                        className='!min-h-[50vh]'
                        // value={blogText}
                        // onChange={(e) => setBlogText(e)}
                    />
            
          </div>

        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
