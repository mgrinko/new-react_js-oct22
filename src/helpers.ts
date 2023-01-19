function isObject(object: any): object is object {
  return object != null && typeof object === 'object';
}

export function isEqual(obj1: object, obj2: object) {
	var props1 = Object.getOwnPropertyNames(obj1) as Array<keyof typeof obj1>;
	var props2 = Object.getOwnPropertyNames(obj2) as Array<keyof typeof obj2>;
	if (props1.length !== props2.length) {
			return false;
	}
	for (var i = 0; i < props1.length; i++) {
			let val1 = obj1[props1[i]];
			let val2 = obj2[props1[i]];
			let isObjects = isObject(val1) && isObject(val2);
			if ((isObjects && !isEqual(val1, val2)) || (!isObjects && val1 !== val2)) {
					return false;
			}
	}
	return true;
}
