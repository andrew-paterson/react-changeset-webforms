import 'react-docs-utils/styles/addon.scss';
import './styles/app.scss';
import './styles/react-qunit.css';
import './styles/docs-app.css';

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
