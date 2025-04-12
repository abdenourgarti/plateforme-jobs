import Swal from 'sweetalert2';

// Configuration générale pour les notifications Toast
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 5000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  }
});

// Différents types de notifications
export const showSuccessNotification = (message) => {
  Toast.fire({
    icon: 'success',
    title: message
  });
};

export const showErrorNotification = (message) => {
  Toast.fire({
    icon: 'error',
    title: message
  });
};

export const showInfoNotification = (message) => {
  Toast.fire({
    icon: 'info',
    title: message
  });
};

export const showWarningNotification = (message) => {
  Toast.fire({
    icon: 'warning',
    title: message
  });
};