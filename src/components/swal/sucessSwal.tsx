import Swal, { SweetAlertOptions } from 'sweetalert2';

export const successSwal = (message: string) => {
    const options: SweetAlertOptions = {
        title: "Sucesso!",
        text: message,
        icon: 'success',
        confirmButtonText: 'OK',
        backdrop: 'rgba(0,0,0,0.7)',
        timer: 1000,
        timerProgressBar: true,
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        },
        customClass: {
            popup: 'my-popup-class',
            title: 'my-title-class',
            confirmButton: 'my-confirm-button-class',
            timerProgressBar: 'my-progress-bar-class'
        }
    };
    Swal.fire(options);
};