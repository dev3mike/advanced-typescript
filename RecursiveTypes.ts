/**
 * Define a generic type 'Tuple' to create a tuple with a fixed length and type for its elements.
 * - 'TupleType' is the type of elements that the tuple will contain.
 * - 'Length' is a number that specifies the fixed length of the tuple.
 * - 'Accumulator' is an array that collects elements of the tuple as we build it. It starts as an empty array by default.
 * This type uses recursion to build up the 'Accumulator' array until it reaches the desired length.
 * 
 * The process works as follows:
 * - Check if the current length of 'Accumulator' matches the desired 'Length'.
 * - If it does, the recursion ends, and 'Accumulator' is returned as the final tuple type.
 * - If not, the type recursively calls itself, adding another 'TupleType' element to the 'Accumulator'.
 * This addition is done through the spread operator '[...Accumulator, TupleType]', which appends a new element of 'TupleType' to the array.
 * - This process repeats until the length of 'Accumulator' matches 'Length', ensuring the tuple has exactly 'Length' elements of type 'TupleType'.
 */
type Tuple<TupleType, Length extends number, Accumulator extends TupleType[] = []>
    = Accumulator['length'] extends Length
    ? Accumulator
    : Tuple<TupleType, Length, [...Accumulator, TupleType]>;

/**
 * Example: Create a type 'RgbColorTuple' as a tuple of numbers with a fixed length of 3.
 * This is done by specifying 'number' as the 'TupleType' and '3' as the 'Length'.
 * The resulting type will be a tuple type with exactly 3 'number' elements: [number, number, number].
 */
type RgbColorTuple = Tuple<number, 3>; // Output: type RgbColorTuple = [number, number, number]
