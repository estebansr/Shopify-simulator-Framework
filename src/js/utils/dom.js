export class DOM {
    getTarget(target) {
        return typeof target === 'string'
            ? document.querySelector(target)
            : target;
    }
}