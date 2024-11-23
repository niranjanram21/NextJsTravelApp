'use client';

import { createContext, useContext, useState } from 'react';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("Home"); // Default tab is "Home"

    // Toggle Sidebar visibility
    const toggleSidebar = (event) => {
        if (event) event.stopPropagation(); // Prevent event bubbling
        setIsSidebarOpen((prev) => !prev);
    };

    // Update Active Tab
    const updateActiveTab = (tabName) => {
        setActiveTab(tabName);
        setIsSidebarOpen(false); // Optionally close the sidebar when a tab is clicked
    };

    return (
        <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar, activeTab, updateActiveTab }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => {
    return useContext(SidebarContext);
};
