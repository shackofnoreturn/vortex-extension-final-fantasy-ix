const { util } = require('vortex-api');
const GAME_ID 	= 'finalfantasy9';
const GAME_NAME	= 'Final Fantasy IX';
const STEAMAPP_ID = '377840';

function findGame() {
	return util.steam.findByAppId(STEAMAPP_ID)
	  .then(game => game.gamePath);
}

function main(context) {
	context.registerGame({
		id: GAME_ID,
		name: GAME_NAME,
		mergeMods: true,
		queryPath: findGame,
		supportedTools: [],
		queryModPath: () => '',
		logo: 'gameart.jpg',
		executable: () => 'FF9_Launcher.exe',
		requiredFiles: [
		  'FF9_Launcher.exe',
		  'x64/FF9.exe'
		],
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
