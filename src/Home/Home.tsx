import { ReactNode, useEffect, useState } from "react";
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { setUser } from './User/userSlice';
import { RootState } from "../store/store";



const Home = () => {
    const [opacity, setOpacity] = useState(0);
    const [navbarPosY, setNavbarPosY] = useState(0);



    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            const newOpacity = Math.min(scrollY / windowHeight, 1);
            setOpacity(newOpacity);

            const newNavBarPosY = windowHeight - scrollY;
            setNavbarPosY(newNavBarPosY < 0 ? 0: newNavBarPosY)
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
    <>
        <div className="flex flex-col justify-center items-center">
            <div className="w-screen h-screen flex justify-center items-center" style={{ opacity: 1 - opacity}}>
                <h1 className="text-white text-7xl">uQuwadro<small className="text-2xl">.com</small></h1>
            </div>
            <div className="flex-1" style={{ opacity: opacity}}>
                <Navbar styles={{position: "fixed",top: navbarPosY, left: 0}} />
                <div className="pt-16 max-w-[60rem] w-[60rem]">
                    <HomeMainPage />
                </div>
            </div>
            <HomeFooter />
        </div>
    </>);
}

const HomeMainPage: React.FC = React.memo(() => {
    const [homePosts, setHomePosts] = useState<any[]>([]);
    const [hpError, setHpError] = useState<boolean>(false);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const data = await getHomeNotices("");
                if (data.length === 0) {
                    setHpError(true);
                } else {
                    setHpError(false);
                    setHomePosts(data);
                }
            } catch (e) {
                setHpError(true);
                setHomePosts([]);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="py-1 max-w-[60rem] w-[60rem] flex flex-col items-center justify-center">
            {homePosts.map((p, index) => {
                const t = p.title;
                const img = p.image_url;
                const l = index % 2 === 0 ? 'e' : 'o';
                return <HomePost title={t} image_url={img} layout={l} key={index} />;
            })}
            <GetExtraPosts />
        </div>
    );
});

const getHomeNotices = async (url: string) => {
    return [
    {title: "TestTitle1", image_url: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
    {title: "TestTitle1", image_url: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
    {title: "TestTitle1", image_url: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
    {title: "TestTitle1", image_url: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
    {title: "TestTitle1", image_url: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
    {title: "TestTitle1", image_url: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
    {title: "TestTitle1", image_url: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
    ];
    /*
    console.log("Getting home notices at " + url);
    const data = await fetch(`http://localhost:8081/?url=${encodeURIComponent(url)}`)
        .then(response => response.json())

        .then(data => {
                const d = data.map((d, i) => {return{title: "Test Title " + i, image_url: d.link}})
                return d;
                })
    .catch(error => {
            console.error('Error fetching image links:', error);
            return [];
            });
    return data;
    */
}

interface HomePostProps {
    title: string;
    image_url: string;
    layout: string;
}
const HomePost: React.FC<HomePostProps> = ({title, image_url, layout}) => {
    let content: ReactNode;
    const _img = () => {
        return <>
        <div className="h-80 w-80">
            <img className="h-80 w-80 object-contain" src={image_url} />
        </div>
        </>;
    }
    const _title = () => {
        return <>
        <div className="flex flex-col items-center justify-center flex-1">
            <p className="text-white"><b>{title}</b></p>
        </div>
        </>;
    }
    if (layout === 'e') {
        content = <>
        <_img />
        <_title />
        </>;
    } else {
        content = <>
        <_title />
        <_img />
        </>;
    };
    const e = <>
    <div className="max-w-[60rem] w-[60rem] flex flex-row justify-center items-center border border-solid border-black hover:border-gray-500 transition-all duration-300">
        {content}
    </div>
    </>
    return e;
}

const GetExtraPosts: React.FC = () => {
    return (<></>);
}

interface NavbarProps {
    styles: any
}

const Navbar: React.FC<NavbarProps> = ({styles}) => {
    const user = useSelector((state: RootState) => state.user)
    console.log("Is User Logged In", user.isLoggedIn)

    return (
        <nav className='w-full h-16 bg-gradient-to-tr from-uquwadro-main-blue to-black shadow-white-blur px-1' style={styles}>
            <div className='w-full h-full flex flex-row'>
                <div id='uquwadro-logo' className='h-full w-auto mr-auto flex flex-row items-center justify-center'>
                    <div id='uquwadro-logo' className='h-full w-auto'>
                        <img src='./uquwadro.png' className='h-16 w-16' />
                    </div>
                    <h1 className="text-white">uQuwadro<small>.com</small></h1>
                </div>
                <div id='nav-bar-options' className='flex flex-row gap-x-1 items-center justify-center'>
                    {user.isLoggedIn ? 
                        <>
                            <BaseuquwadroButton to="/about" name="About" />
                            <BaseuquwadroButton to="/home" name="Home" />
                            <BaseuquwadroButton to="/profile" name="Profile" />
                        </> : <>
                            <BaseuquwadroButton to="/login" name="Log In" />
                            <BaseuquwadroButton to="/signup" name="Sign Up" />
                        </>
                    }
                </div>
            </div>
        </nav>
    );
};

interface NavbarButtonProps {
    to: string;
    name: string;
}

const BaseuquwadroButton: React.FC<NavbarButtonProps> = ({to, name}) => {
    return (
        <Link to={to} className='w-24 m-[2px] border border-white px-1.5 py-0.5 text-white rounded-full text-center hover:bg-white hover:text-black transition-all duration-300'>
            <span><b>{name}</b></span>
        </Link>
   );
}
const HomeFooter = () => {
    return <>
    <div className="w-full h-40 flex flex-row justify-center items-center">
        <div className="w-[50vh] h-full flex flex-col justify-center items-center mr-auto">
            <BaseuquwadroButton to="/login" name="Log In"/>
            <BaseuquwadroButton to="/signup" name="Sign Up"/>
        </div>
        <div className="w-full h-full flex flex-column justify-center items-center">
        <p className="text-white">aha ha</p>
        </div>
    </div>
    </>;
}

export default Home;
