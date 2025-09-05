import Swal from 'sweetalert2'
const deleteAlert = async (): Promise<void> => {
    const res = await Swal.fire({
        title: "Anda ingin menghapus data ini?",
        text: "Data akan terhapus secara permanen",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya , hapus",
        cancelButtonText: "Batal",
        reverseButtons: true,
        confirmButtonColor: '#ef4444',
    })

    if (res.isConfirmed) {
        Swal.fire('Data berhasil dihapus', '', 'success')
    }
}


export default deleteAlert