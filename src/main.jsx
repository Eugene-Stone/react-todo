import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import TodosContextProvider from './context/TodosContext/TodosContext.jsx';
import App from './App.jsx';
import './styles';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<TodosContextProvider>
			<App />
		</TodosContextProvider>
	</StrictMode>,
);
