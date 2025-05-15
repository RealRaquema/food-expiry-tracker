import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

const BarcodeScanner = ({ onDetected, onClose }) => {
  const [error, setError] = useState("");
  const scannerRef = useRef(null);
  const isRunningRef = useRef(false);

  useEffect(() => {
    const scanner = new Html5Qrcode("reader");
    scannerRef.current = scanner;

    scanner
      .start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          scanner
            .stop()
            .then(() => {
              isRunningRef.current = false;
              document.getElementById("reader").innerHTML = "";
              onDetected(decodedText);
            })
            .catch((err) => console.error("Stop error:", err));
        },
        (err) => {
          console.warn("Scanning error", err);
        }
      )
      .then(() => {
        isRunningRef.current = true;
      })
      .catch((err) => {
        console.error("Failed to start scanner", err);
        setError("Failed to start the scanner. Please check camera permissions.");
      });

    return () => {
      if (isRunningRef.current && scannerRef.current) {
        scannerRef.current
          .stop()
          .then(() => {
            isRunningRef.current = false;
            document.getElementById("reader").innerHTML = "";
          })
          .catch((err) => console.warn("Cleanup stop error:", err));
      }
    };
  }, [onDetected]);

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Scanning...</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div
        id="reader"
        style={{
          width: "100%",
          maxWidth: "400px",
          height: "300px",
          margin: "0 auto",
          border: "2px dashed #ccc",
        }}
      />
      <button onClick={onClose} style={{ marginTop: "10px" }}>
        Cancel
      </button>
    </div>
  );
};

export default BarcodeScanner;
