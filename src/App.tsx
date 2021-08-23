import logo from './images/fc-logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import TwitterImg from './images/twitter_white.svg';
import TwitchSvg from './images/twitch_white.svg';

function App() {
  const interval = useRef<any>(null);
  const [timer, setTimer] = useState<Date>(new Date(0, 0, 0, 0, 15, 5));
  const { register, handleSubmit, watch, getValues } = useForm();
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timerFinished, setTimerFinished] = useState<boolean>(false);

  useEffect(() => {
    const hours = watch(({ hours, minutes, seconds }) => {
      setTimer(new Date(0, 0, 0, hours, minutes, seconds));
    });
    return () => hours.unsubscribe();
  }, [watch]);

  const onSubmit = ({
    hours,
    minutes,
    seconds,
  }: {
    hours: number;
    minutes: number;
    seconds: number;
  }) => {
    setTimer(new Date(0, 0, 0, hours, minutes, seconds));
  };

  const startOrStopTimer = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isTimerRunning) {
      setIsTimerRunning(false);
      clearInterval(interval.current);
      return;
    }
    setIsTimerRunning(true);
    interval.current = setInterval(() => {
      setTimer((cTimer) => {
        let newSecond = cTimer.getSeconds();
        newSecond--;
        if (newSecond === 0) {
          setTimerFinished(true);
          clearInterval(interval.current);
          return new Date(0, 0, 0, 0, 0, 0);
        }
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

  const resetTimer = () => {
    setTimer(
      new Date(
        0,
        0,
        0,
        getValues('hours'),
        getValues('minutes'),
        getValues('seconds')
      )
    );
  };

  return (
    <div className='main-container'>
      <div className='header'>
        <img className='logo' src={logo} alt='Logo de Francisco Cobas' />
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type='number'
            {...register('hours', { max: 2 })}
            disabled={isTimerRunning}
          />
          <span>:</span>
          <input
            type='number'
            {...register('minutes', { max: 2 })}
            disabled={isTimerRunning}
          />
          <span>:</span>
          <input
            type='number'
            {...register('seconds', { max: 2 })}
            disabled={isTimerRunning}
          />
          <button onClick={startOrStopTimer}>
            {isTimerRunning ? 'Stop' : 'Start'}
          </button>
          <button onClick={resetTimer}>Reset</button>
        </form>
      </div>
      <div className='timer-and-social-networks-container'>
        <div className='timer-container'>
          <p>Faltan</p>
          <p className={`${timerFinished ? 'finished' : ''} clock`}>
            {timer.getHours() < 10 ? `0${timer.getHours()}` : timer.getHours()}:
            {timer.getMinutes() < 10
              ? `0${timer.getMinutes()}`
              : timer.getMinutes()}
            :
            {timer.getSeconds() < 10
              ? `0${timer.getSeconds()}`
              : timer.getSeconds()}
          </p>
          <p>para que empecemos</p>
          <p className='italic'>...stay tuned</p>
        </div>
        <div className='social-networks-container'>
          <div>
            <img src={TwitterImg} alt='Icono de Twitter' />
            <a
              href='https://twitter.com/MrRobotUy'
              target='_blank'
              rel='noreferrer'
            >
              @MrRobotUy
            </a>
          </div>
          <div>
            <img src={TwitchSvg} alt='Icono de Twitch' />
            <a
              href='https://www.twitch.tv/franciscodev_uy'
              target='_blank'
              rel='noreferrer'
            >
              @franciscoDEV_uy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
