const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    const emptyText = document.getElementById('empty-text');
    if (searchText === '') {
        emptyText.innerHTML = `<h3 class="text-center fw-bold text-warning ">Please write something!!</h3>`;
    }
    else {
        emptyText.textContent = '';
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => resultFound(data));
    }
}
const resultFound = data => {
    const searchFound = document.getElementById('search-found');
    if (data.numFound === 0) {
        searchFound.innerHTML = `<h4 class="text-center text-warning ">No result found!!</h4>`;

    }
    else {

        searchFound.innerHTML = `<h4 class="text-center text-primary "><span>Search found:</span>${data.numFound}</h4>`;
        displayResult(data.docs);
    }
}

const displayResult = books => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    books.forEach(book => {
        console.log(book);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `<div class="card h-100">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top img-thumbnail " alt="...">
            <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
                <p class="card-text "><span class="fw-bold">Author name: </span>${book.author_name}</p>
                <p class="card-text "><span class="fw-bold">Publisher name: </span>${book.publisher}</p>
            </div>
            <div class="card-footer">
                <small class="text-muted">First publish year is ${book.first_publish_year}</small>
            </div>
        </div>`;
        searchResult.appendChild(div);
    });
}