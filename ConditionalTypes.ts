/**
 * Define a conditional type called NonEmptyString. This type takes a generic parameter T,
 * which is constrained to be a subtype of string (T extends string). The conditional type checks:
 * - If T is an empty string (''), it resolves to 'never', essentially disallowing empty strings.
 * - If T is not an empty string, it resolves to the original type T.
 * 
 * The 'never' type in TypeScript is used here to represent a type that should never occur.
 * When T is '', TypeScript will prevent the code from compiling if an empty string is passed
 * to functions expecting a NonEmptyString, enforcing a compile-time check against empty strings.
 */
type NonEmptyString<T extends string> = T extends '' ? never : T;

/**
 * Define a function AssertNotEmptyString that takes one parameter 'input'.
 * The parameter type uses our NonEmptyString conditional type, enforcing that the input cannot be an empty string.
 * 
 * The generic parameter T extends string ensures that this function can only be called with string types,
 * and the use of NonEmptyString<T> as the type of 'input' applies our compile-time check.
 * 
 * Inside the function, we perform a runtime check to see if the input string's length is 0.
 * If it is, we throw an Error, indicating that the function was somehow called with an empty string at runtime.
 * This serves as a safety net in case the function is misused in a way that bypasses TypeScript's static checks
 * (e.g., when TypeScript code is compiled down to JavaScript, which doesn't have compile-time type checks).
 */
function AssertNotEmptyString<T extends string>(input: NonEmptyString<T>) {
    if (!input.length)
        throw new Error("The string cannot be empty");
}

// Example usages:
AssertNotEmptyString("Not empty string"); // This call is fine both at compile time and runtime.
AssertNotEmptyString(""); // This call fails at compile time due to TypeScript's type checking,
                           // and it would also fail at runtime if it were somehow bypassed.
