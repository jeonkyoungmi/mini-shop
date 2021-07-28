/** img-item json 파일읽기  */
function loadItems() {
    return fetch('data/data.json')
      .then(response => response.json())
      .then(json => json.items);
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

// main
loadItems()
  .then(items => {
    itemList(items);
  })
  .catch(console.log);

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