import React, { useEffect, useRef, useState } from "react";
import { useStateValue } from "../StateProvider";

import "./AddedSuccessfully.css";

function AddedSuccessfully() {
  const [{ basket }] = useStateValue();
  const [addedItem, setAddedItem] = useState(null);
  const newItemRef = useRef(null);
  useEffect(() => {
    if (basket.length > 0) {
      setAddedItem(true);
      setTimeout(
        () => newItemRef.current?.classList.remove("added_container-anmi"),
        500
      );
    } else {
      setAddedItem(false);
    }
  }, [basket]);
  const showObj = basket[basket.length - 1];
  return (
    <div className="addedSuccessfully">
      {addedItem && (
        <div
          className={`added_container added_container-anmi`}
          ref={newItemRef}
        >
          <img src={showObj?.image} alt="" />
          <h4>Added Successfully</h4>
          <span
            onClick={() => {
              newItemRef.current?.classList.add("added_container-anmi");
              setTimeout(() => setAddedItem(false), 500);
            }}
            className="x"
          >
            X
          </span>
        </div>
      )}
    </div>
  );
}

export default AddedSuccessfully;
