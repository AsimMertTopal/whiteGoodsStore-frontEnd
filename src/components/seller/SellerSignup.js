import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export default function SellerSignup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    taxNumber: '', 
    username: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Vergi numarası için özel bir işlem ekleyebilirsiniz
    const taxNumber = name === "taxNumber" ? parseInt(value, 10) : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: taxNumber,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.email &&
      formData.password &&
      formData.username &&
      formData.taxNumber
    )
      setValid(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/user/sellerRegister",
        formData
      );
      console.log("Kayıt İşlemi Başarılı", response.data);
      setSubmitted(true);
    } catch (error) {
      console.error("Kayıt İşleminde Bir Sorun Oluştu", error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 mt-5">
          <h2 className="text-center">Satıcı Kayıt Olma Ekranı</h2>
          <form onSubmit={handleSubmit}>
            {submitted && valid && (
              <div className="success-message">
                <h3>Hoş Geldiniz Değerli Şirketimiz {formData.username}!</h3>
                <div>
                  Kayıt Olma İşleminiz Başarılı. Artık Giriş yapabilirsiniz ve
                  Satış Yapmaya Başlayabilirsiniz. Bol Satışlar Dileriz
                </div>
              </div>
            )}

            {!valid && (
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  E-mail
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Mail Adresinizi Giriniz"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {submitted && !formData.email && (
                  <span id="email-error">Lütfen bir e-mail adresi girin</span>
                )}
              </div>
            )}

            {!valid && (
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Şifre
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Şifrenizi Giriniz"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                {submitted && !formData.password && (
                  <span id="password-error">Lütfen bir şifre girin</span>
                )}
              </div>
            )}

            {!valid && (
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Şirket Adı
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Şirket Adınızı Giriniz"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
                {submitted && !formData.username && (
                  <span id="username-error">
                    Lütfen şirket adınızı girin
                  </span>
                )}
              </div>
            )}

            {!valid && (
              <div className="mb-3">
                <label htmlFor="taxNumber" className="form-label">
                  Vergi Numarası
                </label>
                <input
                  type="number"  // Input tipi "number" olarak ayarlandı
                  className="form-control"
                  id="taxNumber"
                  placeholder="Vergi Numaranızı Giriniz"
                  name="taxNumber"
                  value={formData.taxNumber}
                  onChange={handleInputChange}
                />
                {submitted && !formData.taxNumber && (
                  <span id="taxNumber-error">
                    Lütfen vergi numaranızı girin
                  </span>
                )}
              </div>
            )}

            {!valid && (
              <button type="submit" className="btn btn-primary">
                Kayıt Ol
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
