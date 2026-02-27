import React from 'react';
// import './PhoneFrame.css';  // optional – remove if you don't have a separate CSS file

const PhoneFrame = ({ statusBarText, children }) => {
  return (
    <div className="phone">
      <div className="phone-bar">
        <span className="ptime">9:41</span>
        <span className="pstatus">{statusBarText}</span>
      </div>
      <div className="phone-inner">
        <div className="phone-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PhoneFrame;