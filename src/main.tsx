import ReactDOM from 'react-dom/client';
import App from './app';
import './index.css';

const rootElement = document.getElementById('root') as HTMLDivElement;
const root = ReactDOM.createRoot(rootElement);

import('./mocks/browser')
  .then((module) => module.worker.start())
  .then(() => root.render(<App />));
