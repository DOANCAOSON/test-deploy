// pages/_error.js
import React from 'react';
import { useRouter } from 'next/router';

const Error = ({ statusCode }: any) => {
  const router = useRouter();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>{statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}</h1>
      <p>
        <button onClick={() => router.push('/')}>Go back home</button>
      </p>
    </div>
  );
};

Error.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
