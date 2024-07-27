import { renderLibAll } from './render.js';

// Lấy dữ liệu từ wishlist.php
fetch('../php/wishlist.php')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Hiển thị dữ liệu lấy được bằng renderLibAll
    renderLibAll('wishlist', data);
  })
  .catch(error => console.error('Error:', error));
