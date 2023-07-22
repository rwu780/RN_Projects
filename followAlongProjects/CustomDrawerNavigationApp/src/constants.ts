import TabMain from "./BottomNavigation/TabMain"
import TabMe from "./BottomNavigation/TabMe"
import TabProfile from "./BottomNavigation/TabProfile"
import TabSearch from "./BottomNavigation/TabSearch"
import Home from "./DrawerWithDropDown/screens/Home"
import Profile from "./DrawerWithDropDown/screens/Profile"

export const COLORS = {
    primary: '#facd94',
    black: '#000000',
    white:'#FFFFFF',
    yellow: '#EED552',
    green: '#60c5a8',
    red: '#E66155',
    purple: '#8f06e4',
    skyBlue: 'skyblue',
    pink: '#ff4c98',
    gold: '#f8c907',
    grey: 'grey',

    menu1: '#f9a3b3',
    menu2: '#81c3eb',
    menu3: '#facd94',
    dark: '#010101',
    light: '#f0f0f0'

}

export const constant = {
    SPACING: 16,
    borderRadius: 10,
    titleFontSize: 24,
    textFontSize: 16,
    subTextFontSize: 14
}

export const ScreensArray = [
    { route: 'Home', label: 'Home', icon: 'home', component: Home, },
    { route: 'Profile', label: 'Profile', icon: 'profile', component: Profile, },
]

type TabScreensRoutes = 'TabMain' | 'TabProfile' | 'TabSearch' | 'TabMe'
type TabScreensProps = {
    route: TabScreensRoutes;
    label: string;
    icon: string;
    activeColor: string,
    inActiveColor: string,
    component: () => React.JSX.Element
}

export const TabScreensArray: TabScreensProps[] = [
    { route: 'TabMain', label: 'Home', icon: 'home', component: TabMain, activeColor: COLORS.menu1, inActiveColor: COLORS.grey },
    { route: 'TabProfile', label: 'Profile', icon: 'home', component: TabProfile, activeColor: COLORS.pink, inActiveColor: COLORS.grey },
    { route: 'TabSearch', label: 'Search', icon: 'home', component: TabSearch, activeColor: COLORS.purple, inActiveColor: COLORS.grey},
    { route: 'TabMe', label: 'Me', icon: 'home', component: TabMe, activeColor: COLORS.skyBlue, inActiveColor:COLORS.grey},

]

export const drawerMenu = [
    {
        title: 'Settings',
        bg: COLORS.menu1,
        icon: 'settings',
        route: 'Settings',
        menuList: [
            {
                title: 'Change Theme'
            },
            {
                title: 'Notify Me'
            }
        ]
    },
    {
        title: `Todo's`,
        bg: COLORS.menu2,
        // type: Icons.Feather,
        icon: 'check-square',
        route: 'Todo',
        menuList: [
            {
                title: 'Eat'
            },
            {
                title: 'Code'
            }
        ]
    },
    {
        title: "Projects",
        bg: COLORS.menu3,
        icon: 'project',
        route: 'Project',
        menuList: [
          { title: 'Portfolio' },
          { title: 'Note-APP' },
          { title: 'RN-Ui' },
        ]
      },
]

