export default function ProductCard(props){
    return(
        <div>
            <img src="https://ddg-assets.b-cdn.net/web/imgs/generate_thumbs/186.jpg" alt=""/>
            <span>Teady</span>
            <span>LKR. 2500/-</span>
            <h1>{props.des}</h1>
        </div>
    )
}