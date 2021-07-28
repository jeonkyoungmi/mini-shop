/**
 * JavaScript is synchronous(동기적) 자바스크립트는: 동기적 :호이스팅이 된 이후로 순서대로 
 * hoisting: var, function declaration : 자동적으로 선언이 제일 위로 올라가는것
 * Asynchronous(비동기식): 언제코드가 실행될지 예측할수 없는것 setTimeout();
*/

console.log('1');
setTimeout(() =>console.log('2'),1000);  //1000 -> 1초  : callback 함수
console.log('3');
// 1
// 3
// 2

//콜백 => 무조건 비동기식은 아니다 두가지 존재 비동기식 콜백 동기식 콜백
//Synchronus callback
function printImmediately(print) {
    print();
}
printImmediately(()=>console.log('hello'));

//Asynchronous callback

function printWithDelay(print, timeout) {
    setTimeout(print, timeout);
}
printWithDelay(()=> console.log('async callback'),2000);

// Callback Hell example
class UserStorage {
    loginUser(id, password, onSuccess, onError) {
        setTimeout(()=> {
            if (
                (id ==='della' && password === "dream") || 
                (id ==='coder' && password === "academy") 
            ) {
                onSuccess(id);
            } else {
                onError(new Error('not found'));
            }
        },2000);
    }
    getRoles(user, onSuccess, onError) {
        setTimeout(()=> {
            if (user ==='della') {
                onSuccess({name:'della', role:'admin'});
            } else {
                onError(new Error('no access'));
            }
        },1000);
    }
}
// 1) id, paass 
// 2) login
// 3) role

const userStorage = new UserStorage();
const id = prompt('enter your id');
const pwd = prompt('enter your password');
userStorage.loginUser(
    id,
    password,
    user => {
        userStorage.getRoles(
            user,
            userWithRole => {
                alert(`Hello ${user.name}, you have a ${userWithRole.role} role`);
            },
            error => {
                console.log(error);
            }
        );
    },
    error => {
        console.log(error);
    }
)

// 콜백지옥: 가독성 안좋고, 에러 발생 디버그시 힘들다. 유지보수 어려움
