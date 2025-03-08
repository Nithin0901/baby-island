import React from 'react'
import banner from '../assets/banner1.jpg'

import { useSelector } from 'react-redux'
import { valideURLConvert } from '../utils/valideURLConvert'
import {Link, useNavigate} from 'react-router-dom' 
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'
import About from './About'
import CarouselPage from './Banners'
import Banner from '../components/Banner'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";


const Home = () => {
  const loadingCategory = useSelector(state => state.product.loadingCategory)
  const categoryData = useSelector(state => state.product.allCategory)
  const subCategoryData = useSelector(state => state.product.allSubCategory)
  const navigate = useNavigate()

  const handleRedirectProductListpage = (id,cat)=>{
      console.log(id,cat)
      const subcategory = subCategoryData.find(sub =>{
        const filterData = sub.category.some(c => {
          return c._id == id
        })

        return filterData ? true : null
      })
      const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`

      navigate(url)
      console.log(url)
  }

  
  const handleRedirectProductListpages = (id,cats)=>{
    console.log(id,cats)
    const subcategory = subCategoryData.find(sub =>{
      const filterData = sub.category.some(c => {
        return c._id == id
      })

      return filterData ? true : null
    })
    const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`

    navigate(url)
    console.log(url)
}

  const banners = [
    { desktop: banner },
    { desktop: banner },
    { desktop: banner },
  ];

  return (
   <section className='bg-white'>
      {/* Dynamic Scrollable Category List */}
      <div className="w-full h-[50px] flex items-center justify-center mb-3 overflow-x-auto no-scrollbar">
        <ul className="flex space-x-8 md:space-x-24 whitespace-nowrap px-4">
          {subCategoryData.map((cats) => (
            <li key={cats._id}>
              <a
                href="#"
                onClick={() => handleRedirectProductListpage(cats._id, cats.name)}
                className="text-gray-700 hover:text-blue-600 font-semibold"
              >
                {cats.name}
              </a>
            </li>
          ))}
        </ul>
      </div>










             {/* <Banner/> */}
      {/* <div className='container mx-auto'>
          <div className={`w-full h-full min-h-48  flex items-center justify-center bg-[#293952] rounded ${!banner && "animate-pulse my-2" } `}>
              <img
                src={banner}
                className='w-[50%] h-[500px] hidden lg:block'
                alt='banner' 
              />
              <img
                src={bannerMobile}
                className='w-full h-full lg:hidden'
                alt='banner' 
              />
          </div>
          <div className='flex justify-center text-[20px] mt-12 font-semibold'><h1>Category</h1></div>
      </div> */}
      <div className="w-full  h-full min-h-48  flex items-center justify-center ">
      <div className="w-full  mx-auto">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          className="rounded-xl shadow-lg"
        >
          {banners.map((banner, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-full min-h-48 flex items-center justify-center bg-white rounded">
                {/* Desktop Image */}
                <img
                  src={banner.desktop}
                  className="w-[90%] h-[500px] hidden lg:block"
                  alt={`banner-${index}`}
                />
                {/* Mobile Image */}
                <img
                  src={banner.desktop}
                  className="w-full h-full lg:hidden"
                  alt={`banner-mobile-${index}`}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
    
      {/***display category product */}
      {
  categoryData?.length > 0 && (
    <>
      {/* Best Selling Products */}
      {
        categoryData
          .filter(c => c.name === "Best Selling")
          .map((c, index) => (
            <CategoryWiseProductDisplay 
              key={c?._id + "BestSelling"} 
              id={c?._id} 
              name={c?.name}
            />
          ))
      }

      {/* New Arrivals */}
      {
        categoryData
          .filter(c => c.name === "New Arrivals")
          .map((c, index) => (
            <CategoryWiseProductDisplay 
              key={c?._id + "NewArrivals"} 
              id={c?._id} 
              name={c?.name}
            />
          ))
      }
    </>
  )
}

        <div className="container mx-auto mt-10">
        <h2 className="text-xl capitalize after:content-[''] after:block after:w-16 after:h-1 after:bg-gray-500 after:mt-2 after:mx-auto font-semibold text-center mb-4">Categories</h2> </div>
        <div className="w-full  flex justify-between">
          
      <div className='grid grid-cols-2 md:grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-20 mt-6 mx-auto max-w-4xl'>
          {
            loadingCategory ? (
              new Array(12).fill(null).map((c,index)=>{
                return(
                  <div key={index+"loadingcategory"} className='bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse'>
                    <div className='bg-black min-h-24 rounded'></div>
                    <div className='bg-black h-8 rounded'></div>
                  </div>
                )
              })
            ) : (
              categoryData.map((cat,index)=>{
                return(
               
                  <>
                  <div key={cat._id+"displayCategory"} className='w-full h-full' onClick={()=>handleRedirectProductListpage(cat._id,cat.name)}>
                    <div className=''>
                    <img 
  src={cat.image}
  className="w-24 h-24  mt-4"
/>


                    </div>
                    <div><h3>{cat.name}</h3></div>
                    {/* <div>
                        <img 
                          src={cat.image}
                          className='w-24 h-24 object-scale-down rounded-full bg-blue-500 mt-32 '
                        />
                          <div className='mb-10'><h3>{cat.name}</h3></div>
                    </div> */}
                    
                  </div>
                  </>
                )
              })
              
              
            )
          }
      </div>
      </div>

        {/* ======= SUBCATEGORY SECTION ======= */}
        <div className="container mx-auto mt-10">
        <h2 className="text-xl after:content-[''] after:block after:w-16 after:h-1 after:bg-gray-500 after:mt-2 after:mx-auto font-semibold text-center mb-4">Subcategories</h2> </div>
        <div className="w-full  flex justify-between">
          
          <div className='grid grid-cols-2 md:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-20 mt-6 mx-auto max-w-4xl'>
              {
                loadingCategory ? (
                  new Array(12).fill(null).map((c,index)=>{
                    return(
                      <div key={index+"loadingcategory"} className='bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse'>
                        <div className='bg-black min-h-24 rounded'></div>
                        <div className='bg-black h-8 rounded'></div>
                      </div>
                    )
                  })
                ) : (
                  subCategoryData.map((cats,index)=>{
                    return(
                   
                      <>
                      <div key={cats._id+"displayCategory"} className='w-full h-full' onClick={()=>handleRedirectProductListpages(cat._id,cat.name)}>
                        <div>
                            <img 
                              src={cats.image}
                              className='w-40 h-40 object-scale-down bg-gray-100 rounded-full mt-8'
                            />
                        </div>
                        <div className='flex justify-center mt-2 capitalize'><h3>{cats.name}</h3></div>
                        {/* <div>
                            <img 
                              src={cat.image}
                              className='w-24 h-24 object-scale-down rounded-full bg-blue-500 mt-32 '
                            />
                              <div className='mb-10'><h3>{cat.name}</h3></div>
                        </div> */}
                        
                      </div>
                      </>
                    )
                  })
                  
                  
                )
              }
          </div>
          </div>
 
      
 <div className='mt-20'>
  <About/> </div>

   </section>
  )
}

export default Home
