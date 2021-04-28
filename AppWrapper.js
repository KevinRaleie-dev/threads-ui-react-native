import React from "react";
import App from "./App";
import { Provider as PaperProvider } from "react-native-paper";

export const AppWrapper = () => {
    return (
        <PaperProvider>
            <App />
        </PaperProvider>
    );
}