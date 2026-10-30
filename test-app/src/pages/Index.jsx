import { Link } from 'react-router-dom';
import { DocsHero } from 'react-docs-utils';

export default function Index() {
  return (
    <DocsHero
      prefix="React"
      heading="Changeset Webforms"
      byline="Feature-rich, declarative webforms in React.js"
      linkComponent={Link}
    />
  );
}
