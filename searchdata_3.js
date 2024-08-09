let originalData = []; // Lưu trữ dữ liệu ban đầu để làm cơ sở cho việc tìm kiếm

async function fetchData() {
    try {
        const response = await fetch('https://667d1684297972455f6368a4.mockapi.io/MKlaco');
        if (!response.ok) {
            throw new Error('Không thể lấy dữ liệu từ API.');
        }
        originalData = await response.json();
        updateTable(originalData); // Cập nhật bảng với dữ liệu ban đầu
    } catch (error) {
        console.error('Error:', error);
        alert('Đã có lỗi xảy ra khi lấy dữ liệu từ API.');
    }
}

// Function to search data by store name
function searchData() {
    const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();

    const filteredData = originalData.filter(item =>
        item.Tencuahang.toLowerCase().includes(searchInput)
    );

    updateTable(filteredData); // Cập nhật bảng với dữ liệu đã lọc
}

// Function to update the table with fetched data
function updateTable(data) {
    const trackingTable = document.getElementById('trackingTable');
    trackingTable.innerHTML = `
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Tên cửa hàng</th>
                    <th scope="col">Link CMND</th>
                    <th scope="col">Link Hợp đồng</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Chức Năng</th>
                </tr>
            </thead>
            <tbody id="trackingTableBody">
            </tbody>
        </table>
    `;

    const tableBody = document.getElementById('trackingTableBody');
    tableBody.innerHTML = '';

    data.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.id}</td>
            <td>${item.Tencuahang}</td>
            <td><a href="${item.LinkCMND}" target="_blank">Hình ảnh CMND</a></td>
            <td><a href="${item.LinkHopDong}" target="_blank">Hình ảnh Hợp Đồng</a></td>
            <td>${item.trangthai === 1 ? 'Đã Ký' : 'Chưa Thành Công'}</td>
            <td>
                <button onclick="editItem('${item.id}')" class="btn btn-warning btn-sm">Chỉnh Sửa</button>
                <button onclick="deleteItem('${item.id}')" class="btn btn-danger btn-sm">Xóa</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

// Event listener for input changes to trigger search automatically
document.getElementById('searchInput').addEventListener('input', searchData);

// Initial fetch when the page loads
fetchData();
