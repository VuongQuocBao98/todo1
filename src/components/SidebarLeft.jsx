import React, { useState, useEffect } from "react";
import { data } from "./../data";
import { useDispatch, useSelector } from "react-redux";
import { addCost, isClose, editCost } from "../pages/mainSice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function SidebarLeft({ dataEdit }) {
  const isCreate = useSelector((state) => state.mainSlice.isCreate);

  const idModify = useSelector((state) => state.mainSlice.idModify);
  const time = new Date(dataEdit.date);
  const dateDefault = `${time.getFullYear()}-${
    time.getMonth() >= 10 ? time.getMonth() : `0${time.getMonth()}`
  }-${time.getDate() >= 10 ? time.getDate() : `0${time.getDate()}`}`;

  const [name, setName] = useState(isCreate ? "" : dataEdit.name);
  const [amount, setAmount] = useState(isCreate ? "" : dataEdit.amount);
  const [date, setDate] = useState(isCreate ? "" : dateDefault);

  useEffect(() => {
    if (isCreate === false) {
      setName(dataEdit.name);
      setAmount(dataEdit.amount);
      let time = new Date(dataEdit.date);
      let dateDefault = `${time.getFullYear()}-${
        time.getMonth() >= 10 ? time.getMonth() : `0${time.getMonth()}`
      }-${time.getDate() >= 10 ? time.getDate() : `0${time.getDate()}`}`;
      setDate(dateDefault);
    }
  }, [dataEdit, isCreate]);
  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeAmount = (e) => {
    setAmount(e.target.value);
  };
  const onChangeDate = (e) => {
    setDate(e.target.value);
  };

  const dispatch = useDispatch();

  // handle close modal add or edit
  const handleClose = () => {
    dispatch(isClose());
  };
  // Submit Add or Edit Cost
  const handleSubmit = (e) => {
    e.preventDefault();

    const temp = e.target;
    const a = date;
    const b = new Date(a);
    console.log(b.getMonth());
    // check action add cost
    if (isCreate === true) {
      const time = new Date();
      const newData = {
        id: time.getTime(),
        name: temp.name.value,
        amount: temp.number.value,
        date: temp.date.valueAsNumber,
        type: temp.type.value,
      };
      const action = addCost(newData);
      dispatch(action);

      toast.success("🦄 Thêm Thành Công!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      setName("");
      setAmount("");
      setDate("");
    } else {
      // check action edit cost
      const newData = {
        id: idModify,
        name: temp.name.value,
        amount: temp.number.value,
        date: temp.date.valueAsNumber,
        type: temp.type.value,
      };
      const action = editCost(newData);
      dispatch(action);

      toast.warning("✔ Sửa Thành Công!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <div>
      <div className="border boder-2 rounded">
        {/* header form  */}
        <div className="bg-warning text-center border rounded-top position-relative">
          <h5 className="text-light p-2">
            {isCreate ? "Thêm Khoản Chi" : "Chỉnh Sửa Khoản Chi"}
          </h5>

          <div
            style={{
              position: "absolute",
              right: "0",
              top: "0",
            }}
            className="d-flex align-items-start btn p-0 btn-close p-1"
            onClick={() => handleClose()}
          ></div>
        </div>
        <ToastContainer />
        {/* form input  */}
        <form id="form-add-new-cost" className="p-3" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-bold">
              Tên khoản chi
            </label>
            <input
              type="text"
              name="title"
              className="form-control"
              id="name"
              onChange={onChangeName}
              value={name}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="number" className="form-label fw-bold">
              Số Tiền chi tiêu
            </label>
            <input
              type="number"
              name="number"
              className="form-control"
              id="number"
              required
              onChange={onChangeAmount}
              value={amount}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Ngày</label>
            <input
              type="date"
              name="date"
              className="form-control"
              min="2022-02-01"
              max="2024-12-31"
              onChange={onChangeDate}
              value={date}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Phân Loại</label>
            <select name="type" className="form-select">
              {data.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="d-flex justify-content-center">
            <button className="btn btn-primary" type="submit">
              {isCreate ? "Xác Nhận Thêm" : "Xác Nhận Sửa"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SidebarLeft;
