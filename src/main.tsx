import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import TodosContextProvider from './context/TodosContext/TodosContext.tsx';
import App from './App.tsx';
import './styles';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(
	<StrictMode>
		<TodosContextProvider>
			<App />
		</TodosContextProvider>
	</StrictMode>,
);
