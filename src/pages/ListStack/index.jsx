import React, { useState } from "react";
import { useSelector } from "react-redux";
import SidebarLeft from "../../components/SidebarLeft";
import SidebarRight from "../../components/SidebarRight";

function ListStack(props) {
  const isToggle = useSelector((state) => state.mainSlice);
  // console.log(isToggle);
  const [data, setData] = useState({});

  function handleDataEdit(data) {
    setData(data);
  }
  const render = (toggle) => {
    if (toggle.isCreate === false && toggle.isModifier === false) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="container">
      <div className="row mt-3">
        {render(isToggle) ? null : (
          <div className="col-md-4">
            <SidebarLeft dataEdit={data} />
          </div>
        )}
        <div className={render(isToggle) ? "col-md-12" : "col-md-8"}>
          <SidebarRight handleData={handleDataEdit} />
        </div>
      </div>
    </div>
  );
}

export default ListStack;
