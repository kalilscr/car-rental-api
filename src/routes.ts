import { Request, Response } from "express";
import CreateCourseService from "./CreateCourseService";

export function createCourse(request: Request, response: Response) {
    CreateCourseService.execute({
        name: "NodeJS", 
        educator: "Kalil",
        duration: 10, 
    });

    CreateCourseService.execute({
        name: "React", 
        educator: "Rodrigo",
    });

    return response.send();
}