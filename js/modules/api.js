//* API.JS SCRIPT
function getRandomAdviceSlip(max) {
  return Math.ceil(Math.random() * max);
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchAdvice() {
  const response = await fetch(
    `https://api.adviceslip.com/advice/${getRandomAdviceSlip(224)}`
  );
  const data = await response.json();
  await delay(500);
  return data.slip.advice;
}
