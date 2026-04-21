import Providers from '../../components/Providers.jsx';
import Header from '../../components/Header.jsx';

export default function DocsLayout({ children }) {
  return (
    <div id="root">
      <Header />
      <Providers>{children}</Providers>
    </div>
  );
}
