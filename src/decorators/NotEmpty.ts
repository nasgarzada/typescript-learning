// NotEmpty decorator function like hibernate validator
export default function NotEmpty() {
    return function (target: any, propKey: string) {
        let value: string;
        const getter = () => value;
        const setter = (newVal: string) => {
            if (newVal === undefined ||
                newVal === null ||
                newVal.trim().length === 0
            ) {
                Object.defineProperty(target, 'errors', {
                    value: `Value ${newVal} must not be empty`
                });
            } else {
                value = newVal;
            }
        };

        Object.defineProperty(target, propKey, {
            get: getter,
            set: setter
        });
    }
}