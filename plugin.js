let $ = function(el){
    let element = document.querySelector(el)
    return element
}

let $a = function(el){
    let element = document.querySelector(el)
    return element
}

let createEl = function(el,className,text){
    let element = document.createElement(el)
    if(className){
        // el.setAttribute('class', className)
    }
    if(text){
        el.innerHTML = text
    }
    return element
}
