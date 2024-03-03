/**
 * Imagine we have a set of actions, such as 'play', 'stop', etc., 
 * each represented by a function that does not return anything (void).
 * These actions might correspond to operations in a media player application.
 */
type Actions = {
    play: () => void,
    stop: () => void,
    addToPlaylist: () => void,
    removeFromPlaylist: () => void,
}

/**
 * To work with these actions more dynamically, we first need to get their names.
 * We use `keyof Actions` to create a type that represents all the keys of the Actions type,
 * effectively extracting the action names as a collection of literal types.
 */
type ActionKeys = keyof Actions;

/**
 * Next, we want to create a new type where each key (action name) from our original Actions
 * is transformed. We'll add an 'on' prefix to each and capitalize the first letter of the original action name.
 * This transformation represents our callback naming convention (e.g., 'play' becomes 'onPlay').
 * 
 * To achieve this, we use a mapped type with a template literal type (`on${Capitalize<Key>}`) for the key transformation.
 * The `Capitalize` utility type is a TypeScript feature that capitalizes the first letter of a string type.
 * The resulting type will map each original action to a new callback function type, maintaining the void return.
 */
type ActionCallbacks = {
    [Key in ActionKeys as `on${Capitalize<Key>}`]?: () => void
}

/**
 * Here we define an object that satisfies the ActionCallbacks type.
 * This object consists of functions that are named according to our transformed keys (e.g., 'onPlay').
 * Each function is currently a stub (an empty function) and can be implemented to handle the respective actions.
 */
const callbacks: ActionCallbacks = {
    onPlay: () => { },                // Callback for 'play' action
    onStop: () => { },                // Callback for 'stop' action
    onAddToPlaylist: () => { },       // Callback for 'addToPlaylist' action
    onRemoveFromPlaylist: () => { }   // Callback for 'removeFromPlaylist' action
}
