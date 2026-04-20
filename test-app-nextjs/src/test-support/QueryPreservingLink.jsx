import { Link, useLocation } from 'react-router-dom';

export default function QueryPreservingLink({ to, ...rest }) {
  const { search } = useLocation();
  return (
    <Link
      to={typeof to === 'string' ? { pathname: to, search } : { search, ...to }}
      {...rest}
    />
  );
}
