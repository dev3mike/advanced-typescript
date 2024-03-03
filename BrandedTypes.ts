/**
 * This function creates a branded type from a primitive type.
 * - `PrimitiveType`: The base type we're starting with, like `string`.
 * - `BrandName`: A unique identifier for the branded type.
 * - `Brand`: The resulting type, which is a combination of the primitive type and a unique brand marker.
 * 
 * Arguments:
 * - `isTypeFn`: A function that checks if the input of the primitive type meets certain criteria.
 * - `brandName`: The unique identifier for the branded type.
 * 
 * Returns:
 * - A tuple containing:
 *   - A type guard function (`isBrand`) that checks if an input is of the branded type.
 *   - An object of the branded type.
 */
function BrandedType<
    PrimitiveType,
    BrandName,
    Brand extends PrimitiveType & { __brand: BrandName }
>(
    isTypeFn: (input: PrimitiveType) => boolean, // Function to validate the primitive type.
    brandName: BrandName // The unique identifier for the brand.
)
    : [(input: PrimitiveType) => input is Brand, Brand] { // Returns a type guard and an instance of the brand.
    const isBrand = function (input: PrimitiveType): input is Brand {
        return isTypeFn(input); // Uses the provided function to validate the input.
    }
    return [isBrand, {} as Brand]; // Returns the type guard and a branded object.
}

/**
 * An example validation function that could check if a string meets certain criteria,
 * like being in a valid email format. Here, it's simplified to always return true.
 */
function validateFunction(input: string): boolean {
    // Input validation logic would go here.
    return true;
}

// Creating a branded type for emails using the `BrandedType` function.
const [isEmail, validEmailObject] = BrandedType(validateFunction, 'ValidEmail' as const);
// `ValidEmailType` is now a distinct type, representing a string that has been validated as an email.
type ValidEmailType = typeof validEmailObject;

/**
 * A function that sends an email, which requires an argument of type `ValidEmailType`.
 * This ensures that the function can only be called with validated email addresses.
 */
function sendEmail(email: ValidEmailType) {
    // Logic to send the email would go here.
}

const emailAddress = "test@gmail.com";
sendEmail(emailAddress); // This will fail at compile time because `emailAddress` hasn't been validated.

// Use the `isEmail` type guard to check if `emailAddress` is a valid email.
// If true, TypeScript knows `emailAddress` is of type `ValidEmailType` within this block.
if (isEmail(emailAddress)) {
    sendEmail(emailAddress); // This is allowed because `emailAddress` has been confirmed as a valid email.
}
