import isPropValid from '@emotion/is-prop-valid';

export default function filterHtmlProps(props) {
  return Object.fromEntries(Object.entries(props).filter(([key]) => isPropValid(key)));
}
