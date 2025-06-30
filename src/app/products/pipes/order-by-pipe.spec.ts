import { OrderByPipe } from './order-by-pipe';

interface TestObj {
  name?: string;
  price?: number;
}

describe('OrderByPipe', () => {
  it('create an instance', () => {
    const pipe = new OrderByPipe();
    expect(pipe).toBeTruthy();
  });

  it('should sort array of objects by string property ascending', () => {
    const pipe = new OrderByPipe<TestObj>();
    const arr: TestObj[] = [
      { name: 'Banana' },
      { name: 'Apple' },
      { name: 'Cherry' },
    ];
    const result = pipe.transform(arr, 'name', 'asc');
    expect(result).toEqual([
      { name: 'Apple' },
      { name: 'Banana' },
      { name: 'Cherry' },
    ]);
  });

  it('should sort array of objects by string property descending', () => {
    const pipe = new OrderByPipe<TestObj>();
    const arr: TestObj[] = [
      { name: 'Banana' },
      { name: 'Apple' },
      { name: 'Cherry' },
    ];
    const result = pipe.transform(arr, 'name', 'desc');
    expect(result).toEqual([
      { name: 'Cherry' },
      { name: 'Banana' },
      { name: 'Apple' },
    ]);
  });

  it('should sort array of objects by number property ascending', () => {
    const pipe = new OrderByPipe<TestObj>();
    const arr: TestObj[] = [
      { price: 30 },
      { price: 10 },
      { price: 20 },
    ];
    const result = pipe.transform(arr, 'price', 'asc');
    expect(result).toEqual([
      { price: 10 },
      { price: 20 },
      { price: 30 },
    ]);
  });

  it('should sort array of objects by number property descending', () => {
    const pipe = new OrderByPipe<TestObj>();
    const arr: TestObj[] = [
      { price: 30 },
      { price: 10 },
      { price: 20 },
    ];
    const result = pipe.transform(arr, 'price', 'desc');
    expect(result).toEqual([
      { price: 30 },
      { price: 20 },
      { price: 10 },
    ]);
  });

  it('should return the same array if empty', () => {
    const pipe = new OrderByPipe<TestObj>();
    const arr: TestObj[] = [];
    expect(pipe.transform(arr, 'name', 'asc')).toBe(arr);
  });

  it('should return the same array if sort key is missing', () => {
    const pipe = new OrderByPipe<TestObj>();
    const arr: TestObj[] = [{}, {}];
    expect(pipe.transform(arr, 'name', 'asc')).toBe(arr);
  });
});
