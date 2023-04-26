const global = {
    currentPage: window.location.pathname,
    page: 1,
    totalPages: 1,

    search:{
        term: '',
        page: 1,
        totalPages:1,
        totalResults: 0
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

async function search(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    global.search.term = urlParams.get('search-term');

    console.log(queryString);

     if(global.search.term !== '' && global.search.term !== null){
        const results = await searchAPIdata();
        console.log(results);
    

//     global.search.page = page;
//     global.search.totalPages = total_pages;
//     global.search.totalResults = total_results;

     if(results.length === 0){
         showAlert('No results found');
        return;
     }

    //  displaySearchResults(results);

    document.querySelector('#search-term').value = '';
 } 
else {
   showAlert('Please enter search term');
}



}

// function displaySearchResults(results){
//     // Clear previous results
//     document.querySelector('#search-results').innerHTML = '';
//     document.querySelector('#search-results-heading').innerHTML = '';
//     document.querySelector('#pagination').innerHTML = '';

//     results.forEach((card) => {
//         const div = document.createElement('div');
//         div.classList.add('card');
//         div.innerHTML = `<a href="/details.html?id=${card.id}">
//         <img src="https://images.pokemontcg.io/${(card.id).split('-')[0]}/1.png" alt="Card-title" class="card-img-top">
//     </a>
//     <div class="card-body"><h5 class="card-title">${card.name}</h5>
//         <p class="card-text">
//             <small class="text-muted">Rarity: ${card.rarity}</small>
//         </p>
//     </div>
//         `
//     })
// }

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

async function searchAPIdata(){
    const API_KEY = global.api.apiKey;
    const API_URL = global.api.apiURL;
    

    // showSpinner();

    // const response = await fetch(`${API_URL}search/?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`);
    const response = await fetch(`${API_URL}/cards?q=name:${global.search.term}`);
    const data = await response.json();

    // hideSpinner();

    return data;
}

function showAlert(message, className = 'error'){
    const alertEl = document.createElement('div');
    alertEl.classList.add('alert', className);
    alertEl.appendChild(document.createTextNode(message));
    document.querySelector('#alert').appendChild(alertEl);

    setTimeout(()=> alertEl.remove(), 3000);
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
        search();
        console.log(global.currentPage);
    }
}

document.addEventListener('DOMContentLoaded', init);