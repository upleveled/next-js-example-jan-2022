import { css } from '@emotion/react';
import Link from 'next/link';
import { User } from '../util/database';

const headerStyles = css`
  background-color: #eee;
  padding: 10px 15px;
  border-radius: 4px;
  margin: 8px 8px 20px;
  display: flex;

  a + a {
    margin-left: 10px;
  }

  > div:first-child {
    margin-right: auto;
  }
`;

type Props = {
  userObject?: User;
};

export default function Header(props: Props) {
  console.log(props);
  return (
    <header css={headerStyles}>
      <div>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/about">
          <a data-test-id="header-about-link">About</a>
        </Link>
        <Link href="/animals">
          <a data-test-id="header-animals-link">Animals</a>
        </Link>
        <Link href="/animals-cookie-lecture">
          <a>Animals/cookies-lecture</a>
        </Link>
        <Link href="/animal-management-naive-dont-copy">
          <a data-test-id="header-management-link">Management Naive</a>
        </Link>
        <Link href="/animal-api-frontend">
          <a data-test-id="header-management-link">API Frontend</a>
        </Link>
        <Link href="/animal-api-frontend">
          <a data-test-id="header-management-link">API Frontend</a>
        </Link>
        <Link href="/users/protected-user">
          <a data-test-id="header-management-link">Protected-User</a>
        </Link>
      </div>
      {props.userObject && <div>{props.userObject.username}</div>}

      {props.userObject ? (
        <a href="/logout">Logout</a>
      ) : (
        <>
          <Link href="/login">
            <a>Login</a>
          </Link>
          <Link href="/register">
            <a>Register</a>
          </Link>
        </>
      )}
    </header>
  );
}
