import { css } from '@emotion/react';
import Link from 'next/link';

const headerStyles = css`
  background-color: #eee;
  padding: 10px 15px;
  border-radius: 4px;
  margin: 8px 8px 20px;

  a + a {
    margin-left: 10px;
  }
`;

export default function Header() {
  return (
    <header css={headerStyles}>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/about">
        <a>About</a>
      </Link>
      <Link href="/animals">
        <a>Animals</a>
      </Link>
    </header>
  );
}
