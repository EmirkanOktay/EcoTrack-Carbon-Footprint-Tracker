import background from "../../Images/background1.png";

const HomePage = () => {
    return (
        <div
            className="relative min-h-screen w-full pt-16 bg-cover bg-center"
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="absolute inset-0 bg-black/40"></div>


        </div>
    );
};

export default HomePage;
