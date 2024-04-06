import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SellerLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false 

  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: inputValue,
    }));
  };

  const handeLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/user/signin",
        formData
      );
      const token = response.data.token;
      const userId = response.data.userId;

      localStorage.setItem("userToken", token);
      localStorage.setItem("userId", userId);

      //Daha sonra buraya Seller Ekranına yönlendirme yapacagım UNUTMA !
      navigate("/sellerDashboard");
    } catch (error) {
      console.error("Giriş İşlemi Başarısız Oldu", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handeLogin();
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 mt-5 bg-warning rounded p-4">
          <h2 className="text-center text-light">Satıcı Giriş Ekranı</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-light">
                E-mail
              </label>
              <input
                type="text"
                className="form-control bg-dark text-light"
                id="email"
                placeholder="E-mailinizi girin"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label text-light">
                Şifre
              </label>
              <input
                type="password"
                className="form-control bg-dark text-light"
                id="password"
                placeholder="Şifrenizi girin"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
              />
              <label
                className="form-check-label text-light"
                htmlFor="rememberMe"
              >
                Beni hatırla
              </label>
            </div>

            <button type="submit" className="btn btn-light">
              Giriş Yap
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SellerLogin;