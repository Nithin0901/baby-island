import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import { pricewithDiscount } from '../utils/PriceWithDiscount';
import imageEmpty from '../assets/empty_cart.webp';
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios';

const DisplayWishListItem = ({ close }) => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchWishlist = async () => {
            setLoading(true);
            try {
                const response = await Axios.get(SummaryApi.getWishlistItems.url, {
                    headers: SummaryApi.getWishlistItems.headers
                });
                setWishlistItems(response.data.data || []);
            } catch (error) {
                console.error('Error fetching wishlist:', error);
            }
            setLoading(false);
        };
        fetchWishlist();
    }, []);

    const handleRemoveFromWishlist = async (id) => {
        try {
            const response = await Axios.delete(`${SummaryApi.removeFromWishlist.url}?_id=${id}`, {
                headers: SummaryApi.removeFromWishlist.headers
            });

            if (response.data.success) {
                setWishlistItems(prevItems => prevItems.filter(item => item._id !== id));
            } else {
                console.error('Failed to remove item:', response.data.message);
            }
        } catch (error) {
            console.error('Error removing item from wishlist:', error);
        }
    };

    return (
        <section className='bg-neutral-900 fixed inset-0 bg-opacity-70 z-50'>
            <div className='bg-white w-full max-w-sm min-h-screen ml-auto'>
                <div className='flex items-center p-4 shadow-md gap-3 justify-between'>
                    <h2 className='font-semibold'>WishList</h2>
                    <button onClick={close}>
                        <IoClose size={25} />
                    </button>
                </div>

                <div className='min-h-[75vh] lg:min-h-[80vh] h-full max-h-[calc(100vh-150px)] bg-blue-50 p-2 flex flex-col gap-4 overflow-auto'>
                    {loading ? (
                        <p className='text-center text-gray-500'>Loading...</p>
                    ) : wishlistItems.length > 0 ? (
                        <div className='bg-white rounded-lg p-4 grid gap-5'>
                            {wishlistItems.map((item) => (
                                <div key={item._id} className='flex w-full gap-4 items-center'>
                                    <div className='w-16 h-16 bg-gray-200 border rounded flex items-center justify-center'>
                                        <img
                                            src={item?.productId?.image[0] || imageEmpty}
                                            alt={item?.productId?.name}
                                            className='object-cover w-full h-full rounded'
                                        />
                                    </div>
                                    <div className='w-full max-w-sm text-xs'>
                                        <p className='text-xs line-clamp-2 font-medium'>{item?.productId?.name}</p>
                                        <p className='text-neutral-400'>{item?.productId?.unit}</p>
                                        <p className='font-semibold'>
                                            {DisplayPriceInRupees(pricewithDiscount(item?.productId?.price, item?.productId?.discount))}
                                        </p>
                                    </div>
                                    <button onClick={() => handleRemoveFromWishlist(item._id)} className='bg-red-500 text-white px-2 py-1 rounded text-xs'>
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='bg-white flex flex-col justify-center items-center p-6'>
                            <img src={imageEmpty} alt='Empty Wishlist' className='w-32 h-32 object-cover' />
                            <p className='text-gray-500 mt-2'>Your wishlist is empty.</p>
                            <Link onClick={close} to={'/'} className='mt-4 bg-green-600 px-4 py-2 text-white rounded'>
                                Shop Now
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default DisplayWishListItem;