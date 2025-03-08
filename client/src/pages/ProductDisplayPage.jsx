import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import { FaAngleRight,FaAngleLeft } from "react-icons/fa6";
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import Divider from '../components/Divider'
import image1 from '../assets/minute_delivery.png'
import image2 from '../assets/Best_Prices_Offers.png'
// import image3 from '../assets/Wide_Assortment.png'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
// import AddToCartButton1 from '../components/AddToCartButton1'
import AddToCartButton1 from '../components/AddToCartButton-product-display'

import AddToCartButton2 from '../components/AddToCartButton2'
import Recommedproduct from './Recommedproduct'
import ProductListPage from './ProductListPage'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'
import { useSelector } from 'react-redux'



const ProductDisplayPage = () => {
  const params = useParams()
  let productId = params?.product?.split("-")?.slice(-1)[0]
  const [data,setData] = useState({
    name : "",
    image : []
  })
  const [image,setImage] = useState(0)
  const [loading,setLoading] = useState(false)
  const imageContainer = useRef()
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const categoryData = useSelector(state => state.product.allCategory)

  const fetchProductDetails = async()=>{
    try {
        const response = await Axios({
          ...SummaryApi.getProductDetails,
          data : {
            productId : productId 
          }
        })

        const { data : responseData } = response

        if(responseData.success){
          setData(responseData.data)
        }
    } catch (error) {
      AxiosToastError(error)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchProductDetails()
  },[params])
  
  const handleScrollRight = ()=>{
    imageContainer.current.scrollLeft += 100
  }
  const handleScrollLeft = ()=>{
    imageContainer.current.scrollLeft -= 100
  }
  console.log("product data",data)


















  

  const [activeTab, setActiveTab] = useState("Description");
  return (
    <>
    <section className='container mx-auto p-4 grid lg:grid-cols-2 '>
        <div className=''>
            <div className='bg-white lg:min-h-[65vh] lg:max-h-[65vh] rounded min-h-56 max-h-56 h-full w-full'>
                <img
                    src={data.image[image]}
                    className='w-full h-full object-scale-down'
                /> 
            </div>
            <div className='flex items-center justify-center gap-3 my-2'>
              {
                data.image.map((img,index)=>{
                  return(
                    <div key={img+index+"point"} className={`bg-slate-200 w-3 h-3 lg:w-5 lg:h-5 rounded-full ${index === image && "bg-slate-300"}`}></div>
                  )
                })
              }
            </div>
            <div className='grid relative'>
                <div ref={imageContainer} className='flex gap-4 z-10 relative w-full overflow-x-auto scrollbar-none'>
                      {
                        data.image.map((img,index)=>{
                          return(
                            <div className='w-20 h-20 min-h-20 min-w-20 scr cursor-pointer shadow-md' key={img+index}>
                              <img
                                  src={img}
                                  alt='min-product'
                                  onClick={()=>setImage(index)}
                                  className='w-full h-full object-scale-down' 
                              />
                            </div>
                          )
                        })
                      }
                </div>
                <div className='w-full -ml-3 h-full hidden lg:flex justify-between absolute  items-center'>
                    <button onClick={handleScrollLeft} className='z-10 bg-white relative p-1 rounded-full shadow-lg'>
                        <FaAngleLeft/>
                    </button>
                    <button onClick={handleScrollRight} className='z-10 bg-white relative p-1 rounded-full shadow-lg'>
                        <FaAngleRight/>
                    </button>
                </div>
            </div>
            <div>
            </div>

            {/* <div className='my-4  hidden lg:grid gap-3 '>
                <div>
                    <p className='font-semibold'>Description</p>
                    <p className='text-base'>{data.description}</p>
                </div>
                <div>
                    <p className='font-semibold'>Unit</p>
                    <p className='text-base'>{data.unit}</p>
                </div>
                {
                  data?.more_details && Object.keys(data?.more_details).map((element,index)=>{
                    return(
                      <div>
                          <p className='font-semibold'>{element}</p>
                          <p className='text-base'>{data?.more_details[element]}</p>
                      </div>
                    )
                  })
                }
            </div> */}
        </div>


        <div className='p-4 lg:pl-7 text-base lg:text-lg'>
            {/* <p className='bg-green-300 w-fit px-2 rounded-full'>10 Min</p> */}
            <h2 className='text-lg font-semibold lg:text-3xl'>{data.name}</h2>  
            {/* <p className=''>{data.unit}</p>  */}
           
            <div>
              {/* <p className=''>Price</p>  */}
              <div className='flex items-center gap-2 lg:gap-4'>
                <div className='py-2 rounded  w-fit'>
                    <p className='font-semibold text-lg lg:text-xl'>{DisplayPriceInRupees(pricewithDiscount(data.price,data.discount))}</p>
                </div>
                {
                  data.discount && (
                    <p className='line-through text-red-500'>{DisplayPriceInRupees(data.price)}</p>
                  )
                }
                {/* {
                  data.discount && (
                    <p className="font-bold text-green-600 lg:text-2xl">{data.discount}% <span className='text-base text-neutral-500'>Discount</span></p>
                  )
                } */}
                
              </div>
              <div className="flex items-center gap-2 mt-2">
          <span className="text-yellow-500">★★★★☆</span>
          <span className="text-gray-500">(4.5/5)</span>
        </div>

            </div> 
   {/* Color Selection */}
<div className="mb-3 ">
  <h6>Color:</h6>
  {data.colors?.map((color, index) => (
    <button
      key={index}
      className={`w-8 h-8 rounded-full ml-1 gap-10 border-2 transition-all duration-300   ${
        selectedColor === color ? "border-black " : "border-gray-300"
      }`}
      style={{ backgroundColor: color }}
      onClick={() => setSelectedColor(color)}
      aria-label={`Select color ${color}`} // Accessibility improvement
    >
      <span className="hidden gap-20">{color}</span> {/* Hides text */}
    </button>
  ))}
</div>

 {/* Color Selection */}
 <div className="mb-3 ">
  <h6>Size:</h6>
  {data.size?.map((size, index) => (
    <button
      key={index}
      className={`w-12 h-12 rounded-lg ml-1 gap-10 border transition-all duration-300   ${
        selectedSize === size ? "border-black bg-gray-200 " : "border-gray-200 "
      }`}
      // style={{ backgroundColor: color }}
      onClick={() => setSelectedSize(size)}
      aria-label={`Select color ${size}`} // Accessibility improvement
    >
      <span className="px-2 py-2 uppercase">{size}</span> {/* Hides text */}
    </button>
  ))}
</div>

        
        {/* Size Options */}
        {/* <div className="mt-4">
          <p className="font-medium">Size:</p>
          <div className="flex gap-2 mt-2">
            {['S', 'M', 'L', 'XL'].map(size => (
              <button key={size} className="px-4 py-2 border rounded-lg hover:bg-gray-200">{size}</button>
            ))}
          </div>
        </div> */}
        
         {/* Delivery Date */}
         {/* <p className="mt-4 text-gray-500">Estimated Delivery: <span className="text-blue-500 font-medium">Sat Jan 25 2025</span></p> */}
        
        {/* Buttons */}
        <div className="mt-6 flex flex-col gap-3">
         
      <div className=''>
      {
                data.stock === 0 ? (
                  <p className='text-lg text-red-500 my-2'>Out of Stock</p>
                ) 
                : (
                  // <button className='my-4 px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded'>Add</button>
                  <div className='my-4'>
                    {/* <AddToCartButton2 data={data}/> */}
                  </div>
                  
                )
               
              }
                <AddToCartButton1 data={data}/>
              </div>
          
          <button className="w-full border py-3 rounded-lg font-medium hover:bg-gray-100">Buy Now</button>
        </div>
      
              <Divider/>
             
                
           
              
            {/* <h2 className='font-semibold'>Why shop from binkeyit? </h2> */}
            {/* <div>
                  <div className='flex  items-center gap-4 my-4'>
                      <img
                        src={image1}
                        alt='superfast delivery'
                        className='w-20 h-20'
                      />
                      <div className='text-sm'>
                        <div className='font-semibold'>Superfast Delivery</div>
                        <p>Get your orer delivered to your doorstep at the earliest from dark stores near you.</p>
                      </div>
                  </div>
                  <div className='flex  items-center gap-4 my-4'>
                      <img
                        src={image2}
                        alt='Best prices offers'
                        className='w-20 h-20'
                      />
                      <div className='text-sm'>
                        <div className='font-semibold'>Best Prices & Offers</div>
                        <p>Best price destination with offers directly from the nanufacturers.</p>
                      </div>
                  </div>
                  <div className='flex  items-center gap-4 my-4'>
                      <img
                        src={image3}
                        alt='Wide Assortment'
                        className='w-20 h-20'
                      />
                      <div className='text-sm'>
                        <div className='font-semibold'>Wide Assortment</div>
                        <p>Choose from 5000+ products across food personal care, household & other categories.</p>
                      </div>
                  </div>
            </div> */}

            {/****only mobile */}
            {/* <div className='my-4 grid gap-3 '>
                <div>
                    <p className='font-semibold'>Description</p>
                    <p className='text-base'>{data.description}</p>
                </div>
                <div>
                    <p className='font-semibold'>Unit</p>
                    <p className='text-base'>{data.unit}</p>
                </div>
                {
                  data?.more_details && Object.keys(data?.more_details).map((element,index)=>{
                    return(
                      <div>
                          <p className='font-semibold'>{element}</p>
                          <p className='text-base'>{data?.more_details[element]}</p>
                      </div>
                    )
                  })
                }
            </div> */}

               {/* Navigation Tabs */}
               <div className="container mx-auto px-4 py-8">
      {/* Navigation Tabs */}
      <div className="border-b flex gap-6 pb-2">
        {["Description", "Customer Reviews", "Return Policy"].map((tab) => (
          <button
            key={tab}
            className={`pb-2 font-medium ${
              activeTab === tab
                ? "border-b-2 border-black text-black"
                : "text-gray-500 hover:text-black"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}

      </div>
      {/* Dynamic Content */}
      <div className="mt-6 text-gray-700">
        {activeTab === "Description" && <p>{data.description}</p>}
        {activeTab === "Customer Reviews" && (
          <p>⭐ {data.reviews.rating} ({data.reviews.count} Reviews)</p>
        )}
        {activeTab === "Return Policy" && <p>{data.returnPolicy}</p>}
      </div>
    </div>
        </div>
        
    </section> 
    <div className='mt-20 w-full'>
      {/* <ProductListPage/> */}
        {/***display category product */}
        
       
        {/* <Recommedproduct/> */}
      </div>
    </>

  )
}

export default ProductDisplayPage
