const token = '[\\w-]*';

export const replace = (
  patternPath: string,
  data: string | Record<string, string>,
  { prefix = ':', delimiter = '/' } = {},
): string => {
  if (typeof data === 'string') {
    return patternPath.replace(getMatchRegex(prefix), data);
  }

  const { pathFragments, isAMatch } = getMatches(patternPath, prefix, delimiter);
  return (
    pathFragments
      .map((fragment) => isAMatch(fragment) ? getDataByFragment(data, fragment, prefix) : fragment)
      .join(delimiter)
  );
};

export const extract = (
  patternPath: string,
  replacedPath: string,
  { prefix = ':', delimiter = '/' } = {},
): Record<string, string> => {
  const pathWithoutPrefixRegex = new RegExp(patternPath.replace(getMatchRegex(prefix), token));
  if (!pathWithoutPrefixRegex.test(replacedPath)) {
    return {};
  }

  const { pathFragments, isAMatch } = getMatches(patternPath, prefix, delimiter);
  return (
    replacedPath
      .split(delimiter)
      .reduce<Record<string, string>>((data, replacedFragment, index) => {
        const originalFragment = pathFragments[index];
        if (isAMatch(originalFragment)) {
          data[removePrefix(originalFragment, prefix)] = replacedFragment;
        }
        return data;
      }, {})
  );
};

const getMatchRegex = (prefix: string) => new RegExp(`\\${prefix}${token}`, 'g');

const getMatches = (path: string, prefix: string, delimiter: string) => {
  const pathFragments = path.split(delimiter);
  const pathMatches = path.match(getMatchRegex(prefix)) || [];
  const isAMatch = (fragment: string) => pathMatches.indexOf(fragment) !== -1;

  return { pathFragments, isAMatch };
};

const getDataByFragment = (
  data: Record<string, string>,
  fragment: string,
  prefix: string,
) => data[fragment.replace(prefix, '')] || '';

const removePrefix = (fragment: string, prefix: string) => fragment.replace(prefix, '');
