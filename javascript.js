const library = document.querySelector('.library');
const modal = document.getElementById('modal');
const myLibrary = [];
function showModal() {
  modal.style.display = 'block';
}
function hideModal() {
  modal.style.display = 'none';
}

const addBookBtn = document.querySelector('#addBookBtn');
addBookBtn.addEventListener('click', showModal);

function CreateBook(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
function getBookFromInput() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;
  return new CreateBook(title, author, pages, read);
}
function addBookToLibrary(library, book) {
  library.push(book);
}
function toggleRead() {
  this.classList.toggle('btn-is-read');
  this.classList.toggle('btn-not-read');
}

function displayBook(book) {
  const bookCard = document.createElement('div');
  const title = document.createElement('p');
  const author = document.createElement('p');
  const pages = document.createElement('p');
  const readBtn = document.createElement('button');
  const removeBtn = document.createElement('button');
  bookCard.classList.add('book-card');
  readBtn.classList.add('read-btn');
  removeBtn.classList.add('remove-btn');
  readBtn.addEventListener('click', toggleRead);
  title.textContent = (`"${book.title}"`);
  author.textContent = (`${book.author}`);
  pages.textContent = (`${book.pages} pages`);
  if (book.read) {
    readBtn.textContent = 'Read';
    readBtn.classList.add('btn-is-read');
  } else {
    readBtn.textContent = 'Not read';
    readBtn.classList.add('btn-not-read');
  }
  removeBtn.textContent = 'Remove';
  removeBtn.addEventListener('click', () => {
    const index = myLibrary.indexOf(book);
    if (index > -1) {
      myLibrary.splice(index, 1);
      bookCard.remove();
    }
  });
  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  bookCard.appendChild(readBtn);
  bookCard.appendChild(removeBtn);
  library.appendChild(bookCard);
}

const form = document.querySelector('#addBookForm');
function formReset() {
  form.reset();
}
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const thisBook = getBookFromInput();
  console.log(thisBook);
  addBookToLibrary(myLibrary, thisBook);
  console.log(myLibrary);
  displayBook(thisBook);
  hideModal();
  formReset();
});

const harryPotter = new CreateBook('pilo', 'jk', '300', true);
console.log(harryPotter);
addBookToLibrary(myLibrary, harryPotter);
