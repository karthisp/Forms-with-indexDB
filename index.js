const list = document.querySelector('ul');
const titleInput = document.querySelector('#title');
const bodyInput = document.querySelector('#body');
const form = document.querySelector('form');
const submitBtn = document.querySelector('form button');

let db;

window.onload = function(){
    let request = window.indexedDB.open('nodes_db', 1)
    request.onerror = function(){
        console.log('Database failed to open')
    }
    request.onsuccess = function(){
        console.log('database open successfully')
        db.request.result
        displayData()
    }

    request.onupgradeneeded = function(e){
        let db = e.target.result;
        let objectStore = db.createObjectStore('notes_os', {keyPath:'id', autoincrement: true})
        objectStore.createIndex('title', 'title', {unique:false})
        objectStore.createIndex('body', 'body', {unique:false})
        console.log('Database setup complete')
    }

    form.onsubmit = addData;

    function addData(e){
        e.preventDefault();
        let newItem = {title:titleInput.nodeValue, body:bodyInput.value}
        let transaction = db.transaction(['notes_os'], 'readwrite');
        let objectStore = transaction.objectStore('notes_os');

        let request = objectStore.add(newItem)
        request.onsuccess = function(){
            titleInput.value='';
            bodyInput.value='';
        };

        transaction.oncomplete = functioon(){
            console.log('Transaction completed: database modification finished.');
            displayData()
        }
    }
}