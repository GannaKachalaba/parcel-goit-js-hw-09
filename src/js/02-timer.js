import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';


const refs = {
  input: document.querySelector('#datetime-picker'),
  start: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  mins: document.querySelector('[data-minutes]'),
  secs: document.querySelector('[data-seconds]'),
};

let intervalId = null;
refs.start.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] < new Date()) {
      refs.start.disabled = true;
      window.alert('Please choose a date in the future! Do not look back..');
      return;
    }
    else {
      (selectedDates[0] > new Date()) 
      refs.start.disabled = false;
      };
  
    refs.start.addEventListener('click', () => {
      refs.start.toggleAttribute('disabled');
      console.log(refs.start);
      intervalId = setInterval(() => {
        const differenceInTime = selectedDates[0] - new Date();
        

        if (differenceInTime < 1000) {
          clearInterval(intervalId);
        }
        const result = convertMs(differenceInTime);
        countTimer(result);
      }, 1000);
    });
  },
};

flatpickr('#datetime-picker', options);

function countTimer({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.mins.textContent = `${minutes}`;
  refs.secs.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
