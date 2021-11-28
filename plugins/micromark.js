import {micromark} from 'micromark';
import remarkRehype from 'remark-rehype';
import rehypeExternalLinks from 'rehype-external-links'


export default ({app}, inject) => {
  inject('micromark', (str) => {
    return micromark(str, {
      extensions: [rehypeExternalLinks()],
      htmlExtensions: [remarkRehype, rehypeExternalLinks ]
    })
  });
};
