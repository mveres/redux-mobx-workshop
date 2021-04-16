export type ActionType = "ADD_TO_CART" | "GET_PRODUCTS" | "GETTING_PRODUCTS";

export type Action = { type: ActionType } & Record<string, any>;
