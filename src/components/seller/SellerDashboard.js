import React from 'react';

const SellerDashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sol Menü */}
        <div className="col-md-3 bg-dark text-light p-4">
          <h4 className="text-warning mb-4">Satıcı Paneli</h4>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a
                className="nav-link btn btn-warning text-white mb-2"
                href="#urunEkle"
              >
                Ürün Ekle
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link btn btn-warning text-white mb-2"
                href="#urunDuzenle"
              >
                Ürünleri Düzenle
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link btn btn-warning text-white mb-2"
                href="#urunSil"
              >
                Ürün Sil
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link btn btn-warning text-white mb-2"
                href="#siparisGor"
              >
                Siparişleri Gör
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link btn btn-warning text-white mb-2"
                href="#tamamlananSiparis"
              >
                Tamamlanan Siparişler
              </a>
            </li>
          </ul>
        </div>

        {/* Ana İçerik */}
        <div className="col-md-9 p-4 bg-warning">
          <h2 className="text-dark">Hoşgeldiniz</h2>
          {/* Buraya Sayfa İçeriği Gelecek */}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
