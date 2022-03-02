import Head from 'next/head';
import Layout from '../components/Layout';

type Props = {
  userObject: { username: string };
};
export default function About(props: Props) {
  return (
    <Layout userObject={props.userObject}>
      <Head>
        <title>About</title>
        <meta name="description" content="About the team" />
      </Head>

      <h1>About</h1>
      <p>This is the about page</p>
    </Layout>
  );
}
