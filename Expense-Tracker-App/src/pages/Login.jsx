import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';

const providers = [{ id: 'credentials', name: 'Credentials' }];
// preview-start
const BRANDING = {
  logo: (
    <img
      src="https://logosandtypes.com/wp-content/uploads/2024/12/xsplit.svg"
      alt="Xpenso logo"
      style={{ height: 24 }}
    />
  ),
  title: 'Xpenso',
};
// preview-end

const signIn = async (provider) => {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Sign in with ${provider.id}`);
      resolve();
    }, 500);
  });
  return promise;
};

export default function Login() {
  const theme = useTheme();
  return (
    // preview-start
    <AppProvider branding={BRANDING} theme={theme}>
      <SignInPage
        signIn={signIn}
        providers={providers}
        slotProps={{ emailField: { autoFocus: false } }}
      />
    </AppProvider>
    // preview-end
  );
}
