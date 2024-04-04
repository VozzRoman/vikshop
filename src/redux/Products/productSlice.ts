import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProducts } from "../../types/ICard";
import { data } from "../../assets/database/database";


interface ProductState {
	products: IProducts[],
	filteredProducts: IProducts[],
	query: string,
	error: string,
	isFilterAction: boolean | null,

	
}
interface FilterAction {
	size?: string,
	model?: string,
	price?: number,
	color?: string,
	categories?: string,


}

const initialState: ProductState = {
	products: data,
	filteredProducts: [],
	query: '',
	error:'',
	isFilterAction: null,

}

export const productSlice = createSlice ({
	name:"products",
	initialState,
	reducers:{
		filteredSneakers(state, action: PayloadAction<string>) {
			state.query = action.payload;
			state.filteredProducts = state.products.filter(item => 
				item.name.split(' ').splice(0, 1).join(' ').toLocaleLowerCase().includes(action.payload) || 
				item.name.split(' ').splice(0, 2).join(' ').toLocaleLowerCase().includes(action.payload) || 
				item.name.split(' ').splice(0, 3).join(' ').toLocaleLowerCase().includes(action.payload))
		},

		mainFilter(state, action: PayloadAction<string | number | FilterAction>){
			//если не обьект а строка (color, size, price, model) - фильтрует только одно значение
			if (typeof action.payload === 'string') {
				 state.filteredProducts = state.products.filter(item =>
					  item.name.split(' ').splice(0, 1).join(' ').toLocaleLowerCase().includes(action.payload as string) ||
					  item.size.includes(action.payload as string) || item.color.includes(action.payload as string)
				 )
				 state.error = '';
			} else if(typeof action.payload === 'number') {
				state.filteredProducts = state.products.filter(item => item.price >= Number(action.payload))
			}
			 
			//если пришел обьект!
			if (typeof action.payload === 'object') {
				console.log("Object", action.payload)
				 const { size, model, price, color, categories } = action.payload;
				 //1)если все значения выбраны
				 if (size && model && price && color) {
						
					  state.filteredProducts = state.products.filter(item =>
							item.name.split(' ').splice(0, 1).join(' ').toLocaleLowerCase().includes(model.toLocaleLowerCase()) && item.color.includes(color as string) &&
							item.size.includes(size) && item.price >= price
					  ).filter(item => item.category === categories)
					   //проверка если товара нету!
				if(state.filteredProducts.length === 0){
						state.error = "No product found"
						state.isFilterAction = true;
					} else {
						state.error = '';
						state.isFilterAction = false;
					}
					  return;
				 }
				 //если выбраны size model price
				 if (size && model && price) {
					  state.filteredProducts = state.products.filter(item =>
							item.name.split(' ').splice(0, 1).join(' ').toLocaleLowerCase().includes(model.toLocaleLowerCase()) &&
							item.size.includes(size) && item.price >= price
					  ).filter(item => item.category === categories)
					  //проверка если товара нету!
				if(state.filteredProducts.length === 0){
						state.error = "No product found"
						state.isFilterAction = true
					} else {
						state.error = '';
						state.isFilterAction = false
					}
					  return;
				 }
				  //если выбраны size model color
					if (size && model && color) {
					state.filteredProducts = state.products.filter(item =>
					item.name.split(' ').splice(0, 1).join(' ').toLocaleLowerCase().includes(model.toLocaleLowerCase()) &&
					item.size.includes(size) && item.color.includes(color as string)
					).filter(item => item.category === categories)
						//проверка если товара нету!
				if(state.filteredProducts.length === 0){
					state.error = "No product found"
					state.isFilterAction = true
				} else {
					state.error = '';
					state.isFilterAction = false
				}
						return;
					}
					//если выбраны size color price
					if (size && color && price) {
					state.filteredProducts = state.products.filter(item =>
					item.color.includes(color as string) &&
					item.size.includes(size) && item.price >= price
					).filter(item => item.category === categories)
					//проверка если товара нету!
				if(state.filteredProducts.length === 0){
					state.error = "No product found"
					state.isFilterAction = true
				} else {
					state.error = '';
					state.isFilterAction = false
				}
						return;
					}
					//если выбраны size model
					if (size && model) {
					state.filteredProducts = state.products.filter(item =>
					item.name.split(' ').splice(0, 1).join(' ').toLocaleLowerCase().includes(model.toLocaleLowerCase()) &&
					item.size.includes(size)
					).filter(item => item.category === categories)
					if(state.filteredProducts.length === 0){
						state.error = "No product found"
						state.isFilterAction = true
					} else {
						state.error = '';
						state.isFilterAction = false
					}
					   return;
					}
					//если выбраны size color
					if (size && color) {
					state.filteredProducts = state.products.filter(item =>
					item.color.includes(color as string) &&
					item.size.includes(size)
					).filter(item => item.category === categories)
					//проверка если товара нету!
				if(state.filteredProducts.length === 0){
					state.error = "No product found"
					state.isFilterAction = true
				} else {
					state.error = '';
					state.isFilterAction = false
				}
					   return;
					}
					//если выбраны model price
					if (model && price) {
					state.filteredProducts = state.products.filter(item =>
					item.price >= price &&
					item.name.split(' ').splice(0, 1).join(' ').toLocaleLowerCase().includes(model.toLocaleLowerCase())
					).filter(item => item.category === categories)
					//проверка если товара нету!
				if(state.filteredProducts.length === 0){
					state.error = "No product found"
					state.isFilterAction = true
				} else {
					state.error = '';
					state.isFilterAction = false
				}
						return;
					}
					//если выбраны model color
					if (model && color) {
					state.filteredProducts = state.products.filter(item =>
					item.color.includes(color as string) &&
					item.name.split(' ').splice(0, 1).join(' ').toLocaleLowerCase().includes(model.toLocaleLowerCase())
					).filter(item => item.category === categories)
					
					//проверка если товара нету!
				if(state.filteredProducts.length === 0){
					state.error = "No product found"
					state.isFilterAction = true
				} else {
					state.error = '';
					state.isFilterAction = false
				}
					return;
					}
					//если выбраны size price
					if (size && price) {
					state.filteredProducts = state.products.filter(item =>
					item.price >= price &&
					item.size.includes(size)
					).filter(item => item.category === categories)
					//проверка если товара нету!
				if(state.filteredProducts.length === 0){
					state.error = "No product found"
					state.isFilterAction = true
				} else {
					state.error = '';
					state.isFilterAction = false
				}
					return;
					}
					//если выбраны color price
					if (color && price) {
					state.filteredProducts = state.products.filter(item =>
					item.price >= price &&
					item.color.includes(color as string)
					).filter(item => item.category === categories)
					//проверка если товара нету!
				if(state.filteredProducts.length === 0){
					state.error = "No product found"
					state.isFilterAction = true
				} else {
					state.error = '';
					state.isFilterAction = false
				}
					return;
					}
					
			} 
	  	},
		resetSearchQeary(state, action: PayloadAction<[]>) {
			state.filteredProducts = action.payload;
			state.error = '';
		}
	},
}) 

export const {filteredSneakers, mainFilter, resetSearchQeary} = productSlice.actions;
export default productSlice.reducer