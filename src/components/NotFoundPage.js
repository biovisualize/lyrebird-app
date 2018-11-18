import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="container">
      <div className="header">
        <div className="title">Testing the Lyrebird API</div>
      </div>
      <div className="content">
        <div className="message">
          <h4>404 Page Not Found</h4>
          <Link to="/"> Please go back to homepage </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
