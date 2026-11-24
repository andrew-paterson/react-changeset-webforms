import PageLink from '../../components/PageLink.jsx';
import { DocsHero } from 'react-docs-utils';

export default function Home() {
  return (
    <DocsHero
      prefix="React"
      heading="Changeset Webforms"
      byline="Feature-rich, declarative webforms in React.js"
      linkComponent={PageLink}
    />
  );
}
