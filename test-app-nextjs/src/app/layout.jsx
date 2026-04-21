import './index.css';
import './app.css';
import './inner.css';
import './vendor.css';
import Providers from '../components/Providers.jsx';
import Header from '../components/Header.jsx';

export const metadata = {
  title: 'React Changeset Webforms',
  description: 'Feature-rich, declarative webforms in React.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div id="root">
          <Header />
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
