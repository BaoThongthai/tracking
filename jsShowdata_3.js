

  //đếm số record
  fetch('https://667d1684297972455f6368a4.mockapi.io/MKlaco')
  .then(response => response.json())
  .then(data => {
    // Đếm số lượng records
    const recordCount = data.length;

    // Hiển thị trong HTML
    const countElement = document.getElementById('recordCount');
    countElement.textContent = `Số lượng records: ${recordCount}`;
  })
  .catch(error => {
    console.error('Lỗi khi lấy dữ liệu từ API:', error);
  });
