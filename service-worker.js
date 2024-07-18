let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Ngăn chặn sự kiện tự động hiển thị cửa sổ cài đặt
  e.preventDefault();
  // Lưu lại sự kiện để sau này có thể hiển thị
  deferredPrompt = e;

  // Hiển thị nút hoặc UI cho phép người dùng cài đặt ứng dụng
  const installButton = document.getElementById('installButton');
  installButton.style.display = 'block';

  installButton.addEventListener('click', (e) => {
    // Ẩn nút cài đặt
    installButton.style.display = 'none';
    // Hiển thị cửa sổ cài đặt
    deferredPrompt.prompt();
    // Theo dõi kết quả từ người dùng
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      deferredPrompt = null;
    });
  });
});