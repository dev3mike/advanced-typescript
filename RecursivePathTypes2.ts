// Define the User interface with nested objects to represent detailed user information.
interface User {
    id: string,
    firstName: string,
    lastName: string,
    address: {
        country: string,
        city: string,
        street: {
            streetName: string,
            streetNumber: string,
        },
        flat: {
            flatName: string,
            flatNumber: string,
        }
    }
}

/**
 * Define a type 'Paths' that recursively constructs dot-separated string paths through an object.
 *
 * - The type checks if 'T' is an object. If so, it iterates over each key of 'T'.
 * - For each key, there are two possibilities:
 *   1. The key leads to a nested object ('T[Key]' is an object), and the recursion continues. The paths
 *      from the nested object are prefixed with the current key and a dot.
 *   2. The key is for a non-object value, in which case the current key itself represents a path.
 * - The recursion builds up strings representing each path from the top level down to the deepest nested properties,
 *   concatenating keys with dots as separators.
 * - This process generates a union of string literals, where each string is a path through the object.
 * - If 'T' is not an object, the type resolves to never, indicating the end of a path.
 *
 * The use of template literal types (`${Key}.${Path<T[Key]>}`) is key to concatenating the paths with dots,
 * allowing for nested property access paths to be represented as single, dot-separated strings.
 */
type Paths<T> = T extends object
    ? {
        [K in keyof T]: K extends string | number
        ? T[K] extends object
        ? `${K}.${Paths<T[K]>}` | `${K}`
        : `${K}`
        : never;
    }[keyof T]
    : never;

// Use the 'Paths' type to extract all dot-separated paths through the 'User' interface.
type UserPaths = Paths<User>;

/**
 * The 'UserPaths' type will include strings representing paths through the User object, such as:
 * - "id"
 * - "firstName"
 * - "lastName"
 * - "address.country"
 * - "address.city"
 * - "address.street.streetName"
 * - "address.street.streetNumber"
 * - "address.flat.flatName"
 * - "address.flat.flatNumber"
 * And so on for every possible path through the 'User' interface.
 */

// Example of what 'UserPaths' might look like:
// "id" | "firstName" | "lastName" | "address" | "address.country" | "address.city" | "address.street" | "address.street.streetName" | ...
