// import { invoke } from "@tauri-apps/api/primitives";
import language from './scripts/language';
import * as glyph from './../popup-glyph/lib/glyph';

import { window as win } from '@tauri-apps/api';


const DO_NOT_PASTE_LOG: string[] = [
	'\n%cDO NOT PASTE.%c\n\n' +
	'%chere is why.%c\n\n' +
	'If someone is telling you to paste or enter code here,\n' +
	'they probably want to open your computer up to %cviruses%c\n' +
	'or obtain access to your computer.\n\n' +
	'If you\'re someone who knows what they\'re doing,\n' +
	'by all means, tinker with everything in here.\n',
	
	'background: white; color: black; font-size: 34px; font-weight: bold; font-style: italic; padding-top: 10px; padding-bottom: 10px; padding-left: 45px; padding-right: 45px;',
	'background: transparent; color: inherit; font-size: inherit;',
	'text-decoration: underline; font-size: 16px; font-weight: bold;',
	'background: transparent; color: inherit; font-size: inherit;',
	'text-decoration: underline;',
	'background: transparent; color: inherit; font-size: inherit;',
];

window.addEventListener("DOMContentLoaded", () => {
	document.onkeydown = (evt: KeyboardEvent): void => {
		if(evt.code === "F5") return evt.preventDefault();
		if(evt.ctrlKey && evt.code === "KeyR") return evt.preventDefault();
	};

	glyph.initGlyphs();
	glyph.observeGlyphs(document.documentElement);

	language.all['en'];

	language.updateAll(language.all['en']);

	console.log(...DO_NOT_PASTE_LOG);

	win.getCurrent().show();
});
