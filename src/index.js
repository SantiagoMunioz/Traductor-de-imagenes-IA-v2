import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ImageProvider } from './context/ImageContext';
import { LanguageProvider } from './context/LanguageContext';
import { ModelProvider } from './context/ModelContext';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <ModelProvider>
            <ImageProvider>
              <App />
            </ImageProvider>
          </ModelProvider>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>
);