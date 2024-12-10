import { Injectable } from '@nestjs/common';
import * as AWS from "aws-sdk"


@Injectable()
export class ExtractTextService {
    constructor(){}

    public async  extractTextFromDocument(bucketName, documentName){
        const textract = new AWS.Textract()
        const params = {
            Document: {
                S3Object:{
                    Bucket: bucketName,
                    Name: documentName
                }
            }
        }
        const data = await textract.detectDocumentText(params).promise()
        const lines = data.Blocks.filter((block)=> block.BlockType === "LINE").map((block)=> block.Text)
        console.log(lines.join("\n"))
        console.log(lines)
    }
}
