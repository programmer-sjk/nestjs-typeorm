export class ResponseEntity<T> {
    private statusCode: number;
    private message: string;
    private data: T;

    private constructor(
        statusCode: number,
        message: string,
        data: T
    ) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }

    static OK() {
        return new ResponseEntity(200, '', '')        
    }

    static OK_WITH(data) {
        return new ResponseEntity(200, '', data)        
    }

    static ERROR(errMessage: string) {
        return new ResponseEntity(200, errMessage, '')        
    }
}