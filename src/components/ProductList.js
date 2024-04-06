import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/product/all');
        setProducts(response.data);
      } catch (error) {
        console.error('Ürünleri Çekerken Hata Oluştu:', error);
      }
    };

    fetchProducts();
  }, []); 
  const addCartProduct = async (productId, productName) => {
    try {
      const token = localStorage.getItem('userToken');
      const userId = localStorage.getItem('userId');
      if (!token) {
        console.error('Kullanıcı giriş yapmamış.');
        return;
      }
  
      let response;
  
      response = await axios.post(
        `http://localhost:8080/cartItems/addToCart/${productId}/${userId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      // Bildirim eklemek için toast kullanımı
      toast.success("Ürün Sepete Eklendi", {
        position: "top-right",
        autoClose: 3000,
      });
      
    } catch (error) {
      console.error('Sepete Ekleme Hatası:', error);
    }
  };
 // toggleFavorites fonksiyonu içinde güncellenen kısım
const toggleFavorites = async (productId) => {
  try {
    const token = localStorage.getItem('userToken');
    const userId = localStorage.getItem('userId');

    if (!token) {
      console.error('Kullanıcı giriş yapmamış.');
      return;
    }

    let response;

    if (isFavorited) {
      response = await axios.delete(
        `http://localhost:8080/favorites/remove/${productId}/${userId}`,
        null,
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          } 
        }
      );
      console.log('Favoriden Çıkartma Başarılı:', response.data);
    } else {
      response = await axios.post(
        `http://localhost:8080/favorites/add/${productId}/${userId}`,
        null,
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          } 
        }
      );
      toast.success("Ürün Favoriye Eklendi", {
        position: "top-right",
        autoClose: 3000,
      });

      console.log('Favoriye Ekleme Başarılı:', response.data);
    }

    // Favoriye eklendi veya çıkartıldıktan sonra durumu güncelle
    setIsFavorited(!isFavorited);

    // İşlem başarılıysa ve ürün zaten favorilerdeyse kullanıcıya bilgi ver.
    if (response.data === 'Ürün zaten favorilerde.' && isFavorited) {
      alert('Ürün zaten favorilerde. Favorilerden çıkartmak için butonu kullanabilirsiniz.');
    }
  } catch (error) {
    console.error('Favoriye Ekleme/Çıkartma Hatası:', error);
  }
};

  
  
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Ürün Listesi</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={product.image} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">Fiyat: ₺{product.price}</p>
                <button
                  className="btn btn-warning"
                  onClick={() => toggleFavorites(product.id)}
                >
                  <i className="bi bi-star"></i> {isFavorited ? 'Favoriden Çıkart' : 'Favoriye Ekle'}
                </button>
                <button
                  className="btn btn-success ml-2"
                  onClick={() => addCartProduct(product.id, product.name)}
                  >
                  <i className="bi bi-cart-fill"></i> Sepete Ekle
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductList;