import {makeAutoObservable, action, observable} from "mobx";

export class PagesStore {
    pages: Array<IPage> = [];

    constructor(pages: Array<IPage>) {
        makeAutoObservable(this)
        this.pages = pages;
    }

    /* createPage() {
        const page = new Page(this.name, this.id);
        this.pages.push(page);
        return page;
    }*/

    removePage(page: IPage) {
        this.pages.splice(this.pages.indexOf(page), 1)
        //page.dispose()
    }
}

export type TPagesStore = {
    pages: Array<IPage>;
}

export interface IPage {
    name: string|null;
    id: number|null;
    published: boolean;
    toggle: () => void;
    setName: (name: string) => void;
}

export class Page implements IPage {
    name: string|null = null;
    id: number|null = null;
    published: boolean = false;

    constructor(name: string, id: number) {
        makeAutoObservable(this, {
            name: observable,
            id: observable,
            published: observable,
            toggle: action,
            setName: action,
        })
        this.id = id;
        this.name = name;
        this.published = false;
    }

    toggle() {
        console.log('toggle');
        this.published = !this.published;
    }

    setName(name: string) {
        this.name = name;
    }
}
