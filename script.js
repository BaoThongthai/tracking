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

  // Function to send data to an endpoint
  function sendData(url) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
  }
//MocjAPI : loilinhlanh020@gmail.com (1,2)
//MocjAPI : baokn.danang@gmail.com (1,2)
  // Array of endpoints to try
  const endpoints = [
    'https://6605116c2ca9478ea17f2d5d.mockapi.io/tenduongdanang/tracking',
    'https://6605116c2ca9478ea17f2d5d.mockapi.io/tenduongdanang/videosanpham',
    'https://667d1684297972455f6368a4.mockapi.io/MKlaco' // Thêm endpoint thứ ba ở đây
  ];

  // Function to try sending data to multiple endpoints
  function trySendingData(index = 0) {
    if (index >= endpoints.length) {
      throw new Error('Tất cả các endpoint đều đầy. Không thể gửi dữ liệu.');
    }

    return sendData(endpoints[index])
      .then(response => {
        if (!response.ok) {
          if (response.status === 400) {
            // If current endpoint is full, try the next one
            return trySendingData(index + 1);
          } else {
            throw new Error('Đã có lỗi xảy ra khi gửi dữ liệu.');
          }
        }
        return response.json();
      });
  }

  // Start trying to send data
  trySendingData()
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
