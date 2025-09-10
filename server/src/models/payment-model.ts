// request 
export type TransactionRequest = {
    id_item: string
}


// create payment

export type CreatePaymentRequest = {
    id_transaction: string;
    email_user: string;
    price: number;
    name: "bundle" | "course";
}



// export response payment 
export type PaymentResponse = {
    redirect_url: string;
}

