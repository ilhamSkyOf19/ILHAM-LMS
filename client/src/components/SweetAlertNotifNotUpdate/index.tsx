import Swal from "sweetalert2";

const sweetAlertNotiifNotUpdate = () => {
    Swal.fire({
        icon: 'info',
        title: 'Notification',
        text: 'Input Kosong Data Tidak Terupdate',
        showConfirmButton: true,
        confirmButtonColor: '#808080',
    });
};


export default sweetAlertNotiifNotUpdate