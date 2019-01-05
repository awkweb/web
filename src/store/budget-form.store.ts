import { decorate, observable, action, computed } from "mobx";
import RootStore from "./index";
import { required } from "../lib/validate/validators";
import {
    Validator,
    Validation,
    Validations,
    validateAll
} from "../lib/validate";
import { get, toAmount, toCents } from "../utils";
import api from "../api";

interface Props {
    rootStore: RootStore;
    /**
     * observable
     */
    amount: number;
    error: string;
    id: string;
    isLoading: boolean;
    isDeleting: boolean;
    name: string;
    startDelete: boolean;
    /**
     * computed
     */
    isUpdatable: boolean;
    networkActive: boolean;
    amountValidation: Validation;
    nameValidation: Validation;
    validations: Validations;
    nameError?: string;
    amountError?: string;
    /**
     * action
     */
    getBudget: Function;
    handleCreate: Function;
    handleDelete: Function;
    handleOutsideClick: Function;
    handleUpdate: Function;
    initForm: Function;
    reset: Function;
    setAmount: Function;
    setId: Function;
    setName: Function;
}

export default class BudgetFormStore implements Props {
    rootStore: RootStore;
    amountValidator: Validator;
    nameValidator: Validator;

    amount = 100;
    error = "";
    id = "";
    isDeleting = false;
    isLoading = false;
    name = "";
    startDelete = false;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.amountValidator = new Validator(this.amount, { required });
        this.nameValidator = new Validator(this.name, { required });
    }

    get isUpdatable(): boolean {
        return this.id !== "new";
    }

    get networkActive(): boolean {
        return this.isLoading || this.isDeleting;
    }

    get amountValidation() {
        return this.amountValidator.validate(this.amount);
    }

    get nameValidation() {
        return this.nameValidator.validate(this.name);
    }

    get validations(): Validations {
        return {
            amount: this.amountValidation,
            name: this.nameValidation,
            all: validateAll(this.amountValidation, this.nameValidation)
        };
    }

    get amountError(): string | undefined {
        let error = undefined;
        if (!this.amountValidation.required) {
            error = "Amount is required";
        }
        return error;
    }

    get nameError(): string | undefined {
        let error = undefined;
        if (!this.nameValidation.required) {
            error = "Name is required";
        }
        return error;
    }

    getBudget = async () => {
        try {
            const { data: budget } = await api.getBudget(this.id);
            this.initForm(budget.amountCents, budget.name);
        } catch (err) {
            const error = get(() => err.response.data);
            console.log(error);
        }
    };

    handleCreate = async () => {
        try {
            this.isLoading = true;
            const { data: budget } = await api.createBudget({
                name: this.name,
                amount_cents: toCents(this.amount)
            });
            this.rootStore.budgetsStore.addBudget({
                ...budget,
                budgeted: budget.amountCents,
                spent: 0
            });
        } catch (err) {
            const error = get(() => err.response.data);
            this.error = error;
        } finally {
            this.isLoading = false;
        }
    };

    handleDelete = async () => {
        if (this.startDelete) {
            try {
                this.isDeleting = true;
                await api.deleteBudget(this.id);
                this.rootStore.budgetsStore.removeBudget(this.id);
            } catch (err) {
                const error = get(() => err.response.data);
                this.error = error;
                this.startDelete = false;
            } finally {
                this.isDeleting = false;
            }
        } else {
            this.startDelete = true;
        }
    };

    handleOutsideClick = () => {
        this.startDelete = false;
    };

    handleUpdate = async () => {
        try {
            this.isLoading = true;
            const { data: budget } = await api.updateBudget(this.id, {
                name: this.name,
                amount_cents: toCents(this.amount)
            });
            this.rootStore.budgetsStore.updateBudget(budget);
        } catch (err) {
            const error = get(() => err.response.data);
            this.error = error;
        } finally {
            this.isLoading = false;
        }
    };

    initForm = (amountCents: number, name: string) => {
        this.amount = toAmount(amountCents);
        this.name = name;
        this.amountValidator = new Validator(this.amount, { required });
        this.nameValidator = new Validator(this.name, { required });
    };

    reset = () => {
        this.amount = 100;
        this.error = "";
        this.id = "";
        this.isLoading = false;
        this.isDeleting = false;
        this.name = "";
        this.startDelete = false;
    };

    setAmount = (amount: number) => {
        this.amount = amount;
    };

    setId = (id: string) => {
        this.id = id;
    };

    setName = (name: string) => {
        this.name = name;
    };
}
decorate(BudgetFormStore, {
    amount: observable,
    error: observable,
    id: observable,
    isLoading: observable,
    isDeleting: observable,
    name: observable,
    startDelete: observable,
    /**
     * computed
     */
    isUpdatable: computed,
    networkActive: computed,
    amountValidation: computed,
    nameValidation: computed,
    validations: computed,
    nameError: computed,
    amountError: computed,
    /**
     * action
     */
    getBudget: action,
    handleCreate: action,
    handleDelete: action,
    handleOutsideClick: action,
    handleUpdate: action,
    initForm: action,
    reset: action,
    setAmount: action,
    setId: action,
    setName: action
});