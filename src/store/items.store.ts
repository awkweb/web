import { action, decorate, observable } from "mobx";
import api from "../api";
import RootStore from "./index";
import { get } from "../utils";
import { Item } from "../types/item";

interface Props {
    rootStore: RootStore;
    /**
     * observable
     */
    items: Array<Item>;
    error: string;
    isLoading: boolean;
    /**
     * action
     */
    createItem: Function;
    getItems: Function;
    reset: Function;
}

export default class ItemsStore implements Props {
    rootStore: RootStore;

    items: Array<Item> = [];
    error = "";
    isLoading = false;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    createItem = async (data: object) => {
        try {
            const { data: item } = await api.createItem(data);
            this.items = [...this.items, item];
        } catch (err) {
            const error = get(() => err.response.data);
            console.log(error);
        }
    };

    getItems = async () => {
        try {
            this.error = "";
            this.isLoading = true;
            const { data: items } = await api.getItems();
            this.items = items;
        } catch (err) {
            const error = get(() => err.response.data);
            console.log(error);
        } finally {
            this.isLoading = false;
        }
    };

    reset = () => {
        this.items = [];
        this.error = "";
        this.isLoading = false;
    };
}
decorate(ItemsStore, {
    /**
     * observable
     */
    items: observable,
    error: observable,
    isLoading: observable,
    /**
     * action
     */
    createItem: action,
    getItems: action,
    reset: action
});