import { Component } from '@angular/core';
import {AppService} from './app.service';
import {Observable} from "rxjs/Rx";

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

        `
    })
  }


  clicked(event) : void {
    if (!this.command.length) return;


    let expression = this.createCommand(this.command);

    this.command = ''

    this.commands.push(expression);

    this.runCommand(expression).then((resp) => {
      console.log(resp)
    }).catch((err) => console.log(err))

  }

  helpCommand() {
    return {
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

        `
    }
  }

  createCommand(command)  {
    return Object.assign(this.parseCommand(command), {
      id: 1,
      command: command,
      date: new Date()
    });
  }

  parseCommand(command) {

    console.log(command);

    let params = command.split(" ").filter((a) => a.length);

    let options = {
      '/create-cube': 'createCube',
      '/update-cube': 'updateCube',
      '/query-cube': 'queryCube',
      '/list-cubes': 'getCubes'
    };

    console.log(params);

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

    if(!command || !this.appService[command.action]) return Promise.reject('command not available');

    return this.appService[command.action](command.params).subscribe(
      (resp) => Promise.resolve(resp),
      (err) => Promise.reject('err'),
      () => console.log('completed')
      );

  }

}
