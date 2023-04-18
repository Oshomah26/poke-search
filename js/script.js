const global = {
    currentPage: window.location.pathname,

    api: {
        apiKey: '7e6a79da-f0fa-41f5-b7fc-c15b7ed43865',
        apiURL: 'https://api.pokemontcg.io/v2/'
    }
}

async function displayPopularcards(){
    // const response = await fetch ('https://api.pokemontcg.io/v2/cards');
    const results = await fetchAPIData('cards');
    console.log(results.data);
}

async function fetchAPIData(endpoint){
    const API_KEY = global.api.apiKey;
    const API_URL = global.api.apiURL;

    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();
    
    return data
}

function init(){
    switch(global.currentPage){
        case'/index.html':
        displayPopularcards();
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