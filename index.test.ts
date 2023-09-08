import * as pathern from './index';

describe(`pattern`, () => {
  describe(`replace`, () => {
    it(`returns path if no matches found`, () => {
      expect(pathern.replace('a/b/c', { a: '1' })).toBe('a/b/c');
    });

    it(`replaces match with empty string if no data matches`, () => {
      expect(pathern.replace('a/:b/c', { a: '1' })).toBe('a//c');
    });

    it(`replaces match with data`, () => {
      expect(pathern.replace('postContent/:postId', { postId: '1' })).toBe('postContent/1');
    });

    it(`replaces multiple matches with data`, () => {
      expect(pathern.replace(':a/:b/:c', { a: '1', b: '2', c: '3' })).toBe('1/2/3');
    });

    it(`replaces match with string`, () => {
      expect(pathern.replace('postContent/:postId', '1')).toBe('postContent/1');
    });

    it(`replaces multiple matches with string`, () => {
      expect(pathern.replace(':a/:b/:c', '1')).toBe('1/1/1');
    });

    it(`replaces data with custom delimiter`, () => {
      expect(pathern.replace(
        'mnt/c/blog/posts/:postId/content.md',
        { postId: '1' },
        { delimiter: '/' },
      )).toBe('mnt/c/blog/posts/1/content.md');
    });

    it(`replaces data with custom prefix`, () => {
      expect(pathern.replace(
        '$a/$b/$c',
        { a: '1', b: '2', c: '3' },
        { prefix: '$' },
      )).toBe('1/2/3');
    });
  });

  describe(`extract`, () => {
    it(`returns empty object if no matches found`, () => {
      expect(pathern.extract('a', '1')).toEqual({});
    });

    it(`returns data if empty match found`, () => {
      expect(pathern.extract('a/:b/c', 'a//c')).toEqual({ b: '' });
    });

    it(`returns data if string match found`, () => {
      expect(pathern.extract('a/:b/c', 'a/2/c')).toEqual({ b: '2' });
    });

    it(`returns data if multiple matches found`, () => {
      expect(pathern.extract('a/:b/c/:d', 'a/2/c/4')).toEqual({ b: '2', d: '4' });
    });

    it(`returns empty object if non-prefixed fragments don't match`, () => {
      expect(pathern.extract('a/:b/c', 'x/2/c')).toEqual({});
    });

    it(`returns empty object if multiple non-prefixed fragments don't match`, () => {
      expect(pathern.extract('a/:b/c/:d', 'a/2/y/4')).toEqual({});
    });

    it(`returns data when the sole match contains a dash`, () => {
      expect(pathern.extract('/document/:id', '/document/abc-def')).toEqual({ id: 'abc-def' });
    });

    it(`returns data when one of multiple matches contains a dash`, () => {
      expect(
        pathern.extract('/document/:type/:id', '/document/google-docs/abc'),
      ).toEqual({ type: 'google-docs', id: 'abc' });
    });

    it(`returns data when multiple matches contain a dash`, () => {
      expect(
        pathern.extract('/document/:type/:id', '/document/google-docs/abc-def'),
      ).toEqual({ type: 'google-docs', id: 'abc-def' });
    });

    it(`return data with custom delimiter`, () => {
      expect(pathern.extract(
        'mnt/c/blog/posts/:postId/content.md',
        'mnt/c/blog/posts/1/content.md',
        { delimiter: '/' },
      )).toEqual({ postId: '1' });
    });

    it(`replaces data with custom prefix`, () => {
      expect(pathern.extract(
        '$a/$b/$c',
        '1/2/3',
        { prefix: '$' },
      )).toEqual({ a: '1', b: '2', c: '3' });
    });
  });

  describe(`matches`, () => {
    it(`returns false for empty pattern match`, () => {
      expect(pathern.matches('', 'a/1/c')).toBe(false);
    });

    it(`returns false for empty path match`, () => {
      expect(pathern.matches('a/:b', '')).toBe(false);
    });

    it(`returns false for partial pattern match`, () => {
      expect(pathern.matches('a/:b', 'a/1/c')).toBe(false);
    });

    it(`returns false for partial path match`, () => {
      expect(pathern.matches('a/:b/c', 'a/1')).toBe(false);
    });

    it(`returns true for exact match`, () => {
      expect(pathern.matches('a/:b/c', 'a/1/c')).toBe(true);
    });
  });
});
