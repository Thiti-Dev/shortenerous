type Class<T = any> = new (...args: any[]) => T;

/**
 * @description Applied all the property from target class to the base class
 * @param base 
 * @param from 
 * @returns Class [that was passed in the T generic params]
 * @example 
 * ```ts
 * const newlyAppliedClass = applyPropertiesValueFrom<AnyClass>(AnyClass,AnyClass2)
 * 
 * ```
 */
export function applyPropertiesValueFrom<T>(base:Class,from:Object):T{
    if (!(base instanceof Object)) throw new Error('base arg is not a valid constructable class')
    const properties = Object.getOwnPropertyNames(from)

    try {
        const $class = new (base as unknown as Class)() // catching this block
        for (let key of properties){
            $class[key] = from[key]
        }
        return $class
    } catch (error) {
        throw new Error('base arg is not a valid constructable class')
    }
}