import './index.css';
import './app.css';
import './inner.css';
import './vendor.css';
import Providers from '../components/Providers.jsx';

export const metadata = {
  title: 'React Changeset Webforms',
  description: 'Feature-rich, declarative webforms in React.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
