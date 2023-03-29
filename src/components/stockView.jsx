import './stockView.css'

const Card = (props) => {
    return (
        <div className="card">
            <div className="img-container">
                <img src={require("../imgs/libro.avif")} alt="adawd" />
            </div>
            <div className="info-container">
                <p><b>Libro:</b> Harry Potter</p>
                <p><b>U/Disponibles:</b> 6</p>
            </div>
        </div>
    )
}

const StockView = () => {
    return(
        <div className="stock">
            <div className="cards-container">
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
            </div>
        </div>

    )
}

export default StockView