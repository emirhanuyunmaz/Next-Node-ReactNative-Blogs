import AdvertComponent from "@/components/AdvertComponent";
import BlogCardList from "@/components/BlogCardList";
import { MainCarousel } from "@/components/MainCarousel";

export default function Home() {
  return (
    <div>
      <MainCarousel/>
      <div className="flex justify-center mt-10 ">
        <AdvertComponent/>
      </div>
      <div className="mx-auto max-w-7xl mt-10">
          <BlogCardList title={"Latest Post"} />
      </div>
    </div>
  );
}
