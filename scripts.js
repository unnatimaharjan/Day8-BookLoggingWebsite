const addNewMovieBtn=document.querySelector('nav button');
const addModal=document.querySelector('.modal');
const cancelNewBtn=document.getElementById('btn-cancel');
const addNewBtn=cancelNewBtn.nextElementSibling;
const userInput=addModal.querySelectorAll('input');
const entryText=document.getElementById('entry-text');

const books=[];


// Toggling the form section
const toggleModal= ()=>{
    addModal.classList.toggle('visible');
    entryText.classList.toggle('visible');
}


// Buttons of the form section
const cancelNewBtnHandler= ()=>{
    toggleModal();
    clearInputs();
}

const addNewBtnHandler= ()=>{
    const titleValue=userInput[0].value;
    const imageValue=userInput[1].value;
    const reviewValue=userInput[2].value;

    if(titleValue.trim()==='' || imageValue.trim()==='' || reviewValue.trim()===''){
        alert('Please enter all the values.')
    }

    const newBook={
        id: Math.random().toString(),
        title: titleValue,
        image: imageValue,
        review: reviewValue
    };
    books.push(newBook);
    toggleModal();
    clearInputs();
    addNewBookElement(newBook.id,newBook.title,newBook.image,newBook.review);
    updateUI();
}

const clearInputs=()=>{
    for(const inputs of userInput){
        inputs.value='';
    }
}


// Making user input appear at the Main Shelf

const updateUI=()=>{
    if (books.length === 0){
        entryText.style.display='block';
    }else{
        entryText.style.display='none';
    }
}

const addNewBookElement=(id,title,image,review)=>{
    const bookElement=document.createElement('li');
    bookElement.className='book-element';
    bookElement.innerHTML=`
    <div class="book-element__image">
        <img src="${image}"alt="${title}" height="250px" width="175px">
    </div>
    <div class="book-element__info">
        <h2>${title}</h2>
        <p>${review}</p>
    </div>
    `;
    bookElement.addEventListener('click', deleteBookHandler.bind(null,id));
    const listRoot=document.getElementById('book-list');
    listRoot.append(bookElement);
}


// deleteing boooks from shelf
const deleteBookHandler=(bookId)=>{
    bookIndex=0;
    for(const book of books){
        if (book.id===bookId){
            break;
        }
        bookIndex++;
    }
    books.splice(bookIndex,1);
    const listRoot=document.getElementById('book-list');
    listRoot.children[bookIndex].remove();
}

addNewMovieBtn.addEventListener('click', toggleModal);
cancelNewBtn.addEventListener('click',cancelNewBtnHandler);
addNewBtn.addEventListener('click', addNewBtnHandler);