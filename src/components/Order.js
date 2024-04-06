import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Order() {
  const [orderData, setOrderData] = useState({
    productName: '',
    quantity: 1,
    totalPrice: 0,
    userId: '', // Kullanıcı giriş yaptığında burası doldurulacak
    name: '',
    surname: '',
    city: '',
    address: '',
    phoneNumber: '',
    cardNumber: '',
    cvv: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevOrderData) => ({
      ...prevOrderData,
      [name]: name === 'quantity' ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sipariş oluşturma API isteği
    try {
      const response = await axios.post(`http://localhost:8080/orderItems/createOrder?userId=${orderData.userId}`, orderData);

      if (response.status === 200) {
        console.log('Sipariş Başarıyla Oluşturuldu:', response.data);
        // İsteğin başarılı olması durumunda gerekli işlemleri yapabilirsiniz.
      } else {
        console.error('Sipariş Oluşturma Başarısız:', response.statusText);
      }
    } catch (error) {
      console.error('Sipariş Oluşturma Hatası:', error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Sipariş Formu</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">
            Ürün Adı
          </label>
          <input
            type="text"
            className="form-control"
            id="productName"
            name="productName"
            value={orderData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">
            Miktar
          </label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            name="quantity"
            value={orderData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="totalPrice" className="form-label">
            Toplam Fiyat
          </label>
          <input
            type="number"
            className="form-control"
            id="totalPrice"
            name="totalPrice"
            value={orderData.totalPrice}
            onChange={handleInputChange}
            readOnly
          />
        </div>
        {/* Diğer sipariş bilgileri inputları buraya eklenebilir */}
        <button type="submit" className="btn btn-primary">
          Siparişi Tamamla
        </button>
      </form>
    </div>
  );
}

export default Order;
