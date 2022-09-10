import Header from "../components/header/header";

const Layout = (props) => {
    return (
        <div className="page">
        <Header />
        <main>{props.children}</main>
        </div>
    )
}

export default Layout;