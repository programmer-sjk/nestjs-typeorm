export class ResponseEntity {
    private statusCode: number;
    private message: string;
    private data: string;

    private constructor(
        statusCode: number,
        message: string,
        data: string
    ) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }

    static OK() {
        return new ResponseEntity(200, '', '')        
    }
}