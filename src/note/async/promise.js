/**  Promise: 비동기를 간편하게 도와주는 object 성공할경우 성공메세지 실패할경우 실패메세지
오픈전 강의: 1)영희 오픈전 이메일 -> 오픈시 공지 받기 2)철수 오픈후 뒤늦게 등록 -> 기다릴필요없이 메일 공지 수업참여
    promise is a javascript object for asynchronous operation : javascript에 내장- 비동기식 처리 유용
    # promise 공부법
    1)state : pending(만드는중) -> fulfilled(완료) or rejected(거절 오류시)
    2)producer vs consumer 
*/

//1. producer   :promise를 만드는 순간 executor 함수가 자동으로 실행!
const promise = new Promise((resolve, reject) => {
    //doing some heaby work(network, read files : 비동기식 처리가 좋음);
    console.log('doing something...');
    setTimeout(()=> {
        resolve('della'); //della라는 값을 전달하는 : promise 생성
        // reject(new Error('no network'));
    },2000);
});

//2. Consumers: then, catch, finally
promise
    .then(value => {
        console.log(value);
    })
    .catch(error => {
        console.log(error);
    })
    .finally(() => {console.log('finally')}); // 성공 이든 실패든 finally는 실행

//3. Promise chaning
const fetchNumber = new Promise ((resolve, reject) => {
    setTimeout(() => resolve(1), 1000);
});

// then은 값을 바로 전달하거나, 또는 비동기인 promise를 전달해도 된다.
fetchNumber
    .then(num => num * 2)
    .then(num => num * 3)
    .then(num => {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(num-1), 1000);
        });
    })
    .then(num => console.log(num));

// 4. Error Handling
const getHen = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('🐓'), 1000);
  });
const getEgg = hen =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${hen} => 🥚`), 1000);
  });
const cook = egg =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${egg} => 🍳`), 1000);
  });

// getHen()
//   .then(hen => getEgg(hen))
//   .then(egg => cook(egg))
//   .then(meal => console.log(meal));
//🐓 => 🥚 => 🍳  
// 콜백함수를 전달할때 값이 같을경우
getHen()
  .then(getEgg)
  .then(cook)
  .then(console.log);

const getHen = () =>
new Promise((resolve, reject) => {
  setTimeout(() => resolve('🐓'), 1000);
});
const getEgg = hen =>
new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error(`error! ${hen} => 🥚`)), 1000);
});
const cook = egg =>
new Promise((resolve, reject) => {
  setTimeout(() => resolve(`${egg} => 🍳`), 1000);
});

getHen()
  .then(getEgg) // egg를 가져오는곳에서 에러가 날경우 catch 대체
  .catch(error => {
      return '🎂';
  })
  .then(cook)
  .then(console.log)
  .catch(console.log);
  //catch 하지 않을경우
  //VM5999:12 Uncaught (in promise) Error: error! 🐓 => 🥚
  //at <anonymous>:12:27
  //🎂 => 🍳