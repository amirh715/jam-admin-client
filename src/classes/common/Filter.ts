class Filter<T> {
  private _locked: boolean;
  private _value : T;

  public constructor(
    value: T,
    locked: boolean,
  ) {
    this._locked = locked;
    this._value = value;
  }

  public get value() : T {
    return this._value;
  }

  public set value(value: T) {
    if (this.isLocked) return;
    this._value = value;
  }

  public get isLocked() : boolean {
    return this._locked;
  }

  public set isLocked(locked: boolean) {
    this._locked = locked;
  }
}

export { Filter };
