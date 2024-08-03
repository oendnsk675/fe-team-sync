import { Slide, toast } from "react-toastify";

const Msg = ({ closeToast, confirmedToast, message }) => (
  <div>
    <span>{message}</span>
    <div className="w-full mt-2 flex justify-center gap-3">
      <button
        className="btn btn-xs btn-primary"
        onClick={() => {
          confirmedToast();
          closeToast();
        }}
      >
        Yes
      </button>
      <button className="btn btn-xs btn-error" onClick={closeToast}>
        Close
      </button>
    </div>
  </div>
);

const AlertCustom = (message: string, confirmedToast?: () => void) => {
  toast(<Msg message={message} confirmedToast={confirmedToast} />, {
    autoClose: false,
    hideProgressBar: true,
    position: "top-center",
    transition: Slide,
  });
  // toast(Msg) would also work
};

export default AlertCustom;
