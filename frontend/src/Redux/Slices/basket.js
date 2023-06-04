import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchCreateBasket = createAsyncThunk("/basket/fetchCreateBasket", async (params) => {
    const { data } = await axios.post("/basket/", params);
    return data;
});

export const fetchUpdateBasket = createAsyncThunk("/basket/fetchUpdateBasket", async (params) => {
    console.log(params);
    const { data } = await axios.put("/basket/updateone", params);
    return data;
});

export const fetchCreateAnalyzesBasket = createAsyncThunk("/basket/fetchCreateBasket", async (params) => {
    const { data } = await axios.post("/basketanalyzes/", params);
    return data;
});

export const fetchBasketMe = createAsyncThunk("/basket/fetchBasketMe", async (params) => {
    const { data } = await axios.post("/basket/userbasket", params);
    return data;
});

export const fetchBasketAnalyzesMe = createAsyncThunk("/basket/fetchBasketAnalyzesMe", async (params) => {
    const { data } = await axios.post("/basketanalyzes/analyzesbasket", params);
    return data;
});

const initialState = {
    basket: null,
    basketAnalyzes: [],
    amount_basketAnalyzes: -1,
    status: "loading",
};

function CheckRepeatItem(items, checkItem) {
    let indicator = true;
    items.forEach((item) => {
        if(item.analyzesTableId === checkItem.id) {
            indicator = false;
        }
    });
    return indicator;
}

const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        setItemInBasket(state, action) {
            if(CheckRepeatItem(state.basketAnalyzes, action.payload.item)) {
                // console.log(state.basket);
                state.basket.full_price += action.payload.item.price;
                state.amount_basketAnalyzes += 1;
            }
        },
        deleteItem(state, action) {
            let NewArrayItem = [];
            state.basketAnalyzes.forEach((item) => {
                if(item.analyzesTableId !== action.payload.item.id) {
                    NewArrayItem.push(item);
                }
            });
            state.basketAnalyzes = NewArrayItem;
            state.basket.full_price -= action.payload.item.price;
            state.amount_basketAnalyzes -= 1;
        },
        updateAmountItem(state, action) {
            state.amount_basketAnalyzes = action.payload.amount;
        }
    },
    extraReducers: {
        [fetchBasketAnalyzesMe.pending]: (state) => {
            state.basketAnalyzes = null;
            state.status = "loading";
        },
        [fetchBasketAnalyzesMe.fulfilled]: (state, action) => {
            state.basketAnalyzes = action.payload;
            if (state.amount_basketAnalyzes === -1) {
                state.amount_basketAnalyzes = action.payload.length;
            }
            state.status = "loaded";
        },
        [fetchBasketAnalyzesMe.rejected]: (state) => {
            state.basketAnalyzes = null;
            state.status = "error";
        },
        [fetchBasketMe.pending]: (state) => {
            state.basket = null;
            state.status = "loading";
        },
        [fetchBasketMe.fulfilled]: (state, action) => {
            state.basket = action.payload;
            state.status = "loaded";
        },
        [fetchBasketMe.rejected]: (state) => {
            state.basket = null;
            state.status = "error";
        },
        [fetchCreateBasket.pending]: (state) => {
            state.basket = null;
            state.amount_basketAnalyzes = 0
            state.status = "loading";
        },
        [fetchCreateBasket.fulfilled]: (state, action) => {
            state.basket = action.payload;
            state.amount_basketAnalyzes = 0
            state.status = "loaded";
        },
        [fetchCreateBasket.rejected]: (state) => {
            state.basket = null;
            state.amount_basketAnalyzes = 0
            state.status = "error";
        },
        [fetchUpdateBasket.pending]: (state) => {
            // state.basket = null;
            state.status = "loading";
            // state.amount_basketAnalyzes = 0;
        },
        [fetchUpdateBasket.fulfilled]: (state, action) => {
            // state.basket = action.payload;
            state.status = "loaded";
            // state.amount_basketAnalyzes = state.basketAnalyzes.length;
        },
        [fetchUpdateBasket.rejected]: (state) => {
            // state.basket = null;
            state.status = "error";
            // state.amount_basketAnalyzes = 0;
            // state.amount_basketAnalyzes = 0;
        },
        [fetchCreateAnalyzesBasket.pending]: (state) => {
            state.status = "loading";
        },
        [fetchCreateAnalyzesBasket.fulfilled]: (state) => {
            state.status = "loaded";
        },
        [fetchCreateAnalyzesBasket.rejected]: (state) => {
            state.status = "error";
        },
    },
});

export const { setItemInBasket, deleteItem, updateAmountItem } = basketSlice.actions;
export const basketReducer = basketSlice.reducer;
