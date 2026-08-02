type HeaderProps = {
    title: string;
    subtitle: string;
};
function Header(props: HeaderProps) {
    return(
        <header className="mb-12 text-center">

            <h1 className="text-5xl font-bold text-blue-600">
                {props.title}
            </h1>

            <p className="mt-3 text-lg text-slate-500">
                {props.subtitle}
            </p>

        </header>
    );
}

export default Header;