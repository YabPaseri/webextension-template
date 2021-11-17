import browser from 'webextension-polyfill';
import { log } from '~/common/log';

(() => {
	browser.runtime.onInstalled.addListener((details) => {
		switch (details.reason) {
			case 'install':
			case 'update':
				log(`${details.previousVersion} -> ${browser.runtime.getManifest().version}`);
				break;
			default:
				break;
		}
	});
})();
