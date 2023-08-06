
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useConditionalRedirect = (condition) => {

    condition = !localStorage.getItem('logged');
  const router = useRouter();

  useEffect(() => {
    if (condition) {
      router.replace('/');
    }
  }, [condition, router]);
};

export default useConditionalRedirect;
