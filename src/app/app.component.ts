import { Component } from '@angular/core';
import {AppService} from './app.service';
import {Observable} from "rxjs/Rx";
const async = require('async-es');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})
export class AppComponent {
  public title : string;
  public commands : Array<Object> = [];
  public command : string;

  private testCases = [
    {
      dimension: 4,
      operations: 5,
      init: '/create-cube 4',
      commands: [
        '/update-cube -cubeid- 2 2 2 4',
        '/query-cube -cubeid- 1 1 1 3 3 3',
        '/update-cube -cubeid- 1 1 1 23',
        '/query-cube -cubeid- 2 2 2 4 4 4',
        '/query-cube -cubeid- 1 1 1 3 3 3'
      ]
    },
      {
      dimension: 2,
      operations: 4,
      init: '/create-cube 2',
      commands: [
        '/update-cube -cubeid- 2 2 2 1',
        '/query-cube -cubeid- 1 1 1 1 1 1',
        '/query-cube -cubeid- 2 2 2 2 2 2',
        '/query-cube -cubeid- 2 2 2 2 2 2'
      ]
    }
  ]

  constructor (private appService: AppService) {
    this.title = 'Cube cli v1'
    this.command = ''

    this.commands.push({
        id: 0,
        action: 'help',
        params: [],
        command: `

          Welcome to the Cube-Cli... \n

          This is a simple command line tool intended to run test cases to the Cube API.

          ### Commands:
            * /create-cube [dimension]
            * /update-cube [cube-id] [x y z value]
            * /query-cube [cube-id] [x1 y1 z1 x2 y2 z2]
            * /list-cubes
            * /run-test-cases [1,2]

        `
    })
  }


  clicked(event) : void {
    if (!this.command.length) return;


    let expression = this.createCommand(this.command);

    this.command = ''

    console.log(expression);

    if (expression.action === 'runTestCases') {
      this.runTestCases(expression);
    } else {
      this.runCommand(expression)
        .then((resp) => this.serverCommand(expression, resp))
        .catch((err) => console.log(err))
    }
  }

  createCommand(command)  {
    return Object.assign(this.parseCommand(command), {
      id: 1,
      command: command,
      date: new Date(),
      isClient: true
    });
  }

  parseCommand(command) {

    let params = command.split(" ").filter((a) => a.length);

    let options = {
      '/create-cube': 'createCube',
      '/update-cube': 'updateCube',
      '/query-cube': 'queryCube',
      '/list-cubes': 'getCubes',
      '/run-test-cases' : 'runTestCases'
    };


    if (options.hasOwnProperty(params[0])) {
      return {
          action: options[params[0]],
          params: params.slice(1, params.length)
        }
    }


    return {action: 'not-available', params: []};
  }

  runCommand(command) {

    console.log(command);

    this.commands.push(command);

    if (!command) return Promise.reject('command not available on cli');

    if(!this.appService[command.action]) return Promise.reject('command not available on service');

    return this.appService[command.action](command.params);
  }


  serverCommand(command, payload) {

    let options = {
      'createCube': (data) => `Cube created with ID: ${data._id}`,
      'updateCube': (data) => `Cube with ID: ${data._id} at position(${data.position}) updated with value ${data.value}`,
      'queryCube': (data) => `Cube with ID: ${data._id} at position(${data.position}) has value ${data.value}`,
      'getCubes': (data) => `there are ${data.length} cubes`,
      'runTestCases': (data) => 'Running test cases'
    };

    let errors = {
      'updateCube': (data) => `Could not find cube with ID: ${data._id}`,
      'queryCube': (data) => `Could not find cube with ID: ${data._id}`
    }

    this.commands.push({
      id: 1,
      command: command,
      date: new Date(),
      isServer: true,
      payload: payload.err ? payload.err : options[command.action](payload.data)
    });

  }


  renderCommand(message) {
    if (message.isServer) {
      return `$ server:  ${message.payload}`;
    }

    if(message.isClient) {
      return `$ me:  ${message.command}`;
    }

    return `$ system: ${message.command}`;
  }


  runTestCases(expression) {

    console.log('should run test cases', expression);

    let test = parseInt(expression.params[0]);

    if(test > 2) return;

    this.serverCommand(expression, {err: null, data: {}});


    this.runTestCommand(this.testCases[test - 1]);

  }

  runTestCommand(set) {
    let expression = this.createCommand(set.init);

    this.runCommand(expression)
    .then((resp) => {

      this.serverCommand(expression, resp);

      let commands = set.commands.map((command => command.replace('-cubeid-', resp.data._id)));


      async.mapSeries(commands, (command, next) => {
        let expression = this.createCommand(command);
        this.runCommand(expression)
            .then(resp => [this.serverCommand(expression, resp), resp])
            .then((resp) => next(null, resp))
            .catch((err) => next(err));
      }, (err, res) => {
        console.log(err, res);
      });
    })
  }


}
