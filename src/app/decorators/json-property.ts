export function JsonProperty(name?: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if (!target.hasOwnProperty('_jsonUnserializeMeta')) {
            target.constructor.prototype._jsonUnserializeMeta = [{ prop: propertyKey, jsonProp: name || propertyKey }];
        } else {
            target.constructor.prototype._jsonUnserializeMeta.push({ prop: propertyKey, jsonProp: name || propertyKey });
        }
    };
}