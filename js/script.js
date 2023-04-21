const global = {
    currentPage: window.location.pathname,
    page: 1,
    totalPages: 1,

    search:{
        term: '',
        page: 1,
        totalPages:1
    },

    api: {
        apiKey: '7e6a79da-f0fa-41f5-b7fc-c15b7ed43865',
        apiURL: 'https://api.pokemontcg.io/v2/'
    }
}

async function displayPopularcards(){
    const results = await fetchAPIData('cards');
    (results.data).forEach(card => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
        <a href="/details.html?id=${card.id}">
                    <img src="https://images.pokemontcg.io/${(card.id).split('-')[0]}/1.png" alt="Card-title" class="card-img-top">
                </a>
                <div class="card-body"><h5 class="card-title">${card.name}</h5>
                    <p class="card-text">
                        <small class="text-muted">Rarity: ${card.rarity}</small>
                    </p>
                </div>
        `


        document.querySelector('#popular-cards').appendChild(div);

       

    })
    console.log(results);
}

async function displayCardDetails(){
    const cardID = window.location.search.split('=')[1];
    const card = await fetchAPIData(`cards/${cardID}`);
    const div = document.createElement('div');
    div.classList.add('details');
    div.innerHTML = `<div ><img src="${card.data.images.small}" alt="${card.image}" class="card-img-top"></div>
          
    <div class="main-details">
      <h2>${card.data.name}</h2>
      <p>
        <p class="text-muted">Super type: ${card.data.supertype}</p>
        <p class="text-muted">Rarity: ${card.data.rarity}</p>
        <p class="text-muted">Average sell price: $ ${card.data.cardmarket.prices.averageSellPrice}</p>
        <a href="${card.data.cardmarket.url}" class="btn">Visit price page</a>
    </div>`

    document.querySelector('#card-details').appendChild(div);

    console.log(card);


}

function showSpinner(){
    document.querySelector('.spinner').classList.add('show');
}

function hideSpinner(){
    document.querySelector('.spinner').classList.remove('show');
}

async function fetchAPIData(endpoint){
    const API_KEY = global.api.apiKey;
    const API_URL = global.api.apiURL;

    // showSpinner()

    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();
    
    // hideSpinner()

    return data
}

function init(){
    switch(global.currentPage){
        case'/index.html':
        displayPopularcards();
        console.log(global.currentPage);
        break;
        case'/details.html':
        displayCardDetails();
        console.log(global.currentPage);
        break;
        case'/search.html':
        console.log(global.currentPage);
    }
}

document.addEventListener('DOMContentLoaded', init);