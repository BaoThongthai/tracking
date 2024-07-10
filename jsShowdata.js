
async function fetchData() {
    const response = await fetch('https://6605116c2ca9478ea17f2d5d.mockapi.io/tenduongdanang/tracking');
    const data = await response.json();

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

// Initial fetch when the page loads
fetchData();

// Function to delete an item
async function deleteItem(id) {
    if (confirm('Bạn có chắc chắn muốn xóa mục này?')) {
        try {
            const response = await fetch(`https://6605116c2ca9478ea17f2d5d.mockapi.io/tenduongdanang/tracking/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                alert('Xóa thành công!');
                fetchData(); // Refresh the table after deletion
                const response = await fetch('https://6605116c2ca9478ea17f2d5d.mockapi.io/tenduongdanang/tracking');
                const data = await response.json();
            
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
            } else {
                throw new Error('Xóa không thành công');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Đã có lỗi xảy ra khi xóa dữ liệu.');
        }
    }
}

// Function to edit an item
async function editItem(id) {
    // Fetch item details by id
    const response = await fetch(`https://6605116c2ca9478ea17f2d5d.mockapi.io/tenduongdanang/tracking/${id}`);
    const data = await response.json();

    // Fill the edit form with current item data
    document.getElementById('editItemId').value = id;
    document.getElementById('editTenCuahang').value = data.Tencuahang;
    document.getElementById('editLinkCMND').value = data.LinkCMND;
    document.getElementById('editLinkHopDong').value = data.LinkHopDong;
    if (data.trangthai === 1) {
        document.getElementById('editTrangThaiActive').checked = true;
    } else {
        document.getElementById('editTrangThaiInactive').checked = true;
    }

    // Show the edit form modal
    $('#editModal').modal('show');
}

// Function to handle edit form submission
document.getElementById('editTrackingForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const id = document.getElementById('editItemId').value;
    const formData = {
        Tencuahang: document.getElementById('editTenCuahang').value,
        LinkCMND: document.getElementById('editLinkCMND').value,
        LinkHopDong: document.getElementById('editLinkHopDong').value,
        trangthai: parseInt(document.querySelector('input[name="editTrangThai"]:checked').value)
    };

    try {
        const response = await fetch(`https://6605116c2ca9478ea17f2d5d.mockapi.io/tenduongdanang/tracking/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (response.ok) {
            alert('Cập nhật thành công!');
            fetchData(); // Refresh the table after update
            $('#editModal').modal('hide'); // Hide edit form modal after successful update
            const response = await fetch('https://6605116c2ca9478ea17f2d5d.mockapi.io/tenduongdanang/tracking');
            const data = await response.json();
        
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
            
        } else {
            throw new Error('Cập nhật không thành công');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Đã có lỗi xảy ra khi cập nhật dữ liệu.');
    }
});
