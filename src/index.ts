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
  let booksContainer: HTMLElement | null = document.getElementById("books");

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

const apiURL: string =
  "https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books";

fetchAPI(apiURL).then((data: Book[]) => {
  printAPI(data);
});
