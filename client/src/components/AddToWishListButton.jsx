import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import Loading from './Loading'
import { useSelector } from 'react-redux'
import { CiHeart } from "react-icons/ci";

// import { FaMinus, FaPlus } from "react-icons/fa6";

const AddToCartButton = ({ data }) => {
    const { fetchWishListItem, updateCartItem, deleteCartItem } = useGlobalContext()
    const [loading, setLoading] = useState(false)
    const cartItem = useSelector(state => state.cartItem.cart)
    const [isAvailableCart, setIsAvailableCart] = useState(false)
    const [qty, setQty] = useState(0)
    const [cartItemDetails,setCartItemsDetails] = useState()

    const handleADDTocart = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        try {
            setLoading(true)

            const response = await Axios({
                ...SummaryApi.addToWishlist,
                data: {
                    productId: data?._id
                }
            })

            const { data: responseData } = response

            if (responseData.success) {
                toast.success(responseData.message)
                if (fetchWishListItem) {
                    fetchWishListItem()
                }
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }

    }

    //checking this item in cart or not
    useEffect(() => {
        const checkingitem = cartItem.some(item => item.productId._id === data._id)
        setIsAvailableCart(checkingitem)

        const product = cartItem.find(item => item.productId._id === data._id)
        setQty(product?.quantity)
        setCartItemsDetails(product)
    }, [data, cartItem])


    // const increaseQty = async(e) => {
    //     e.preventDefault()
    //     e.stopPropagation()
    
    //    const response = await  updateCartItem(cartItemDetails?._id,qty+1)
        
    //    if(response.success){
    //     toast.success("Item added")
    //    }
    // }

    // const decreaseQty = async(e) => {
    //     e.preventDefault()
    //     e.stopPropagation()
    //     if(qty === 1){
    //         deleteCartItem(cartItemDetails?._id)
    //     }else{
    //         const response = await updateCartItem(cartItemDetails?._id,qty-1)

    //         if(response.success){
    //             toast.success("Item remove")
    //         }
    //     }
    // }
    
    return (
        <div className="w-full max-w-full flex justify-center">
  <button 
    onClick={handleADDTocart} 
    className=" z-10  bg-white hover:bg-gray-100 shadow-lg pl-1 pt-1 pr-1 text-lg  w-8 h-8 top-2 right-5 rounded-full font-extrabold"
  >
    {loading ? <CiHeart size={22}/> : <CiHeart size={22}/>
}
  </button>
</div>
    )
}

export default AddToCartButton
