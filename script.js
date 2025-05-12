// Get the UI elements
let form = document.getElementById("form-list")
let bookList = document.getElementById("book-list")

// book Class

class Book {
    constructor(type, title, author, quantity, shelf, rack) {
        this.type = type
        this.title = title
        this.author = author
        this.quantity = quantity
        this.shelf = shelf
        this.rack = rack
    }
}

// UI Class
class UI {
    // ******************************add books********
    static addToBooklist(book) {
        let list = document.getElementById("book-list")
        let row = document.createElement("tr")

        row.innerHTML = `
        <td>${book.type}</td>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.quantity}</td>
        <td>${book.shelf}</td>
        <td>${book.rack}</td>
        <td><a href = "#" class= "delete">X</a></td>
        `
        list.appendChild(row)
        UI.storeBooksinLocalStorage(book)
    }
    // ************************** clear Fields************
    static clearFields() {
        document.getElementById("type").value = ""
        document.getElementById("title").value = ""
        document.getElementById("author").value = ""
        document.getElementById("quantity").value = ""
        document.getElementById("shelf").value = ""
        document.getElementById("rack").value = ""
    }
    // **********************************show alert *******
    static showAlert(message, className) {
        let div = document.createElement("div")
        div.className = `alert ${className}`
        div.innerText = message
        let container = document.querySelector(".container")
        container.insertBefore(div, form)

        setTimeout(() => {
            document.querySelector(".alert").remove()
        }, 3000);
    }
    // ***************************** delete ***********
    static deleteFromBook(target) {
        if (target.hasAttribute("href")) {
            target.parentElement.parentElement.remove()
            UI.showAlert("Book Removed!", "success")
            UI.removeBook(target.parentElement.previousElementSibling.textContent.trim())
        }
    }
    static storeBooksinLocalStorage(book) {
        let books
        if (localStorage.getItem("books") === null) {
            books = []
        } else {
            books = JSON.parse(localStorage.getItem("books"))
        }
        books.push(book)
        localStorage.setItem("books", JSON.stringify(books))
    }
    // remove from storage
    static removeBook(rack) {
        let books
        if (localStorage.getItem("books") === null) {
            books = []
        } else {
            books = JSON.parse(localStorage.getItem("books"))
        }
        books.forEach((book,index) => {
            if(book.rack === rack){
                books.splice(index,1)
            }
            localStorage.setItem("books",JSON.stringify(books))
        });
    }
}

// addEventListener
form.addEventListener("submit", newBook)
bookList.addEventListener("click", removeBook)
document.addEventListener("DOMContentLoaded", getBooks)



// Define Function

function newBook(e) {
    let type = document.getElementById("type").value
    let title = document.getElementById("title").value
    let author = document.getElementById("author").value
    let quantity = document.getElementById("quantity").value
    let shelf = document.getElementById("shelf").value
    let rack = document.getElementById("rack").value

    if (type === "" || title === "" || author === "" || quantity === "" || shelf === "" || rack === "") {
        UI.showAlert("Please Fill All The Fields!", "error")
    } else {
        let book = new Book(type, title, author, quantity, shelf, rack)
         UI.showAlert("New Book Added!", "success")
        UI.addToBooklist(book)
        UI.clearFields()
    }


    e.preventDefault()
}

function removeBook(e) {
    UI.deleteFromBook(e.target)
    e.preventDefault()
}

function getBooks(e) {
    let books
    if (localStorage.getItem("books") === null) {
        books = []
    } else {
        books = JSON.parse(localStorage.getItem("books"))
    }
    console.log(books)
    if(books.length != 0){
        books.forEach(book => {
            let list = document.getElementById("book-list")
            let row = document.createElement("tr")
    
            row.innerHTML = `
            <td>${book.type}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.quantity}</td>
            <td>${book.shelf}</td>
            <td>${book.rack}</td>
            <td><a href = "#" class= "delete">X</a></td>
            `
            list.appendChild(row)
        });
    }
}
