import { useQuery } from "@tanstack/react-query";
import React from "react";
import axios from "../axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import ProductCard from "../Components/ProductCard/ProductCard";
import { BsArrowRightShort, BsFillBookmarkStarFill } from "react-icons/bs";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { HiOutlineUsers } from "react-icons/hi2";
import { GiTrophyCup } from "react-icons/gi";
import ReviewCard from "../Components/ReviewCard/ReviewCard";
import c1 from "../Utility/icon/c1.png";
import c2 from "../Utility/icon/c2.png";
import c3 from "../Utility/icon/c3.png";
import c4 from "../Utility/icon/c4.png";
import c5 from "../Utility/icon/c5.png";
import LodingBar from "../Components/LodingBar/LodingBar";
import { Link } from "react-router-dom";

function Home() {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  //Fetch All Product
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["allproducts"],
    queryFn: async () => {
      const res = await axios.get("/allproducts", config);
      return res.data;
    },
  });

  // Fetch All reviews
  const { data: reviews = [] } = useQuery({
    queryKey: ["allreviews"],
    queryFn: async () => {
      const res = await axios.get("allreviews", config);
      return res.data;
    },
  });

  //loading Animation
  if (isLoading) {
    return <LodingBar />;
  }

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
            products
              .slice(0, 4)
              .map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
        </div>
        <div className="w-full text-center py-4">
          <Link to="/allproducts" className="btn  btn-primary">
            <span>View All Product </span>
            <BsArrowRightShort size={25} />
          </Link>
        </div>
      </div>
      <div className="p-10 bg-primary">
        <div className="md:divide-x divide-y md:divide-y-0 container mx-auto grid md:grid-cols-4 grid-cols-1">
          <div className="p-6 text-center flex items-center justify-center flex-col gap-4 text-white">
            <AiOutlineFundProjectionScreen size={80} />
            <h1 className="text-3xl font-bold">60K+</h1>
            <span className="text-base">Completed Order</span>
          </div>
          <div className="p-6 text-center flex items-center justify-center flex-col gap-4 text-white">
            <HiOutlineUsers size={80} />
            <h1 className="text-3xl font-bold">33K+</h1>
            <span className="text-base">Happy Customer</span>
          </div>
          <div className="p-6 text-center flex items-center justify-center flex-col gap-4 text-white">
            <GiTrophyCup size={80} />
            <h1 className="text-3xl font-bold">16+</h1>
            <span className="text-base">Award Winning</span>
          </div>
          <div className="p-6 text-center flex items-center justify-center flex-col gap-4 text-white">
            <BsFillBookmarkStarFill size={80} />
            <h1 className="text-3xl font-bold">99%</h1>
            <span className="text-base">Satisfaction Rate</span>
          </div>
        </div>
      </div>
      <div className="bg-white py-20 px-5">
        <h1 className="text-center text-4xl mb-8 font-bold">
          Our Clients Reviews
        </h1>
        <div className="container mx-auto">
          <Swiper
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            slidesPerView={1}
            spaceBetween={40}
            loop={true}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="reviewSlider"
          >
            {reviews &&
              reviews.slice(0, 6).map((review) => (
                <SwiperSlide key={review._id}>
                  <ReviewCard review={review} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
      <div className="bg-slate-100">
        <div className="container mx-auto p-8">
          <Swiper
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
              1440: {
                slidesPerView: 5,
              },
            }}
            slidesPerView={1}
            centeredSlides={false}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={true}
            modules={[Autoplay]}
            className=""
            spaceBetween={10}
          >
            <SwiperSlide>
              <div className="w-52 mx-auto  hover:bg-white duration-200 hover:shadow-sm rounded-md cursor-pointer p-4">
                <img src={c1} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-52 mx-auto  hover:bg-white duration-300 hover:shadow-sm rounded-md cursor-pointer p-4">
                <img src={c2} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-52 mx-auto  hover:bg-white duration-300 hover:shadow-sm rounded-md cursor-pointer p-4">
                <img src={c3} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-52 mx-auto  hover:bg-white duration-300 hover:shadow-sm rounded-md cursor-pointer p-4">
                <img src={c4} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-52 mx-auto  hover:bg-white duration-300 hover:shadow-sm rounded-md cursor-pointer p-4">
                <img src={c5} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-52 mx-auto  hover:bg-white duration-200 hover:shadow-sm rounded-md cursor-pointer p-4">
                <img src={c1} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-52 mx-auto  hover:bg-white duration-300 hover:shadow-sm rounded-md cursor-pointer p-4">
                <img src={c2} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-52 mx-auto  hover:bg-white duration-300 hover:shadow-sm rounded-md cursor-pointer p-4">
                <img src={c3} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-52 mx-auto  hover:bg-white duration-300 hover:shadow-sm rounded-md cursor-pointer p-4">
                <img src={c4} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-52 mx-auto  hover:bg-white duration-300 hover:shadow-sm rounded-md cursor-pointer p-4">
                <img src={c5} alt="" />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default Home;
