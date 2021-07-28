//async, await : syntactic sugar

// 1.async 
function fetchUser() {
    //네트워크에서 정보를 받아오는데 10초  받아온정보를 리턴
    return 'della';
}

const user = fetchUser();
console.log(user);
// 이렇게 받아오는 정보가 오래걸리면 아래 데이터가 오랫동안 안뜨고 있을수 있으니 이런 오래걸리는건 비동기식으로 처리 
// promise 안에는 resolve, reject등 무조건 넘겨 줘야함

// promise를 작성하지 않아도 비동기식 처리가 가능함 async라는걸쓰면 promise로 바로 만들수 있다
async function fetchUser() {
  return 'della';
}

// 2.await
// await 키워드는 async있는곳에섬나 사용
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getApple() {
  await delay(2000);
  return '🍎';
}

async function getBanana() {
  await delay(1000);
  return '🍌';
}

// function getBanana() {
//   return delay(3000)
//       .then(()=>'🍌');
// }
//  체이닝을 하는것보다 동기적인 표현을 쓰는게 쉽게 이해 가능


async function pickFruits() {
 //await 병렬처리 이렇게 사용이 되지만 더럽게 사용하지 않고, promise에서 제공하는 api 사용
  const applePromise = getApple();
  const bananaPromise = getBanana();
  const apple = await applePromise;
  const banana = await bananaPromise;
  return `${apple} + ${banana}`;
}
pickFruits().then(console.log);
// async, await 에러는 try catch로 처리가능

// 3. useful promise APIs 
function pickAllFruits() {
  return Promise.all([getApple(), getBanana()])
    .then(fruits => fruits.join('+ '));
}
pickFruits().then(console.log);

//promise에 api race : 가장 빨리 작동한거 1개만 출력
function pickOnlyOne() {
  return Promise.race([getApple(), getBanana()]);
}

pickOnlyOne().then(console.log);