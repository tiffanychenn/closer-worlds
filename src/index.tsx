import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ParticipantApp from './components/App/ParticipantApp';
import WOZApp from './components/App/WOZApp';
import { store } from './store/store';

// Source: https://stackoverflow.com/a/901144
const params = new Proxy(new URLSearchParams(window.location.search), {
	get: (searchParams, prop) => searchParams.get(prop as any),
});
// Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
let value = (params as any)["woz"]; // "some_value"

ReactDOM.render(
	<Provider store={store}>
		{value == true ? <WOZApp/> : <ParticipantApp/>}
	</Provider>,
	document.getElementById("root")
);
