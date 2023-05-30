import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UrlProps {
  backdrop: string;
  poster: string;
  profile: string;
}

export interface HomeState {
  url: UrlProps;
  genres: {
    [key: string]: any;
  };
}

const initialState: HomeState = {
  url: { backdrop: "", poster: "", profile: "" },
  genres: {},
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    getApiConfiguration: (state, action: PayloadAction<UrlProps>) => {
      state.url = action.payload;
    },
    getGeneres: (state, action: PayloadAction<HomeState>) => {
      state.genres = action.payload;
    },
  },
});

export const { getApiConfiguration, getGeneres } = homeSlice.actions;

export default homeSlice.reducer;
