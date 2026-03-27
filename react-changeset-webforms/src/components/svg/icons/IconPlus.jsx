import filterHtmlProps from '../../../utils/filter-html-props.js';

export default function IconTrash({ children, ...rest }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 252 252"
      class="single-colour icon-plus"
      data-test-icon="icon-plus"
      {...filterHtmlProps(rest)}
    >
      <rect
        x="118"
        width="16"
        height="252"
      />
      <rect
        x="118"
        transform="matrix(4.479268e-11 -1 1 4.479268e-11 -5.285543e-9 252)"
        width="16"
        height="252"
      />
    </svg>
  );
}
