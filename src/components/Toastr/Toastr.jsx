import { useContext } from "react";
import ToastrContext from "../../context/toastr-context";
import "./Toastr.scss";

const Toastr = ({ message }) => {
  const { setShowMessage } = useContext(ToastrContext);

  return (
    <div
      className={`toastr-container`}
      onClick={() => {
        setShowMessage(false);
      }}
    >
      {message}
    </div>
  );
};

export default Toastr;
