import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  loading: boolean;
  loadingMsg: string;
}

const initialState: UiState = {
  loading: false,
  loadingMsg: '',
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showSpinner: (state, action: PayloadAction<string | undefined>) => {
      state.loading = true;
      state.loadingMsg = action.payload ?? '';
    },
    hiddeSpinner: (state) => {
      state.loadingMsg = '';
      state.loading = false;
    },
  },
});

export const { showSpinner, hiddeSpinner } = uiSlice.actions;

