

  //đếm số record
  fetch('https://6605116c2ca9478ea17f2d5d.mockapi.io/tenduongdanang/tracking')
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
