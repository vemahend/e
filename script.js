let readingList = [];

// Function to add a book to the reading list
function addBook() {
    const bookTitle = document.getElementById('bookTitle').value;
    if (bookTitle) {
        readingList.push(bookTitle);
        updateReadingList();
        document.getElementById('bookTitle').value = ''; // Clear input field
    }
}

// Function to update the reading list display
function updateReadingList() {
    const listElement = document.getElementById('readingList');
    listElement.innerHTML = '';
    readingList.forEach(book => {
        const li = document.createElement('li');
        li.textContent = book;
        listElement.appendChild(li);
    });
}

// Function to save the list to a notepad file (as .txt file)
function saveToNotepad() {
    const textContent = readingList.join('\n');
    const blob = new Blob([textContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'reading_list.txt';
    link.click();
}

// Function to read the list from a notepad (.txt) file
function readFromNotepad() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'text/plain';
    input.onchange = function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function() {
            readingList = reader.result.split('\n');
            updateReadingList();
        };
        reader.readAsText(file);
    };
    input.click();
}

// Function to save the list as a PDF
function saveToPDF() {
    const textContent = readingList.join('\n');
    const pdfWindow = window.open('');
    pdfWindow.document.write('<pre>' + textContent + '</pre>');
    pdfWindow.document.close();
    pdfWindow.print();
}
