const addNewBookButton = document.querySelector(".add-book");
const showBooksButton = document.querySelector(".show-book");
const bookShowcase = document.querySelector(".book-showcase");
const addButtonDisplay = document.querySelector(".add-new");
const addBookContainer = document.querySelector(".add-book-container");
const totalBooks = document.getElementById("book-number");
const libraryDatabase = [
    {
        name: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        pages: 180,
        read: true,
        rate: 4
    },
    {
        name: "To Kill a Mockingbird",
        author: "Harper Lee",
        pages: 281,
        read: true,
        rate: 5
    },
    {
        name: "1984",
        author: "George Orwell",
        pages: 328,
        read: false,
        rate: 3
    }
]

function Book(name, author, pages, read, rate) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.rate = rate;
}

function addBookToLibrary() {
    const form = document.getElementById('form-id');
    const formData = new FormData(form);

    const name = formData.get('title');
    const author = formData.get('author');
    const pages = parseInt(formData.get('pages'), 10);
    const read = formData.get('read') === "on";
    const rate = parseInt(formData.get('rate'), 10);

    const newBook = new Book(name, author, pages, read, rate);
    libraryDatabase.push(newBook);

    totalBooks.textContent = libraryDatabase.length;
    displayLibrary();
    form.reset();
}

function displayLibrary() {
    bookShowcase.innerHTML = "";

    libraryDatabase.forEach((item) => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");

        // Title
        const titleElement = document.createElement("p");
        titleElement.classList.add("title");
        titleElement.textContent = item.name;
        bookDiv.appendChild(titleElement);

        // Author
        const authorElement = document.createElement("p");
        authorElement.classList.add("author");
        authorElement.textContent = item.author;
        bookDiv.appendChild(authorElement);

        // Pages
        const pagesElement = document.createElement("p");
        pagesElement.classList.add("pages");
        pagesElement.textContent = item.pages;
        const pagesSpan = document.createElement("span");
        pagesSpan.textContent = " Pages";
        pagesElement.appendChild(pagesSpan);
        bookDiv.appendChild(pagesElement);

        // Read status
        const readElement = document.createElement("p");
        readElement.classList.add("read");
        readElement.classList.add(item.read ? "read" : "not-read");
        readElement.textContent = item.read ? "Read" : "Not Read";
        bookDiv.appendChild(readElement);

        // Rating
        const rateElement = document.createElement("p");
        rateElement.classList.add("rate");
        rateElement.textContent = "★".repeat(item.rate);
        bookDiv.appendChild(rateElement);

        // Delete Button
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-book");
        deleteButton.textContent = "Delete From Library";
        bookDiv.appendChild(deleteButton);

        bookShowcase.appendChild(bookDiv)
    });
}

addNewBookButton.addEventListener("click", (event) => {
    event.preventDefault();
    addBookToLibrary();
})

showBooksButton.addEventListener("click", () => {
    bookShowcase.classList.toggle("hidden");
    showBooksButton.textContent = bookShowcase.classList.contains("hidden")
        ? "Show My Books"
        : "Hide My Books"

    if (!bookShowcase.classList.contains("hidden")) {
        displayLibrary();
    }
})

addButtonDisplay.addEventListener("click", () => {
    addBookContainer.classList.toggle("hidden");
    addButtonDisplay.textContent = addBookContainer.classList.contains("hidden")
        ? "Add New Book"
        : "Hide"
})

bookShowcase.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-book")) {
        const bookDiv = event.target.closest(".book");
        const bookTitle = bookDiv.querySelector(".title").textContent;

        const bookIndex = libraryDatabase.findIndex(book => book.name === bookTitle);
        if (bookIndex > -1) {
            libraryDatabase.splice(bookIndex, 1);
        }

        bookDiv.remove();
        totalBooks.textContent = libraryDatabase.length;
    }
})


window.addEventListener("load", () => {
    displayLibrary()
    totalBooks.textContent = libraryDatabase.length;
})