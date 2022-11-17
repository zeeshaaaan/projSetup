class LogObject{
    message:string;
    time:string;
    level:string;

    constructor(entry:any){
        this.message=entry?.message;
        this.time=entry?.time;
        this.level=entry?.level;
    }
}

export default LogObject;