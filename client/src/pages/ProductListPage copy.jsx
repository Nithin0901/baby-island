import React, { useEffect, useState } from 'react'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { Link, useParams } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import Loading from '../components/Loading'
import CardProduct from '../components/CardProduct'
import { useSelector } from 'react-redux'
import { valideURLConvert } from '../utils/valideURLConvert'

const ProductListPage = () => {
  const [data, setData] = useState([])
  const [recommendedProducts, setRecommendedProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalPage, setTotalPage] = useState(1)
  const params = useParams()
  const AllSubCategory = useSelector(state => state.product.allSubCategory)
  const [DisplaySubCatory, setDisplaySubCategory] = useState([])

  // Ensure category & subCategory exist before using .split()
  const categoryParam = params.category || "";
  const subCategoryParam = params.subCategory || "";

  // Extract categoryId & subCategoryId safely
  const categoryId = categoryParam.split("-").slice(-1)[0] || "";
  const subCategoryId = subCategoryParam.split("-").slice(-1)[0] || "";

  const subCategory = subCategoryParam?.split("-");
  const subCategoryName = subCategory?.slice(0, subCategory?.length - 1)?.join(" ");

  console.log("Category ID:", categoryId);
  console.log("Subcategory ID:", subCategoryId);

  // Fetch products for the selected category and subcategory
  const fetchProductData = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId,
          subCategoryId,
          page: 1,
          limit: 8,
        }
      })

      const { data: responseData } = response

      if (responseData.success) {
        setData(responseData.data)
        setTotalPage(responseData.totalCount)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch recommended products (same category but different subcategories)
  const fetchRecommendedProducts = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getProductByCategory,
        data: { id: categoryId }
      })

      if (response.data.success) {
        // Remove currently viewed subcategory products from recommendations
        const filteredProducts = response.data.data.filter(p => p.subCategory !== subCategoryId)
        setRecommendedProducts(filteredProducts.slice(0, 10)) // Limit to 10 recommended products
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  useEffect(() => {
    if (categoryId && subCategoryId) {
      fetchProductData()
      fetchRecommendedProducts()
    }
  }, [params])

  useEffect(() => {
    const sub = AllSubCategory.filter(s => s.category.some(el => el._id === categoryId))
    setDisplaySubCategory(sub)
  }, [params, AllSubCategory])

  return (
    <section className='sticky top-24 lg:top-20'>
      <div className='container mx-auto grid grid-cols-[90px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr]'>
        
        {/* Sidebar: Subcategories */}
        <div className='min-h-[88vh] max-h-[88vh] overflow-y-scroll grid gap-1 shadow-md scrollbarCustom bg-white py-2'>
          {DisplaySubCatory.map((s, index) => {
            const link = `/${valideURLConvert(s?.category[0]?.name)}-${s?.category[0]?._id}/${valideURLConvert(s.name)}-${s._id}`
            return (
              <Link to={link} key={index} className={`w-full p-2 lg:flex items-center lg:w-full lg:h-16 box-border lg:gap-4 border-b hover:bg-green-100 cursor-pointer
                ${subCategoryId === s._id ? "bg-green-100" : ""}
              `}>
                <div className='w-fit max-w-28 mx-auto lg:mx-0 bg-white rounded box-border'>
                  <img src={s.image} alt='subCategory' className='w-14 lg:h-14 lg:w-12 h-full object-scale-down' />
                </div>
                <p className='-mt-6 lg:mt-0 text-xs text-center lg:text-left lg:text-base'>{s.name}</p>
              </Link>
            )
          })}
        </div>

        {/* Products List */}
        <div className='sticky top-20'>
          <div className='bg-white shadow-md p-4 z-10'>
            <h3 className='font-semibold'>{subCategoryName}</h3>
          </div>
          <div className='min-h-[80vh] max-h-[80vh] overflow-y-auto relative'>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-x-72 gap-y-12'>
              {data.map((p, index) => (
                <CardProduct key={p._id + "productSubCategory" + index} data={p} />
              ))}
            </div>
          </div>

          {loading && <Loading />}
        </div>
      </div>

      {/* Recommended Products Section */}
      {recommendedProducts.length > 0 && (
        <div className="container mx-auto mt-10">
          <h2 className="text-xl font-bold mb-4">Recommended Products</h2>
          <div className="flex gap-4 overflow-x-auto scrollbar-none">
            {recommendedProducts.map((product, index) => (
              <CardProduct key={product._id} data={product} />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

export default ProductListPage;
