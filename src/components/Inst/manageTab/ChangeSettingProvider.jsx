import React, { createContext, useState } from 'react';

export const SettingContext = createContext();

export const ChangeSettingProvider = ({ children }) => {
  const [settingChange, setSettingChange] = useState({});

  return <SettingContext.Provider value={{ settingChange, setSettingChange }}>{children}</SettingContext.Provider>;
};
