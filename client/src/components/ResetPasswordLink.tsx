import React from 'react';

const ResetPasswordLink: React.FC = () => {
  return (
    <p style={{ width: "100%", textAlign: 'left', fontSize: '12px'}}>
        <a 
          href="https://login.adaptiveinsights.com/app?page=ForgotPassword&service=page"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'teal', textDecoration: 'underline' }}
        >
          Forgot password?
        </a>    
    </p>
  );
};

export default ResetPasswordLink;