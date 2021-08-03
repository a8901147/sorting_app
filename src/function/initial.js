import BarStatus from "./barStatus";

// Change this value for the number of bars (value) in the array.
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min) + min);
}

function randomArray(number) {
  const array = [];
  for (let i = 0; i < number; i++) {
    array.push(randomIntFromInterval(1, 701));
  }
  return array;
}

export const initialBarArray = (arrayNumber) => {
  const newArray = randomArray(arrayNumber);
  const barArray = [];
  for (var i = 0; i < newArray.length; i++) {
    barArray.push({
      id: i,
      number: newArray[i],
      status: BarStatus.WAITING,
    });
  }
  return barArray;
};

export const NUMBER_OF_ARRAY_BARS = 50;

export function delayValue(value) {
  return value > 40 ? 1 : 40 - value;
}

export function totalCounter_bubble(value) {
  return ((1 + value) * value) / 2;
}
