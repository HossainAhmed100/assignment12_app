import { useQuery } from "@tanstack/react-query";
import React from "react";
import axios from "../axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import ProductCard from "../Components/ProductCard/ProductCard";
import { BsArrowRightShort, BsFillBookmarkStarFill } from "react-icons/bs";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { HiOutlineUsers } from "react-icons/hi2";
import { GiTrophyCup } from "react-icons/gi";
import ReviewCard from "../Components/ReviewCard/ReviewCard";

function Home() {
  //Fetch All Product
  const { data: products = [] } = useQuery({
    queryKey: ["allproducts"],
    queryFn: async () => {
      const res = await axios.get("/allproducts");
      return res.data;
    },
  });

  return (
    <div>
      <div className="hero hero_bg">
        <div className="hero-overlay bg-opacity-90 rounded-xl"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold ">
              <span>Welcome to </span>
              <span className="bg-yellow-500 mt-2 inline-block">MATERIA</span>
            </h1>
            <p className="mb-5 drop-shadow-xl leading-snug">
              Welcome to our car parts selling website, where you can find
              high-quality replacement parts for your vehicle at affordable
              prices. Our website offers a wide range of car parts for all makes
              and models, from engines and transmissions to brake pads and
              suspension components.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
      <div className="py-8 container mx-auto">
        <h1 className="text-center text-4xl py-4 font-bold">Our New Product</h1>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
          {products &&
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
        <div className="text-center py-4">
          <button className="btn flex items-center justify-center gap-2 btn-primary">
            <span>View All Product </span>
            <BsArrowRightShort size={25} />
          </button>
        </div>
      </div>
      <div className="p-10 bg-primary">
        <div className="divide-x container mx-auto grid grid-cols-4">
          <div className="p-10 text-center flex items-center justify-center flex-col gap-4 text-white">
            <AiOutlineFundProjectionScreen size={100} />
            <h1 className="text-5xl font-bold">6K+</h1>
            <span className="text-base">Completed Projects</span>
          </div>
          <div className="p-10 text-center flex items-center justify-center flex-col gap-4 text-white">
            <HiOutlineUsers size={100} />
            <h1 className="text-5xl font-bold">33K+</h1>
            <span className="text-base">Happy Customer</span>
          </div>
          <div className="p-10 text-center flex items-center justify-center flex-col gap-4 text-white">
            <GiTrophyCup size={100} />
            <h1 className="text-5xl font-bold">20K+</h1>
            <span className="text-base">Award Winning</span>
          </div>
          <div className="p-10 text-center flex items-center justify-center flex-col gap-4 text-white">
            <BsFillBookmarkStarFill size={100} />
            <h1 className="text-5xl font-bold">99%</h1>
            <span className="text-base">Satisfaction Rate</span>
          </div>
        </div>
      </div>
      <div className="bg-slate-100 p-20">
        <h1 className="text-center text-4xl mb-8 font-bold">
          Our Clients Reviews
        </h1>
        <div className="container mx-auto">
          <Swiper
            slidesPerView={3}
            spaceBetween={20}
            loop={true}
            centeredSlides={false}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper p-8"
          >
            <SwiperSlide>
              <ReviewCard />
            </SwiperSlide>
            <SwiperSlide>
              <ReviewCard />
            </SwiperSlide>
            <SwiperSlide>
              <ReviewCard />
            </SwiperSlide>
            <SwiperSlide>
              <ReviewCard />
            </SwiperSlide>
            <SwiperSlide>
              <ReviewCard />
            </SwiperSlide>
            <SwiperSlide>
              <ReviewCard />
            </SwiperSlide>
            <SwiperSlide>
              <ReviewCard />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default Home;
