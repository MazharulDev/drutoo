"use client";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import StyledComponentsRegistry from "./AntdRegistry";
import { ThemeProvider } from "@/contexts/ThemeContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <StyledComponentsRegistry>
        <ThemeProvider>{children}</ThemeProvider>
      </StyledComponentsRegistry>
    </Provider>
  );
};

export default Providers;
