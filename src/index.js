// declare variables
const filmAPI = "http://localhost:3000/films";
const listHolder =  document.getElementById("films");
const preview = document.getElementById("poster");
const movieTitle = document.getElementById("title");
const movieTime = document.getElementById("time");
const movieDescription = document.getElementById("film-info");
const showTime = document.getElementById("showtime");
const tickets = document.getElementById("ticket-num");
const button = document.getElementById("buy-ticket");

document.addEventListener("DOMContentLoaded", () => {
    document.getElementsByClassName("film item")[0].remove()
    fetchMovies(filmAPI)
})

// fetches movies from server
function fetchMovies(filmAPI){
    fetch (filmAPI)
    .then (res => res.json())
    .then (movies => {
        movies.forEach(movie => {
            displayMovie (movie)
        });
    })
}

// displays movies in the li element
function displayMovie (movie){
    const li = document.createElement('li');
    li.style.cursor = "pointer"
    li.textContent = movie.title.toUpperCase()
    listHolder.appendChild(li)
    addClickEvent()
}

function addClickEvent() {
    let children = listHolder.children;
    for (let i = 0; i < children.length; i++) {
        let child = children[i];
        child.addEventListener("click",() => {
            fetch (`${filmAPI} / ${i+1}`)
            .then (res => res.json())
            .then (movie => {
                document.getElementById("buy-ticket").textContent = "Buy Ticket"
                setUpMovieDetails (movie)
            })
        })
    }
}

function setUpMovieDetails(childMovie){
    preview.src = childMovie.poster;

    movieTitle.textContent = childMovie.title;
    movieTime.textContent = `${childMovie.runtime} minutes`;
    movieDescription.textContent = childMovie.description;
    showTime.textContent = childMovie.showtime;
    tickets.textContent = childMovie.capacity - childMovie.tickets_sold;
}

// addEventListener to buy ticket button
button.addEventListener("click", function(event) {
    let remTickets = document.querySelector("#ticket-num").textContent
    event.preventDefault()
    if (remTickets > 0) {
        document.querySelector("#ticket-num").textContent = remTickets - 1
    } else if (parseInt(remTickets, 10) === 0){
        button.textContent = "Sold Out"
    }
})