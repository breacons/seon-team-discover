import AuthLayout from './AuthLayout';
import UserLayout from './ConsoleLayout';
import withLayout from './with-layout';

const withAuthLayout = withLayout(AuthLayout);

export { UserLayout, AuthLayout, withAuthLayout };
