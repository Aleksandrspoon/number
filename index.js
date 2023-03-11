import React, { useState } from "react";
import axios from "axios";

const FeedbackForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [formStatus, setFormStatus] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Валидация телефона
    const phoneRegex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    if (!phoneRegex.test(phone)) {
      setPhoneError(true);
      setLoading(false);
      return;
    }

    // Валидация имени и сообщения
    if (name === "") {
      setNameError(true);
      setLoading(false);
      return;
    }
    if (message === "") {
      setMessageError(true);
      setLoading(false);
      return;
    }

    // Отправка данных на сервер
    const data = {
      name: name,
      phone: phone.replace(/\D/g, ""),
      message: message,
    };
    axios
      .post("/feedback", data)
      .then((res) => {
        setFormStatus("success");
        setLoading(false);
      })
      .catch((err) => {
        setFormStatus("error");
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Имя:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {nameError && <span>Поле заполнено неверно</span>}
      </div>
      <div>
        <label htmlFor="phone">Телефон:</label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          pattern="^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$"
          required
        />
        {phoneError && <span>Поле заполнено неверно</span>}
      </div>
      <div>
        <label htmlFor="message">Сообщение:</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {messageError && <span>Поле заполнено неверно</span>}
      </div>
      <button type="submit" disabled={loading}>
        Отправить
      </button>
      {formStatus === "success" && (
        <div>Форма отправлена успешно!</div>
      )}
      {formStatus
      === "error" && (
        <div>Ошибка отправки формы. Попробуйте позже.</div>
        )}
        </form>
        );
        }
        
        export default ContactForm;
