import { createSlice } from "@reduxjs/toolkit";

import BeansData from "../data/BeansData";
import CoffeeData from "../data/CoffeeData";

const initialState = {
  CoffeeList: CoffeeData,
  BeansList: BeansData,
  CartPrice: 0,
  FavouritesList: [],
  CartList: [],
  OrderHistoryList: [],
};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let found = false;
      for (let i = 0; i < state.CartList.length; i++) {
        if (state.CartList[i].id === action.payload.cartItem.id) {
          found = true;
          let size = false;
          for (let j = 0; j < state.CartList[i].prices.length; j++) {
            if (
              state.CartList[i].prices[j].size ==
              action.payload.cartItem.prices[0].size
            ) {
              size = true;
              state.CartList[i].prices[j].quantity++;
              break;
            }
          }
          if (size === false) {
            state.CartList[i].prices.push(action.payload.cartItem.prices[0]);
          }
          state.CartList[i].prices.sort((a, b) => {
            if (a.size > b.size) {
              return -1;
            }
            if (a.size < b.size) {
              return 1;
            }
            return 0;
          });
          break;
        }
      }
      if (found === false) {
        state.CartList.push(action.payload.cartItem);
      }
    },
    calculatePrice: (state) => {
      let totalPrice = 0;
      for (let i = 0; i < state.CartList.length; i++) {
        let amount = 0;
        for (let j = 0; j < state.CartList[i].prices.length; j++) {
          amount +=
            parseFloat(state.CartList[i].prices[j].price) *
            state.CartList[i].prices[j].quantity;
        }
        state.CartList[i].ItemPrice = amount.toFixed(2).toString();
        totalPrice += amount;
      }
      state.CartPrice = totalPrice.toFixed(2).toString();
    },
    addToFavouritesList: (state, action) => {
      const type = action.payload.type;
      const id = action.payload.id;

      if (type == "Coffee") {
        for (let i = 0; i < state.CoffeeList.length; i++) {
          if (state.CoffeeList[i].id == id) {
            if (state.CoffeeList[i].favourite == false) {
              state.CoffeeList[i].favourite = true;
              state.FavouritesList.unshift(state.CoffeeList[i]);
            } else {
              state.CoffeeList[i].favourite = false;
            }
            break;
          }
        }
      } else if (type == "Bean") {
        for (let i = 0; i < state.BeansList.length; i++) {
          if (state.BeansList[i].id == id) {
            if (state.BeansList[i].favourite == false) {
              state.BeansList[i].favourite = true;
              state.FavouritesList.unshift(state.BeansList[i]);
            } else {
              state.BeansList[i].favourite = false;
            }
            break;
          }
        }
      }
    },
    deleteFromFavouritesList: (state, action) => {
      const type = action.payload.type;
      const id = action.payload.id;

      if (type === "Coffee") {
        for (let i = 0; i < state.CoffeeList.length; i++) {
          if (state.CoffeeList[i].id == id) {
            if (state.CoffeeList[i].favourite == true) {
              state.CoffeeList[i].favourite = false;
            } else {
              state.CoffeeList[i].favourite = true;
            }
            break;
          }
        }
      } else if (type === "Bean") {
        for (let i = 0; i < state.BeansList.length; i++) {
          if (state.BeansList[i].id === id) {
            if (state.BeansList[i].favourite === true) {
              state.BeansList[i].favourite = false;
            } else {
              state.BeansList[i].favourite = true;
            }
            break;
          }
        }
      }

      let spliceIndex = -1;
      for (let i = 0; i < state.FavouritesList.length; i++) {
        if (state.FavouritesList[i].id == id) {
          spliceIndex = i;
          break;
        }
      }
      state.FavouritesList.splice(spliceIndex, 1);
    },
    incrementCartItemQuantity: (state, action) => {
      const { id } = action.payload;
      const { size } = action.payload;

      for (let i = 0; i < state.CartList.length; i++) {
        if (state.CartList[i].id === id) {
          for (let j = 0; j < state.CartList[i].prices.length; j++) {
            if (state.CartList[i].prices[j].size == size) {
              state.CartList[i].prices[j].quantity++;
              break;
            }
          }
        }
      }
    },
    decementCartItemQuantity: (state, action) => {
      const { id } = action.payload;
      const { size } = action.payload;

      for (let i = 0; i < state.CartList.length; i++) {
        if (state.CartList[i].id === id) {
          for (let j = 0; j < state.CartList[i].prices.length; j++) {
            if (state.CartList[i].prices[j].size === size) {
              if (state.CartList[i].prices.length > 1) {
                if (state.CartList[i].prices[j].quantity > 1) {
                  state.CartList[i].prices[j].quantity--;
                } else {
                  state.CartList[i].prices.splice(j, 1);
                }
              } else {
                if (state.CartList[i].prices[j].quantity > 1) {
                  state.CartList[i].prices[j].quantity--;
                } else {
                  state.CartList.splice(i, 1);
                }
              }
              break;
            }
          }
        }
      }
    },
    addToOrderHistoryListFromCart: (state) => {
      let temp = state.CartList.reduce(
        (acc, currentValue) => acc + parseFloat(currentValue.ItemPrice),
        0
      );
      if (state.OrderHistoryList.length > 0) {
        state.OrderHistoryList.unshift({
          OrderDate:
            new Date().toDateString() + " " + new Date().toLocaleTimeString(),
          CartList: state.CartList,
          CartListPrice: temp.toFixed(2).toString(),
        });
      } else {
        state.OrderHistoryList.push({
          OrderDate:
            new Date().toDateString() + " " + new Date().toLocaleTimeString(),
          CartList: state.CartList,
          CartListPrice: temp.toFixed(2).toString(),
        });
      }
      state.CartList = [];
    },
  },
});

export const {
  addToCart,
  calculatePrice,
  addToFavouritesList,
  decementCartItemQuantity,
  incrementCartItemQuantity,
  deleteFromFavouritesList,
  addToOrderHistoryListFromCart,
} = contentSlice.actions;
export default contentSlice.reducer;
