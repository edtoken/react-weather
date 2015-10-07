import App from 'app/App';

var node = document.getElementById('app');
var appConfig = require('config/app');
var allConfigs = {
	app:appConfig
};

for(var i in appConfig.configs){
	if(appConfig.configs[i] === 'app') continue;
	allConfigs[appConfig.configs[i]] = require('config/' + appConfig.configs[i]);
}

console.log(new App(allConfigs, node));