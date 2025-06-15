import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Calendar = ({ onSelectDate, selectedDate, minDate, maxDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };
  
  const handlePrevMonth = () => {
    setCurrentMonth(prev => {
      const prevMonth = new Date(prev);
      prevMonth.setMonth(prevMonth.getMonth() - 1);
      return prevMonth;
    });
  };
  
  const handleNextMonth = () => {
    setCurrentMonth(prev => {
      const nextMonth = new Date(prev);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      return nextMonth;
    });
  };
  
  const handleDateClick = (day) => {
    const newDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    onSelectDate(newDate);
  };
  
  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-date empty"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isSelected = selectedDate && 
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear();
      
      const isDisabled = 
        (minDate && date < minDate) || 
        (maxDate && date > maxDate);
      
      days.push(
        <div 
          key={`day-${day}`} 
          className={`calendar-date ${isSelected ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`}
          onClick={() => !isDisabled && handleDateClick(day)}
        >
          {day}
        </div>
      );
    }
    
    return days;
  };
  
  return (
    <div className="calendar-container">
      <div className="calendar-header-nav">
        <button className="calendar-nav-btn" onClick={handlePrevMonth}>
          <ChevronLeft size={16} />
        </button>
        <div className="calendar-month">
          {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </div>
        <button className="calendar-nav-btn" onClick={handleNextMonth}>
          <ChevronRight size={16} />
        </button>
      </div>
      
      <div className="calendar-header">
        {daysOfWeek.map(day => (
          <div key={day} className="calendar-day">{day}</div>
        ))}
      </div>
      
      <div className="calendar">
        {renderCalendar()}
      </div>
      
      <style jsx>{`
        .calendar-container {
          width: 100%;
        }
        
        .calendar-header-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        
        .calendar-month {
          font-weight: 500;
        }
        
        .calendar-nav-btn {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          transition: background-color 0.2s;
        }
        
        .calendar-nav-btn:hover {
          background-color: var(--primary-light);
        }
        
        .calendar-header {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 8px;
          margin-bottom: 8px;
        }
        
        .calendar-day {
          text-align: center;
          font-size: 12px;
          font-weight: 500;
          color: var(--text-secondary);
        }
        
        .calendar {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 8px;
        }
        
        .calendar-date {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 36px;
          border-radius: 50%;
          font-size: 14px;
          cursor: pointer;
        }
        
        .calendar-date:hover {
          background-color: var(--primary-light);
        }
        
        .calendar-date.active {
          background-color: var(--primary);
          color: white;
        }
        
        .calendar-date.disabled {
          color: #ccc;
          cursor: not-allowed;
        }
        
        .calendar-date.empty {
          cursor: default;
        }
      `}</style>
    </div>
  );
};

export default Calendar;