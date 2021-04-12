export default class MathUtil {
    //return a random int value in [0, range)
    static getRandomInt(range: number): number {
        if (!range || range < 0) {
            return 0;
        }

        return Math.floor(Math.random() * Math.floor(range));
    }
}