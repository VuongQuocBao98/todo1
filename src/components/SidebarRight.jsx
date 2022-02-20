import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { data } from "../data";
import PropTypes from "prop-types";

import {
  removeCost,
  isCreate,
  isModify,
  addEditCostId,
  isClose,
} from "../pages/mainSice";
import { Link } from "react-router-dom";
SidebarRight.propTypes = {
  handleData: PropTypes.func,
};
function SidebarRight(props) {
  const { handleData } = props;
  const listCost = useSelector((state) => state.mainSlice.spendding);

  useEffect(() => {
    setListCostFill(listCost);
  }, [listCost]);
  const [listCostFill, setListCostFill] = useState(listCost);
  // const [status, setStatus] = useState("all");
  const handleChangeStatus = (e) => {
    if (e.target.value === "all") {
      setListCostFill(listCost);
    } else {
      const temp = listCost.filter((x) => x.type === e.target.value);
      setListCostFill(temp);
    }
  };
  const dispatch = useDispatch();
  // delete cost item
  const deleteCost = (id) => {
    const action = removeCost(id);
    dispatch(action);
    dispatch(isClose());
    const temp = listCostFill.filter((x) => x.id !== id);
    setListCostFill(temp);
  };

  // change status add new Cost
  const showAddNewCost = () => {
    dispatch(isCreate());
  };
  // Modify Cosst
  const showEditCost = (cost) => {
    dispatch(isModify());
    dispatch(addEditCostId(cost.id));
    handleData(cost);
  };

  // Render list table data
  const listTable = (list) => {
    if (list.length === 0) {
      const temp = (
        <tr>
          <td colSpan={5}>Không Tìm Thấy Kết Quả Phù Hợp</td>
        </tr>
      );
      return temp;
    } else {
      const temp = list.map((cost, index) => {
        const date = new Date(cost.date);

        return (
          <tr key={cost.id}>
            <td className="table-primary">{++index}</td>
            <td className="table-primary">{cost.name}</td>
            <td className="table-primary">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(cost.amount)}
            </td>
            <td className="table-primary">{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</td>
            <td className="table-primary">
              {cost.type === "Phát Sinh" ? (
                <span className="badge bg-warning">{cost.type}</span>
              ) : (
                <span className="badge bg-success">{cost.type}</span>
              )}
            </td>
            <td className="table-primary d-flex">
              <div
                className="btn p-1 bg-warning mx-1"
                onClick={() => showEditCost(cost)}
              >
                Sửa
              </div>
              <div
                className="btn p-1 bg-danger"
                onClick={() => deleteCost(cost.id)}
              >
                Xóa
              </div>
            </td>
          </tr>
        );
      });
      return temp;
    }
  };
  const isModifier = useSelector((state) => state.mainSlice.isModifier);

  return (
    <section className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <button
            className="btn btn-primary"
            onClick={() => showAddNewCost()}
            disabled={isModifier ? true : false}
          >
            Thêm khoản chi mới
          </button>

          <button className="btn btn-warning mx-2">
            <Link to="/notify" className="text-decoration-none">
              Trang Thống Kê
            </Link>
          </button>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-12 text-center">
          <h3 className="text-uppercase text-danger">
            Danh sách các khoản chi tiêu
          </h3>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <select onChange={handleChangeStatus} className="form-select">
            <option value="all">Tổng Hợp</option>
            {data.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="row">
        {/* table data  */}
        <div className="col-md-12">
          <table className="table table-striped">
            <thead className="text-center">
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Tên</th>
                <th scope="col">Tiền Chi</th>
                <th scope="col">Ngày Chi</th>
                <th scope="col">Loại Chi Tiêu</th>
              </tr>
            </thead>
            <tbody className="text-center">{listTable(listCostFill)}</tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default SidebarRight;
