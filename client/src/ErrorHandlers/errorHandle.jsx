import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export default function MessageAlert(data) {
  Toastify({
    text: data?.response?.data?.message,
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top",
    position: "center",
    offset: {
      y: 50,
    },
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function () {},
  }).showToast();
}
