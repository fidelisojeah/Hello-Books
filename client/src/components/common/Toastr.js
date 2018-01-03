import { setTimeout } from 'timers';

class Toastr {
  static Success(content, timeOut = 3000) {
    const toast = document.getElementById('site-toastr');
    document.getElementById('toastr-content').innerHTML = content;

    toast.classList.remove('failure');
    toast.classList.remove('caution');

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
    toast.classList.remove('caution');

    toast.classList.add('show');
    toast.classList.add('failure');
    setTimeout(() => {
      toast.classList.remove('show');
      toast.classList.remove('failure');
    }, timeOut);
  }
  static Caution(content, timeOut = 3000) {
    const toast = document.getElementById('site-toastr');
    document.getElementById('toastr-content').innerHTML = content;

    toast.classList.remove('success');
    toast.classList.remove('failure');
    toast.classList.add('show');
    toast.classList.add('caution');
    setTimeout(() => {
      toast.classList.remove('show');
      toast.classList.remove('caution');
    }, timeOut);
  }
  static Modal(header, content, successful = true, timeOut = null) {
    const loader = document.getElementById('loader');
    const modalHead = document.getElementById('ToastrModalHead');
    const modalContent = document.getElementById('ToastrmodalContent');
    const check = document.getElementById('check');

    modalContent.innerHTML = content;
    modalHead.innerHTML = header;

    loader.classList.remove('load-complete');
    check.style.display = 'none';
    if (!successful) {
      check.classList.add('-failure');
      loader.classList.add('-failure');
    } else {
      check.classList.remove('-failure');
      loader.classList.remove('-failure');
    }

    document.body.classList.add('with--toastr-modal');

    setTimeout(() => {
      loader.classList.add('load-complete');
      check.style.display = 'block';
    }, 800);
    if (timeOut) {
      setTimeout(() => {
        document.body.classList.remove('with--toastr-modal');
        loader.classList.remove('load-complete');
        check.style.display = 'none';
      }, timeOut);
    }
  }
}
export default Toastr;
