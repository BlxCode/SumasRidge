let requestIndexDB = indexedDB.open("gameSave", 1);

requestIndexDB.addEventListener("error" , (event) => {
    console.error("Error opening IndexedDB:", event.target.error);
    alert("Error opening IndexedDB. Please check the console for details. Do you have a 20 year old browser? If so, you may need to update your browser to a more recent version.");
});
const db = requestIndexDB.result;

requestIndexDB.addEventListener("upgradeneeded", (event) => {

    if(!db.objectStoreNames.contains('player')){
            db.createObjectStore('player', {keyPath: 'player'});  

    }


});

function initializeEngine() {




}
export { db, initializeEngine };