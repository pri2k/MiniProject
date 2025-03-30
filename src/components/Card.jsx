export default function Card ({ children }) {
    let classes = "bg-white shadow-md shadow-gray-300 rounded-md mb-5";
    // if (noShadow) {

    // }
    return (
        <div className={classes}>
            {children}
        </div>
    )
}