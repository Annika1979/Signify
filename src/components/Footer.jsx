import React from "react";

function Footer() {
  return (
    <footer className="footer mt-auto">
      <div
        style={{
          backgroundColor: "rgba(102, 10, 59, 1)",
          color: "white",
          position: "absolute",
          bottom: "0",
          height: "100px",
          width: "100%",
        }}
      >
        <p className="text-center" style={{ paddingTop: "30px" }}>
          Copyright&copy;{new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
