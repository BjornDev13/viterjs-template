import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    affiliateDetail: true,
    indexOfTable: '',
    infoTable: '',
    openModal: false,
    providerModal: false,
    isActiveMenu: false,
    changeStatusModal: false,
  },
  reducers: {
    setAffiliateDetail: (state, action) => {
      state.affiliateDetail = action.payload
    },
    setIndexOfTable: (state, action) => {
      state.indexOfTable = action.payload
    },
    setInfoTable: (state, action) => {
      state.infoTable = action.payload
    },
    setOpenModal: (state, action) => {
      state.openModal = action.payload
    },
    setProviderModal: (state, action) => {
      state.openModal = action.payload
    },
    setIsActiveMenu: (state, action) => {
      state.isActiveMenu = action.payload
    },
    setChangeStatusModal: (state, action) => {
      state.changeStatusModal = action.payload
    }
  },
})

export const {
  setAffiliateDetail,
  setIndexOfTable,
  setInfoTable,
  setOpenModal,
  setProviderModal,
  setIsActiveMenu,
  setChangeStatusModal
} = userSlice.actions

export default userSlice.reducer
