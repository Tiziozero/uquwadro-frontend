import { useEffect, useState } from "react";
import React from 'react';
import { Link } from 'react-router-dom';
const Home = () => {
    const [opacity, setOpacity] = useState(0);
    const [navbarPosY, setNavbarPosY] = useState(0);

    const [homePosts, setHomePosts] = useState<any[]>([]);

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
    useEffect(() => {
        console.log("Use Effect");
        const f = async () => {
            const hp = await getHomeNotices("https://www.reddit.com/search/?q=genshin&type=media&cId=6cdd1511-9c68-4120-9a9a-aa363c0406e0&iId=f453d8d3-684d-453b-bc56-77bd3074a0c2");
            console.info("setting hp to: ")
            console.info(hp);
            setHomePosts(hp);
        }
        f()
    }, []);
    return (
    <>
        <div className="flex flex-col justify-center items-center">
            <div className="w-screen h-screen flex justify-center items-center" style={{ opacity: 1 - opacity}}>
                <h1 className="text-white text-7xl">uQuwadro<small className="text-2xl">.com</small></h1>
            </div>
            <div className="min-h-screen flex-1" style={{ opacity: opacity}}>
                <Navbar styles={{position: "fixed",top: navbarPosY, left: 0}} />
                <div className="pt-16 max-w-[60rem] w-[60rem] h-screen">
                    <div className="py-1 max-w-[60rem] w-[60rem] flex flex-col items-center justify-center">
                    {homePosts.map((p, index) => {
                        const t = p.title;
                        const img = p.image_url;
                        const l = index % 2 == 0 ? 'e': 'o';
                        console.log(t, img, l)
                        return <HomePost title={t} image_url={img} layout={l} key={index} />
                    })}
                    </div>
                </div>
            </div>
        </div>
    </>);
}

const getHomeNotices = async (url: string) => {
    const data = await fetch(`http://localhost:8081/?url=${encodeURIComponent(url)}`)
        .then(response => response.json())

        .then(data => {
                const d = data.map((d, i) => {return{title: "Test Title " + i, image_url: d.link}})
                return d;
                })
    .catch(error => {
            console.error('Error fetching image links:', error);
            });
    return data;
    return [
    {title: "Test Title.", image_url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg3.gelbooru.com%2Fimages%2F39%2F97%2F3997b20299f536b2dc1bac105c5d3274.png&f=1&nofb=1&ipt=bfacd468530eb784e59f0dfbcf65767a35172197f4f6ce0f5ecefc420364b67b&ipo=images"},
    {title: "Test Title.", image_url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg3.gelbooru.com%2Fimages%2F39%2F97%2F3997b20299f536b2dc1bac105c5d3274.png&f=1&nofb=1&ipt=bfacd468530eb784e59f0dfbcf65767a35172197f4f6ce0f5ecefc420364b67b&ipo=images"},
    {title: "Test Title.", image_url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg3.gelbooru.com%2Fimages%2F39%2F97%2F3997b20299f536b2dc1bac105c5d3274.png&f=1&nofb=1&ipt=bfacd468530eb784e59f0dfbcf65767a35172197f4f6ce0f5ecefc420364b67b&ipo=images"},
    {title: "Test Title.", image_url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg3.gelbooru.com%2Fimages%2F39%2F97%2F3997b20299f536b2dc1bac105c5d3274.png&f=1&nofb=1&ipt=bfacd468530eb784e59f0dfbcf65767a35172197f4f6ce0f5ecefc420364b67b&ipo=images"},
    {title: "Test Title.", image_url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg3.gelbooru.com%2Fimages%2F39%2F97%2F3997b20299f536b2dc1bac105c5d3274.png&f=1&nofb=1&ipt=bfacd468530eb784e59f0dfbcf65767a35172197f4f6ce0f5ecefc420364b67b&ipo=images"},
    ];
}

interface HomePostProps {
    title: string;
    image_url: string;
    layout: string;
}
const HomePost: React.FC<HomePostProps> = ({title, image_url, layout}) => {
    const _img = <>
        <div className="h-80 w-80">
            <img className="h-80 w-80 object-contain" src={image_url} />
        </div>
        </>;
    const _title = <>
        <div className="flex flex-col items-center justify-center flex-1">
            <p className="text-white"><b>{title}</b></p>
        </div>
    </>;
    const e = <>
    <div className="max-w-[60rem] w-[60rem] flex flex-row justify-center items-center border border-white">
        {_img}
        {_title}
    </div>
    </>
    const o = <>
    <div className="max-w-[60rem] w-[60rem] flex flex-row justify-center items-center border border-white">
        {_title}
        {_img}
    </div>
    </>
    return layout === 'e' ? e: o;
}

interface NavbarProps {
    styles: any
}

const Navbar: React.FC<NavbarProps> = ({styles}) => {

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
                    <NavbarButton to="/about" name="About" />
                    <NavbarButton to="/home" name="Home" />
                    <NavbarButton to="/profile" name="Profile" />
                </div>
            </div>
        </nav>
    );
};

interface NavbarButtonProps {
    to: string;
    name: string;
}

const NavbarButton: React.FC<NavbarButtonProps> = ({to, name}) => {
    return (
        <Link to={to} className='w-24 border border-white px-1.5 py-0.5 text-white rounded-full text-center hover:bg-white hover:text-black transition-all duration-300'>
            <span><b>{name}</b></span>
        </Link>
   );
}

export default Home;
