export { default } from '@/ui/signup';

export async function getStaticProps() {
  return {
    props: {
      noLayout: true,
    },
  };
}