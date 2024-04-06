import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validasyonu
    if (formData.username && formData.email && formData.password) {
      setValid(true);
    }

    setSubmitted(true);

    try {
      const response = await axios.post('http://localhost:8080/user/register', formData);
      console.log('Kayıt İşlemi Başarılı:', response.data);
    } catch (error) {
      console.error('Kayıt İşlemi Başarısız Oldu', error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 mt-5">
          <h2 className="text-center">Kayıt Ol</h2>
          <form onSubmit={handleSubmit}>
            {submitted && valid && (
              <div className="success-message">
                <h3>Hoş Geldiniz Sayın {formData.username}!</h3>
                <div>Kayıt Olma İşleminiz Başarılı Artık Giriş yapabilirsiniz İyi Alışverişler</div>
              </div>
            )}

            {!valid && (
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Kullanıcı Adı
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Kullanıcı Adı Giriniz"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
                {submitted && !formData.username && (
                  <span id="username-error">Lütfen bir kullanıcı adı girin</span>
                )}
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
