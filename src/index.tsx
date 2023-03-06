import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ParticipantApp from './components/App/ParticipantApp';
import { store } from './store/store';

// Source: https://stackoverflow.com/a/901144
const params = new Proxy(new URLSearchParams(window.location.search), {
	get: (searchParams, prop) => searchParams.get(prop as any),
});

ReactDOM.render(
	<Provider store={store}>
		<ParticipantApp/>
	</Provider>,
	document.getElementById("root")
);
