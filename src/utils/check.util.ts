export class CheckUtil {
    public static ensureDefined<T>(value: T | undefined, errorMessage?: string): T {
        if (value === undefined) {
            throw new Error(errorMessage);
        }
        return value;
    }

    /**
     * Ensures that the provided value is truthy. If the value is falsy,
     * throws an error with the specified error message.
     *
     * @param value - The value to check for truthiness.
     * @param errorMessage - The error message to throw if the value is falsy.
     *
     * @throws Error - Throws an error if the value is falsy.
     */
    public static ensureTruthy(value: any, errorMessage = 'not truthy'): asserts value {
        if (!value) {
            throw new Error(errorMessage);
        }
    }
}
