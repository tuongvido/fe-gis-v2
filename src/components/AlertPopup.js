// src/components/AlertPopup.js
import Swal from "sweetalert2";

export const showSuccess = (message = "Thao tác thành công") => {
  Swal.fire({
    icon: "success",
    title: message,
    confirmButtonColor: "#3085d6",
    confirmButtonText: "OK"
  });
};

export const showError = (message = "Đã xảy ra lỗi") => {
  Swal.fire({
    icon: "error",
    title: message,
    confirmButtonColor: "#d33",
    confirmButtonText: "OK"
  });
};
