import { mount } from 'svelte';
import './app.css';
import App from './App.svelte';
import { app, startRouter } from './lib/app.svelte.js';

document.documentElement.lang = app.settings.lang;
startRouter();

export default mount(App, { target: document.getElementById('app') });
