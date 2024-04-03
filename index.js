const path = require('path');
const { fs, log, util } = require('vortex-api');
const GAME_ID = 'finalfantasy9';
const STEAMAPP_ID = '377840';

function main(context) {
	context.registerGame({
		id: GAME_ID,
		name: 'Final Fantasy IX',
		mergeMods: true,
		queryPath: findGame,
		supportedTools: [],
		queryModPath: () => '~mods',
		logo: 'gameart.jpg',
		executable: () => 'FF9.exe',
		requiredFiles: [
		  'FF9.exe'
		],
		setup: prepareForModding,
		environment: {
		  SteamAPPId: STEAMAPP_ID,
		},
		details: {
		  steamAppId: STEAMAPP_ID
		},
	  });

	return true;
}

module.exports = {
    default: main,
};

function findGame() {
	return util.GameStoreHelper.findByAppId([STEAMAPP_ID, GOGAPP_ID])
		.then(game => game.gamePath);
}

function prepareForModding(discovery) {
    return fs.ensureDirWritableAsync(path.join(discovery.path, 'FINAL FANTASY IX', '~mods'));
}