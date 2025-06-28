
import React from 'react';
import { Link } from 'react-router-dom';

const AssistantLogin = () => {
  return (
    <div className="page-container">
      <div className="login-card">
        <h1 className="login-title">تسجيل دخول المساعد</h1>
        <p className="login-subtitle">هذه الصفحة قيد التطوير</p>
        
        <div style={{ 
          padding: '30px 20px', 
          background: '#f8f9fa', 
          borderRadius: '10px',
          margin: '20px 0',
          textAlign: 'center'
        }}>
          <p style={{ marginBottom: '20px', color: '#666' }}>
            صفحة تسجيل دخول المساعدين والمدرسين ستكون متاحة قريباً
          </p>
          <p style={{ fontSize: '14px', color: '#999' }}>
            سيتمكن المساعدون من إدارة بيانات الطلاب وتعديل السجلات
          </p>
        </div>

        <Link 
          to="/login" 
          className="btn-primary"
          style={{ 
            display: 'inline-block', 
            textDecoration: 'none',
            textAlign: 'center' 
          }}
        >
          العودة إلى تسجيل دخول الطلاب
        </Link>
      </div>
    </div>
  );
};

export default AssistantLogin;
