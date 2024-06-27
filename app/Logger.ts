import EventEmitter from "react-native/Libraries/vendor/emitter/EventEmitter";

const prefix: string[] =  [
    ' %c %c %c Bluestack Demo %c %c %c ',
    'background: #278CEB',
    'background:#006db6',
    'color: #fff; ' +
    'background: #001c4a;',
    'background: #006db6',
    'background: #278CEB', ''];

class Logger extends EventEmitter {
    public log(...data: any[]): void {
        console.log.apply(console, prefix.concat(...data));

        this.emit('log', data)
    }
}

export default new Logger();