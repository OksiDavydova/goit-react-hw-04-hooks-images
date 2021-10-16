import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function LoadSpinner() {
  return (
    <Loader
      type="Grid"
      color="#3f51b5"
      height={100}
      width={100}
      timeout={1000} //1 secs
    />
  );
}

export default LoadSpinner;
