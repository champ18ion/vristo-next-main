'use client';
import { PropsWithChildren, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { toggleRTL, toggleTheme, toggleMenu, toggleLayout, toggleAnimation, toggleNavbar, toggleSemidark } from '@/store/themeConfigSlice';
import Loading from '@/components/layouts/loading';
import { getTranslation } from '@/i18n';

function App({ children }: PropsWithChildren) {
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const dispatch = useDispatch();
    const { initLocale } = getTranslation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Safely initialize settings from localStorage or fallback to redux state
        const savedTheme = localStorage.getItem('theme') || themeConfig.theme;
        const savedMenu = localStorage.getItem('menu') || themeConfig.menu;
        const savedLayout = localStorage.getItem('layout') || themeConfig.layout;
        const savedRTLClass = localStorage.getItem('rtlClass') || themeConfig.rtlClass;
        const savedAnimation = localStorage.getItem('animation') || themeConfig.animation;
        const savedNavbar = localStorage.getItem('navbar') || themeConfig.navbar;
        const savedSemidark = localStorage.getItem('semidark') || themeConfig.semidark;

        // Dispatch actions to update Redux store with these values
        dispatch(toggleTheme(savedTheme));
        dispatch(toggleMenu(savedMenu));
        dispatch(toggleLayout(savedLayout));
        dispatch(toggleRTL(savedRTLClass));
        dispatch(toggleAnimation(savedAnimation));
        dispatch(toggleNavbar(savedNavbar));
        dispatch(toggleSemidark(savedSemidark));

        // Initialize the locale for translations
        initLocale(themeConfig.locale);

        setIsLoading(false);
    }, [dispatch, initLocale, themeConfig]);

    return (
        <div
            className={`${(themeConfig.sidebar && 'toggle-sidebar') || ''} ${themeConfig.menu} ${themeConfig.layout} ${
                themeConfig.rtlClass
            } main-section relative font-nunito text-sm font-normal antialiased`}
        >
            {isLoading ? <Loading /> : children}
        </div>
    );
}

export default App;
