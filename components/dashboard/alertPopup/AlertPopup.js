import Swal from 'sweetalert2'

export const Success = () => {
    return Swal.fire('تمت العمليه بنجاح', '', 'success')
}
export const Failed = () => {
    return Swal.fire({ icon: 'error', title: 'للاسف', text: 'حدث خطأ ما!' })
}