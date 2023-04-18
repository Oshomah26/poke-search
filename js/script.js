const global = {
    currentPage: window.location.pathname,
}

function init(){
    switch(global.currentPage){
        case'/index.html':
        console.log(global.currentPage);
        break;
        case'/details.html':
        console.log(global.currentPage);
        break;
        case'/search.html':
        console.log(global.currentPage);
    }
}

document.addEventListener('DOMContentLoaded', init);