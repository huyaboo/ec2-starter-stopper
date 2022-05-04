#! /usr/local/bin/node
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});
const ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

const instanceId = 'i-0117fa2bb812ac2ec';

async function doit () {
	if (!(await isAlive())) {
		console.log(await turnOn());
	} else {
		console.log('instance is already on');
	}
	
}

async function wait500ms (){
	return new Promise(function (resolve, reject) {
		setTimeout(resolve(), 500);
	});
}

async function turnOnInstanceRequest () {
	return new Promise(function (resolve, reject) {
		ec2.startInstances({ InstanceIds: [instanceId] }, function(err, data) {
		    if (err) {
		    	reject(err)
		    } else {
		      resolve();
		    }
		  });
	});
}

async function turnOn () {
	await turnOnInstanceRequest();
	while( !(await isAlive()) ) {
		await wait500ms();
	}
	return 'its on';
}

async function isAlive () {
	var params = {
	  DryRun: false
	};
	return new Promise(function(resolve, reject) {
		ec2.describeInstances(params, function(err, data) {
		  if (err) {
		    reject(err)
		  } else {
		  	const instances = data.Reservations.map(r => r.Instances).reduce((n, a) => a.concat(n), []);
		  	const instance = instances.filter(i => i.InstanceId === instanceId)[0];
		  	if (!instance) {
		  		reject(new Error(`instance with id ${instanceId} not found!`))
		  	}
		  	resolve(instance.State.Name === 'running');
		  }
		});
	})	
}

doit();
