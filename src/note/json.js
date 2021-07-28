// JSON

// JSON 유용한사이트
// JSON diff checker: http://www.jsondiff.com
// JSON Beautifier/editor: https://jsonbeautifier.org
// JSON Parser: https://jsonparser.org
// JSON Validator: https://tools.learningcontainer.com

// 1. Object to Json
// Stringfy(obj)

let json = JSON.stringify(true);
console.log(json); //true

json = JSON.stringify(['apple','banana']);
console.log(json); //["apple","banana"]  배열타입처럼 보이지만 "" json 규격사항

const rabbit = {
    name: 'tori',
    color: 'white',
    size: null,
    birthDate: new Date(),
    symbol:Symbol('id'),
    jump:() => {
        console.log(`${name} can jump!`);
    },
};

json = JSON.stringify(rabbit);
console.log(json); 
//{"name":"tori","color":"white","size":null,"birthDate":"2021-07-28T00:35:14.376Z"}
// jump라는 함수는 json에 포함x 함수는 object에 있는 데이터가 아니여서 
// symbol 또한 javascript에 있는 데이터도 json에 포함되지x

json = JSON.stringify(rabbit,['name','color','size']);
//{"name":"tori","color":"white","size":null}

json = JSON.stringify(rabbit,(key, value) => {
    console.log(`key:${key}, value:${value}`);
    return value;
});
// key:, value:[object Object]
// VM46:11 key:name, value:tori
// VM46:11 key:color, value:white
// VM46:11 key:size, value:null
// VM46:11 key:birthDate, value:2021-07-28T00:45:25.903Z
// VM46:11 key:jump, value:() => {
//         console.log(`${name} can jump!`);
//     }
// {"name":"tori","color":"white","size":null,"birthDate":"2021-07-28T00:35:14.376Z"}

json = JSON.stringify(rabbit,(key, value) => {
    console.log(`key:${key}, value:${value}`);
    return key==='name'?'della':value;
});
//세밀하게 통제하고 싶을때 콜백함수를 써서 통제!
// key:, value:[object Object]
// VM46:11 key:name, value:tori
// VM46:11 key:color, value:white
// VM46:11 key:size, value:null
// VM46:11 key:birthDate, value:2021-07-28T00:45:25.903Z
// VM46:11 key:jump, value:() => {
//         console.log(`${name} can jump!`);
//     }
// {"name":"della","color":"white","size":null,"birthDate":"2021-07-28T00:35:14.376Z"}

// 2.JSON to Object
// parse(json)

console.clear();
json = JSON.stringify(rabbit);
const obj = JSON.parse(json);
console.log(obj);
//{name: "tori", color: "white", size: null, birthDate: "2021-07-28T00:45:25.903Z"}
rabbit.jump(); // can jump!
obj.jump();  
// VM67:1 Uncaught TypeError: obj.jump is not a function
// at <anonymous>:1:5
// json을 object로 만든건 jump가 없다. json으로 변환할때 함수가 제외 됐기 때문에
console.log(rabbit.birthDate.getDate()); //28
console.log(obj.birthDate.getDate()) //obj.birthDate.getDate is not a function
// string이 obj 할당 세밀하게 조정하고 싶을때 콜백함수로

const obj1 = JSON.parse(json,(key, value) => {
    console.log(`key:${key}, value:${value}`);
    return key==='birthDate'? new Date(value) : value;
});
// key:name, value:tori
// VM193:2 key:color, value:white
// VM193:2 key:size, value:null
// VM193:2 key:birthDate, value:2021-07-28T00:45:25.903Z
// VM193:2 key:, value:[object Object]
