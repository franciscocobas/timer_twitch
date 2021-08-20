import logo from './images/fc-logo.svg';
import './App.css';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

function App() {
  const interval = useRef<any>(null);
  const [timer, setTimer] = useState<Date>(new Date(0, 0, 0, 0, 15, 5));
  const { register, handleSubmit, watch } = useForm();

  const onSubmit = ({
    hours,
    minutes,
    seconds,
  }: {
    hours: number;
    minutes: number;
    seconds: number;
  }) => {
    console.log(hours, minutes, seconds);
    setTimer(new Date(0, 0, 0, hours, minutes, seconds));
  };

  const startTimer = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    interval.current = setInterval(() => {
      setTimer((cTimer) => {
        let newSecond = cTimer.getSeconds();
        newSecond--;
        return new Date(
          cTimer.getFullYear(),
          cTimer.getMonth(),
          cTimer.getDate(),
          cTimer.getHours(),
          cTimer.getMinutes(),
          newSecond
        );
      });
    }, 1000);
  };

  return (
    <div className='main-container'>
      <div className='header'>
        <img className='logo' src={logo} alt='Logo de Francisco Cobas' />
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type='number' {...register('hours')} />
          <span>:</span>
          <input type='number' {...register('minutes')} />
          <span>:</span>
          <input type='number' {...register('seconds')} />
          <input type='submit' value='Set Timer' />
          <button onClick={startTimer}>Start</button>
          <button>Reset</button>
        </form>
      </div>
      <div className='timer-and-social-networks-container'>
        <div className='timer-container'>
          <p>Faltan</p>
          <p className='clock'>
            {timer.getHours()}:{timer.getMinutes()}:{timer.getSeconds()}
          </p>
          <p>para que empecemos</p>
          <p className='italic'>...stay tuned</p>
        </div>
        <div className='social-networks-container'>
          <div>
            <img />
            <a>@MrRobotUy</a>
          </div>
          <div>
            <img />
            <a>@franciscoDEV_uy</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
