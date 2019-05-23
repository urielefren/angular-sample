export interface IContact {
    name: string;
    email: string;
    message: string;
}

export interface IContactFormResult {
    contact: IContact;
    isEdit: boolean;
}