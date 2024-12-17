import { Mail } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function Footer(){
    return(<footer className=" bg-primary py-16 mt-5">
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row  gap-5">            
            <div className="md:w-3/4 flex flex-col md:flex-row  gap-5">
                <div className="md:w-1/2 text-center">
                    <div>
                        <h3 className="font-bold">About</h3>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio, voluptas!</p>
                    </div>

                    <div className="flex gap-2 justify-center">
                        <p>Email:</p>
                        <p>info@gmail.com</p>
                    </div>

                    <div className="flex gap-2 justify-center">
                        <p>Phone:</p>
                        <p>+123456789</p>
                    </div>

                </div>

                <div className="md:w-1/4 text-center">
                    <h3 className="font-bold">Quick Link</h3>
                    <ul>
                        <li>Home</li>
                        <li>About</li>
                        <li>Blog</li>
                        <li>Archived</li>
                        <li>Author</li>
                        <li>Contact</li>
                    </ul>
                </div>

                <div className="md:w-1/4 text-center">
                    <h3 className="font-bold" >Category</h3>
                    <ul>
                        <li>Lifestyle</li>
                        <li>Technology</li>
                        <li>Travel</li>
                        <li>Business</li>
                        <li>Economy</li>
                        <li>Sports</li>
                    </ul>
                </div>
            </div>

            <div className="md:w-1/4 bg-white flex flex-col justify-center px-5 rounded-xl gap-3 py-3 mx-3">
                <h4 className="font-bold text-center">Weekly Newsletter</h4>
                <p className="text-gray-600">Get blog articles and offers via email</p>
                <div className="flex justify-center items-center gap-3 border-2 rounded-xl px-2" >
                    <Input placeholder="Your Email" className="border-gray-400 border-none px-2 py-1"/>
                    <Mail size={32} color="gray" />
                </div>
                <Button>Subscript</Button>
            </div>
        </div>
    </footer>)
} 