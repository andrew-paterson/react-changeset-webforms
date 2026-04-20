import './index.css';
import './app.css';
import './inner.css';
import './vendor.css';

export const metadata = {
  title: 'React Changeset Webforms',
  description: 'Feature-rich, declarative webforms in React.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
