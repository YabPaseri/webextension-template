import archiver from 'archiver';
import fs from 'fs';

(async () => {
	const VERSION_JSON_PATH = '.version.json';
	const version = JSON.parse(fs.readFileSync(VERSION_JSON_PATH, { encoding: 'utf-8' }));

	const from = './dist';
	const to_root = './package';
	const filename = 'extension-template';

	if (!fs.existsSync(to_root)) {
		fs.mkdirSync(to_root);
	}

	const to = `${to_root}/${filename}.zip`;
	const to_version = `${to_root}/${filename}-${version.version_name}.zip`;

	const output = fs.createWriteStream(to);
	const output_version = fs.createWriteStream(to_version);

	const archive = archiver('zip', { zlib: { level: 9 } });
	const archive_version = archiver('zip', { zlib: { level: 9 } });
	archive.pipe(output);
	archive_version.pipe(output_version);
	archive.directory(from, false);
	archive_version.directory(from, false);
	Promise.all([archive.finalize().catch((r) => console.log(r)), archive_version.finalize().catch((r) => console.log(r))]);
})();
