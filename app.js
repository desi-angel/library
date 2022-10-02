class createBook {
    constructor(title,author,pages,haveRead){
        this.title =title;
        this.author = author;
        this.pages = pages;
        this.haveRead = haveRead;
    }

    toggle(){
        if(this.haveRead === true){
            this.haveRead = false;
        }
        else{
            this.haveRead = true;
        }
    }
}

// form Validation
function formValidation(){
    const title = document.querySelector('#title');
    const author = document.querySelector("#author");
    const check = document.querySelector("#read")

        if (title.validity.valueMissing)
        {
            title.setCustomValidity("Please Enter Book Name");
            title.reportValidity();
        }
        else title.setCustomValidity('');

        if(author.validity.valueMissing)
        {
            author.setCustomValidity("Please Enter Author Name");
            author.reportValidity();
        }
        else author.setCustomValidity('');
       
        if(check.validity.valueMissing)
        {
            check.setCustomValidity("Please Select if read or not");
            check.reportValidity();
        }
        else check.setCustomValidity('');
        
}

//Displaying the modal
let newBook = document.querySelector('.add');
let modal = document.querySelector('.modal');

//displaying Modal
function displayModal(){
    modal.style.display = "block";
}
//get user inputs
function getInputs(){
    let inputs= [];
    let form = document.querySelector('.modal-content');
    let isChecked = document.querySelector('input[type=checkbox]');
    for(let i=0; i<(form.length-2); i++ ){
        inputs[i] = form.elements[i].value;
    }
    inputs.push(isChecked.checked);
    return inputs;
}
//Clicking add book button
newBook.addEventListener('click',displayModal);
//Click anywhere to close
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  } 

//Display Book
function displayBook(obj,bookNum){
    console.log(obj);
    let container = document.querySelector('.container');
    let card = document.createElement('div');
    let txt = obj.title + "<br>" + obj.author +"<br>"+ obj.pages + " pages";
    let readBtn = document.createElement('button');
    let removeBtn = document.createElement('button');
    card.setAttribute('class','card');
    card.setAttribute('data-number',bookNum);
    card.innerHTML = txt;
    card.appendChild(readBtn);
    readBtn.classList.add('btn','readBtn');
    if (obj.haveRead === true){
        readBtn.textContent = 'Read';
        readBtn.style.backgroundColor = 'green';
    }
    else{
        readBtn.textContent = 'Have Not Read';
        readBtn.style.backgroundColor = 'red';
    }
    removeBtn.classList.add('btn','removeBtn');
    container.appendChild(card);
    card.appendChild(removeBtn);
    removeBtn.textContent= 'Remove';
}
//displaying read status
function readStatus(readBtn,obj){

    if (obj.haveRead === true){
        readBtn.textContent = 'Read';
        readBtn.style.backgroundColor = 'green';
    }
    else{
        readBtn.textContent = 'Have not Read';
        readBtn.style.backgroundColor = 'red';
    }
}

function clearInputFields(){
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = '';
    });
}


let myLibrary = []; //initializing variables
let bookNum = 0;

//clicking submit button
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
        e.preventDefault();
        let inputArr = getInputs();
        modal.style.display = 'none';
        let book = new createBook(...inputArr);
        myLibrary.push(book);
        displayBook(book,bookNum);
        bookNum++;
        clearInputFields();
}); 

//Add function to remove button and read button
let container = document.querySelector('.container');
container.addEventListener('click',(e)=>{
    if(e.target && e.target.matches('button.removeBtn')){
       let arrIndex = e.target.parentElement.getAttribute('data-number');
        arrIndex = parseInt(arrIndex);
        myLibrary.splice(arrIndex,1);
        bookNum--;
        e.target.parentElement.remove();
        console.log(myLibrary);
    } 
    if(e.target && e.target.matches('button.readBtn')){
        let btn = e.target;
        let arrIndex = e.target.parentElement.getAttribute('data-number');
        arrIndex = parseInt(arrIndex);
        book = myLibrary[arrIndex];
        book.toggle();
        readStatus(btn,book);
        
    }   
});





