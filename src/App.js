import { useState, useEffect } from 'react';

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
    const { year, month, day } = calculateAge(
      parseInt(inputDay), 
      parseInt(inputMonth), 
      parseInt(inputYear)
    );

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