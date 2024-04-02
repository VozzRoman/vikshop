import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICard, IOrder } from "../../types/ICard";

interface CartState {
	cart: ICard[],
	uniqData: ICard[],
	buyIt: IOrder | null,

}

const initialState: CartState = {
cart: [],
uniqData: [],
buyIt: null

}

export const cartSlice = createSlice({
	name:'cart',
	initialState,
	reducers:{
		addToCart(state, action: PayloadAction<ICard>) {
			state.cart = [...state.cart, action.payload];
			state.uniqData = state.cart.filter((item, index, array) => array.findIndex(obj => obj.size[0] === item.size[0]) === index);
		},
		deleteFromCart(state, action: PayloadAction<number>){
			state.cart = state.cart.filter(item => item.id !== action.payload);
		},
		updateCartPlus(state, action: PayloadAction<ICard>){
			state.cart = state.cart.map(item => {
				if(item.id === action.payload.id){
					return {
						...item,
						count: action.payload.count +1,
					}
				}
				return item;
			})
		},
		updateCartMinus(state, action: PayloadAction<ICard>){
			state.cart = state.cart.map(item => {
				if(item.id === action.payload.id){
					return {
						...item,
						count: action.payload.count === 1 ? 1: item.count -1,
					}
				}
				return item;
			})
		},
		buyItNowOneClick(state, action: PayloadAction<IOrder>) {
			state.buyIt = action.payload;
		},
	}
})

export const {addToCart, deleteFromCart, updateCartPlus, updateCartMinus, buyItNowOneClick} = cartSlice.actions;

export default cartSlice.reducer;