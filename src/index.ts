import express, { Request, Response } from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors())
const PORT = 5000
const NUMBERS_API_URL = "http://numbersapi.com/"

function digitsum(num: string): number {
    let sum = 0;
    for (const char of num) {
        sum += parseInt(char, 10);
    }

    return sum;
}

function isPrime(num: number): boolean {
    if (num <= 1) return false;

    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false;
        }
    }

    return true;
}

function isPerfect(num: number): boolean {
    if (num <= 1) return false;
    let sum = 0;
    for (let i = 1; i <= num / 2; i++) {
        if (num % i === 0) {
            sum += i;
        }
    }
    return sum === num;
}

function isArmstrong(num: string): boolean {
    const numDigits = num.length;
    let sum = 0;

    for (const char of num) {
        const digit = parseInt(char, 10);
        sum += Math.pow(digit, numDigits); 
    }

    return sum === Number(num);
}

  
app.get('/', async(req: Request, res: Response) => {
    const number = req.query.number
    if(Number.isNaN(Number(number))){
        res.status(400).json({
            "number": "alphabet",
            "error": true        
        })
    }
    try{
        const {data: fun_fact} = await axios.get(NUMBERS_API_URL+number+'/math')
        const data = {
            number,
            is_prime: isPrime(Number(number)),
            is_perfect: isPerfect(Number(number)),
            properties: isArmstrong(number as string) ? [ "armstrong", Number(number) % 2 === 0 ? "even" : "odd"] : [ Number(number) % 2 === 0 ? "even" : "odd"],
            digit_sum: digitsum(number as string),
            fun_fact
        } 
        res.status(200).json(data)
    }
    catch(err){
        res.status(500).json(err)
    }
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})