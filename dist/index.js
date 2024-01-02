var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    let booksContainer = document.getElementById("books");
    if (booksContainer) {
        data.forEach((book) => {
            const bookDiv = document.createElement("div");
            bookDiv.className = "book";
            bookDiv.style.backgroundColor = book.color;
            const titleHeader = document.createElement("h2");
            titleHeader.textContent = book.title;
            bookDiv.appendChild(titleHeader);
            const authorHeader = document.createElement("h3");
            authorHeader.textContent = book.author;
            bookDiv.appendChild(authorHeader);
            booksContainer.appendChild(bookDiv);
        });
    }
}
const apiURL = "https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books";
fetchAPI(apiURL).then((data) => {
    printAPI(data);
});
