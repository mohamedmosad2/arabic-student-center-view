
import React, { useState, useEffect } from 'react';
import { useAuth } from '../App';
import LoadingSpinner from '../components/LoadingSpinner';

// Mock progress data
const generateMockProgressData = (studentId: number) => {
  const weeks = [];
  const startDate = new Date('2024-01-01');
  
  // Monthly payment data - one entry per month
  const monthlyPayments = [
    { month: 'يناير', paid: true },
    { month: 'فبراير', paid: true },
    { month: 'مارس', paid: false },
    { month: 'أبريل', paid: true },
  ];
  
  for (let i = 1; i <= 16; i++) {
    const weekDate = new Date(startDate);
    weekDate.setDate(startDate.getDate() + (i - 1) * 7);
    
    // Get payment status based on month
    const monthIndex = Math.floor((i - 1) / 4); // 4 weeks per month approximately
    const currentMonthPayment = monthlyPayments[monthIndex] || { month: 'غير محدد', paid: false };
    
    weeks.push({
      week: i,
      date: weekDate.toLocaleDateString('ar-EG'),
      attendance: Math.random() > 0.2, // 80% attendance rate
      payment: currentMonthPayment.paid,
      paymentMonth: currentMonthPayment.month,
      sheetGrade: Math.floor(Math.random() * 3) + 8, // Grades between 8-10
      maxGrade: 10
    });
  }
  
  return weeks;
};

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [progressData, setProgressData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Simulate API call to fetch progress data
    const fetchProgressData = async () => {
      try {
        setLoading(true);
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const data = generateMockProgressData(user.id);
        setProgressData(data);
        
      } catch (err) {
        setError('حدث خطأ في تحميل البيانات. يرجى المحاولة مرة أخرى.');
      } finally {
        setLoading(false);
      }
    };

    fetchProgressData();
  }, [user.id]);

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="container">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="container">
          <div className="error-message">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="container">
        {/* Header */}
        <div className="dashboard-header">
          <div className="student-info">
            <div>
              <h1 className="student-name">أهلاً وسهلاً، {user.name}</h1>
              <p className="student-phone">رقم الهاتف: {user.phone}</p>
            </div>
            <button onClick={handleLogout} className="logout-btn">
              تسجيل الخروج
            </button>
          </div>
        </div>

        {/* Progress Table */}
        <div className="table-container">
          <table className="progress-table">
            <thead>
              <tr>
                <th>الأسبوع</th>
                <th>التاريخ</th>
                <th>الحضور</th>
                <th>الدفع (الشهر)</th>
                <th>درجة الورقة</th>
              </tr>
            </thead>
            <tbody>
              {progressData.map((week) => (
                <tr key={week.week}>
                  <td>{week.week}</td>
                  <td>{week.date}</td>
                  <td>
                    <span 
                      className={`status-icon ${
                        week.attendance ? 'status-present' : 'status-absent'
                      }`}
                    >
                      {week.attendance ? '✅' : '❌'}
                    </span>
                  </td>
                  <td>
                    <div style={{ textAlign: 'center' }}>
                      <span 
                        className={`status-icon ${
                          week.payment ? 'status-present' : 'status-absent'
                        }`}
                      >
                        {week.payment ? '✅' : '❌'}
                      </span>
                      <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
                        {week.paymentMonth}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="grade-display">
                      {week.sheetGrade}/{week.maxGrade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Stats */}
        <div className="dashboard-header mt-20">
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ color: '#667eea', marginBottom: '20px' }}>ملخص الأداء</h3>
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px' }}>
              <div>
                <strong>معدل الحضور:</strong>{' '}
                {Math.round((progressData.filter(w => w.attendance).length / progressData.length) * 100)}%
              </div>
              <div>
                <strong>متوسط الدرجات:</strong>{' '}
                {(progressData.reduce((sum, w) => sum + w.sheetGrade, 0) / progressData.length).toFixed(1)}/10
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
