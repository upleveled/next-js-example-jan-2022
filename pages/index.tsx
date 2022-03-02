import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import vercelLogo from '../public/vercel.svg';
import { getLocalStorage, setLocalStorage } from '../util/localStorage';

const divStyle = (darkMode: boolean) => {
  return css`
    background-color: ${darkMode ? 'transparent' : 'black'};
    color: ${darkMode ? 'black' : 'white'};
  `;
};

type Props = {
  refreshUserProfile: () => void;
  userObject: { username: string };
};
export default function Home(props: Props) {
  // store this in a place that is persistent to page reload

  // if localStorage is undefined or darkMode dont exist is going to return false

  const [darkMode, setDarkMode] = useState(false);

  // TypeScript: using the generic parameter of useState
  // to tell TS about another type in the future
  const [userId, setUserId] = useState<number>();
  function changeUserId(id: number) {
    setUserId(id);
  }
  // Avoid error if userId is undefined
  if (typeof userId === 'number') {
    const multipliedUserId = userId * 2;
    changeUserId(multipliedUserId);
  }

  function darkModeToggle() {
    // 1. updating state
    // WARNING: remember to copy state
    const newDarkMode = !darkMode;

    setDarkMode(newDarkMode);
    // 2. update local storage
    // check if local storage exist
    setLocalStorage('darkMode', newDarkMode);
  }

  // update state to the value of the localStorage as soon as the page is rendered
  useEffect(() => {
    const myDarkMode = getLocalStorage('darkMode') || false;
    props.refreshUserProfile();
    setDarkMode(myDarkMode);
  }, [props]);

  return (
    <Layout userObject={props.userObject}>
      <Head>
        <title>Home</title>
        <meta name="description" content="Welcome to my website" />
      </Head>
      {/* boolean, emptyString or null are not rendered by React  */}
      {/* JSON.stringify([true, false, [], null]) */}

      <button css={divStyle(darkMode)} onClick={() => darkModeToggle()}>
        Dark mode : {!darkMode ? 'turn on' : 'turn off'}
      </button>
      <div css={divStyle(!darkMode)}>
        <h1>Home page</h1>
        <p>Home page content</p>

        <div>
          Option 1.0: Loading image with Image component WITHOUT width and
          height
        </div>
        <Image src={vercelLogo} alt="Vercel" />

        <div>
          Option 1.1: Loading image with Image component with width and height
        </div>
        <Image src="/vercel.svg" alt="Vercel" width="283" height="64" />

        <div>Option 2: Loading image with img tag</div>
        <img src="/vercel.svg" alt="Vercel" />
      </div>
    </Layout>
  );
}
