import { FormElem } from './FormElem';

class FormValidator {
  private elems : FormElem<unknown>[];

  constructor(elems: FormElem<unknown>[]) {
    this.elems = elems || [];
  }

  get isValid() : boolean {
    return this.elems.every((v) => v.isValid);
  }

  get value(): unknown {
    return this.elems;
  }
}

export { FormValidator, FormElem };
