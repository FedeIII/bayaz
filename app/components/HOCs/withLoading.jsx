import { useNavigation } from '@remix-run/react';
import LoadingSpinner from '~/components/util/pageSpinner';

export default function withLoading(WrappedComponent) {
  return function WithLoadingComponent(props) {
    const navigation = useNavigation();

    if (navigation.state === 'loading') {
      return <LoadingSpinner />;
    }

    return <WrappedComponent {...props} />;
  };
}
