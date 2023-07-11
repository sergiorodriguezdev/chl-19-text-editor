import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// PUT method to save entries to IndexedDB database
export const putDb = async (content) => {
  console.log('Saving data to jate database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite'); // Specify read + write permissions to edit entries
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, code: content}); // Always update entry whose ID is 1
  const result = await request; // Execute PUT request
};

// GET method to retrieve entries from IndexedDB database
export const getDb = async () => {
  console.log('Retrieving data from jate database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');  // Specify read only permissions to read data
  const store = tx.objectStore('jate');
  const request = store.getAll(); // Get all entries
  const result = await request; // Execute GET request

  // If the result array doesn't have any entries, or the 'code' property doesn't have any contents, return null
  //  Otherwise, return the contents of the 'code' property
  if (result.length < 1 || result[0].code === null) {
    return null;
  } else {
    return result[0].code;
  }
};

initdb();
