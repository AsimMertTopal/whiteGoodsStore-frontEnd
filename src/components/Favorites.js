import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedToken = localStorage.getItem('userToken');

    if (!storedUserId || !storedToken) {
      console.error('Kullanıcı giriş yapmamış.');
      return;
    }

    setUserId(storedUserId);
    setUserToken(storedToken);

    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/favorites/getAllFavorites/${storedUserId}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        });
        setFavorites(response.data);
      } catch (error) {
        console.error('Favori Ürünleri Getirirken Hata Oluştu:', error);
      }
    };

    fetchFavorites();
  }, []);

  const removeFromFavorites = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:8080/favorites/remove/${productId}/${userId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      });

      console.log('Favoriden Çıkartma Başarılı:', response.data);

      // Favoriden çıkartılan ürün ile birlikte listeyi güncelliyorum
      setFavorites((prevFavorites) => prevFavorites.filter((favorite) => favorite.id !== productId));
    } catch (error) {
      console.error('Favoriden Çıkartma Hatası:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Favori Ürünler</h2>
      <div className="row">
        {favorites.map((favorite) => (
          <div key={favorite.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={favorite.image} className="card-img-top" alt={favorite.name} />
              <div className="card-body">
                <h5 className="card-title">{favorite.name}</h5>
                <p className="card-text">{favorite.description}</p>
                <p className="card-text">Fiyat: ₺{favorite.price}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => removeFromFavorites(favorite.id)}
                >
                  Favorilerden Çıkart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
