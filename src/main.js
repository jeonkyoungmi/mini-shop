/** img-item json 파일읽기  */
function loadItemJson(callback){
    const xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', "/data/data.json", true);
    xobj.onreadystatechange = () =>{
        if(xobj.readyState==4&xobj.status =="200") {
            callback(JSON.parse(xobj.responseText));
        }
    };
    xobj.send(null);
}
/**item list 출력 */
function itemList(items) {
    const item = document.querySelector('.item');    
    let itemHtml ='';
    
    for(let i=0; i<items.length; i++) {
        
        itemHtml  += `<li class="product" data-color="${items[i].color}" data-type="${items[i].type}"><img class="img__type" src="${items[i].image}"> ${items[i].gender}, ${items[i].size}</li>`;
    }
    item.innerHTML = itemHtml;
}

loadItemJson(json => {
    itemList(json.items);    
});

window.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.btns');
    
    btn.addEventListener('click', event => {
    
        const dataValue = event.target.dataset.value;
        const items = document.querySelectorAll('.product');

        if(dataValue == undefined) {
            return;
        }
        
        items.forEach((item)=> {
            if(dataValue === item.dataset.color || dataValue === item.dataset.type  ){
                item.classList.remove('invisible');
            } else {
                item.classList.add('invisible');
            }
        });           
    });

});
