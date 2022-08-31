import Header from "../components/header/header";

interface LayoutProps {
    children?: React.ReactNode;
  }

const Layout:React.FC<LayoutProps> = (props) => {
    return (
        <>
        <Header />
        <main>{props.children}</main>
        </>
    )
}

export default Layout;