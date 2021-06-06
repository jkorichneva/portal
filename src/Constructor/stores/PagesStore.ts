import {makeAutoObservable, action, observable} from "mobx";
import {addToDB, modifyDB, removeFromDB} from "../utils/dbUtils";
import { nanoid } from 'nanoid';

export class PagesStore {
    pages: Array<IPage> = [];

    constructor(pages: Array<IPage>) {
        makeAutoObservable(this)
        this.pages = pages;
    }

    async createPage(name: string) {
        const page = new Page(name);
        this.pages.push(page);
        await addToDB('pages', page);
    }

    async removePage(page: IPage) {
        this.pages.splice(this.pages.indexOf(page), 1)
        await removeFromDB('pages', page.id);
    }
}

export type TPagesStore = {
    pages: Array<IPage> | [];
    createPage: (name: string) => void;
    removePage: (page: IPage) => void;
}

export interface IPage {
    name: string|null;
    id: string|null;
    published: boolean;
    toggle: () => void;
    setName: (name: string) => void;
}

export class Page implements IPage {
    name: string|null = null;
    id: string|null = null;
    published: boolean = false;

    constructor(name: string, id?: string) {
        makeAutoObservable(this, {
            name: observable,
            id: observable,
            published: observable,
            toggle: action,
            setName: action,
        })
        this.id = id ?? nanoid();
        this.name = name;
        this.published = false;
    }

    toggle() {
        this.published = !this.published;
        modifyDB('pages', this);
    }

    setName(name: string) {
        this.name = name;
    }
}
