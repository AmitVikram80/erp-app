import React from 'react';
import './UserHome.css'; // CSS file for styling
import heroImage from './heroImage.jpg'; // Add a professional image in your project directory

const UserHome = () => {
  return (
    <div className="user-home">
      <div className="hero-section">
        <div className="text-content">
          <h1 className="hero-title">Welcome to Your All-in-One ERP Solution</h1>
          <p className="hero-subtitle">
            Revolutionize the way you manage your business with our modern and efficient ERP platform. From attendance tracking to resource management, we've got you covered.
          </p>
          <button className="explore-button">Explore Now</button>
        </div>
        <div className="image-content">
          <img src={heroImage} alt="ERP Dashboard" className="hero-image" />
        </div>
      </div>
      <div className="features-section">
        <h2 className="features-title">Our Features</h2>
        <div className="features-grid">
  <div className="feature-box">
    <h5>🧑‍💼 Employee Management</h5>
    <p>Effortlessly manage employee data, roles for a productive workforce.</p>
  </div>
  <div className="feature-box">
    <h5>📆 Attendance Management</h5>
    <p>Seamlessly monitor and manage employee attendance.</p>
  </div>
  <div className="feature-box">
    <h5>📝 Leave Management</h5>
    <p>Simplify leave requests and approvals with an efficient system.</p>
  </div>
  <div className="feature-box">
    <h5>🏥 Medical Management</h5>
    <p>Simplify Medical claims  with an efficient system.</p>
  </div>
  <div className="feature-box">
    <h5>🗂️ Joining/Relieving Management</h5>
    <p>Streamline onboarding and exit processes for smooth employee journey.</p>
</div>

        </div>
      </div>
    </div>
  );
};

export default UserHome;
