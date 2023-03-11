import React, { useState } from "react";

function FeedbackForm() {
  const [formStatus, setFormStatus] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const phoneNumber = formData.get("phone");
    const name = formData.get("name");
    const message = formData.get("message");
    const formattedPhoneNumber = phoneNumber.replace(/[^0-9]/g, "");
    const data = {
      phone: formattedPhoneNumber,
      name: name,
      message: message,
    };
    fetch("http://example.com/feedback", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          setFormStatus("success");
        } else {
          setFormStatus("error");
        }
      })
      .catch(() => {
        setFormStatus("error");
      });
  };

  return (
    <div>
      {formStatus === "success" && (
        <div>Форма отправлена успешно!</div>
      )}
      {formStatus === "error" && (
        <div>Ошибка отправки формы, попробуйте еще раз.</div>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="phone">Номер телефона:</label>
        <input
          type="tel"
          name="phone"
          id="phone"
          pattern="\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}"
          required
        />
        <label htmlFor="name">Имя:</label>
        <input type="text" name="name" id="name" required />
        <label htmlFor="message">Сообщение:</label>
        <textarea name="message" id="message" required></textarea>
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
}

export default FeedbackForm;
