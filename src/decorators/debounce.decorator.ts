export function Debounce(wait: number, immediate: boolean = false) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let timeout: any;
        const originalMethod = descriptor.value;
        descriptor.value = function () {
            const context = this
            const args = arguments;
            const later = function () {
                timeout = null;
                if (!immediate) originalMethod.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) originalMethod.apply(context, args);
        };
        return descriptor;
    }
}
