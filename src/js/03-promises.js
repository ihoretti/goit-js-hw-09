//Напиши скрипт, который при сабмите формы вызывает функцию
//createPromise(position, delay) столько раз, сколько ввели в поле amount.
//При каждом вызове передай ей номер создаваемого промиса(position)
//и задержку учитывая введенную пользователем первую задержку(delay) и шаг(step).

//Дополни код функции createPromise так, чтобы она возвращала один промис,
//который выполянется или отклоняется через delay времени.
//Значением промиса должен быть объект, в котором будут свойства position и
//delay со значениями одноименных параметров.
//Используй начальный код функции для выбора того, что нужно сделать с промисом - выполнить или отклонить.

//Для отображения уведомлений пользователю вместо console.log() используй библиотеку notiflix.

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function handleSubmit(e) {
  e.preventDefault();
  const {
    elements: { delay, step, amount },
  } = e.currentTarget;

  //троки конвертируем в числа
  let firstDelay = Number(delay.value);
  let delayStep = Number(step.value);
  let amountValue = Number(amount.value);

  for (let i = 1; i <= amountValue; i += 1) {
    createPromise(i, firstDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    firstDelay += delayStep;
  }
}
