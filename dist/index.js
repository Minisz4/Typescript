var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let overlayDiv = document.getElementById("overlay");
overlayDiv.style.display = "none";
let buttonEl = document.getElementById("closeButton");
buttonEl.addEventListener("click", function () {
    overlayDiv.style.display = "none";
    buttonEl.style.display = "block";
});
function fetchAPI(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch data. Status: ${response.status}`);
            }
            const data = yield response.json();
            return data;
        }
        catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    });
}
function printAPI(data) {
    let numberOfBooks = document.getElementById("number__books");
    numberOfBooks.textContent = " " + data.length.toString();
    let booksContainer = document.getElementById("books");
    if (booksContainer) {
        data.forEach((book) => {
            const bookDiv = document.createElement("div");
            bookDiv.className = "book";
            bookDiv.style.backgroundColor = book.color;
            const contentDiv = document.createElement("div");
            const titleHeader = document.createElement("h2");
            titleHeader.textContent = book.title;
            contentDiv.appendChild(titleHeader);
            const authorHeader = document.createElement("h3");
            authorHeader.textContent = book.author;
            contentDiv.appendChild(authorHeader);
            bookDiv.appendChild(contentDiv);
            booksContainer.appendChild(bookDiv);
            bookDiv.addEventListener("click", function () {
                overlayDiv.style.display =
                    overlayDiv.style.display === "none" ? "flex" : "none";
                const overlayHeading = document.getElementById("overlay__heading");
                overlayHeading.textContent = book.author;
                overlayHeading.style.backgroundColor = book.color;
                const overlayTitle = document.getElementById("overlay__title");
                overlayTitle.textContent = book.title;
                overlayTitle.style.backgroundColor = book.color;
                const titleAuthorContainer = document.getElementById("title_author");
                titleAuthorContainer.style.backgroundColor = book.color;
                const overlayPlot = document.getElementById("plot__book");
                overlayPlot.textContent = "Plot: " + book.plot;
                const overlayAudience = document.getElementById("book__audience");
                overlayAudience.textContent = "Audience: " + book.audience;
                const overlayPages = document.getElementById("book_pages");
                overlayPages.textContent =
                    "Pages: " + (book.pages !== null ? book.pages.toString() : "N/A");
                const overlayPublished = document.getElementById("book__published");
                overlayPublished.textContent =
                    "Year: " + (book.year !== null ? book.year.toString() : "N/A");
                const overlayPublisher = document.getElementById("publisher");
                overlayPublisher.textContent = "Publisher:" + " " + book.publisher;
            });
        });
    }
}
const apiURL = "https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books";
fetchAPI(apiURL).then((data) => {
    printAPI(data);
});
