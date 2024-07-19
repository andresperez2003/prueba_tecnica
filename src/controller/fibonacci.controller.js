import { text } from "express";
import { Fibonacci} from "../model/fibonacci.model.js";
import nodemailer from 'nodemailer';


export const getFinabonacci = async(req,res)=> {
    const fibonacci = await Fibonacci.findAll();
    console.log(fibonacci);
    return res.status(200).json({message: fibonacci});
}

function validateIfNumberIsInteger(firstNumber, secondNumber) {
    if (!Number.isInteger(firstNumber) || !Number.isInteger(secondNumber) || firstNumber < 0 || secondNumber < 0) {
        return true;
    }
    return false;
}

function validateNumber(firstNumber, secondNumber, length) {
    if ((length < 0 || length>60) || (firstNumber < 0 || firstNumber>24 ) || (secondNumber < 0 || secondNumber > 60)) {
        return true;
    }
    return false;

}

function fibonacciSeries(firstNum, secondNum, length) {

    // Validar que los numeros sean un números positivos
    if (validateNumber(firstNum, secondNum, length)) {
        throw new Error("Los números deben ser enteros positivos");
    }

    // Validar que firstNum y secondNum sean números enteros positivos
    if (validateIfNumberIsInteger(firstNum, secondNum)) {
        throw new Error("Los dos primeros números deben ser enteros");
    }

    // Caso especial si length es 1 o menos
    if (length === 1) {
        return [firstNum];
    } else if (length === 2) {
        return [firstNum, secondNum];
    }


    let fibonacci = [firstNum, secondNum];

    // Generacion de la serie de fibonacci
    while (fibonacci.length < length + 2) {
        let nextNum = fibonacci[fibonacci.length - 1] + fibonacci[fibonacci.length - 2];
        fibonacci.push(nextNum);
    }

    return fibonacci;
}

export const createFinabonacciDateAutomatic = async(req,res)=> {
    try {
        let now = new Date();
        console.log(now.getHours(), ":", now.getMinutes(), ":", now.getSeconds());
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();

        if(hours>9){ hours = hours % 10}
        if(minutes>9){ minutes = minutes % 10}

        console.log(hours, ":", minutes, ":", seconds);

        let fibonacci = fibonacciSeries(hours, minutes, seconds);

        await Fibonacci.create({
            hours: now.getHours(),
            minutes: now.getMinutes(),
            seconds: now.getSeconds(),
            serie_fibonacci: fibonacci.toString(),
            type: 'automatic'
        });

        const fibonacciDescendente = fibonacci.reverse();
        return res.status(200).json({message: fibonacciDescendente});
        


        //sendEmail(hours, minutes, seconds, fibonacci);

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}


function sendEmail(hours, minutes, seconds, fibonacci){
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "andresap2017@gmail.com",
    pass: "voij ajyx qqgz vcch",
  },
});


 let mail = {
    from:"andresap2017@gmail.com",
    to:"andresap2017@gmail.com",
    subject:"Serie de fibonacci",
    text:"Hola usuario",
    html:`<p>Serie de fibonacci: ${fibonacci} </p>  <h4>generado a las ${hours} : ${minutes} : ${seconds} </h4>`
 }

transporter.sendMail(mail, function(err, info){
    if(err){
        console.log(err);
    }else{
        console.log("Email enviado");
    }
})

}


export const createFinabonacciDateUser = async(req,res)=> {
    try {
        let {hours, minutes, seconds } = req.body;
        console.log(hours, ":", minutes, ":", seconds);

        hours = parseInt(hours)
        minutes = parseInt(minutes)
        seconds = parseInt(seconds)

        if (hours == undefined || minutes === undefined || seconds === undefined) {
            return res.status(400).json({ message: "Los campos de horas, minutos y segundos son requeridos y no pueden ser cero" });
        }

        if(hours>9){ hours = hours % 10}
        if(minutes>9){ minutes = minutes % 10}


        let fibonacci = fibonacciSeries(hours, minutes, seconds);
    


        await Fibonacci.create({
            hours: hours,
            minutes: minutes,
            seconds: seconds,
            serie_fibonacci: fibonacci.toString(),
            type: 'user'
        });

        const fibonacciDescendente = fibonacci.reverse();
        return res.status(200).json({message: fibonacciDescendente});

        //sendEmail(hours, minutes, seconds, fibonacci);

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}


export const getFinbonacciAutomatic = async(req,res)=>{
    const model = await Fibonacci.findAll({ where: {type: "automatic"} });
    if (!model) {
        return res.status(400).json({ success: false, error: 'Model not found', status:404 })
    }
    return res.status(200).json({ success: true, data: model, status:200 })
}

export const getFinbonacciManual = async(req,res)=>{
    const model = await Fibonacci.findAll({ where: {type: "user"} });
    if (!model) {
        return res.status(400).json({ success: false, error: 'Model not found', status:404 })
    }
    return res.status(200).json({ success: true, data: model, status:200 })
}