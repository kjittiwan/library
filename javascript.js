// Get DOM elements
const libraryContainer = document.querySelector('.library-container');
const modal = document.getElementById('modal');
const addBookBtn = document.querySelector('#addBookBtn');
const form = document.querySelector('#addBookForm');

// Initialize library array
const myLibrary = [];

// Define book constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Define functions to show and hide modal
function showModal() {
  modal.style.display = 'block';
}
function hideModal() {
  modal.style.display = 'none';
}
// Define function to reset form fields
function formReset() {
  form.reset();
}

// Define function to create book object from form input
function getBookFromInput() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;
  return new Book(title, author, pages, read);
}

// Define function to add book to library array
function addBookToLibrary(library, book) {
  library.push(book);
}

// Define function to toggle read button state and text
function toggleRead(button) {
  button.classList.toggle('btn-is-read');
  button.classList.toggle('btn-not-read');
  // eslint-disable-next-line no-param-reassign
  button.textContent = button.classList.contains('btn-is-read') ? 'Read' : 'Not Read';
}

// Define function to create book card and append to library container
function displayBook(book) {
  const bookCard = document.createElement('div');
  const title = document.createElement('p');
  const author = document.createElement('p');
  const pages = document.createElement('p');
  const readBtn = document.createElement('button');
  const removeBtn = document.createElement('button');

  // Add classes and event listeners
  title.classList.add('title-text');
  bookCard.classList.add('book-card');
  readBtn.classList.add('read-btn');
  removeBtn.classList.add('remove-btn');
  readBtn.addEventListener('click', () => toggleRead(readBtn));
  removeBtn.addEventListener('click', () => {
    const index = myLibrary.indexOf(book);
    if (index > -1) {
      myLibrary.splice(index, 1);
      bookCard.remove();
    }
  });

  // Set text content and button state based on book read status
  title.textContent = `"${book.title}"`;
  author.textContent = book.author;
  pages.textContent = `${book.pages} pages`;
  if (book.read) {
    readBtn.textContent = 'Read';
    readBtn.classList.add('btn-is-read');
  } else {
    readBtn.textContent = 'Not read';
    readBtn.classList.add('btn-not-read');
  }
  removeBtn.textContent = 'Remove';

  // Append elements to book card and container
  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  bookCard.appendChild(readBtn);
  bookCard.appendChild(removeBtn);
  libraryContainer.appendChild(bookCard);
}

// Add event listeners for form submit, modal and escape key clicks
addBookBtn.addEventListener('click', showModal);
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const thisBook = getBookFromInput();
  addBookToLibrary(myLibrary, thisBook);
  displayBook(thisBook);
  hideModal();
  formReset();
});
document.addEventListener('click', (e) => {
  if (e.target === modal) {
    hideModal();
    formReset();
  }
});
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    hideModal();
    formReset();
  }
});
