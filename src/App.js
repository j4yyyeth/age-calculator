import { useState } from 'react';

const App = () => {
  const [ year, setYear ] = useState('--');
  const [ month, setMonth ] = useState('--');
  const [ day, setDay ] = useState('--');

  const [ inputYear, setInputYear ] = useState('');
  const [ inputMonth, setInputMonth ] = useState('');
  const [ inputDay, setInputDay ] = useState('');

  const calculateAge = (birthDay, birthMonth, birthYear) => {
    const today = new Date();
    const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
  
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    let monthDiff = m;
    if (monthDiff < 0) {
      monthDiff += 12;
    }
    if (today.getDate() < birthDate.getDate()) {
      monthDiff--;
    }
  
    let dayDiff = today.getDate() - birthDate.getDate();
    if (dayDiff < 0) {
      const daysInMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      dayDiff += daysInMonth;
    }
  
    return {
      year: age,
      month: monthDiff,
      day: dayDiff
    };
  };  

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let birthDay = parseInt(inputDay);
    let birthMonth = parseInt(inputMonth);
    let birthYear = parseInt(inputYear);
    
    const currentYear = new Date().getFullYear();
    
    if (birthYear > currentYear) {
      alert('Year cannot be in the future');
      return;
    }
    
    if (birthMonth < 1 || birthMonth > 12) {
      alert('Month must be between 1 and 12');
      return;
    }
    
    const maxDayInMonth = new Date(birthYear, birthMonth, 0).getDate();
    
    if (birthDay < 1 || birthDay > maxDayInMonth) {
      alert(`Day must be between 1 and ${maxDayInMonth} for the chosen month/year`);
      return;
    }
    
    const { year, month, day } = calculateAge(birthDay, birthMonth, birthYear);
  
    setYear(year);
    setMonth(month);
    setDay(day);
  }  

  return (
    <>
      <div id='app'>
        <form>
          <div className='inputs'>
            <div>
              <label>DAY</label>
              <input type='number' value={inputDay} onChange={(e) => setInputDay(e.target.value)}></input>
            </div>
            <div>
              <label>MONTH</label>
              <input type='number' value={inputMonth} onChange={(e) => setInputMonth(e.target.value)}></input>
            </div>
            <div>
              <label>YEAR</label>
              <input type='number' value={inputYear} onChange={(e) => setInputYear(e.target.value)}></input>
            </div>
          </div>
          <div className='btn-border'>
            <div id='border'></div>
            <button onClick={handleSubmit}><img src="./arrow.svg" alt="arrow" /></button>
          </div>
        </form>
        <div className='answers'>
          <div className='answer'><span>{year}</span> years</div>
          <div className='answer'><span>{month}</span> months</div>
          <div className='answer'><span>{day}</span> days</div>
        </div>
      </div>
    </>
  );
};

export default App;