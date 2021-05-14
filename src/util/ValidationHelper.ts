import { Validatable } from 'Validatable.js';

export function validate(validatable: Validatable): boolean {
    let isValid = true;
    if (validatable.required) {
        isValid = isValid &&
            validatable
                .value
                .toString()
                .trim()
                .length !== 0;
    }
    if (validatable.minLength && typeof validatable.value === 'string') {
        isValid = isValid && validatable.value.trim().length >= validatable.minLength;
    }
    if (validatable.maxLength && typeof validatable.value === 'string') {
        isValid = isValid && validatable.value.trim().length <= validatable.maxLength;
    }
    if (validatable.min && typeof validatable.value === 'number') {
        isValid = isValid && validatable.value >= validatable.min;
    }
    if (validatable.max && typeof validatable.value === 'number') {
        isValid = isValid && validatable.value <= validatable.max;
    }

    return isValid;
}