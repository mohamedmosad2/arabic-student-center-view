
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page
    navigate('/login', { replace: true });
  }, [navigate]);

  return (
    <div className="page-container">
      <div className="login-card">
        <h1 className="login-title">مركز الطلاب</h1>
        <p className="login-subtitle">جاري التحميل...</p>
        <div className="spinner" style={{ margin: '20px auto' }}></div>
      </div>
    </div>
  );
};

export default Index;
