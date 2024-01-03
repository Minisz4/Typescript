let overlayDiv: HTMLElement = document.getElementById("overlay");
overlayDiv.style.display = "none";

let buttonEl: HTMLElement = document.getElementById("closeButton");
buttonEl.addEventListener("click", function () {
  overlayDiv.style.display = "none";
});

interface Book {
  audience: string;
  author: string;
  color: string;
  id: number;
  pages: number | null;
  plot: string;
  publisher: string;
  title: string;
  year: number;
}

async function fetchAPI(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }
    const data: Book[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
function printAPI(data: Book[]) {
  let numberOfBooks: HTMLElement = document.getElementById("number__books");
  numberOfBooks.textContent = " " + data.length.toString();
  let booksContainer: HTMLElement | null = document.getElementById("books");

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
        overlayDiv.style.display = "flex";
        const overlayHeading: HTMLElement =
          document.getElementById("overlay__heading");
        overlayHeading.textContent = book.author;
        overlayHeading.style.backgroundColor = book.color;

        const overlayTitle: HTMLElement =
          document.getElementById("overlay__title");
        overlayTitle.textContent = book.title;
        overlayTitle.style.backgroundColor = book.color;

        const titleAuthorContainer: HTMLElement =
          document.getElementById("title_author");
        titleAuthorContainer.style.backgroundColor = book.color;

        const overlayPlot: HTMLElement = document.getElementById("plot__book");
        overlayPlot.textContent = "Plot: " + book.plot;

        const overlayAudience: HTMLElement =
          document.getElementById("book__audience");
        overlayAudience.textContent = "Audience: " + book.audience;

        const overlayPages = document.getElementById("book_pages");
        overlayPages.textContent =
          "Pages: " + (book.pages !== null ? book.pages.toString() : "N/A");

        const overlayPublished: HTMLElement =
          document.getElementById("book__published");

        overlayPublished.textContent =
          "Year: " + (book.year !== null ? book.year.toString() : "N/A");

        const overlayPublisher: HTMLElement =
          document.getElementById("publisher");
        overlayPublisher.textContent = "Publisher:" + " " + book.publisher;
      });
    });
  }
}

const apiURL: string =
  "https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books";

fetchAPI(apiURL).then((data: Book[]) => {
  printAPI(data);
});
