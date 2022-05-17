import { createStore } from "redux";

import counterReducer from "../../Features/Contact/CounterReducer";

export default function configureStore() {
	return createStore(counterReducer)
}