#!/usr/bin/env node

var cmd = require('commander')

cmd
	.version('0.1.0')
	.usage('')
	.description('Installs subscribed mods for Civ V on OSX.')
	.parse(process.argv)

var source_path  = '/Users/awebb/Library/Application Support/Steam/userdata/12112257/ugc/referenced/'
var install_path = '/Users/awebb/Documents/Aspyr/Sid Meier\'s Civilization 5/MODS/'

var glob = require('glob')
glob(source_path + '**/*.civ5mod', {}, function (err, files) {
	console.log('Found %s mods', files.length)
	console.log()

	for (var i = 0; i < files.length; i++) {
		console.log('Installing ' + files[i].replace(source_path, '') + '...')
		extract(files[i], install_path)
	}
})

function extract(source, destination) {
	var zip = require('node-7z')
	var task = new zip()
	task.extractFull(source, destination, {})
		.progress(function (files) {
			console.log('.')
		})

		.then(function () {
			console.log(source.replace(source_path, '') + ' installed OK')
		})

		.catch(function (err) {
			console.log(source)
			console.error(err)
		})
}