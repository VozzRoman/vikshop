
import { SetStateAction, Dispatch  } from "react";

export interface IProducts {
	name: string,
	imagePath: string[],
	material:string,
	seasons:string[],
	size:string[],
	sex:string,
	color:string[],
	description:string,
	price: number,
	rating: number,
	bunerImg?: string,
	id: number,
	category?: string,
	
} 

export interface ICard extends IProducts {
	count: number,
	
} 

export interface IOrder {
	name: string,
	imagePath?: string,
	size: string,
	color: string,
	price: number,
}

export interface ICountry {
	countryName: string,
	cityName: string[],
}

export type TypSetState<T> = Dispatch<SetStateAction<T>> //  тип для передачи функции setState в пропс!