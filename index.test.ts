import * as pathern from './index';

describe(`pattern`, () => {
  describe(`replace`, () => {
    it(`should return path if no matches found`, () => {
      expect(pathern.replace('a/b/c', { a: '1' })).toBe('a/b/c');
    });

    it(`should replace match with empty string if no data matches`, () => {
      expect(pathern.replace('a/:b/c', { a: '1' })).toBe('a//c');
    });

    it(`should replace match with data`, () => {
      expect(pathern.replace('postContent/:postId', { postId: '1' })).toBe('postContent/1');
    });

    it(`should replace multiple matches with data`, () => {
      expect(pathern.replace(':a/:b/:c', { a: '1', b: '2', c: '3' })).toBe('1/2/3');
    });

    it(`should replace match with string`, () => {
      expect(pathern.replace('postContent/:postId', '1')).toBe('postContent/1');
    });

    it(`should replace multiple matches with string`, () => {
      expect(pathern.replace(':a/:b/:c', '1')).toBe('1/1/1');
    });

    it(`should replace data with custom delimiter`, () => {
      expect(pathern.replace(
        'C:\\Projects\\modulo-sync\\posts\\:postId\\content.md',
        { postId: '1' },
        { delimiter: '\\' },
      )).toBe('C:\\Projects\\modulo-sync\\posts\\1\\content.md');
    });

    it(`should replace data with custom prefix`, () => {
      expect(pathern.replace(
        '$a/$b/$c',
        { a: '1', b: '2', c: '3' },
        { prefix: '$' },
      )).toBe('1/2/3');
    });
  });

  describe(`extract`, () => {
    it(`should return empty object if no matches found`, () => {
      expect(pathern.extract('a', '1')).toEqual({});
    });

    it(`should return data if empty match found`, () => {
      expect(pathern.extract('a/:b/c', 'a//c')).toEqual({ b: '' });
    });

    it(`should return data if string match found`, () => {
      expect(pathern.extract('a/:b/c', 'a/2/c')).toEqual({ b: '2' });
    });

    it(`should return data if multiple matches found`, () => {
      expect(pathern.extract('a/:b/c/:d', 'a/2/c/4')).toEqual({ b: '2', d: '4' });
    });

    it(`should return empty object if non-prefixed fragments don't match`, () => {
      expect(pathern.extract('a/:b/c', 'x/2/c')).toEqual({});
    });

    it(`should return empty object if multiple non-prefixed fragments don't match`, () => {
      expect(pathern.extract('a/:b/c/:d', 'a/2/y/4')).toEqual({});
    });
  });
});
