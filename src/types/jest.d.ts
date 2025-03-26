declare namespace jest {
  interface Matchers<R> {
    toBe(expected: any): R;
  }
}

declare function describe(name: string, fn: () => void): void;
declare function test(name: string, fn: () => void): void;
declare function expect(value: any): jest.Matchers<any>; 