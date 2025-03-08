import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    wishlist: []
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: initialState,
    reducers: {
        handleAddItemWishlist: (state, action) => {
            state.wishlist = [...action.payload];
        }
    }
});

export const { handleAddItemWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
