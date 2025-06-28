
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';

// Mock student data
const mockStudents = [
  {
    id: 1,
    name: 'أحمد محمد علي',
    phone: '01234567890',
    password: '123456'
  },
  {
    id: 2,
    name: 'فاطمة أحمد حسن',
    phone: '01098765432',
    password: '123456'
  },
  {
    id: 3,
    name: 'محمد عبدالله سالم',
    phone: '01155667788',
    password: '123456'
  }
];

const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (!phone.trim() || !password.trim()) {
      setError('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    if (phone.length !== 11) {
      setError('رقم الهاتف يجب أن يكون 11 رقم');
      return;
    }

    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      // Check credentials against mock data
      const student = mockStudents.find(
        s => s.phone === phone && s.password === password
      );

      if (student) {
        login(student);
        navigate('/dashboard');
      } else {
        setError('رقم الهاتف أو كلمة المرور غير صحيحة');
      }
      
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="page-container">
      <div className="login-card">
        <h1 className="login-title">مركز الطلاب</h1>
        <p className="login-subtitle">تسجيل دخول الطالب</p>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              رقم الهاتف
            </label>
            <input
              type="tel"
              id="phone"
              className="form-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="01234567890"
              maxLength={11}
              dir="ltr"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              كلمة المرور
            </label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="أدخل كلمة المرور"
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
          </button>
        </form>

        <div style={{ marginTop: '30px', fontSize: '14px', color: '#666' }}>
          <p><strong>بيانات تجريبية للاختبار:</strong></p>
          <p>رقم الهاتف: 01234567890</p>
          <p>كلمة المرور: 123456</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
