import fs from 'fs';

(() => {
	const VERSION_JSON_PATH = '.version.json';
	const PACKAGE_JSON_PATH = 'package.json';
	const MANIFEST_JSON_PATH = 'src/manifest.json';

	// version
	const version = fs.readFileSync(VERSION_JSON_PATH, { encoding: 'utf-8' });
	const version_json = JSON.parse(version);

	// package.json
	const pkg = fs.readFileSync(PACKAGE_JSON_PATH, { encoding: 'utf-8' });
	const pkg_json = JSON.parse(pkg);
	Object.assign(pkg_json, version_json);
	fs.writeFileSync(`${PACKAGE_JSON_PATH}`, `${JSON.stringify(pkg_json, undefined, 2)}\r\n`);

	// manifest.json
	const manifest = fs.readFileSync(MANIFEST_JSON_PATH, { encoding: 'utf-8' });
	const manifest_json = JSON.parse(manifest);
	Object.assign(manifest_json, version_json);
	fs.writeFileSync(`${MANIFEST_JSON_PATH}`, JSON.stringify(manifest_json, undefined, '\t'));
})();
