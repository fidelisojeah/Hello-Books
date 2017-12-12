import { setTimeout } from 'timers';

class Toastr {
  static Success(content, timeOut = 3000) {
    const toast = document.getElementById('site-toastr');
    document.getElementById('toastr-content').innerHTML = content;

    toast.classList.remove('failure');
    toast.classList.add('success');
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
      toast.classList.remove('success');
    }, timeOut);
  }
  static Failure(content, timeOut = 3000) {
    const toast = document.getElementById('site-toastr');
    document.getElementById('toastr-content').innerHTML = content;

    toast.classList.remove('success');
    toast.classList.add('show');
    toast.classList.add('failure');
    setTimeout(() => {
      toast.classList.remove('show');
      toast.classList.remove('failure');
    }, timeOut);
  }
  static Modal(header, content, impression, timeOut) {
    const toastModal = document.getElementById('confirmationModal');

  }
}
export default Toastr;
