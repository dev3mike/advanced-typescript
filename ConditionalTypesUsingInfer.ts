function add(a: number, b: number) {
    return a + b;
}

const userName = "Masoud";

// Now, let's explore how to work with TypeScript to deduce return types.

/**
 * Define a generic type 'AddReturnType' that aims to extract the return type of a given function.
 * - It uses a conditional type to check if the provided type 'T' is a function type.
 * - If 'T' is a function (`...args: any[]` represents any function arguments), 
 *   it uses the 'infer' keyword to infer the return type 'R' of that function.
 * - If the inference is successful, it resolves to 'R', giving us the function's return type.
 * - If 'T' is not a function type, the type resolves to 'never', indicating an invalid case for our type.
 */
type AddReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

// Use the 'AddReturnType' type to deduce the return type of the 'add' function.
// Since 'add' is a function that returns a number, 'AddReturn' is resolved to 'number'.
type AddReturn = AddReturnType<typeof add>; // Output: number

// Attempt to use the 'AddReturnType' type with 'userName', which is not a function but a string.
// This results in 'MasoudReturn' being resolved to 'never', because 'userName' does not fit the function type pattern.
type MasoudReturn = AddReturnType<typeof userName>; // Output: never

// The above examples demonstrate 'AddReturnType' in action:
// - It successfully extracts the return type of a function ('add' in this case).
// - It properly handles non-function inputs ('userName'), resulting in the type 'never' to indicate the mismatch.
