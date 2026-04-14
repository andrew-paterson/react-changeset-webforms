import { createContext, useContext } from 'react';

const ChangesetWebformsContext = createContext({});

export function useChangesetWebformsConfig() {
  return useContext(ChangesetWebformsContext);
}

export function ChangesetWebformsProvider({ config, children }) {
  return <ChangesetWebformsContext.Provider value={config}>{children}</ChangesetWebformsContext.Provider>;
}
