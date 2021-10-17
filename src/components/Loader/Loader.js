import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function LoadSpinner() {
  return (
    <div style={center}>
      <Loader
        type="Circles"
        color="#3f51b5"
        height={100}
        width={100}
        // timeout={1000} //1 secs
      />
    </div>
  );
}

export default LoadSpinner;

const center = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};
