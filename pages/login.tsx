export {default} from '@/ui/login';

export async function getStaticProps() {
  return {
    props: {
      noLayout: true,
    },
  };
}
