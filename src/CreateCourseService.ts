
/**
 * name - string
 * duration - number
 * educator - string
 */

interface Course {
    name: string; 
    duration?: number; 
    educator: string;
}

class CreateCourseService {
    /* execute(data: Course) {
        console.log(data.name, data.duration, data.educator);
    } */

    execute({ name, duration = 8, educator }: Course) {
        console.log(name, duration, educator);
    }
}

export default new CreateCourseService();