import { createSlice } from "@reduxjs/toolkit";

export const mainSlice = createSlice({
  name: "main",
  initialState: {
    isModifier: false,
    idModify: null,
    isCreate: false,
    spendding: [
      {
        id: 123123123,
        name: "Tiền Đá Bóng",
        amount: 1000000,
        date: 1645056000000,
        type: "Phát Sinh",
      },
      {
        id: 12312312789274823,
        name: "Tiền Nhà tháng 1",
        amount: 1400000,
        date: 1645056000000,
        type: "Tiền Nhà",
      },
      {
        id: 123123127892748230022,
        name: "Mua tài liệu học tập",
        amount: 120000,
        date: 1645056000000,
        type: "Phát Sinh",
      },
      {
        id: 123123127896666,
        name: "Bỏ tiết kiệm heo tháng 1",
        amount: 2000000,
        date: 1645056000000,
        type: "Tiết Kiệm",
      },
    ],
  },
  reducers: {
    addCost(state, action) {
      const newCost = action.payload;
      state.spendding.push(newCost);
    },
    removeCost(state, action) {
      const idRemove = action.payload;
      state.spendding = state.spendding.filter((x) => x.id !== idRemove);
    },
    editCost(state, action) {
      const editCost = action.payload;
      const index = state.spendding.findIndex((x) => x.id === editCost.id);
      if (index >= 0) {
        state.spendding[index] = editCost;
      }
    },
    addEditCostId(state, action) {
      state.idModify = action.payload;
    },
    isModify(state) {
      state.isModifier = true;
      state.isCreate = false;
    },
    isCreate(state) {
      state.isCreate = true;
      state.isModifier = false;
    },
    isClose(state) {
      state.isCreate = false;
      state.isModifier = false;
    },
  },
});

export const { actions, reducer } = mainSlice;

export const {
  addCost,
  removeCost,
  isCreate,
  isModify,
  isClose,
  addEditCostId,
  editCost,
} = actions;

export default reducer;
