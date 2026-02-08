import "./Login.css"; // reuse same styling

export default function Contact() {
  return (
    <div className="login-wrapper">
      <div className="app-container login-card">
        <h1>Contact Me</h1>

        <p style={{ marginTop: "12px" }}>
          👤 <strong>Ankur Kumar Saxena</strong>
        </p>
        <p className="contact-links">
            📧 Email: {" "}
            <a href="mailto:ankur1311ks@gmail.com">ankur1311ks@gmail.com</a>
        </p>
        <p>💻 Built with React & Node.js</p>

        <p style={{ marginTop: "20px", fontSize: "14px", color: "#6b7280" }}>
          Feel free to reach out for feedback or collaboration 🙂
        </p>
      </div>
    </div>
  );
}
