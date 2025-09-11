import Swal from 'sweetalert2'


// notif 
export const notif = (type: 'success' | 'error', message: string) => {
    Swal.fire({
        icon: type,
        title: message,
        showConfirmButton: false,
        timer: 1500
    })
}