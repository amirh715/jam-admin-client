class FormElem<T> {
  public value: T;
  public isValid: boolean;

  constructor(value: T, isValid: boolean) {
    this.value = value;
    this.isValid = isValid;
  }
}

export { FormElem };
