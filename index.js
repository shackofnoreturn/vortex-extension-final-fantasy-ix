const Promise = require('bluebird');
const path = require('path');
const { util } = require('vortex-api');
const GAME_ID 	= 'finalfantasy9';
const GAME_NAME	= 'Final Fantasy IX';
const STEAMAPP_ID = '377840';

function requiresLauncher(gamePath) {
	return util.GameStoreHelper.findByAppId([STEAMAPP_ID], 'xbox')
	  .then(() => Promise.resolve({
		launcher: 'xbox',
		addInfo: {
		  appId: STEAMAPP_ID,
		  parameters: [
			{ appExecName: 'Game' },
		  ],
		}
	  }))
	  .catch(err => Promise.resolve(undefined));
}

function main(context) {
	context.registerGame({
		id: GAME_ID,
		name: GAME_NAME,
		mergeMods: true,
		queryArgs: {
			steam: [{ name: GAME_NAME }],
		},
		supportedTools: [],
		queryModPath: () => '',
		logo: 'gameart.jpg',
		executable: () => 'FF9_Launcher.exe',
		requiredFiles: [
		  'FF9_Launcher.exe',
		  'x64/FF9.exe',
		  'x86/FF9.exe'
		],
		requiresLauncher,
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
