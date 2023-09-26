import fs from 'node:fs';

let watcher = createDefaultWatcher(listener)
function listener(eventType, filename) {
	if(filename && fs.existsSync(filename)) {
		try{
			const dir = fs.opendirSync(filename)
			if(dir) dir.close();
			watcher.removeAllListeners();
			console.log('restarting watcher...')
			watcher = createDefaultWatcher();
		}
		catch(err) {
			if(err.code !== 'ENOTDIR') {
				watcher.removeAllListeners()
				watcher.close();
				throw err;
			}
		}
	}
	console.log(`that happend -> ${eventType} to ${filename}`)
}

function createDefaultWatcher() {
	const watcher = fs.watch('.', {persistent: true, recursive: true}, listener);
	if(watcher){
		console.log('watcher created');
		return watcher;
	}
	throw (Error('wasn\'t able to create watcher'));
}
