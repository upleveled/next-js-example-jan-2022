import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';

export default function ManagementNaive() {
  return (
    <Layout>
      <Head>
        <title>Animal Management Naive Don't Copy</title>
        <meta name="description" content="Don't copy me" />
      </Head>

      <ul>
        <li>
          <Link href="/animal-management-naive-dont-copy/create">
            <a>Create</a>
          </Link>
        </li>
        <li>
          <Link href="/animal-management-naive-dont-copy/read">
            <a>Read (All)</a>
          </Link>
        </li>
        <li>
          <Link href="/animal-management-naive-dont-copy/read">
            <a>Read (Single)</a>
          </Link>
        </li>
        <li>
          <Link href="/animal-management-naive-dont-copy/update">
            <a>Update</a>
          </Link>
        </li>
        <li>
          <Link href="/animal-management-naive-dont-copy/delete">
            <a>Delete</a>
          </Link>
        </li>
      </ul>
    </Layout>
  );
}
