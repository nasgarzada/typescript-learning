//autobind decorator
export default function Autobind(
    _: any,
    _2: string,
    descriptor: PropertyDescriptor
) {
    const originalMethod = descriptor.value;
    console.log('Autobind: ' + originalMethod)
    return {
        configurable: true,
        get() {
            return originalMethod.bind(this);
        }
    };
}