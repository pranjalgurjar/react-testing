import { useLayoutEffect } from 'react';

const useDocumentTitle = (title) => {
  useLayoutEffect(() => {
    if (title) {
      document.title = title;
    } else {
      document.title = 'I-Magnus | Online Learning platform';
    }
  }, [title]);
};

export default useDocumentTitle;