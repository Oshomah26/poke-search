const global = {
    currentPage: window.location.pathname,
}

function init(){
    switch(global.currentPage){
        case'/index.html':
        console.log(global.currentPage);
        break;
    }
}

document.addEventListener('DOMContentLoaded', init);