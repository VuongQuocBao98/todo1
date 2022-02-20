import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function Notify(props) {
  const renderOption = () => {
    let temp = [];
    for (let index = 1; index <= 12; index++) {
      temp.push(index);
    }
    return temp;
  };
  const listCost = useSelector((state) => state.mainSlice.spendding);
  console.log(listCost);
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(2022);
  const [data, setData] = useState(listCost);
  const [total, setTotal] = useState(0);

  // fillter with moth
  const handleChangeMonth = (e) => {
    setMonth(e.target.value);
    // console.log(listCost);
    const temp = [];
    listCost.forEach((el) => {
      const day = new Date(el.date).getMonth();
      const newYear = new Date(el.date).getFullYear();
      if (day === Number(e.target.value) && newYear === Number(year)) {
        temp.push(el);
      }
    });
    setData(temp);
  };
  // fillter with year
  const handleChangeYear = (e) => {
    setYear(e.target.value);
    const temp = [];
    listCost.forEach((el) => {
      const day = new Date(el.date).getMonth();
      const newYear = new Date(el.date).getFullYear();
      if (day === Number(month) && newYear === Number(e.target.value)) {
        temp.push(el);
      }
    });
    setData(temp);
  };

  useEffect(() => {
    let newTotal = 0;
    data.forEach((e) => {
      newTotal += e.amount;
    });
    setTotal(newTotal);
  }, [month, year, data]);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center text-warning mt-3">
          <h2>Trang Thống Kê</h2>
        </div>
        <div className="col-md-12 text-primary d-flex">
          <h4>Bộ Lọc Theo Tháng/Năm</h4>
          <button className="btn btn-outline-info mx-2">
            <Link to="/" className="text-decoration-none">
              Quay về trang danh sách
            </Link>
          </button>
        </div>
        <div className="col-md-12">
          <select className="mx-3" onChange={handleChangeMonth}>
            {renderOption().map((item, index) => {
              return (
                <option key={index} value={item}>
                  Tháng {item}
                </option>
              );
            })}
          </select>

          {/* năm  */}
          <select onChange={handleChangeYear}>
            <option value={2022}> Năm 2022</option>
            <option value={2023}> Năm 2023</option>
            <option value={2024}> Năm 2024</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mt-2  border rounded p-2">
          <h5>
            Danh sách các khoản chi tiêu tháng {month} năm {year} :
          </h5>
          {data.length === 0 ? (
            <h4>Không có Chi Tiêu Nào</h4>
          ) : (
            data.map((item, index) => {
              return (
                <div key={index}>
                  <p>
                    - {item.name} : Giá{" "}
                    <span>
                      {" "}
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(item.amount)}{" "}
                    </span>
                  </p>
                </div>
              );
            })
          )}
        </div>
        <div className="col-md-6 mt-2 border rounded p-2">
          <h5>
            Tổng Chi Tiêu Trong tháng {month} năm {year}
          </h5>
          <p className="text-primary fw-bold">
            💲 Số Tiền :{" "}
            <span>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(total)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Notify;
