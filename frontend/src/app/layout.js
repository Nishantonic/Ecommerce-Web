import './globals.css';

export const metadata = {
  title: 'E-Shop',
  description: 'E-Commerce Site',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}