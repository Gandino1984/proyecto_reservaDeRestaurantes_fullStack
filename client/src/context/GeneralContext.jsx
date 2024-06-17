import { createContext } from 'react';

const GeneralContext = createContext({user: null, setUser: () => {}});

export default GeneralContext;