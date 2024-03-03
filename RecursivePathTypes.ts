// Define a User interface with multiple nested objects to represent a user's information.
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
 * Define a generic type 'Path' to extract all possible paths through an object's structure.
 * This type uses recursion to walk through the object, building up paths as arrays of keys.
 *
 * - If 'T' is an object, the type iterates over all keys of 'T' using 'keyof T'.
 * - For each key ('Key'), it constructs an array of paths. Each path is an array starting with the current key.
 * - If the value at 'Key' is itself an object, the recursion continues, appending the paths from 'T[Key]' to the current key.
 * - This process repeats until it reaches values that are not objects, at which point it stops recursing.
 * - The resulting type is a union of all these paths, represented as arrays of strings.
 * - If 'T' is not an object, the recursion base case returns 'never', indicating no further paths.
 *
 * The type effectively maps over each property of the object, exploring all nested objects recursively to build up a complete list
 * of paths that can be taken through the object from the top level down to the most nested properties.
 */
type Path<T> = T extends object ? { [Key in keyof T]: [Key] | [Key, ...Path<T[Key]>] }[keyof T] : never;

// Use the 'Path' type to determine all paths through the 'User' interface.
type UserType = Path<User>;
/**
 * The 'UserType' type now represents all possible paths as tuples:
 * - Simple paths for top-level properties like "id" are represented as ["id"].
 * - Nested paths, such as those reaching into the 'address' object and beyond, are represented by longer arrays,
 *   like ["address", "country"] or ["address", "street", "streetName"].
 * This allows for type-safe access to any property within the 'User' object by specifying its path as an array of keys.
 */
