import Swal from 'sweetalert2'

export const showSuccess = (title: string, text?: string) => {
    Swal.fire({
      icon: 'success',
      title,
      text,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      background: '#002E4D',
      color: '#fff',
    })
  }
  

export const showError = (title: string, text?: string) => {
  Swal.fire({
    icon: 'error',
    title,
    text,
    confirmButtonColor: '#d33',
  })
}

export const showWarning = (title: string, text?: string) => {
  Swal.fire({
    icon: 'warning',
    title,
    text,
    confirmButtonColor: '#f1c40f',
  })
}

export const showConfirm = async (
  title: string,
  text: string,
  confirmText = 'Sí',
  cancelText = 'Cancelar'
): Promise<boolean> => {
  const result = await Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
  })
  return result.isConfirmed
}

export const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: type,
    title: message,
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    background: '#002E4D',
    color: '#fff',
  })
}
