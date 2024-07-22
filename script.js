// Handle form submission
document.getElementById('trackingForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  // Gather form data
  const formData = {
    Tencuahang: document.getElementById('tenCuahang').value,
    LinkCMND: document.getElementById('linkCMND').value,
    LinkHopDong: document.getElementById('linkHopDong').value,
    Menu: document.getElementById('menu').value,
    trangthai: parseInt(document.querySelector('input[name="trangThai"]:checked').value)
  };

  // Send data to the API endpoint
  fetch('https://6605116c2ca9478ea17f2d5d.mockapi.io/tenduongdanang/tracking', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  .then(response => {
    if (!response.ok) {
      if (response.status === 400) {
        throw new Error('Dữ liệu đã đầy, không thể gửi thêm.');
      } else {
        throw new Error('Đã có lỗi xảy ra khi gửi dữ liệu.');
      }
    }
    return response.json();
  })
  .then(data => {
    alert('Dữ liệu đã được gửi thành công!');
    // Clear form after successful submission (if needed)
    document.getElementById('trackingForm').reset();
  })
  .catch(error => {
    alert(error.message);
    console.error('Error:', error);
  });
});
