import {IPage, Page} from "../stores/PagesStore";
import { openDB } from 'idb';

const DBPromise = (databaseName: string) => openDB('portal', 1, {
    upgrade(db) {
        db.createObjectStore(databaseName, {keyPath: 'id', autoIncrement: true});
    },
});
/**
 * check is DB exists and get list
 * @param databaseName
 * @param version
 */
export async function getDataFromIndexedDB(databaseName: string, version: number) {
    let db = await DBPromise(databaseName);
    let transaction = db.transaction(databaseName, 'readwrite');
    let books = transaction.objectStore(databaseName);
    return await books.getAll();
}

/**
 * add multiple entries to db
 * @param databaseName
 * @param data
 */
export async function addDataToDB(databaseName: string, data: Array<IPage>) {
    let db = await DBPromise(databaseName);

    let transaction = db.transaction(databaseName, 'readwrite');
    let store = transaction.objectStore(databaseName);
    try {
        for (const item of data) {
            await store.add(item);
        }
        // @ts-ignore
        await transaction.complete;
    } catch(err) {
        console.log('error', err.message);
    }
}

/**
 * delete entry from database
 * @param databaseName
 * @param id
 */
export async function removeFromDB(databaseName: string, id: string|null) {
    if (id) {
        let db = await DBPromise(databaseName);
        await db.delete(databaseName, id);
    }
}

/**
 * add one entry to DB
 * @param databaseName
 * @param data
 */
export async function addToDB(databaseName: string, data: Page) {
    let db = await DBPromise(databaseName);

    let transaction = db.transaction(databaseName, 'readwrite');
    let store = transaction.objectStore(databaseName);
    try {
        await store.add(data);
        // @ts-ignore
        await transaction.complete;
    } catch(err) {
        console.log('error', err.message);
    }
}

/**
 * update DB entry
 * @param databaseName
 * @param data
 */
export async function modifyDB(databaseName: string, data: Page) {
    let db = await DBPromise(databaseName);

    let transaction = db.transaction(databaseName, 'readwrite');
    let store = transaction.objectStore(databaseName);
    try {
        await store.put(data);
        // @ts-ignore
        await transaction.complete;
    } catch(err) {
        console.log('error', err.message);
    }
}
