let myLibrary = [];
let modalBtn = document.querySelector(".modal-new");
let modalBg = document.querySelector(".modal-bg");
let modalClose = document.querySelector(".close");
let modalAdd = document.querySelector(".add-new");
let read = [];
let notRead = [];
let idCounter = 0;
let display = document.querySelector(".bookshelf");
let currFilter = myLibrary;
function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = '' + id;
}

// updateRead() - Updates the read, notRead array, this is  helper function
function updateRead() {
    read = [];
    notRead = []
    for (book in myLibrary) {
        if (book.read = true) {
            read.push(book);
        } else {
            notRead.push(book);
        }
    }
}

// clearBox() - clears the bookshelf, this is a helper function for updateDisplay
function clearBox() {
    document.getElementById("storage").innerHTML = ""
}

// updateDisplay(filter) - updates the display based on the chosen filter
function updateDisplay(filter) {
    clearBox();
    render(filter);
    updateListeners();   
}

// changeStatus(element) - changes the read status of the supplied element
function changeStatus(element) {
    if (element.textContent === 'Read') {
        console.log("DONE")
        element.innerHTML = 'Not read';
    } else {
        element.innerHTML = 'Read';
    }
    updateRead();
}
// removeBook(element) - remove the book of the supplied delete element
function removeBook(element) {
    for(i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].id === element.parentNode.id) {
            myLibrary.splice(i,1);
        }
    }
    updateDisplay(currFilter);
}
// addBookToLibrary(title,author,pages,read) - adds book to library and sorts the read and not read list
function addBookToLibrary(title,author,pages,read, id) {
    let readStatus = "";
    if (read) {
        readStatus = "Read"
    } else {
        readStatus = "Not read"
    }
    let book = new Book(title,author,pages,readStatus, id);
    myLibrary.push(book);
    updateRead();
}
// updateListeners() - updates the listeners on all the buttons when filtering or refreshing
function updateListeners() {
    let readButtons = document.querySelectorAll('.status');
    for (i = 0; i < readButtons.length; i++) {
        readButtons[i].addEventListener('click', event => {
            changeStatus(event.target);
        })
    }
    let deleteButtons = document.querySelectorAll('.delete');
    for (item of deleteButtons) {
        item.addEventListener('click', event => {
            removeBook(event.target);
        })
    }
}

// Render works well!
// Helper function to  updateDisplay
function render(filter) {
    for (let i = 0; i < filter.length; i++) {
        let book = document.createElement('div');
        book.id = filter[i].id;
        book.classList.add("book");
        let title = document.createElement('h2');
        title.textContent = `Title: ${filter[i].title}`;
        let author = document.createElement('h2');
        author.textContent = `Author: ${filter[i].author}`;
        let pages = document.createElement('h2');
        pages.textContent = `Pages: ${filter[i].pages}`;
        let read = document.createElement('h2');
        read.classList.add("status");
        read.textContent = `${filter[i].read}`;
        let del = document.createElement('h2');
        del.classList.add("delete");
        del.textContent = "Delete";
        book.appendChild(title);
        book.appendChild(author);
        book.appendChild(pages);
        book.appendChild(read);
        book.appendChild(del);
        display.appendChild(book);
    }
}
modalBtn.addEventListener('click', (e) => {
    modalBg.classList.add('modal-active');
})
modalClose.addEventListener('click',(e) => {
    modalBg.classList.remove('modal-active');
})
modalAdd.addEventListener('click', (e) => {
    let title = document.querySelector("#title");
    let author = document.querySelector("#author");
    let pages = document.querySelector("#pages");
    let read = document.querySelector("#read-status");
    addBookToLibrary(title.value, author.value, pages.value, read.checked, idCounter);
    idCounter += 1;
    modalBg.classList.remove('modal-active');
    updateDisplay(currFilter);
})

