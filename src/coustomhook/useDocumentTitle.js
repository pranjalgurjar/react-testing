import { useLayoutEffect } from 'react';
import { Title } from '.';

const useDocumentTitle = (title) => {
  useLayoutEffect(() => {
    if (title) {
      document.title = title;
    } else {
      document.title = `${Title.documentTitle} | ${Title.backTitle}`;
    }
  }, [title]);
};

export default useDocumentTitle;