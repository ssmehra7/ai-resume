import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../config/db";
import { config } from "../config";
import { NextFunction, Request, Response } from "express";
import { couldStartTrivia } from "typescript";

export const signUpRouter = async (req: Request, res: Response, next: NextFunction) => {
    const { userName, password } = req.body;


    if (!userName || !password) {
        const error = createHttpError(401, "No user input");
        return next(error);
    }


    //checking of existing user
    try {

        const user = await prisma.user.findFirst({
            where: {
                userName,
            }
        });
        if (user) {
            const error = createHttpError(403, "User already exit");
            return next(error);
        }

        //hasing the password
        try {
            const hashPassword = await bcrypt.hash(password, 10);

            //creating the user

            try {
                const newUser = await prisma.user.create({
                    data: {
                        userName,
                        password: hashPassword,
                    }
                });



                //creating user 


                const token = jwt.sign({
                    sub: newUser.id
                }, config.jwtSecret as string, { expiresIn: "7d" });
                res.status(201).json({
                    message: "User created successfully",
                    accessToken: token,
                });

                return;
            } catch (error) {
                return next(createHttpError(500, "Error in the creating the user"));
            }
        } catch (error) {
            console.log(error);
            return next(createHttpError(500, "Error in hashing the password"));
        }
    } catch (error) {
        console.log(error);
        return next(createHttpError(501, "Error in checking the existing User"));
    }




}



export const signInRouter = async (req: Request, res: Response, next: NextFunction) => {
    const { userName, password } = req.body;


    if (!userName || !password) {
        const error = createHttpError(401, "No user input");
        return next(error);
    }


    //checking of user
    try {
        const user = await prisma.user.findFirst({
            where: {
                userName,
            }
        });
        if (!user) {
            const error = createHttpError(401, "User doesnot exist");
            return next(error);
        }
        //hasing the password
        const isMatch = await bcrypt.compare(password, user.password);

        //checking matching password
        if (!isMatch) {
            const error = createHttpError(400, "Password is incorrect.");
            return next(error);
        }





        const token = await jwt.sign({
            sub: user.id
        }, config.jwtSecret as string, { expiresIn: "7d" });


        res.status(200).json({
            message: "User logged in successfully",
            accessToken: token,
        });

        return;

    } catch (error) {
        return next(createHttpError(500, "Error in signing the user"));
    }




}


