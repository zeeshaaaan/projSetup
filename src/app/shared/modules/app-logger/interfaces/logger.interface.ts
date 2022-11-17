interface ILogger{
    entering(message:string):void;
    exiting(message:string):void;
    trace(message:string):void;
    debug(message:string):void;
    info(message:string):void;
    log(message:string):void;
    warn(message:string):void;
    error(message:string):void;
    fatal(message:string):void;
}

export default ILogger;