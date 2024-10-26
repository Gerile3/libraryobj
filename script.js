const addNewBookButton = document.querySelector(".add-book");
const showBooksButton = document.querySelector(".show-book");
const deleteBooksButton = document.querySelector(".delete-book")
const libraryDatabase = [];


function Book(name, author, pages, read, rate){
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.rate = rate;
}

function addBookToLibrary(name, author, pages, read, rate){
    const newBook = new Book(name, author, pages, read, rate)
    libraryDatabase.push(newBook)
}

function displayLibrary(){
    const printInfo = libraryDatabase.map((item)=>{
        return  item.name + ", " + item.author + ", " + item.pages + " pages, " + 
        (item.read ? "read, " : "not read yet, ") + item.rate + " stars";
    })

    return printInfo.join("\n")
}

addBookToLibrary("Osman", "Ben", 100, true, 5);
addBookToLibrary("Another Book", "Another Author", 200, false, 4);

console.log(displayLibrary())